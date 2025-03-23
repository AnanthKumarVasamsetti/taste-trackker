
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, AlertTriangle, Download, MessageSquare, Check } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { mockAudits } from "@/data/mockData";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const MobileNonCompliancePreview = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("preview");
  const [assessment, setAssessment] = useState("pending");
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  
  const audit = mockAudits.find(a => a.id === id);
  
  if (!audit) {
    return (
      <MobileLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] p-4">
          <h2 className="text-xl font-bold">Audit Not Found</h2>
          <p className="text-gray-500 mb-4 text-center">The audit you're looking for doesn't exist.</p>
          <Link to="/mobile/audits">
            <Button variant="outline">Back to Audits</Button>
          </Link>
        </div>
      </MobileLayout>
    );
  }

  // Filter out only non-compliant items
  const nonCompliantItems = audit.sections.flatMap(section => {
    return section.items
      .filter(item => item.response === false)
      .map(item => ({
        sectionTitle: section.title,
        ...item,
      }));
  });

  const handleDownload = () => {
    toast.success("Report downloaded");
  };
  
  const handleSubmitReview = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Technical review submitted");
      setIsSubmitting(false);
      setIsReviewed(true);
      setActiveTab("preview");
    }, 1000);
  };

  return (
    <MobileLayout>
      <div className="p-4 pb-24">
        <div className="flex justify-between items-center mb-4">
          <Link to={`/mobile/audits/${id}`} className="flex items-center text-gray-600">
            <ChevronLeft className="h-5 w-5 mr-1" /> Back
          </Link>
          <Button size="sm" variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
        
        <h1 className="text-xl font-bold mb-1">Non-Compliance Report</h1>
        <p className="text-gray-600 text-sm mb-4">{audit.title}</p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="review" disabled={isReviewed}>
              Technical Review
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="mt-4">
            {isReviewed && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-800 flex items-center">
                <Check className="h-4 w-4 mr-2" />
                Review completed
              </div>
            )}
            
            <div className="bg-white rounded-lg border mb-4">
              <div className="p-3 bg-red-50 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  <span className="font-medium">Issues Found</span>
                </div>
                <span className="text-sm bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                  {nonCompliantItems.length}
                </span>
              </div>
              
              <div className="divide-y">
                {nonCompliantItems.length > 0 ? (
                  nonCompliantItems.map((item, index) => (
                    <div key={item.id} className="p-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Issue #{index + 1}</span>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                          {item.sectionTitle}
                        </span>
                      </div>
                      <p className="text-sm mb-2">{item.question}</p>
                      {item.notes && (
                        <div className="bg-gray-50 p-2 rounded text-sm mt-2">
                          <p className="text-xs text-gray-500 mb-1">Auditor Notes:</p>
                          <p className="text-gray-700">{item.notes}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">No non-compliance issues found</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="review" className="mt-4 space-y-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Assessment</h3>
              <RadioGroup 
                value={assessment} 
                onValueChange={setAssessment}
                className="space-y-2"
              >
                <div className="flex items-start space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="approved" id="m-approved" className="mt-1" />
                  <div>
                    <Label htmlFor="m-approved" className="font-medium">Approved</Label>
                    <p className="text-xs text-gray-500">Report accurately reflects findings</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="needs-revision" id="m-needs-revision" className="mt-1" />
                  <div>
                    <Label htmlFor="m-needs-revision" className="font-medium">Needs Revision</Label>
                    <p className="text-xs text-gray-500">Report requires additional details</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="rejected" id="m-rejected" className="mt-1" />
                  <div>
                    <Label htmlFor="m-rejected" className="font-medium">Rejected</Label>
                    <p className="text-xs text-gray-500">Report contains significant errors</p>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="m-comments">
                Comments and Feedback
                {assessment !== "approved" && <span className="text-red-500">*</span>}
              </Label>
              <Textarea
                id="m-comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Provide feedback on the report..."
                rows={5}
                required={assessment !== "approved"}
              />
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleSubmitReview}
              disabled={isSubmitting || (assessment !== "approved" && !comments.trim())}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default MobileNonCompliancePreview;
