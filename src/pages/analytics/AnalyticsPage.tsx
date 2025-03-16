
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileDown, Calendar, HelpCircle, FilterX } from 'lucide-react';
import { AuditOverviewChart } from '@/components/analytics/AuditOverviewChart';
import { ComplianceRateChart } from '@/components/analytics/ComplianceRateChart';
import { TopIssuesChart } from '@/components/analytics/TopIssuesChart';
import { AuditorPerformanceChart } from '@/components/analytics/AuditorPerformanceChart';
import { LocationComparisonChart } from '@/components/analytics/LocationComparisonChart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

const AnalyticsPage = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  const [location, setLocation] = useState<string>("all");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const formatDateRange = () => {
    if (!date?.from) return 'Last 30 Days';
    if (!date.to) return `Since ${format(date.from, 'MMM d, yyyy')}`;
    return `${format(date.from, 'MMM d')} - ${format(date.to, 'MMM d, yyyy')}`;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Track your food safety compliance and audit performance</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDateRange()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? <FilterX className="h-4 w-4" /> : <HelpCircle className="h-4 w-4" />}
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
            
            <Button size="sm" className="flex items-center gap-2">
              <FileDown className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {showFilters && (
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Location</label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="new-york">New York</SelectItem>
                      <SelectItem value="chicago">Chicago</SelectItem>
                      <SelectItem value="los-angeles">Los Angeles</SelectItem>
                      <SelectItem value="miami">Miami</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Auditor</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All Auditors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Auditors</SelectItem>
                      <SelectItem value="john-smith">John Smith</SelectItem>
                      <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                      <SelectItem value="mike-chen">Mike Chen</SelectItem>
                      <SelectItem value="kim-lee">Kim Lee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Issue Category</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="food-safety">Food Safety</SelectItem>
                      <SelectItem value="hygiene">Hygiene</SelectItem>
                      <SelectItem value="documentation">Documentation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Compliance Status</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="compliant">Compliant</SelectItem>
                      <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Audit Completion</span>
                    <Popover>
                      <PopoverTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-pointer" />
                      </PopoverTrigger>
                      <PopoverContent side="left" className="w-80">
                        <p className="text-sm">Shows the monthly audit completion rates including completed, pending, and overdue audits across the selected time period.</p>
                      </PopoverContent>
                    </Popover>
                  </CardTitle>
                  <CardDescription>Monthly audit completion breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <AuditOverviewChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Compliance Rate</span>
                    <Popover>
                      <PopoverTrigger>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-pointer" />
                      </PopoverTrigger>
                      <PopoverContent side="left" className="w-80">
                        <p className="text-sm">Tracks compliance rates across three key categories: Food Safety, Hygiene, and Documentation over time.</p>
                      </PopoverContent>
                    </Popover>
                  </CardTitle>
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
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Compliance Trends</span>
                  <Popover>
                    <PopoverTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent side="left" className="w-80">
                      <p className="text-sm">Displays detailed compliance rates over time by category, showing trends and potential areas for improvement.</p>
                    </PopoverContent>
                  </Popover>
                </CardTitle>
                <CardDescription>Compliance rates over time by category</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ComplianceRateChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues" className="mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Top Issues</span>
                  <Popover>
                    <PopoverTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent side="left" className="w-80">
                      <p className="text-sm">Highlights the most common non-compliance issues ranked by frequency, helping you identify key areas requiring attention.</p>
                    </PopoverContent>
                  </Popover>
                </CardTitle>
                <CardDescription>Most common non-compliance issues</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <TopIssuesChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="auditors" className="mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Auditor Performance</span>
                  <Popover>
                    <PopoverTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent side="left" className="w-80">
                      <p className="text-sm">Compares auditor performance metrics including number of audits completed, average compliance rates found, and average completion time.</p>
                    </PopoverContent>
                  </Popover>
                </CardTitle>
                <CardDescription>Comparison of auditor efficiency and productivity</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <AuditorPerformanceChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations" className="mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Location Comparison</span>
                  <Popover>
                    <PopoverTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent side="left" className="w-80">
                      <p className="text-sm">Provides a comparative analysis of compliance rates across different locations, broken down by evaluation categories.</p>
                    </PopoverContent>
                  </Popover>
                </CardTitle>
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
