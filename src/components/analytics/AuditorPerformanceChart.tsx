
import React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AuditorPerformanceData } from '@/data/analyticsService';

const config = {
  auditsCompleted: {
    label: 'Audits Completed',
    color: '#3b82f6',
  },
  complianceRate: {
    label: 'Compliance Rate (%)',
    color: '#22c55e',
  },
  avgCompletionDays: {
    label: 'Avg. Completion Days',
    color: '#f59e0b',
  },
};

interface AuditorPerformanceChartProps {
  data: AuditorPerformanceData[];
}

export const AuditorPerformanceChart: React.FC<AuditorPerformanceChartProps> = ({
  data,
}) => {
  return (
    <ChartContainer className="h-[300px]" config={config}>
      <ComposedChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" />
        <YAxis yAxisId="right" orientation="right" domain={[80, 100]} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          yAxisId="left"
          dataKey="auditsCompleted"
          fill="var(--color-auditsCompleted)"
          barSize={20}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="avgComplianceRate"
          stroke="var(--color-complianceRate)"
          strokeWidth={2}
        />
      </ComposedChart>
    </ChartContainer>
  );
};
