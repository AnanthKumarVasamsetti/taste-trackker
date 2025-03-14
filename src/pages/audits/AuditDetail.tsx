
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockAudits, mockAuditors } from "@/data/mockData";
import { Link, useParams } from "react-router-dom";
import { ClipboardCheck, Calendar, MapPin, User, Clock } from "lucide-react";
import { AuditSectionType } from "@/types";

const AuditDetail = () => {
  const { id } = useParams<{ id: string }>();
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'in-progress':
        return 'bg-violet-100 text-violet-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{audit.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={getStatusColor(audit.status)}>
                {audit.status.replace('-', ' ')}
              </Badge>
              <span className="text-gray-500 text-sm">
                Created: {new Date(audit.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to={`/audits/edit/${audit.id}`}>
              <Button variant="outline">Edit Audit</Button>
            </Link>
            <Button className="bg-brand-blue hover:bg-brand-blue-dark">
              Generate Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Audit Details</CardTitle>
              <CardDescription>{audit.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Due Date</p>
                      <p className="font-medium">{new Date(audit.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{audit.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Assigned Auditor</p>
                      <p className="font-medium">{auditor ? auditor.name : "Unassigned"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-medium">{new Date(audit.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-6">
                  {audit.sections.map((section) => (
                    <AuditSection key={section.id} section={section} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Audit Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Sections Completed</span>
                    <span className="font-medium">{audit.status === 'completed' ? audit.sections.length : '0'}/{audit.sections.length}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-blue rounded-full" 
                      style={{ width: audit.status === 'completed' ? '100%' : audit.status === 'in-progress' ? '50%' : '0%' }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Assigned Auditor</CardTitle>
              </CardHeader>
              <CardContent>
                {auditor ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white font-medium">
                        {auditor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium">{auditor.name}</p>
                        <p className="text-sm text-gray-500">{auditor.role}</p>
                      </div>
                    </div>
                    <div className="text-sm space-y-2">
                      <p><span className="text-gray-500">Email:</span> {auditor.email}</p>
                      {auditor.phone && <p><span className="text-gray-500">Phone:</span> {auditor.phone}</p>}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 mb-4">No auditor assigned yet</p>
                    <Button variant="outline" size="sm">Assign Auditor</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

interface AuditSectionProps {
  section: AuditSectionType;
}

const AuditSection = ({ section }: AuditSectionProps) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b">
        <h3 className="font-medium flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-brand-blue" />
          {section.title}
        </h3>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {section.items.map((item, index) => (
            <div key={item.id} className={index < section.items.length - 1 ? "pb-4 border-b" : ""}>
              <p className="font-medium mb-2">{item.question}</p>
              {item.type === 'yes-no' && (
                <div className="flex gap-4">
                  <div className={`flex items-center gap-2 ${item.response === true ? 'text-brand-green font-medium' : ''}`}>
                    <div className={`w-4 h-4 rounded-full border ${item.response === true ? 'bg-brand-green border-brand-green' : 'border-gray-300'}`}></div>
                    <span>Yes</span>
                  </div>
                  <div className={`flex items-center gap-2 ${item.response === false ? 'text-red-500 font-medium' : ''}`}>
                    <div className={`w-4 h-4 rounded-full border ${item.response === false ? 'bg-red-500 border-red-500' : 'border-gray-300'}`}></div>
                    <span>No</span>
                  </div>
                </div>
              )}
              {item.response === undefined && (
                <p className="text-sm text-gray-500 italic">Not answered yet</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuditDetail;
