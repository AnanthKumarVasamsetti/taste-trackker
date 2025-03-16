
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const data = [
  { month: 'Jan', foodSafety: 92, hygiene: 88, documentation: 85 },
  { month: 'Feb', foodSafety: 94, hygiene: 90, documentation: 87 },
  { month: 'Mar', foodSafety: 93, hygiene: 91, documentation: 90 },
  { month: 'Apr', foodSafety: 96, hygiene: 94, documentation: 92 },
  { month: 'May', foodSafety: 95, hygiene: 92, documentation: 91 },
  { month: 'Jun', foodSafety: 97, hygiene: 95, documentation: 94 },
];

const config = {
  foodSafety: {
    label: 'Food Safety',
    color: '#22c55e'
  },
  hygiene: {
    label: 'Hygiene',
    color: '#3b82f6'
  },
  documentation: {
    label: 'Documentation',
    color: '#f59e0b'
  }
};

export const ComplianceRateChart = () => {
  return (
    <ChartContainer className="h-[300px]" config={config}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" />
        <YAxis domain={[60, 100]} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area type="monotone" dataKey="foodSafety" stroke="var(--color-foodSafety)" fill="var(--color-foodSafety)" fillOpacity={0.2} />
        <Area type="monotone" dataKey="hygiene" stroke="var(--color-hygiene)" fill="var(--color-hygiene)" fillOpacity={0.2} />
        <Area type="monotone" dataKey="documentation" stroke="var(--color-documentation)" fill="var(--color-documentation)" fillOpacity={0.2} />
      </AreaChart>
    </ChartContainer>
  );
};
