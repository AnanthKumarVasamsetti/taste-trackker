
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockAudits, mockAuditors } from "@/data/mockData";
import NonComplianceReport from "@/components/reports/NonComplianceReport";
import { AuditType } from "@/types";

const AuditPerformedPage = () => {
  const { id } = useParams<{ id: string }>();
  const audit: AuditType | undefined = mockAudits.find(a => a.id === id && (a.status === "completed" || a.status === "in-review"));

  const auditor = audit?.auditorId ? mockAuditors.find(a => a.id === audit.auditorId) : null;

  const [customerFeedback, setCustomerFeedback] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  if (!audit) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-2xl font-bold">Audit Not Found</h2>
          <p className="text-gray-500 mb-4">The audit you are looking for doesn&apos;t exist or is not completed yet.</p>
          <Link to="/audits">
            <Button variant="outline">Back to Audits</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  // Extract non-compliant items
  const nonCompliantItems = audit.sections.flatMap(section =>
    section.items.filter(item => item.response === false)
  );

  const handleSubmitFeedback = () => {
    // For now, just simulate submission
    setFeedbackSubmitted(true);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">{audit.title}</h1>
          <Badge className={audit.status === "completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
            {audit.status === "completed" ? "Performed" : "In Review"}
          </Badge>
        </div>
        <p className="text-gray-500">{audit.description}</p>

        {nonCompliantItems.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Non-Conformities Analysis</CardTitle>
              <CardDescription>
                Summary of non-compliance items found during the audit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {nonCompliantItems.map(item => (
                  <li key={item.id}>
                    <strong>{item.question}</strong> {item.notes && ` - Notes: ${item.notes}`}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {nonCompliantItems.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Audit Results</CardTitle>
              <CardDescription>
                The audit has been completed successfully with no non-conformities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">All standards were met. No issues to report.</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Customer Feedback</CardTitle>
            <CardDescription>
              Please provide any comments or feedback related to the audit process.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter customer feedback here..."
              value={customerFeedback}
              onChange={(e) => setCustomerFeedback(e.target.value)}
              disabled={feedbackSubmitted}
              className="min-h-[120px]"
            />
          </CardContent>
          <CardFooter className="flex justify-end border-t pt-4">
            <Button
              onClick={handleSubmitFeedback}
              disabled={!customerFeedback.trim() || feedbackSubmitted}
              className="bg-brand-blue hover:bg-brand-blue-dark"
            >
              {feedbackSubmitted ? "Feedback Submitted" : "Submit Feedback"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Proposed Questionnaire Updates</CardTitle>
            <CardDescription>
              Suggestions and actions to rectify and improve audit questions based on feedback.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              Currently no proposed updates. Feedback will be reviewed to improve audit questionnaires.
            </p>
          </CardContent>
        </Card>

        <div>
          <Link to={`/audits/${audit.id}`} className="text-brand-blue hover:underline">
            Back to Audit Details
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default AuditPerformedPage;
