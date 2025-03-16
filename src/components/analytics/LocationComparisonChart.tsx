
import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const data = [
  { category: 'Food Safety', newYork: 85, chicago: 90, losAngeles: 88, miami: 92 },
  { category: 'Cleanliness', newYork: 82, chicago: 86, losAngeles: 90, miami: 88 },
  { category: 'Temp Control', newYork: 90, chicago: 85, losAngeles: 92, miami: 86 },
  { category: 'Documentation', newYork: 78, chicago: 84, losAngeles: 80, miami: 85 },
  { category: 'Employee Hygiene', newYork: 88, chicago: 92, losAngeles: 85, miami: 90 },
];

const config = {
  newYork: {
    label: 'New York',
    color: '#3b82f6'
  },
  chicago: {
    label: 'Chicago',
    color: '#22c55e'
  },
  losAngeles: {
    label: 'Los Angeles',
    color: '#f59e0b'
  },
  miami: {
    label: 'Miami',
    color: '#ec4899'
  }
};

export const LocationComparisonChart = () => {
  return (
    <ChartContainer className="h-[300px]" config={config}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="category" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Radar name="New York" dataKey="newYork" stroke="var(--color-newYork)" fill="var(--color-newYork)" fillOpacity={0.2} />
        <Radar name="Chicago" dataKey="chicago" stroke="var(--color-chicago)" fill="var(--color-chicago)" fillOpacity={0.2} />
        <Radar name="Los Angeles" dataKey="losAngeles" stroke="var(--color-losAngeles)" fill="var(--color-losAngeles)" fillOpacity={0.2} />
        <Radar name="Miami" dataKey="miami" stroke="var(--color-miami)" fill="var(--color-miami)" fillOpacity={0.2} />
        <Legend />
      </RadarChart>
    </ChartContainer>
  );
};
