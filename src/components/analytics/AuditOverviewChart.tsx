
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AuditCompletionData } from '@/data/analyticsService';

const config = {
  completed: {
    label: 'Completed',
    color: '#22c55e',
  },
  pending: {
    label: 'Pending',
    color: '#3b82f6',
  },
  overdue: {
    label: 'Overdue',
    color: '#ef4444',
  },
};

interface AuditOverviewChartProps {
  data: AuditCompletionData[];
}

export const AuditOverviewChart: React.FC<AuditOverviewChartProps> = ({ data }) => {
  return (
    <ChartContainer className="h-[300px]" config={config}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="completed"
          fill="var(--color-completed)"
          radius={[4, 4, 0, 0]}
          barSize={20}
        />
        <Bar dataKey="pending" fill="var(--color-pending)" radius={[4, 4, 0, 0]} barSize={20} />
        <Bar dataKey="overdue" fill="var(--color-overdue)" radius={[4, 4, 0, 0]} barSize={20} />
      </BarChart>
    </ChartContainer>
  );
};
