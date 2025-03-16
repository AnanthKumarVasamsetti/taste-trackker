
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const data = [
  { issue: 'Temperature Control', count: 32 },
  { issue: 'Hand Washing', count: 28 },
  { issue: 'Date Labeling', count: 24 },
  { issue: 'Storage Practices', count: 18 },
  { issue: 'Cleaning Schedule', count: 15 },
  { issue: 'Pest Control', count: 12 },
  { issue: 'Equipment Maintenance', count: 10 },
];

const config = {
  count: {
    label: 'Issue Count',
    color: '#ef4444'
  }
};

export const TopIssuesChart = () => {
  return (
    <ChartContainer className="h-[300px]" config={config}>
      <BarChart 
        data={data} 
        margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis type="number" />
        <YAxis dataKey="issue" type="category" width={150} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={[0, 4, 4, 0]} barSize={20} />
      </BarChart>
    </ChartContainer>
  );
};
