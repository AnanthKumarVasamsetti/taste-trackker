
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { mockAudits, mockAuditors } from "@/data/mockData";
import { Check, X, MessageCircle, UserCheck, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import NonComplianceReport from "@/components/reports/NonComplianceReport";
import TechnicalReviewForm from "@/components/reports/TechnicalReviewForm";
import { toast } from "sonner";

const AuditReviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const [reviewNotes, setReviewNotes] = useState("");
  
  const audit = mockAudits.find(a => a.id === id);
  
  if (!audit) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-2xl font-bold">Audit Not Found</h2>
          <p className="text-gray-500 mb-4">The audit you're looking for doesn't exist or has been removed.</p>
          <Link to="/audits">
            <Button variant="outline">Back to Audits</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const auditor = audit.auditorId ? mockAuditors.find(a => a.id === audit.auditorId) : null;

  const handleReviewComplete = () => {
    toast.success("Technical review submitted successfully!");
    // In a real app, this would update the audit status and save the review data
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{audit.title}</h1>
              <Badge className="bg-violet-100 text-violet-800">
                In Review
              </Badge>
            </div>
            <p className="text-gray-500 mt-1">
              Submitted {formatDistanceToNow(new Date(audit.updatedAt), { addSuffix: true })} by {auditor?.name || 'Unknown'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <X className="h-4 w-4" />
              Reject
            </Button>
            <Button className="bg-brand-blue hover:bg-brand-blue-dark gap-2">
              <Check className="h-4 w-4" />
              Approve
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Audit Overview</TabsTrigger>
            <TabsTrigger value="non-compliance">Non-Compliance Report</TabsTrigger>
            <TabsTrigger value="technical-review">Technical Review</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Audit Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <UserCheck className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Auditor</p>
                      <p className="font-medium">{auditor?.name || 'Unassigned'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Date Conducted</p>
                      <p className="font-medium">{new Date(audit.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Description</p>
                    <p>{audit.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p>{audit.location}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Non-Compliance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Calculate non-compliant items */}
                  {(() => {
                    const nonCompliantItems = audit.sections.flatMap(section => 
                      section.items.filter(item => item.response === false)
                    );
                    
                    return (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">Total issues found:</p>
                          <Badge className="bg-red-100 text-red-800">
                            {nonCompliantItems.length} Issue{nonCompliantItems.length !== 1 ? 's' : ''}
                          </Badge>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-3">
                          {nonCompliantItems.length > 0 ? (
                            nonCompliantItems.map((item, index) => {
                              const section = audit.sections.find(s => 
                                s.items.some(i => i.id === item.id)
                              );
                              return (
                                <div key={item.id} className="p-3 bg-gray-50 rounded-md border">
                                  <div className="flex justify-between items-start mb-1">
                                    <span className="font-medium">Issue #{index + 1}</span>
                                    <Badge variant="outline" className="text-xs">
                                      {section?.title}
                                    </Badge>
                                  </div>
                                  <p className="text-sm">{item.question}</p>
                                  {item.notes && (
                                    <div className="mt-2 text-xs text-gray-500">
                                      <p className="font-medium">Note:</p>
                                      <p>{item.notes}</p>
                                    </div>
                                  )}
                                </div>
                              );
                            })
                          ) : (
                            <p className="text-center py-3 text-gray-500">
                              No non-compliance issues found.
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveTab("non-compliance")}
                  >
                    View Full Non-Compliance Report
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reviewer Notes</CardTitle>
                <CardDescription>Add your comments about this audit</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter your review notes here..."
                  className="min-h-[120px]"
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                />
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-end">
                <Button 
                  className="bg-brand-blue hover:bg-brand-blue-dark gap-2"
                  disabled={!reviewNotes.trim()}
                  onClick={() => {
                    toast.success("Review notes saved");
                    setReviewNotes("");
                  }}
                >
                  <MessageCircle className="h-4 w-4" />
                  Save Notes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="non-compliance" className="space-y-6">
            <NonComplianceReport audit={audit} />
          </TabsContent>
          
          <TabsContent value="technical-review" className="space-y-6">
            <TechnicalReviewForm 
              audit={audit} 
              onReviewComplete={handleReviewComplete}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AuditReviewPage;
