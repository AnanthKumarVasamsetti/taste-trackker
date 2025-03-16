
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileDown, Calendar } from 'lucide-react';
import { AuditOverviewChart } from '@/components/analytics/AuditOverviewChart';
import { ComplianceRateChart } from '@/components/analytics/ComplianceRateChart';
import { TopIssuesChart } from '@/components/analytics/TopIssuesChart';
import { AuditorPerformanceChart } from '@/components/analytics/AuditorPerformanceChart';
import { LocationComparisonChart } from '@/components/analytics/LocationComparisonChart';

const AnalyticsPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Last 30 Days
            </Button>
            <Button size="sm" className="flex items-center gap-2">
              <FileDown className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
            <TabsTrigger value="auditors">Auditors</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Audit Completion</CardTitle>
                  <CardDescription>Monthly audit completion rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <AuditOverviewChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Compliance Rate</CardTitle>
                  <CardDescription>Overall compliance performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ComplianceRateChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Compliance Trends</CardTitle>
                <CardDescription>Compliance rates over time by category</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ComplianceRateChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Issues</CardTitle>
                <CardDescription>Most common non-compliance issues</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <TopIssuesChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="auditors" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Auditor Performance</CardTitle>
                <CardDescription>Comparison of auditor efficiency and productivity</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <AuditorPerformanceChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Location Comparison</CardTitle>
                <CardDescription>Compliance rates across different locations</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <LocationComparisonChart />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AnalyticsPage;
