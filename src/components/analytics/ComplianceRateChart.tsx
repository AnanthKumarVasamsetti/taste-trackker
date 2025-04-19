
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ComplianceRateData } from '@/data/analyticsService';

const config = {
  foodSafety: {
    label: 'Food Safety',
    color: '#22c55e',
  },
  hygiene: {
    label: 'Hygiene',
    color: '#3b82f6',
  },
  documentation: {
    label: 'Documentation',
    color: '#f59e0b',
  },
};

interface ComplianceRateChartProps {
  data: ComplianceRateData[];
}

export const ComplianceRateChart: React.FC<ComplianceRateChartProps> = ({ data }) => {
  return (
    <ChartContainer className="h-[300px]" config={config}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" />
        <YAxis domain={[60, 100]} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="Food Safety"
          stroke="var(--color-foodSafety)"
          fill="var(--color-foodSafety)"
          fillOpacity={0.2}
        />
        <Area
          type="monotone"
          dataKey="Hygiene"
          stroke="var(--color-hygiene)"
          fill="var(--color-hygiene)"
          fillOpacity={0.2}
        />
        <Area
          type="monotone"
          dataKey="Documentation"
          stroke="var(--color-documentation)"
          fill="var(--color-documentation)"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ChartContainer>
  );
};
