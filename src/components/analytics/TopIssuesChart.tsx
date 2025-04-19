
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { TopIssueData } from '@/data/analyticsService';

const config = {
  count: {
    label: 'Issue Count',
    color: '#ef4444',
  },
  high: {
    label: 'High Severity',
    color: '#ef4444',
  },
  medium: {
    label: 'Medium Severity',
    color: '#f59e0b',
  },
  low: {
    label: 'Low Severity',
    color: '#3b82f6',
  },
};

const getBarColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'var(--color-high)';
    case 'medium':
      return 'var(--color-medium)';
    case 'low':
      return 'var(--color-low)';
    default:
      return 'var(--color-count)';
  }
};

interface TopIssuesChartProps {
  data: TopIssueData[];
  height?: number;
}

export const TopIssuesChart: React.FC<TopIssuesChartProps> = ({ data, height = 300 }) => {
  return (
    <ChartContainer className={`h-[${height}px]`} config={config}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />
        <XAxis type="number" />
        <YAxis dataKey="issue" type="category" width={150} tick={{ fill: 'var(--foreground)', fontSize: 12 }} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name, { payload }) => {
                const severity = payload.severity;
                const category = payload.category;
                return [
                  value,
                  <span key="tooltip-content">
                    {name}{' '}
                    <span
                      className="ml-2 px-2 py-0.5 text-[10px] rounded-full"
                      style={{
                        backgroundColor: getBarColor(severity),
                        color: 'white',
                      }}
                    >
                      {severity.toUpperCase()}
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground">{category}</span>
                  </span>,
                ];
              }}
            />
          }
        />
        <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.severity)} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};
