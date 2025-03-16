
import React from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import { mockAuditors } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, Mail, Phone, LogOut, User } from "lucide-react";

const MobileProfile = () => {
  // For demo purposes, we'll assume the first auditor is logged in
  const currentAuditor = mockAuditors[0];
  
  return (
    <MobileLayout title="Profile">
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 text-center shadow-sm">
          <div className="w-20 h-20 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-2xl mx-auto">
            {currentAuditor.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h2 className="text-xl font-bold mt-4">{currentAuditor.name}</h2>
          <Badge className="mt-2">{currentAuditor.role}</Badge>
          
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-center justify-center text-gray-600">
              <Mail className="h-4 w-4 mr-2" />
              <span>{currentAuditor.email}</span>
            </div>
            {currentAuditor.phone && (
              <div className="flex items-center justify-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span>{currentAuditor.phone}</span>
              </div>
            )}
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <ClipboardCheck className="h-5 w-5 mr-2 text-brand-blue" />
              Audit Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-2xl font-bold text-brand-blue">{currentAuditor.assignedAudits.length}</p>
                <p className="text-xs text-gray-500">Total Audits</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-2xl font-bold text-amber-500">1</p>
                <p className="text-xs text-gray-500">In Progress</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-2xl font-bold text-green-500">1</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <User className="h-5 w-5 mr-2 text-brand-blue" />
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Notification Settings
            </Button>
            
            <Separator />
            
            <Button variant="destructive" className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default MobileProfile;
