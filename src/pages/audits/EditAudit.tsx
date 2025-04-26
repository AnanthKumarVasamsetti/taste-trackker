
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MainLayout from "@/components/layout/MainLayout";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { mockAudits } from "@/data/mockData";
import BasicInfoForm, { basicInfoFormSchema } from "@/components/audits/edit/BasicInfoForm";
import AuditSectionsForm from "@/components/audits/edit/AuditSectionsForm";
import { type AuditSectionType } from "@/types";

const EditAudit = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const audit = mockAudits.find(a => a.id === id);

  if (!audit || audit.status !== 'pending') {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-2xl font-bold">Audit Not Found or Not Editable</h2>
          <p className="text-gray-500 mb-4">This audit either doesn't exist or is no longer in a pending state.</p>
          <Link to="/audits">
            <Button variant="outline">Back to Audits</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const [sections, setSections] = useState<AuditSectionType[]>(audit.sections);

  const form = useForm<z.infer<typeof basicInfoFormSchema>>({
    resolver: zodResolver(basicInfoFormSchema),
    defaultValues: {
      title: audit.title,
      description: audit.description,
      location: audit.location,
      dueDate: new Date(audit.dueDate),
      auditorId: audit.auditorId || "",
    },
  });

  const updateSectionTitle = (index: number, title: string) => {
    const newSections = [...sections];
    newSections[index].title = title;
    setSections(newSections);
  };

  const updateItemQuestion = (sectionIndex: number, itemIndex: number, question: string) => {
    const newSections = [...sections];
    newSections[sectionIndex].items[itemIndex].question = question;
    setSections(newSections);
  };

  const updateItemType = (sectionIndex: number, itemIndex: number, type: string) => {
    const newSections = [...sections];
    newSections[sectionIndex].items[itemIndex].type = type as "yes-no" | "multiple-choice" | "text" | "numeric";
    setSections(newSections);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const addSection = () => {
    setSections([...sections, { 
      id: `new-section-${sections.length}`,
      title: "", 
      items: [{ 
        id: `new-item-${Date.now()}`,
        question: "", 
        type: "yes-no", 
        required: true 
      }] 
    }]);
  };

  const addItem = (sectionIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].items.push({ 
      id: `new-item-${Date.now()}`,
      question: "", 
      type: "yes-no", 
      required: true 
    });
    setSections(newSections);
  };

  const removeItem = (sectionIndex: number, itemIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].items = newSections[sectionIndex].items.filter((_, i) => i !== itemIndex);
    setSections(newSections);
  };

  const handleSubmit = (values: z.infer<typeof basicInfoFormSchema>) => {
    const hasEmptySections = sections.some(section => !section.title.trim());
    const hasEmptyItems = sections.some(section => 
      section.items.some(item => !item.question.trim())
    );

    if (hasEmptySections) {
      toast({
        title: "Validation Error",
        description: "All section titles must be filled out",
        variant: "destructive",
      });
      return;
    }

    if (hasEmptyItems) {
      toast({
        title: "Validation Error",
        description: "All questions must be filled out",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Audit Updated",
      description: "The audit has been successfully updated",
    });

    navigate(`/audits/${id}`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Edit Audit</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <BasicInfoForm form={form} defaultValues={form.getValues()} />
            <AuditSectionsForm
              sections={sections}
              onUpdateSectionTitle={updateSectionTitle}
              onUpdateItemQuestion={updateItemQuestion}
              onUpdateItemType={updateItemType}
              onRemoveSection={removeSection}
              onAddSection={addSection}
              onAddItem={addItem}
              onRemoveItem={removeItem}
              onSubmit={form.handleSubmit(handleSubmit)}
            />
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};

export default EditAudit;
