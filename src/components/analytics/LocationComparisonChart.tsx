
import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LocationComparianceData } from '@/data/analyticsService';

const config = {
  newYork: {
    label: 'New York',
    color: '#3b82f6',
  },
  chicago: {
    label: 'Chicago',
    color: '#22c55e',
  },
  losAngeles: {
    label: 'Los Angeles',
    color: '#f59e0b',
  },
  miami: {
    label: 'Miami',
    color: '#ec4899',
  },
};

interface LocationComparisonChartProps {
  data: LocationComparianceData[];
}

export const LocationComparisonChart: React.FC<LocationComparisonChartProps> = ({
  data,
}) => {
  return (
    <ChartContainer className="h-[300px]" config={config}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="category" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Radar
          name="New York"
          dataKey="newYork"
          stroke="var(--color-newYork)"
          fill="var(--color-newYork)"
          fillOpacity={0.2}
        />
        <Radar
          name="Chicago"
          dataKey="chicago"
          stroke="var(--color-chicago)"
          fill="var(--color-chicago)"
          fillOpacity={0.2}
        />
        <Radar
          name="Los Angeles"
          dataKey="losAngeles"
          stroke="var(--color-losAngeles)"
          fill="var(--color-losAngeles)"
          fillOpacity={0.2}
        />
        <Radar
          name="Miami"
          dataKey="miami"
          stroke="var(--color-miami)"
          fill="var(--color-miami)"
          fillOpacity={0.2}
        />
        <Legend />
      </RadarChart>
    </ChartContainer>
  );
};
