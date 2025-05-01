
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, CheckCircle2, Clock, MapPin, User, FileText, AlertTriangle, Edit } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { mockAudits, mockAuditors } from "@/data/mockData";
import { toast } from "sonner";
import { AuditItemType, AuditSectionType } from "@/types";

const MobileAuditDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [responses, setResponses] = useState<Record<string, string | boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  
  const audit = mockAudits.find(a => a.id === id);
  
  if (!audit) {
    return (
      <MobileLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-xl font-bold">Audit Not Found</h2>
          <p className="text-gray-500 mb-4">The audit you're looking for doesn't exist.</p>
          <Link to="/mobile/audits">
            <Button variant="outline">Back to Audits</Button>
          </Link>
        </div>
      </MobileLayout>
    );
  }

  const auditor = audit.auditorId ? mockAuditors.find(a => a.id === audit.auditorId) : null;
  
  const handleItemResponse = (itemId: string, value: string | boolean) => {
    setResponses(prev => ({
      ...prev,
      [itemId]: value
    }));
  };
  
  const handleItemNotes = (itemId: string, value: string) => {
    setNotes(prev => ({
      ...prev,
      [itemId]: value
    }));
  };
  
  const nextSection = () => {
    if (activeSection < audit.sections.length - 1) {
      setActiveSection(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevSection = () => {
    if (activeSection > 0) {
      setActiveSection(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmitAudit = () => {
    setIsSubmitting(true);
    
    // Simulating API call
    setTimeout(() => {
      toast.success("Audit submitted successfully!");
      setIsSubmitting(false);
    }, 1500);
  };
  
  const getStatusBadge = (status: string) => {
    const baseClasses = "text-xs rounded-full px-2 py-1";
    switch (status) {
      case 'pending':
        return `${baseClasses} bg-amber-100 text-amber-800`;
      case 'in-progress':
        return `${baseClasses} bg-violet-100 text-violet-800`;
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'in-review':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };
  
  const activeProgressPercentage = ((activeSection + 1) / audit.sections.length) * 100;
  
  const nonCompliantCount = (audit.status === 'completed' || audit.status === 'in-review') ? Object.values(responses).filter(response => response === false).length : 0;
  
  // Determine if the audit is editable
  const isEditable = audit.status === 'pending';
  
  return (
    <MobileLayout>
      <div className="p-4 pb-24">
        <div className="flex justify-between items-center mb-4">
          <Link to="/mobile/audits" className="flex items-center text-gray-600">
            <ChevronLeft className="h-5 w-5 mr-1" /> Back
          </Link>
          <span className={getStatusBadge(audit.status)}>
            {audit.status.replace('-', ' ')}
          </span>
        </div>
        
        <h1 className="text-xl font-bold mb-2">{audit.title}</h1>
        <p className="text-gray-600 text-sm mb-4">{audit.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Due Date</p>
              <p className="text-sm">{new Date(audit.dueDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gray-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm">{audit.location}</p>
            </div>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 text-gray-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Auditor</p>
              <p className="text-sm">{auditor?.name || "Unassigned"}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FileText className="h-4 w-4 text-gray-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Sections</p>
              <p className="text-sm">{audit.sections.length}</p>
            </div>
          </div>
        </div>
        
        {isEditable && (
          <Link to={`/mobile/audits/edit/${audit.id}`} className="w-full">
            <Button variant="outline" className="w-full mb-4 flex items-center justify-center">
              <Edit className="h-4 w-4 mr-2" /> Edit Audit Details
            </Button>
          </Link>
        )}
        
        <div className="mb-6">
          <div className="bg-gray-100 h-2 rounded-full mb-2">
            <div 
              className="bg-brand-blue h-full rounded-full transition-all duration-300"
              style={{ width: `${activeProgressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Section {activeSection + 1} of {audit.sections.length}</span>
            <span>{Math.round(activeProgressPercentage)}% complete</span>
          </div>
        </div>
        
        {(audit.status === 'in-review') && nonCompliantCount > 0 && (
          <div className="mb-6 border border-red-200 rounded-lg p-4 bg-red-50">
            <div className="flex items-start gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-800">Non-Compliance Issues Detected</h3>
                <p className="text-sm text-red-700">
                  {nonCompliantCount} issues require attention
                </p>
              </div>
            </div>
            <Link to={`/mobile/audits/${id}/non-compliance`}>
              <Button variant="outline" size="sm" className="w-full mt-2 border-red-200 text-red-800">
                <FileText className="h-4 w-4 mr-2" />
                View Non-Compliance Report
              </Button>
            </Link>
          </div>
        )}
        
        <Separator className="my-4" />
        
        <AuditSection 
          section={audit.sections[activeSection]} 
          responses={responses}
          notes={notes}
          onResponseChange={handleItemResponse}
          onNotesChange={handleItemNotes}
          auditStatus={audit.status}
        />
      
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between space-x-4">
          <Button 
            variant="outline" 
            onClick={prevSection}
            disabled={activeSection === 0}
            className="flex-1"
          >
            Previous
          </Button>
          
          {activeSection < audit.sections.length - 1 ? (
            <Button 
              onClick={nextSection}
              className="bg-brand-blue hover:bg-brand-blue-dark flex-1"
            >
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleSubmitAudit}
              disabled={isSubmitting || audit.status === 'completed'}
              className="bg-green-600 hover:bg-green-700 flex-1"
            >
              {isSubmitting ? "Submitting..." : "Submit Audit"}
            </Button>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

interface AuditSectionProps {
  section: AuditSectionType;
  responses: Record<string, string | boolean>;
  notes: Record<string, string>;
  onResponseChange: (itemId: string, value: string | boolean) => void;
  onNotesChange: (itemId: string, value: string) => void;
  auditStatus: string;
}

const AuditSection = ({ 
  section, 
  responses, 
  notes,
  onResponseChange,
  onNotesChange,
  auditStatus
}: AuditSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">{section.title}</h2>
      
      {section.items.map((item) => (
        <AuditItem 
          key={item.id} 
          item={item}
          response={responses[item.id]}
          notes={notes[item.id] || ""}
          onResponseChange={(value) => onResponseChange(item.id, value)}
          onNotesChange={(value) => onNotesChange(item.id, value)}
          auditStatus={auditStatus}
        />
      ))}
    </div>
  );
};

interface AuditItemProps {
  item: AuditItemType;
  response?: string | boolean;
  notes: string;
  onResponseChange: (value: string | boolean) => void;
  onNotesChange: (value: string) => void;
  auditStatus: string;
}

const AuditItem = ({ 
  item,
  response,
  notes,
  onResponseChange,
  onNotesChange,
  auditStatus
}: AuditItemProps) => {
  const isCompleted = auditStatus === 'completed' || auditStatus === 'in-review';
  const isEditable = auditStatus === 'in-progress';
  
  return (
    <div className="border rounded-lg p-4">
      <p className="font-medium mb-3">
        {item.question}
        {item.required && <span className="text-red-500">*</span>}
      </p>
      
      {item.type === 'yes-no' && isEditable && (
        <div className="flex space-x-4 mb-4">
          <Button
            type="button"
            variant={response === true ? "default" : "outline"}
            size="sm"
            onClick={() => onResponseChange(true)}
            className={response === true ? "bg-green-600 hover:bg-green-700" : ""}
          >
            Yes
          </Button>
          <Button
            type="button"
            variant={response === false ? "default" : "outline"}
            size="sm"
            onClick={() => onResponseChange(false)}
            className={response === false ? "bg-red-600 hover:bg-red-700" : ""}
          >
            No
          </Button>
        </div>
      )}
      
      {item.type === 'yes-no' && isCompleted && (
        <div className="flex space-x-4 mb-4">
          <div className={`flex items-center gap-2 ${item.response === true ? 'text-brand-green font-medium' : ''}`}>
            <div className={`w-4 h-4 rounded-full border ${item.response === true ? 'bg-green-600 border-green-600' : 'border-gray-300'}`}></div>
            <span>Yes</span>
          </div>
          <div className={`flex items-center gap-2 ${item.response === false ? 'text-red-500 font-medium' : ''}`}>
            <div className={`w-4 h-4 rounded-full border ${item.response === false ? 'bg-red-600 border-red-600' : 'border-gray-300'}`}></div>
            <span>No</span>
          </div>
        </div>
      )}
      
      {item.type === 'yes-no' && !isCompleted && !isEditable && (
        <div className="flex space-x-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border border-gray-300"></div>
            <span>Yes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border border-gray-300"></div>
            <span>No</span>
          </div>
        </div>
      )}
      
      {item.type === 'multiple-choice' && isEditable && item.options && (
        <div className="space-y-2 mb-4">
          {item.options.map((option, idx) => (
            <Button
              key={idx}
              type="button"
              variant={response === option ? "default" : "outline"}
              size="sm"
              onClick={() => onResponseChange(option)}
              className="mr-2 mb-2"
            >
              {option}
            </Button>
          ))}
        </div>
      )}
      
      {item.type === 'multiple-choice' && !isEditable && item.options && (
        <div className="space-y-2 mb-4">
          {item.options.map((option, idx) => (
            <Button
              key={idx}
              type="button"
              variant="outline"
              size="sm"
              disabled={true}
              className="mr-2 mb-2"
            >
              {option}
            </Button>
          ))}
        </div>
      )}
      
      {item.type === 'text' && isEditable && (
        <Textarea
          value={response as string || ""}
          onChange={(e) => onResponseChange(e.target.value)}
          placeholder="Enter your response"
          className="mb-4"
        />
      )}
      
      {item.type === 'text' && !isEditable && (
        <Textarea
          value=""
          disabled={true}
          placeholder="No response provided"
          className="mb-4 bg-gray-50"
        />
      )}
      
      {item.type === 'numeric' && isEditable && (
        <Input
          type="number"
          value={response as string || ""}
          onChange={(e) => onResponseChange(e.target.value)}
          placeholder="Enter a number"
          className="mb-4"
        />
      )}
      
      {item.type === 'numeric' && !isEditable && (
        <Input
          type="number"
          value=""
          disabled={true}
          placeholder="No value entered"
          className="mb-4 bg-gray-50"
        />
      )}
      
      {(isCompleted || isEditable) && (
        <div>
          <p className="text-sm text-gray-600 mb-2">Additional Notes {isEditable && "(optional)"}</p>
          {isEditable ? (
            <Textarea
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              placeholder="Add notes here..."
              rows={2}
            />
          ) : (
            <div className="bg-gray-50 p-3 rounded text-sm">
              {item.notes || "No notes provided"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileAuditDetail;
