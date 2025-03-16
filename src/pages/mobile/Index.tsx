
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockAudits, mockAuditors } from "@/data/mockData";
import { AuditType } from "@/types";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

const MobileIndex = () => {
  // For demo purposes, we'll assume the first auditor is logged in
  const currentAuditor = mockAuditors[0];
  const assignedAudits = mockAudits.filter(audit => 
    currentAuditor.assignedAudits.includes(audit.id)
  );
  
  const pendingAudits = assignedAudits.filter(audit => audit.status === "pending");
  const inProgressAudits = assignedAudits.filter(audit => audit.status === "in-progress");
  
  return (
    <MobileLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="font-semibold text-lg">Welcome, {currentAuditor.name}</h2>
          <p className="text-gray-500 text-sm">You have {assignedAudits.length} assigned audits</p>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Your Upcoming Audits</h3>
          
          {pendingAudits.length === 0 && inProgressAudits.length === 0 ? (
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <p className="text-gray-500">No pending audits</p>
            </div>
          ) : (
            <>
              {[...inProgressAudits, ...pendingAudits].slice(0, 3).map(audit => (
                <AuditCard key={audit.id} audit={audit} />
              ))}
              
              <Link to="/mobile/audits">
                <Button variant="outline" className="w-full">
                  View All Audits
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

interface AuditCardProps {
  audit: AuditType;
}

const AuditCard = ({ audit }: AuditCardProps) => {
  const navigate = useNavigate();
  
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
  
  const handleClick = () => {
    navigate(`/mobile/audits/${audit.id}`);
  };
  
  return (
    <Card className="shadow-sm" onClick={handleClick}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium">{audit.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(audit.status)}`}>
            {audit.status.replace('-', ' ')}
          </span>
        </div>
        
        <div className="text-sm space-y-2 text-gray-500">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{audit.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Due: {new Date(audit.dueDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>Last updated: {new Date(audit.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileIndex;
