
import { Button } from "@/components/ui/button";
import { Plus, ClipboardList } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { type AuditSectionType } from "@/types";
import AuditSection from "./AuditSection";

interface AuditSectionsFormProps {
  sections: AuditSectionType[];
  onUpdateSectionTitle: (index: number, title: string) => void;
  onUpdateItemQuestion: (sectionIndex: number, itemIndex: number, question: string) => void;
  onUpdateItemType: (sectionIndex: number, itemIndex: number, type: string) => void;
  onRemoveSection: (index: number) => void;
  onAddSection: () => void;
  onAddItem: (sectionIndex: number) => void;
  onRemoveItem: (sectionIndex: number, itemIndex: number) => void;
  onSubmit: () => void;
}

const AuditSectionsForm = ({
  sections,
  onUpdateSectionTitle,
  onUpdateItemQuestion,
  onUpdateItemType,
  onRemoveSection,
  onAddSection,
  onAddItem,
  onRemoveItem,
  onSubmit,
}: AuditSectionsFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Sections</CardTitle>
        <CardDescription>Edit sections and questions in your audit</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <AuditSection
            key={section.id}
            section={section}
            sectionIndex={sectionIndex}
            onUpdateSectionTitle={onUpdateSectionTitle}
            onUpdateItemQuestion={onUpdateItemQuestion}
            onUpdateItemType={onUpdateItemType}
            onRemoveSection={onRemoveSection}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
            sectionsLength={sections.length}
          />
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={onAddSection}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" /> Add New Section
        </Button>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link to="/audits">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button onClick={onSubmit} className="bg-brand-blue hover:bg-brand-blue-dark">
          <ClipboardList className="mr-2 h-4 w-4" /> Update Audit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuditSectionsForm;
