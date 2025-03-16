
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const data = [
  { issue: 'Temperature Control', count: 32, severity: 'high' },
  { issue: 'Hand Washing', count: 28, severity: 'high' },
  { issue: 'Date Labeling', count: 24, severity: 'medium' },
  { issue: 'Storage Practices', count: 18, severity: 'medium' },
  { issue: 'Cleaning Schedule', count: 15, severity: 'low' },
  { issue: 'Pest Control', count: 12, severity: 'medium' },
  { issue: 'Equipment Maintenance', count: 10, severity: 'low' },
];

const config = {
  count: {
    label: 'Issue Count',
    color: '#ef4444'
  },
  high: {
    label: 'High Severity',
    color: '#ef4444'
  },
  medium: {
    label: 'Medium Severity',
    color: '#f59e0b'
  },
  low: {
    label: 'Low Severity',
    color: '#3b82f6'
  }
};

const getBarColor = (severity: string) => {
  switch (severity) {
    case 'high': return 'var(--color-high)';
    case 'medium': return 'var(--color-medium)';
    case 'low': return 'var(--color-low)';
    default: return 'var(--color-count)';
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
        <YAxis 
          dataKey="issue" 
          type="category" 
          width={150}
          tick={{ fill: 'var(--foreground)', fontSize: 12 }}
        />
        <ChartTooltip 
          content={
            <ChartTooltipContent 
              formatter={(value, name, { payload }) => {
                const severity = payload.severity;
                return [
                  value, 
                  <span>
                    {name} 
                    <span className="ml-2 px-2 py-0.5 text-[10px] rounded-full" style={{
                      backgroundColor: getBarColor(severity),
                      color: 'white'
                    }}>
                      {severity.toUpperCase()}
                    </span>
                  </span>
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
