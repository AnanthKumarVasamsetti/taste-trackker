
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Printer, Download, Eye, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { mockAudits } from "@/data/mockData";
import NonComplianceReport from "@/components/reports/NonComplianceReport";
import TechnicalReviewForm from "@/components/reports/TechnicalReviewForm";
import { toast } from "sonner";

const NonCompliancePreview = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<string>("preview");
  const [isReviewed, setIsReviewed] = useState<boolean>(false);
  
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

  // Redirect if audit is not in-review or completed
  if (audit.status !== 'in-review' && audit.status !== 'completed') {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-2xl font-bold">Access Restricted</h2>
          <p className="text-gray-500 mb-4">Non-compliance reports are only available for audits in review status.</p>
          <Link to={`/audits/${id}`}>
            <Button variant="outline">Back to Audit</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const handleDownload = () => {
    toast.success("Report downloaded successfully");
  };

  const handlePrint = () => {
    window.print();
  };
  
  const handleReviewComplete = () => {
    setIsReviewed(true);
    setActiveTab("preview");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Link 
              to={`/audits/${id}`} 
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-2"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to Audit
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">Non-Compliance Report</h1>
            <p className="text-gray-500">{audit.title}</p>
          </div>
          
          <div className="flex gap-2 print:hidden">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" /> Print
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
          </div>
        </div>

        <Separator className="print:hidden" />
        
        <Tabs 
          defaultValue="preview" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="print:hidden"
        >
          <TabsList>
            <TabsTrigger value="preview">
              <Eye className="h-4 w-4 mr-2" /> Report Preview
            </TabsTrigger>
            <TabsTrigger value="review" disabled={isReviewed}>
              <MessageSquare className="h-4 w-4 mr-2" /> Technical Review
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="preview" className="m-0">
              {isReviewed && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-800">
                  Technical review has been completed for this report.
                </div>
              )}
              <NonComplianceReport audit={audit} />
            </TabsContent>
            
            <TabsContent value="review" className="m-0">
              <TechnicalReviewForm 
                audit={audit} 
                onReviewComplete={handleReviewComplete}
              />
            </TabsContent>
          </div>
        </Tabs>
        
        {/* Print-only version that always shows the preview */}
        <div className="hidden print:block">
          <NonComplianceReport audit={audit} />
        </div>
      </div>
    </MainLayout>
  );
};

export default NonCompliancePreview;
