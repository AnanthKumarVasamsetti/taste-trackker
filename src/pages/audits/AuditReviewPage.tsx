
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
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, MessageSquare, User, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import NonComplianceReport from "@/components/reports/NonComplianceReport";
import TechnicalReviewForm from "@/components/reports/TechnicalReviewForm";
import { toast } from "sonner";

// Dummy audits with "in-review" status for demonstration
const mockInReviewAudits = [
  {
    id: "audit-in1",
    title: "Kitchen Hygiene Audit - Restaurant A",
    description: "Comprehensive hygiene and safety compliance check in Restaurant A.",
    location: "Restaurant A - Main Kitchen",
    dueDate: new Date().toISOString(),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "in-review",
    auditorId: "auditor1",
    sections: [
      {
        id: "sec1",
        title: "Cleaning Procedures",
        items: [
          {
            id: "item1",
            question: "Are cleaning chemicals labeled and stored properly?",
            type: "yes-no",
            required: true,
            response: false,
            notes: "Chemicals were stored incorrectly under sink.",
          },
          {
            id: "item2",
            question: "Are cleaning schedules documented?",
            type: "yes-no",
            required: true,
            response: true,
          },
        ],
      },
    ],
    notes: "",
  },
  {
    id: "audit-in2",
    title: "Cold Storage Inspection - Warehouse",
    description: "Inspection of cold storage facilities for compliance with temperature regulation.",
    location: "Warehouse Cold Storage",
    dueDate: new Date().toISOString(),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "in-review",
    auditorId: "auditor2",
    sections: [
      {
        id: "sec2",
        title: "Temperature Control",
        items: [
          {
            id: "item3",
            question: "Is the temperature log up to date?",
            type: "yes-no",
            required: true,
            response: false,
            notes: "Missing two days of temperature logs.",
          },
        ],
      },
    ],
    notes: "",
  },
];

const mockAuditors = [
  {
    id: "auditor1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "555-1234",
    role: "Food Safety Specialist",
    assignedAudits: ["audit-in1"],
  },
  {
    id: "auditor2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    role: "Quality Assurance Auditor",
    assignedAudits: ["audit-in2"],
  },
];

const AuditReviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const [reviewNotes, setReviewNotes] = useState("");
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  // Find the audit with the id from the mockInReviewAudits
  const audit = id
    ? mockInReviewAudits.find((a) => a.id === id)
    : undefined;

  if (!audit) {
    // Show list of audits in review if no specific audit selected
    return (
      <MainLayout>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Audits In Review</h1>
          {mockInReviewAudits.length === 0 ? (
            <p className="text-gray-500">No audits currently in review.</p>
          ) : (
            <ul className="space-y-3">
              {mockInReviewAudits.map((audit) => (
                <li key={audit.id}>
                  <Link
                    to={`/audits/review/${audit.id}`}
                    className="block p-4 border rounded-md hover:bg-gray-50"
                  >
                    <h2 className="text-lg font-semibold">{audit.title}</h2>
                    <p className="text-gray-600 text-sm mb-1">{audit.description}</p>
                    <p className="text-gray-500 text-xs">
                      Due: {new Date(audit.dueDate).toLocaleDateString()}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </MainLayout>
    );
  }

  const auditor = audit.auditorId
    ? mockAuditors.find((a) => a.id === audit.auditorId)
    : null;

  const handleReviewSubmit = () => {
    if (!reviewNotes.trim()) {
      toast.error("Please add review comments before submitting.");
      return;
    }
    // Simulate review submission
    toast.success("Technical review submitted successfully!");
    setIsReviewSubmitted(true);
    setReviewNotes("");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{audit.title}</h1>
              <Badge className="bg-violet-100 text-violet-800">In Review</Badge>
            </div>
            <p className="text-gray-500 mt-1">
              Submitted {formatDistanceToNow(new Date(audit.updatedAt), { addSuffix: true })} by {auditor?.name || "Unknown"}
            </p>
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
                    <User className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Auditor</p>
                      <p className="font-medium">{auditor?.name || "Unassigned"}</p>
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
                  {(() => {
                    const nonCompliantItems = audit.sections.flatMap((section) =>
                      section.items.filter((item) => item.response === false)
                    );

                    return (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">Total issues found:</p>
                          <Badge className="bg-red-100 text-red-800">
                            {nonCompliantItems.length} Issue{nonCompliantItems.length !== 1 ? "s" : ""}
                          </Badge>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                          {nonCompliantItems.length > 0 ? (
                            nonCompliantItems.map((item, index) => {
                              const section = audit.sections.find((s) =>
                                s.items.some((i) => i.id === item.id)
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
                            <p className="text-center py-3 text-gray-500">No non-compliance issues found.</p>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reviewer's Notes</CardTitle>
                <CardDescription>Add your comments about this audit</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter your review notes here..."
                  className="min-h-[120px]"
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  disabled={isReviewSubmitted}
                />
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-end">
                <Button
                  className="bg-brand-blue hover:bg-brand-blue-dark gap-2"
                  disabled={!reviewNotes.trim() || isReviewSubmitted}
                  onClick={handleReviewSubmit}
                >
                  <MessageSquare className="h-4 w-4" />
                  {isReviewSubmitted ? "Review Submitted" : "Submit Review"}
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
              onReviewComplete={() => {
                toast.success("Technical review completed!");
                setIsReviewSubmitted(true);
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AuditReviewPage;
