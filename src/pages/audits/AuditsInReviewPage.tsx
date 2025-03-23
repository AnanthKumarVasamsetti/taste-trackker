
import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockAudits, mockAuditors } from "@/data/mockData";
import { Search, ClipboardCheck, AlertTriangle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const AuditsInReviewPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter audits to only show those in review status
  const auditsInReview = mockAudits
    .filter(audit => audit.status === "in-review")
    .filter(audit => 
      searchQuery ? 
        audit.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        audit.location.toLowerCase().includes(searchQuery.toLowerCase()) 
      : true
    );
  
  // Count non-compliant items for each audit
  const countNonCompliantItems = (auditId: string) => {
    const audit = mockAudits.find(a => a.id === auditId);
    if (!audit) return 0;
    
    return audit.sections.reduce((count, section) => {
      return count + section.items.filter(item => item.response === false).length;
    }, 0);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Audits In Review</h1>
            <p className="text-gray-500 mt-1">
              Review and approve completed audits
            </p>
          </div>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search audits..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pending Reviews</CardTitle>
            <CardDescription>
              {auditsInReview.length} audit{auditsInReview.length !== 1 ? 's' : ''} waiting for technical review
            </CardDescription>
          </CardHeader>
          <CardContent>
            {auditsInReview.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Audit Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Auditor</TableHead>
                    <TableHead>Issues</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditsInReview.map((audit) => {
                    const auditor = mockAuditors.find(a => a.id === audit.auditorId);
                    const nonCompliantCount = countNonCompliantItems(audit.id);
                    
                    return (
                      <TableRow key={audit.id}>
                        <TableCell className="font-medium">{audit.title}</TableCell>
                        <TableCell>{audit.location}</TableCell>
                        <TableCell>{auditor?.name || "Unassigned"}</TableCell>
                        <TableCell>
                          {nonCompliantCount > 0 ? (
                            <Badge className="bg-red-100 text-red-800 gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              {nonCompliantCount}
                            </Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-800">
                              0
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {formatDistanceToNow(new Date(audit.updatedAt), { addSuffix: true })}
                        </TableCell>
                        <TableCell className="text-right">
                          <Link to={`/audits/review/${audit.id}`}>
                            <Button variant="outline" size="sm" className="gap-1">
                              <ClipboardCheck className="h-4 w-4" />
                              Review
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <ClipboardCheck className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">No Audits in Review</h3>
                <p className="text-gray-500 mb-4">There are currently no audits awaiting review.</p>
                <Link to="/audits">
                  <Button variant="outline">View All Audits</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AuditsInReviewPage;
