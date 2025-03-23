
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AuditType } from "@/types";

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
          <CardTitle className="text-xl">Non-Compliance Report</CardTitle>
          <Badge className="bg-red-100 text-red-800">
            {nonCompliantItems.length} Issues
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {nonCompliantItems.length > 0 ? (
          <div className="space-y-6">
            {nonCompliantItems.map((item, index) => (
              <div key={item.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between">
                  <h3 className="font-medium text-base mb-2">Issue #{index + 1}</h3>
                  <Badge variant="outline" className="text-xs">
                    {item.sectionTitle}
                  </Badge>
                </div>
                <p className="text-gray-700 mb-2">{item.question}</p>
                {item.notes && (
                  <div className="bg-gray-50 p-3 rounded-md mt-2 text-sm">
                    <p className="text-gray-500 font-medium">Auditor Notes:</p>
                    <p className="text-gray-700">{item.notes}</p>
                  </div>
                )}
              </div>
            ))}
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
