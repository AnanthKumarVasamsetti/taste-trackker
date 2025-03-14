
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockAudits, mockAuditors } from "@/data/mockData";
import { Link } from "react-router-dom";
import { ClipboardCheck, ClipboardList, UserCheck, Calendar } from "lucide-react";
import { AuditType } from "@/types";

const Index = () => {
  const pendingAudits = mockAudits.filter(audit => audit.status === "pending");
  const inProgressAudits = mockAudits.filter(audit => audit.status === "in-progress");
  const completedAudits = mockAudits.filter(audit => audit.status === "completed");
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <Link to="/audits/new">
            <Button className="bg-brand-blue hover:bg-brand-blue-dark">
              <ClipboardList className="mr-2 h-4 w-4" /> Create New Audit
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard 
            title="Total Audits" 
            value={mockAudits.length.toString()} 
            icon={<ClipboardCheck className="h-6 w-6 text-brand-blue" />}
          />
          <DashboardCard 
            title="Pending" 
            value={pendingAudits.length.toString()} 
            icon={<Calendar className="h-6 w-6 text-amber-500" />}
          />
          <DashboardCard 
            title="In Progress" 
            value={inProgressAudits.length.toString()} 
            icon={<ClipboardList className="h-6 w-6 text-violet-500" />}
          />
          <DashboardCard 
            title="Completed" 
            value={completedAudits.length.toString()} 
            icon={<ClipboardCheck className="h-6 w-6 text-brand-green" />}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recent Audits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAudits.slice(0, 3).map(audit => (
                  <AuditListItem key={audit.id} audit={audit} />
                ))}
                <div className="text-center pt-2">
                  <Link to="/audits">
                    <Button variant="outline">View All Audits</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Auditors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAuditors.map(auditor => (
                  <div key={auditor.id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 rounded-full p-2">
                        <UserCheck className="h-5 w-5 text-brand-blue" />
                      </div>
                      <div>
                        <p className="font-medium">{auditor.name}</p>
                        <p className="text-sm text-gray-500">{auditor.role}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {auditor.assignedAudits.length} {auditor.assignedAudits.length === 1 ? 'audit' : 'audits'}
                    </div>
                  </div>
                ))}
                <div className="text-center pt-2">
                  <Link to="/auditors">
                    <Button variant="outline">Manage Auditors</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const DashboardCard = ({ title, value, icon }: DashboardCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};

interface AuditListItemProps {
  audit: AuditType;
}

const AuditListItem = ({ audit }: AuditListItemProps) => {
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
    <div className="flex items-center gap-4 border-b pb-3">
      <div className="flex-1">
        <Link to={`/audits/${audit.id}`} className="font-medium hover:text-brand-blue">
          {audit.title}
        </Link>
        <p className="text-sm text-gray-500">{audit.location}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(audit.status)}`}>
          {audit.status.replace('-', ' ')}
        </span>
        <p className="text-sm text-gray-500">Due: {new Date(audit.dueDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Index;
