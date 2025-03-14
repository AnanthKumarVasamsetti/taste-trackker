
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ClipboardList, Search, Filter } from "lucide-react";
import { useState } from "react";
import { AuditType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchAudits, fetchAuditors } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";

const AuditsList = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Fetch audits
  const { data: audits, isLoading: auditsLoading, error: auditsError } = useQuery({
    queryKey: ['audits'],
    queryFn: fetchAudits
  });

  // Fetch auditors for display
  const { data: auditors, isLoading: auditorsLoading } = useQuery({
    queryKey: ['auditors'],
    queryFn: fetchAuditors
  });

  // Show toast on error
  if (auditsError) {
    toast({
      title: "Error loading audits",
      description: "There was a problem loading the audits. Please try again.",
      variant: "destructive",
    });
  }

  // Filter audits based on search term and status
  const filteredAudits = audits?.filter(audit => {
    const matchesSearch = audit.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          audit.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || audit.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const getAuditorName = (auditorId?: string) => {
    if (!auditorId) return "Unassigned";
    const auditor = auditors?.find(auditor => auditor.id === auditorId);
    return auditor ? auditor.name : "Unknown";
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Audits</h1>
          <Link to="/audits/new">
            <Button className="bg-brand-blue hover:bg-brand-blue-dark">
              <ClipboardList className="mr-2 h-4 w-4" /> Create New Audit
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Audits</CardTitle>
            <CardDescription>
              View and manage all food safety audits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search audits..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Audit Title</th>
                    <th className="text-left py-3 px-4 font-medium">Location</th>
                    <th className="text-left py-3 px-4 font-medium">Due Date</th>
                    <th className="text-left py-3 px-4 font-medium">Auditor</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-right py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {auditsLoading ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        Loading audits...
                      </td>
                    </tr>
                  ) : filteredAudits.length > 0 ? (
                    filteredAudits.map((audit) => (
                      <AuditRow 
                        key={audit.id} 
                        audit={audit} 
                        auditorName={getAuditorName(audit.auditorId)} 
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        No audits found matching your filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

interface AuditRowProps {
  audit: AuditType;
  auditorName: string;
}

const AuditRow = ({ audit, auditorName }: AuditRowProps) => {
  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs";
    switch (status) {
      case 'pending':
        return `${baseClasses} bg-amber-100 text-amber-800`;
      case 'in-progress':
        return `${baseClasses} bg-violet-100 text-violet-800`;
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4">
        <Link to={`/audits/${audit.id}`} className="font-medium text-brand-blue hover:underline">
          {audit.title}
        </Link>
      </td>
      <td className="py-3 px-4 text-gray-600">{audit.location}</td>
      <td className="py-3 px-4 text-gray-600">{new Date(audit.dueDate).toLocaleDateString()}</td>
      <td className="py-3 px-4 text-gray-600">{auditorName}</td>
      <td className="py-3 px-4">
        <span className={getStatusBadge(audit.status)}>
          {audit.status.replace('-', ' ')}
        </span>
      </td>
      <td className="py-3 px-4 text-right">
        <div className="flex justify-end gap-2">
          <Link to={`/audits/${audit.id}`}>
            <Button variant="outline" size="sm">View</Button>
          </Link>
          <Link to={`/audits/edit/${audit.id}`}>
            <Button variant="outline" size="sm">Edit</Button>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default AuditsList;
