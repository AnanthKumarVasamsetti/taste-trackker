
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Save, Trash2 } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { mockAudits, mockAuditors } from "@/data/mockData";
import { toast } from "sonner";
import { AuditSectionType } from "@/types";

const MobileEditAudit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [audit, setAudit] = useState(mockAudits.find(a => a.id === id));
  
  // Form setup
  const form = useForm({
    defaultValues: {
      title: audit?.title || "",
      description: audit?.description || "",
      location: audit?.location || "",
      dueDate: audit?.dueDate ? new Date(audit.dueDate).toISOString().split('T')[0] : "",
      auditorId: audit?.auditorId || ""
    }
  });

  useEffect(() => {
    if (audit && audit.status !== 'pending') {
      toast.error("Only audits in pending status can be edited");
      navigate(`/mobile/audits/${id}`);
    }
  }, [audit, id, navigate]);
  
  if (!audit) {
    return (
      <MobileLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-xl font-bold">Audit Not Found</h2>
          <p className="text-gray-500 mb-4">The audit you're looking for doesn't exist.</p>
          <Link to="/mobile/audits">
            <Button variant="outline">Back to Audits</Button>
          </Link>
        </div>
      </MobileLayout>
    );
  }

  const handleSubmit = (values: any) => {
    setIsSubmitting(true);
    
    // Simulate API call to update audit
    setTimeout(() => {
      // Update local state
      setAudit({
        ...audit,
        ...values
      });
      
      toast.success("Audit updated successfully!");
      setIsSubmitting(false);
      navigate(`/mobile/audits/${id}`);
    }, 1000);
  };
  
  return (
    <MobileLayout>
      <div className="p-4 pb-24">
        <div className="flex justify-between items-center mb-4">
          <Link to={`/mobile/audits/${id}`} className="flex items-center text-gray-600">
            <ChevronLeft className="h-5 w-5 mr-1" /> Back
          </Link>
          <span className="text-xs rounded-full px-2 py-1 bg-amber-100 text-amber-800">
            {audit.status.replace('-', ' ')}
          </span>
        </div>
        
        <h1 className="text-xl font-bold mb-4">Edit Audit</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Audit Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter audit title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter audit description" 
                      rows={3} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="auditorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign Auditor</FormLabel>
                  <FormControl>
                    <select
                      className="w-full p-2 border rounded-md"
                      {...field}
                    >
                      <option value="">Unassigned</option>
                      {mockAuditors.map(auditor => (
                        <option key={auditor.id} value={auditor.id}>
                          {auditor.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Separator className="my-6" />
            
            <h2 className="text-lg font-semibold">Audit Sections</h2>
            <p className="text-sm text-gray-500 mb-4">
              The audit contains {audit.sections.length} sections with questions.
              To edit sections and questions, please use the desktop interface.
            </p>
            
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between space-x-4">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => navigate(`/mobile/audits/${id}`)}
                className="flex-1"
              >
                Cancel
              </Button>
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 flex-1"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </MobileLayout>
  );
};

export default MobileEditAudit;
