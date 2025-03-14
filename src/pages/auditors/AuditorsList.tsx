
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockAuditors, mockAudits } from "@/data/mockData";
import { Link } from "react-router-dom";
import { UserPlus, Search, Filter } from "lucide-react";
import { useState } from "react";
import { AuditorType } from "@/types";

const AuditorsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  
  const filteredAuditors = mockAuditors.filter(auditor => {
    const matchesSearch = auditor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          auditor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || auditor.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Get unique roles from auditors
  const roles = Array.from(new Set(mockAuditors.map(auditor => auditor.role)));

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Auditors</h1>
          <Link to="/auditors/new">
            <Button className="bg-brand-blue hover:bg-brand-blue-dark">
              <UserPlus className="mr-2 h-4 w-4" /> Add New Auditor
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Auditors</CardTitle>
            <CardDescription>
              Manage your team of food safety auditors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by name or email..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAuditors.length > 0 ? (
                filteredAuditors.map((auditor) => (
                  <AuditorCard 
                    key={auditor.id} 
                    auditor={auditor} 
                    auditCount={auditor.assignedAudits.length}
                  />
                ))
              ) : (
                <div className="md:col-span-2 lg:col-span-3 py-8 text-center text-gray-500">
                  No auditors found matching your filters
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

interface AuditorCardProps {
  auditor: AuditorType;
  auditCount: number;
}

const AuditorCard = ({ auditor, auditCount }: AuditorCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gray-50 pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white font-medium">
              {auditor.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <CardTitle className="text-lg">{auditor.name}</CardTitle>
              <CardDescription>{auditor.role}</CardDescription>
            </div>
          </div>
          <span className="text-sm font-medium bg-brand-blue-light/10 text-brand-blue px-2 py-1 rounded">
            {auditCount} {auditCount === 1 ? 'audit' : 'audits'}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2 text-sm">
          <p><span className="text-gray-500">Email:</span> {auditor.email}</p>
          {auditor.phone && <p><span className="text-gray-500">Phone:</span> {auditor.phone}</p>}
        </div>
        <div className="flex gap-2 mt-4">
          <Link to={`/auditors/${auditor.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">View</Button>
          </Link>
          <Link to={`/auditors/edit/${auditor.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">Edit</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuditorsList;
