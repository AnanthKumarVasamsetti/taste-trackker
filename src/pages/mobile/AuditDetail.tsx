
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import MobileLayout from "@/components/layout/MobileLayout";
import { mockAudits } from "@/data/mockData";
import { AuditItemType, AuditSectionType } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MapPin, ArrowLeft, ClipboardCheck, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MobileAuditDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const audit = mockAudits.find(a => a.id === id);
  
  const [activeSection, setActiveSection] = useState(0);
  const [responses, setResponses] = useState<Record<string, Record<string, any>>>({});
  const [notes, setNotes] = useState("");
  
  if (!audit) {
    return (
      <MobileLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-xl font-bold">Audit Not Found</h2>
          <p className="text-gray-500 mb-4">The audit you're looking for doesn't exist or has been removed.</p>
          <Button variant="outline" onClick={() => navigate("/mobile/audits")}>
            Back to Audits
          </Button>
        </div>
      </MobileLayout>
    );
  }
  
  const handleResponseChange = (sectionId: string, itemId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [sectionId]: {
        ...(prev[sectionId] || {}),
        [itemId]: value
      }
    }));
  };
  
  const isCurrentSectionComplete = () => {
    if (!audit.sections[activeSection]) return true;
    
    const currentSection = audit.sections[activeSection];
    const currentResponses = responses[currentSection.id] || {};
    
    return currentSection.items.every(item => 
      !item.required || currentResponses[item.id] !== undefined
    );
  };
  
  const handleNext = () => {
    if (activeSection < audit.sections.length - 1) {
      setActiveSection(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevious = () => {
    if (activeSection > 0) {
      setActiveSection(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = () => {
    // In a real app, this would send the data to the server
    toast.success("Audit submitted successfully");
    navigate("/mobile/audits");
  };
  
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
  
  const currentSection = audit.sections[activeSection];
  const isLastSection = activeSection === audit.sections.length - 1;
  const allSectionsComplete = audit.sections.every((section, index) => {
    if (index > activeSection) return false;
    
    const sectionResponses = responses[section.id] || {};
    return section.items.every(item => 
      !item.required || sectionResponses[item.id] !== undefined
    );
  });
  
  return (
    <MobileLayout title="Audit Details">
      <div className="space-y-4">
        <Button 
          variant="ghost" 
          className="px-0" 
          onClick={() => navigate("/mobile/audits")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Audits
        </Button>
        
        <div>
          <h1 className="text-xl font-bold">{audit.title}</h1>
          <Badge className={`mt-1 ${getStatusColor(audit.status)}`}>
            {audit.status.replace('-', ' ')}
          </Badge>
          <p className="text-sm text-gray-500 mt-2">{audit.description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {audit.location}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Due: {new Date(audit.dueDate).toLocaleDateString()}
          </div>
        </div>
        
        <Separator />
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Progress</h2>
            <span className="text-sm text-gray-500">
              Section {activeSection + 1} of {audit.sections.length}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-brand-blue h-2.5 rounded-full" 
              style={{ width: `${((activeSection) / audit.sections.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {audit.sections.map((section, index) => (
              <div
                key={section.id}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium cursor-pointer
                  ${index === activeSection 
                    ? 'bg-brand-blue text-white' 
                    : index < activeSection 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'}`}
                onClick={() => setActiveSection(index)}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <ClipboardCheck className="h-5 w-5 mr-2 text-brand-blue" />
              {currentSection.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {currentSection.items.map((item) => (
                <AuditItem 
                  key={item.id} 
                  item={item} 
                  response={responses[currentSection.id]?.[item.id]}
                  onChange={(value) => handleResponseChange(currentSection.id, item.id, value)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        
        {isLastSection && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Add any additional notes or observations here..."
                className="min-h-[120px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-between pt-4 pb-8">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={activeSection === 0}
          >
            Previous
          </Button>
          
          {!isLastSection ? (
            <Button 
              onClick={handleNext} 
              disabled={!isCurrentSectionComplete()}
            >
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={!allSectionsComplete}
              className="bg-green-600 hover:bg-green-700"
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Audit
            </Button>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

interface AuditItemProps {
  item: AuditItemType;
  response: any;
  onChange: (value: any) => void;
}

const AuditItem = ({ item, response, onChange }: AuditItemProps) => {
  const [notes, setNotes] = useState<string>("");
  
  return (
    <div className="border-b pb-4">
      <div className="flex items-start mb-2">
        <p className="font-medium">
          {item.question} 
          {item.required && <span className="text-red-500">*</span>}
        </p>
      </div>
      
      {item.type === 'yes-no' && (
        <div className="flex gap-4 mt-3">
          <div 
            className={`flex items-center gap-2 cursor-pointer ${response === true ? 'text-brand-green font-medium' : ''}`}
            onClick={() => onChange(true)}
          >
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center
              ${response === true ? 'bg-brand-green border-brand-green' : 'border-gray-300'}`}>
              {response === true && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
            <span>Yes</span>
          </div>
          <div 
            className={`flex items-center gap-2 cursor-pointer ${response === false ? 'text-red-500 font-medium' : ''}`}
            onClick={() => onChange(false)}
          >
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center
              ${response === false ? 'bg-red-500 border-red-500' : 'border-gray-300'}`}>
              {response === false && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
            <span>No</span>
          </div>
        </div>
      )}
      
      {item.type === 'text' && (
        <Textarea 
          placeholder="Enter your response..."
          className="mt-2"
          value={response || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      
      {item.type === 'numeric' && (
        <Input 
          type="number"
          placeholder="Enter a number..."
          className="mt-2"
          value={response || ''}
          onChange={(e) => onChange(parseFloat(e.target.value))}
        />
      )}
      
      {item.type === 'multiple-choice' && item.options && (
        <div className="space-y-2 mt-3">
          {item.options.map((option, index) => (
            <div 
              key={index}
              className={`flex items-center gap-2 p-2 border rounded cursor-pointer
                ${response === option ? 'border-brand-blue bg-blue-50' : 'border-gray-200'}`}
              onClick={() => onChange(option)}
            >
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center
                ${response === option ? 'border-brand-blue' : 'border-gray-300'}`}>
                {response === option && <div className="w-2 h-2 bg-brand-blue rounded-full"></div>}
              </div>
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}
      
      {response !== undefined && (
        <div className="mt-3">
          <p className="text-sm text-gray-500 mb-1">Additional notes (optional)</p>
          <Textarea 
            placeholder="Add any notes about this question..."
            className="text-sm"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default MobileAuditDetail;
