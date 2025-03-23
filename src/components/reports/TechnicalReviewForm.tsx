
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertTriangle, X } from "lucide-react";
import { toast } from "sonner";
import { AuditType } from "@/types";

interface TechnicalReviewFormProps {
  audit: AuditType;
  onReviewComplete?: () => void;
}

const TechnicalReviewForm: React.FC<TechnicalReviewFormProps> = ({ 
  audit, 
  onReviewComplete 
}) => {
  const [assessment, setAssessment] = useState<string>("pending");
  const [comments, setComments] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating API call
    setTimeout(() => {
      toast.success("Technical review submitted successfully");
      setIsSubmitting(false);
      if (onReviewComplete) {
        onReviewComplete();
      }
    }, 1000);
  };
  
  return (
    <Card>
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-xl">Technical Review Assessment</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Assessment</h3>
            <RadioGroup 
              value={assessment} 
              onValueChange={setAssessment}
              className="flex flex-col space-y-3"
            >
              <div className="flex items-center space-x-3 rounded-md border p-3 cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="approved" id="approved" />
                <Label htmlFor="approved" className="flex items-center cursor-pointer">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  <div>
                    <p className="font-medium">Approved</p>
                    <p className="text-sm text-gray-500">The non-compliance report accurately reflects the findings</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 rounded-md border p-3 cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="needs-revision" id="needs-revision" />
                <Label htmlFor="needs-revision" className="flex items-center cursor-pointer">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  <div>
                    <p className="font-medium">Needs Revision</p>
                    <p className="text-sm text-gray-500">The report requires additional details or corrections</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 rounded-md border p-3 cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="rejected" id="rejected" />
                <Label htmlFor="rejected" className="flex items-center cursor-pointer">
                  <X className="h-5 w-5 text-red-500 mr-2" />
                  <div>
                    <p className="font-medium">Rejected</p>
                    <p className="text-sm text-gray-500">The report contains significant errors or omissions</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="comments">
              Comments and Feedback
              {assessment !== "approved" && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Provide detailed feedback on the report..."
              rows={5}
              required={assessment !== "approved"}
              className="resize-none"
            />
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50 flex justify-end p-4">
          <Button 
            type="submit" 
            className="bg-brand-blue hover:bg-brand-blue-dark"
            disabled={isSubmitting || (assessment !== "approved" && !comments.trim())}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TechnicalReviewForm;
