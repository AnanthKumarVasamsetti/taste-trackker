
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const data = [
  { month: 'Jan', completed: 45, pending: 12, overdue: 3 },
  { month: 'Feb', completed: 52, pending: 8, overdue: 2 },
  { month: 'Mar', completed: 48, pending: 10, overdue: 5 },
  { month: 'Apr', completed: 60, pending: 5, overdue: 1 },
  { month: 'May', completed: 55, pending: 15, overdue: 2 },
  { month: 'Jun', completed: 58, pending: 7, overdue: 0 },
];

const config = {
  completed: {
    label: 'Completed',
    color: '#22c55e'
  },
  pending: {
    label: 'Pending',
    color: '#3b82f6'
  },
  overdue: {
    label: 'Overdue',
    color: '#ef4444'
  }
};

export const AuditOverviewChart = () => {
  return (
    <ChartContainer className="h-[300px]" config={config}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="completed" fill="var(--color-completed)" radius={[4, 4, 0, 0]} barSize={20} />
        <Bar dataKey="pending" fill="var(--color-pending)" radius={[4, 4, 0, 0]} barSize={20} />
        <Bar dataKey="overdue" fill="var(--color-overdue)" radius={[4, 4, 0, 0]} barSize={20} />
      </BarChart>
    </ChartContainer>
  );
};
