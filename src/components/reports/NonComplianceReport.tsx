
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AuditType } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";

interface NonComplianceReportProps {
  audit: AuditType;
}

const NonComplianceReport: React.FC<NonComplianceReportProps> = ({ audit }) => {
  // Filter out only non-compliant items (those with false responses)
  const nonCompliantItems = audit.sections.flatMap(section => {
    return section.items
      .filter(item => item.response === false)
      .map(item => ({
        sectionTitle: section.title,
        ...item,
      }));
  });

  return (
    <Card className="border-red-200">
      <CardHeader className="bg-red-50 border-b border-red-200">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Non-Compliance Report</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              {audit.title} • {audit.location} • {formatDistanceToNow(new Date(audit.updatedAt), { addSuffix: true })}
            </p>
          </div>
          <Badge className="bg-red-100 text-red-800">
            {nonCompliantItems.length} Issue{nonCompliantItems.length !== 1 ? 's' : ''}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {nonCompliantItems.length > 0 ? (
          <div className="space-y-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Issue Description</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nonCompliantItems.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{item.question}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.sectionTitle}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Separator className="my-6" />

            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Detailed Findings</h3>
              {nonCompliantItems.map((item, index) => (
                <div key={item.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium text-base">Issue #{index + 1}</h3>
                    <Badge variant="outline" className="text-xs">
                      {item.sectionTitle}
                    </Badge>
                  </div>
                  <p className="text-gray-700 mb-3 font-medium">{item.question}</p>
                  {item.notes && (
                    <div className="bg-white p-3 rounded-md mt-2 text-sm border">
                      <p className="text-gray-500 font-medium mb-1">Auditor Notes:</p>
                      <p className="text-gray-700">{item.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No non-compliance issues found in this audit.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NonComplianceReport;
