
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockAuditors } from "@/data/mockData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CalendarIcon, Plus, Trash2, ClipboardList } from "lucide-react";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const CreateAudit = () => {
  const { toast } = useToast();
  const [sections, setSections] = useState<{ title: string; items: { question: string; type: string; required: boolean }[] }[]>([
    { 
      title: "General Information", 
      items: [
        { question: "Is the facility clean and organized?", type: "yes-no", required: true }
      ] 
    }
  ]);

  const formSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters" }),
    description: z.string().min(10, { message: "Description must be at least 10 characters" }),
    location: z.string().min(3, { message: "Location is required" }),
    dueDate: z.date({ required_error: "Due date is required" }),
    auditorId: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      auditorId: "",
    },
  });

  const addSection = () => {
    setSections([...sections, { 
      title: "", 
      items: [{ question: "", type: "yes-no", required: true }] 
    }]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const addItem = (sectionIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].items.push({ question: "", type: "yes-no", required: true });
    setSections(newSections);
  };

  const removeItem = (sectionIndex: number, itemIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].items = newSections[sectionIndex].items.filter((_, i) => i !== itemIndex);
    setSections(newSections);
  };

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
    newSections[sectionIndex].items[itemIndex].type = type;
    setSections(newSections);
  };

  const updateItemRequired = (sectionIndex: number, itemIndex: number, required: boolean) => {
    const newSections = [...sections];
    newSections[sectionIndex].items[itemIndex].required = required;
    setSections(newSections);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Validate sections
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

    // Here you would normally submit data to backend
    // For now we'll just show success toast
    toast({
      title: "Audit Created",
      description: "The audit has been successfully created",
    });

    console.log("Form values:", values);
    console.log("Sections:", sections);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Create New Audit</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details for this audit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Audit Title</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., Quarterly Restaurant Inspection" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide a brief description of the audit purpose and scope" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., 123 Main St, New York, NY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Due Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Select a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="auditorId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assign Auditor (Optional)</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an auditor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">Unassigned</SelectItem>
                          {mockAuditors.map(auditor => (
                            <SelectItem key={auditor.id} value={auditor.id}>
                              {auditor.name} - {auditor.role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        You can leave this unassigned and assign an auditor later
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit Sections</CardTitle>
                <CardDescription>Create sections and add questions to your audit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <Input
                        className="max-w-md"
                        placeholder="Section Title"
                        value={section.title}
                        onChange={(e) => updateSectionTitle(sectionIndex, e.target.value)}
                      />
                      {sections.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSection(sectionIndex)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-4 pl-4 border-l-2 border-gray-200">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                          <div className="lg:col-span-7">
                            <FormItem>
                              <FormLabel className="text-sm">Question</FormLabel>
                              <Input
                                placeholder="Enter your question"
                                value={item.question}
                                onChange={(e) => updateItemQuestion(sectionIndex, itemIndex, e.target.value)}
                              />
                            </FormItem>
                          </div>
                          <div className="lg:col-span-3">
                            <FormItem>
                              <FormLabel className="text-sm">Response Type</FormLabel>
                              <Select
                                value={item.type}
                                onValueChange={(value) => updateItemType(sectionIndex, itemIndex, value)}
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
                                onClick={() => removeItem(sectionIndex, itemIndex)}
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
                        onClick={() => addItem(sectionIndex)}
                        className="mt-2"
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Question
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addSection}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add New Section
                </Button>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link to="/audits">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" className="bg-brand-blue hover:bg-brand-blue-dark">
                  <ClipboardList className="mr-2 h-4 w-4" /> Create Audit
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};

export default CreateAudit;
