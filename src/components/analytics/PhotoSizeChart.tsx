
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

// Data representing average photo size (MB) over the last decade
const historicalData = [
  { year: 2013, photoSizeMB: 2.5, storagePricePerGBInINR: 350 },
  { year: 2014, photoSizeMB: 3.2, storagePricePerGBInINR: 320 },
  { year: 2015, photoSizeMB: 4.3, storagePricePerGBInINR: 280 },
  { year: 2016, photoSizeMB: 5.7, storagePricePerGBInINR: 240 },
  { year: 2017, photoSizeMB: 7.5, storagePricePerGBInINR: 200 },
  { year: 2018, photoSizeMB: 9.6, storagePricePerGBInINR: 170 },
  { year: 2019, photoSizeMB: 12.4, storagePricePerGBInINR: 145 },
  { year: 2020, photoSizeMB: 15.8, storagePricePerGBInINR: 125 },
  { year: 2021, photoSizeMB: 20.2, storagePricePerGBInINR: 105 },
  { year: 2022, photoSizeMB: 25.7, storagePricePerGBInINR: 90 },
  { year: 2023, photoSizeMB: 32.5, storagePricePerGBInINR: 75 },
];

// Applying Moore's Law (doubling approximately every 18 months) to predict future photo sizes
// and estimating future storage prices (assuming continued price decreases)
const futureData = [
  { year: 2024, photoSizeMB: 41.3, storagePricePerGBInINR: 65 },
  { year: 2025, photoSizeMB: 52.5, storagePricePerGBInINR: 55 },
  { year: 2026, photoSizeMB: 66.7, storagePricePerGBInINR: 47 },
  { year: 2027, photoSizeMB: 84.8, storagePricePerGBInINR: 40 },
  { year: 2028, photoSizeMB: 107.8, storagePricePerGBInINR: 34 },
  { year: 2029, photoSizeMB: 137.1, storagePricePerGBInINR: 29 },
  { year: 2030, photoSizeMB: 174.3, storagePricePerGBInINR: 25 },
  { year: 2031, photoSizeMB: 221.6, storagePricePerGBInINR: 21 },
  { year: 2032, photoSizeMB: 281.5, storagePricePerGBInINR: 18 },
  { year: 2033, photoSizeMB: 357.9, storagePricePerGBInINR: 15 },
];

// Combined data for the chart
const combinedData = [...historicalData, ...futureData];

interface PhotoSizeChartProps {
  className?: string;
  height?: number;
}

export const PhotoSizeChart: React.FC<PhotoSizeChartProps> = ({
  className,
  height = 400,
}) => {
  const chartConfig = {
    photoSize: {
      label: 'Photo Size (MB)',
      theme: {
        light: '#3b82f6', // Blue
        dark: '#60a5fa',
      },
    },
    storagePrice: {
      label: 'Storage Price per GB (INR)',
      theme: {
        light: '#ef4444', // Red
        dark: '#f87171',
      },
    },
    prediction: {
      label: 'Predicted Data',
      theme: {
        light: '#d4d4d8', // Gray
        dark: '#a1a1aa',
      },
    },
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          Photo Size Evolution & Storage Cost Trends (2013-2033)
        </CardTitle>
        <CardDescription>
          Historical data (2013-2023) and Moore's Law-based projections (2024-2033)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ height: height, width: '100%' }}>
          <ChartContainer config={chartConfig}>
            <LineChart
              data={combinedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                yAxisId="left"
                orientation="left"
                tick={{ fontSize: 12 }}
              >
                <Label
                  value="Photo Size (MB)"
                  angle={-90}
                  position="insideLeft"
                  style={{ textAnchor: 'middle', fontSize: 12 }}
                />
              </YAxis>
              <YAxis 
                yAxisId="right" 
                orientation="right"
                tick={{ fontSize: 12 }}
              >
                <Label
                  value="Price per GB (INR)"
                  angle={90}
                  position="insideRight"
                  style={{ textAnchor: 'middle', fontSize: 12 }}
                />
              </YAxis>
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <ReferenceLine x={2023} stroke="#8884d8" strokeDasharray="3 3">
                <Label 
                  value="Present" 
                  position="top" 
                  fill="#8884d8" 
                  fontSize={12}
                />
              </ReferenceLine>
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="photoSizeMB"
                name="Photo Size (MB)"
                stroke="var(--color-photoSize)"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="storagePricePerGBInINR"
                name="Storage Price (INR/GB)"
                stroke="var(--color-storagePrice)"
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-sm space-y-2">
            <h3 className="font-medium">About This Data:</h3>
            <p>
              Historical data (2013-2023) shows the observed increase in average photo size
              from smartphone cameras and professional DSLRs.
            </p>
            <p>
              Future projections (2024-2033) are based on Moore's Law, which predicts approximate
              doubling of data capacity every 18 months.
            </p>
          </div>
          <div className="text-sm space-y-2">
            <h3 className="font-medium">Storage Cost Trends:</h3>
            <p>
              Storage costs are showing an inverse relationship to photo sizes, decreasing
              steadily over time.
            </p>
            <p>
              By 2033, the average photo is projected to be approximately 358MB while storage costs
              could fall to around ₹15/GB.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotoSizeChart;
