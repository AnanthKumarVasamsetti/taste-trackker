
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AuditType } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

interface NonComplianceReportProps {
  audit: AuditType;
}

interface EditableItem extends Omit<AuditType["sections"][0]["items"][0], "notes"> {
  sectionTitle: string;
  notes: string;
}

const NonComplianceReport: React.FC<NonComplianceReportProps> = ({ audit }) => {
  // Prepare editable state for all non-compliant items
  const nonCompliantItemsInitial = audit.sections.flatMap((section) => {
    return section.items
      .filter((item) => item.response === false)
      .map((item) => ({
        sectionTitle: section.title,
        ...item,
        notes: item.notes || "",
      }));
  });

  const [items, setItems] = useState<EditableItem[]>(nonCompliantItemsInitial);

  // Handler for response change (score)
  const handleResponseChange = (id: string, value: boolean) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, response: value } : item
      )
    );
  };

  // Handler for notes change
  const handleNotesChange = (id: string, value: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, notes: value } : item
      )
    );
  };

  return (
    <Card className="border-red-200">
      <CardHeader className="bg-red-50 border-b border-red-200">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Non-Compliance Report</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              {audit.title} • {audit.location} •{" "}
              {formatDistanceToNow(new Date(audit.updatedAt), {
                addSuffix: true,
              })}
            </p>
          </div>
          <Badge className="bg-red-100 text-red-800">
            {items.length} Issue{items.length !== 1 ? "s" : ""}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {items.length > 0 ? (
          <div className="space-y-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Issue Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="w-32">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{item.question}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.sectionTitle}</Badge>
                    </TableCell>
                    <TableCell>
                      <RadioGroup
                        value={item.response ? "yes" : "no"}
                        onValueChange={(value) =>
                          handleResponseChange(item.id, value === "yes")
                        }
                        className="flex space-x-2"
                        aria-label={`Edit compliance status for issue #${index + 1}`}
                      >
                        <label className="flex items-center space-x-1 cursor-pointer">
                          <RadioGroupItem value="yes" id={`${item.id}-yes`} />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center space-x-1 cursor-pointer">
                          <RadioGroupItem value="no" id={`${item.id}-no`} />
                          <span>No</span>
                        </label>
                      </RadioGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Separator className="my-6" />

            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Detailed Findings</h3>
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 bg-gray-50 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-base">
                      Issue #{index + 1}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {item.sectionTitle}
                    </Badge>
                  </div>
                  <p className="text-gray-700 font-medium">{item.question}</p>
                  <div>
                    <label
                      htmlFor={`notes-${item.id}`}
                      className="block mb-1 font-medium text-sm"
                    >
                      Auditor Notes:
                    </label>
                    <Textarea
                      id={`notes-${item.id}`}
                      value={item.notes}
                      onChange={(e) =>
                        handleNotesChange(item.id, e.target.value)
                      }
                      className="min-h-[80px]"
                      placeholder="Enter your notes or feedback..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No non-compliance issues found in this audit.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NonComplianceReport;
