
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Plus, Trash2 } from "lucide-react";
import { type AuditSectionType } from "@/types";

interface AuditSectionProps {
  section: AuditSectionType;
  sectionIndex: number;
  onUpdateSectionTitle: (index: number, title: string) => void;
  onUpdateItemQuestion: (sectionIndex: number, itemIndex: number, question: string) => void;
  onUpdateItemType: (sectionIndex: number, itemIndex: number, type: string) => void;
  onRemoveSection: (index: number) => void;
  onAddItem: (sectionIndex: number) => void;
  onRemoveItem: (sectionIndex: number, itemIndex: number) => void;
  sectionsLength: number;
}

const AuditSection = ({
  section,
  sectionIndex,
  onUpdateSectionTitle,
  onUpdateItemQuestion,
  onUpdateItemType,
  onRemoveSection,
  onAddItem,
  onRemoveItem,
  sectionsLength,
}: AuditSectionProps) => {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Input
          className="max-w-md"
          placeholder="Section Title"
          value={section.title}
          onChange={(e) => onUpdateSectionTitle(sectionIndex, e.target.value)}
        />
        {sectionsLength > 1 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onRemoveSection(sectionIndex)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        )}
      </div>

      <div className="space-y-4 pl-4 border-l-2 border-gray-200">
        {section.items.map((item, itemIndex) => (
          <div key={item.id} className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-7">
              <FormItem>
                <FormLabel className="text-sm">Question</FormLabel>
                <Input
                  placeholder="Enter your question"
                  value={item.question}
                  onChange={(e) => onUpdateItemQuestion(sectionIndex, itemIndex, e.target.value)}
                />
              </FormItem>
            </div>
            <div className="lg:col-span-3">
              <FormItem>
                <FormLabel className="text-sm">Response Type</FormLabel>
                <Select
                  value={item.type}
                  onValueChange={(value) => onUpdateItemType(sectionIndex, itemIndex, value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes-no">Yes/No</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="numeric">Numeric</SelectItem>
                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            </div>
            <div className="lg:col-span-2 flex items-end space-x-2 h-full">
              {section.items.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveItem(sectionIndex, itemIndex)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              )}
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onAddItem(sectionIndex)}
          className="mt-2"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Question
        </Button>
      </div>
    </div>
  );
};

export default AuditSection;
