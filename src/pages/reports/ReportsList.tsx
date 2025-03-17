
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart3, FileDown, FilePieChart, Filter, Printer } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const ReportsList = () => {
  const [activeTab, setActiveTab] = useState('audit-reports');

  const auditReports = [
    { id: '1', title: 'Monthly Food Safety Audit Summary', date: '2023-05-15', location: 'New York Branch', status: 'completed' },
    { id: '2', title: 'Quarterly Compliance Report', date: '2023-06-21', location: 'Chicago Branch', status: 'completed' },
    { id: '3', title: 'Annual Health Inspection Report', date: '2023-07-10', location: 'All Locations', status: 'completed' },
  ];

  const performanceReports = [
    { id: '1', title: 'Auditor Performance Q2 2023', date: '2023-07-01', auditors: 12, audits: 45 },
    { id: '2', title: 'Location Compliance Ranking', date: '2023-06-15', locations: 8, metrics: 24 },
    { id: '3', title: 'Issue Resolution Time Analysis', date: '2023-05-30', issues: 67, avgResolutionDays: 3.5 },
  ];

  const handleDownload = (reportId: string, reportTitle: string, format: 'pdf' | 'csv' | 'excel') => {
    // In a real application, this would call an API endpoint to generate and download the report
    console.log(`Downloading report ${reportId} in ${format} format`);
    
    // Simulate download delay
    setTimeout(() => {
      toast.success(`${reportTitle} downloaded successfully in ${format.toUpperCase()} format`);
    }, 1000);
    
    // Fake file download for demonstration
    const element = document.createElement('a');
    let fileExtension = '';
    
    switch (format) {
      case 'pdf':
        fileExtension = 'pdf';
        element.setAttribute('href', 'data:application/pdf;charset=utf-8,');
        break;
      case 'csv':
        fileExtension = 'csv';
        element.setAttribute('href', 'data:text/csv;charset=utf-8,');
        break;
      case 'excel':
        fileExtension = 'xlsx';
        element.setAttribute('href', 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8,');
        break;
    }
    
    element.setAttribute('download', `${reportTitle.replace(/\s+/g, '-').toLowerCase()}.${fileExtension}`);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleBulkExport = (format: 'pdf' | 'csv' | 'excel') => {
    const reports = activeTab === 'audit-reports' ? auditReports : performanceReports;
    toast.info(`Preparing ${reports.length} reports for bulk export in ${format.toUpperCase()} format`);
    
    setTimeout(() => {
      toast.success(`All reports exported successfully in ${format.toUpperCase()} format`);
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Reports</h1>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Filter Reports</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {/* Filter controls would go here */}
                  <p className="text-sm text-muted-foreground">
                    Select date range, report types, locations, and other criteria to filter reports.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="flex items-center gap-2">
                  <FileDown className="h-4 w-4" />
                  Export All
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleBulkExport('pdf')}>
                  Export All as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkExport('csv')}>
                  Export All as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkExport('excel')}>
                  Export All as Excel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs defaultValue="audit-reports" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="audit-reports">Audit Reports</TabsTrigger>
            <TabsTrigger value="performance-reports">Performance Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="audit-reports" className="mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Audit Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.title}</TableCell>
                        <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                        <TableCell>{report.location}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {report.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <BarChart3 className="h-4 w-4" />
                              <span className="sr-only">View Chart</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Printer className="h-4 w-4" />
                              <span className="sr-only">Print</span>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <FileDown className="h-4 w-4" />
                                  <span className="sr-only">Download</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleDownload(report.id, report.title, 'pdf')}>
                                  Download as PDF
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDownload(report.id, report.title, 'csv')}>
                                  Download as CSV
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDownload(report.id, report.title, 'excel')}>
                                  Download as Excel
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance-reports" className="mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Performance Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performanceReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.title}</TableCell>
                        <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {report.auditors && <span>{report.auditors} auditors, {report.audits} audits</span>}
                          {report.locations && <span>{report.locations} locations, {report.metrics} metrics</span>}
                          {report.issues && <span>{report.issues} issues, {report.avgResolutionDays} avg. days to resolve</span>}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <FilePieChart className="h-4 w-4" />
                              <span className="sr-only">View Chart</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Printer className="h-4 w-4" />
                              <span className="sr-only">Print</span>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <FileDown className="h-4 w-4" />
                                  <span className="sr-only">Download</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleDownload(report.id, report.title, 'pdf')}>
                                  Download as PDF
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDownload(report.id, report.title, 'csv')}>
                                  Download as CSV
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDownload(report.id, report.title, 'excel')}>
                                  Download as Excel
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Report Generation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Create custom reports based on specific criteria and timeframes.
            </p>
            <Button>Generate New Report</Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ReportsList;
