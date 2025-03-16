
import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const data = [
  { name: 'John Smith', auditsCompleted: 24, complianceRate: 92, avgCompletionDays: 2.3 },
  { name: 'Sarah Johnson', auditsCompleted: 18, complianceRate: 95, avgCompletionDays: 1.8 },
  { name: 'Mike Chen', auditsCompleted: 22, complianceRate: 90, avgCompletionDays: 2.5 },
  { name: 'Kim Lee', auditsCompleted: 15, complianceRate: 94, avgCompletionDays: 2.0 },
  { name: 'David Patel', auditsCompleted: 20, complianceRate: 91, avgCompletionDays: 2.2 },
];

const config = {
  auditsCompleted: {
    label: 'Audits Completed',
    color: '#3b82f6'
  },
  complianceRate: {
    label: 'Compliance Rate (%)',
    color: '#22c55e'
  },
  avgCompletionDays: {
    label: 'Avg. Completion Days',
    color: '#f59e0b'
  }
};

export const AuditorPerformanceChart = () => {
  return (
    <ChartContainer className="h-[300px]" config={config}>
      <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" />
        <YAxis yAxisId="right" orientation="right" domain={[80, 100]} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar yAxisId="left" dataKey="auditsCompleted" fill="var(--color-auditsCompleted)" barSize={20} />
        <Line yAxisId="right" type="monotone" dataKey="complianceRate" stroke="var(--color-complianceRate)" strokeWidth={2} />
      </ComposedChart>
    </ChartContainer>
  );
};
