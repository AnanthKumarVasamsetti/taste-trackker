
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";
import { mockAudits, mockAuditors } from "@/data/mockData";
import { AuditType } from "@/types";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MobileAuditsList = () => {
  // For demo purposes, we'll assume the first auditor is logged in
  const currentAuditor = mockAuditors[0];
  const assignedAudits = mockAudits.filter(audit => 
    currentAuditor.assignedAudits.includes(audit.id)
  );
  
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredAudits = assignedAudits.filter(audit => 
    audit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    audit.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const pendingAudits = filteredAudits.filter(audit => audit.status === "pending");
  const inProgressAudits = filteredAudits.filter(audit => audit.status === "in-progress");
  const completedAudits = filteredAudits.filter(audit => audit.status === "completed");
  
  return (
    <MobileLayout title="My Audits">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input 
            placeholder="Search audits..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4 mt-4">
            {filteredAudits.length > 0 ? (
              filteredAudits.map(audit => (
                <AuditCard key={audit.id} audit={audit} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No audits found
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-4 mt-4">
            {pendingAudits.length > 0 ? (
              pendingAudits.map(audit => (
                <AuditCard key={audit.id} audit={audit} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No pending audits
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="in-progress" className="space-y-4 mt-4">
            {inProgressAudits.length > 0 ? (
              inProgressAudits.map(audit => (
                <AuditCard key={audit.id} audit={audit} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No audits in progress
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4 mt-4">
            {completedAudits.length > 0 ? (
              completedAudits.map(audit => (
                <AuditCard key={audit.id} audit={audit} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No completed audits
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

interface AuditCardProps {
  audit: AuditType;
}

const AuditCard = ({ audit }: AuditCardProps) => {
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
    <Link to={`/mobile/audits/${audit.id}`}>
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{audit.title}</h3>
              <p className="text-sm text-gray-500">{audit.location}</p>
              <p className="text-xs text-gray-400 mt-1">
                Due: {new Date(audit.dueDate).toLocaleDateString()}
              </p>
            </div>
            <Badge className={getStatusColor(audit.status)}>
              {audit.status.replace('-', ' ')}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MobileAuditsList;
