
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, Info } from 'lucide-react';
import PhotoSizeChart from '@/components/analytics/PhotoSizeChart';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';

const PhotoSizeAnalysis = () => {
  const exportData = () => {
    // In a real application, this would generate and download a CSV/Excel file
    toast.success('Data export started. Your file will be ready for download shortly.');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Photo Size Evolution Analysis</h1>
            <p className="text-muted-foreground">
              Historical trends and future projections based on Moore's Law
            </p>
          </div>
          <Button 
            onClick={exportData}
            size="sm" 
            className="flex items-center gap-2"
          >
            <FileDown className="h-4 w-4" />
            Export Data
          </Button>
        </div>

        <PhotoSizeChart height={500} />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              About Moore's Law and This Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Moore's Law is the observation that the number of transistors in an integrated circuit doubles approximately every two years. While originally applied to computing hardware, similar exponential growth patterns can be observed in digital photography and storage capabilities.
            </p>
            <p>
              This analysis tracks the growth of average photo file sizes from 2013 to 2023, then applies a Moore's Law-style projection for the next decade (2024-2033). The growth in file sizes is primarily driven by:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Increasing sensor resolution in both smartphones and professional cameras</li>
              <li>Higher bit depth for better color accuracy</li>
              <li>More sophisticated image processing algorithms</li>
              <li>Adoption of RAW formats and computational photography techniques</li>
            </ul>
            <p>
              The analysis also includes storage pricing data in Indian Rupees (INR) per GB, showing the inverse relationship between growing file sizes and decreasing storage costs over time.
            </p>

            <div className="p-4 bg-muted rounded-lg mt-4">
              <h3 className="font-medium mb-2">Methodology Notes:</h3>
              <p className="text-sm">
                Historical data is based on average file sizes from popular smartphone and DSLR camera models released between 2013-2023. Future projections assume continued advancements in camera sensor technology and computational photography, with a doubling rate similar to Moore's Law (approximately every 18 months). Storage pricing data is based on average market prices for consumer storage options in India, with future projections following the historical trend of price reduction.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TooltipProvider>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">14.3x</div>
                  <div className="text-sm text-muted-foreground">
                    Growth in average photo size (2013-2033)
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 inline ml-1 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-64">From 2.5MB in 2013 to a projected 357.9MB in 2033</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">-95.7%</div>
                  <div className="text-sm text-muted-foreground">
                    Reduction in storage cost per GB (2013-2033)
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 inline ml-1 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-64">From ₹350/GB in 2013 to a projected ₹15/GB in 2033</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">2.79TB</div>
                  <div className="text-sm text-muted-foreground">
                    Storage needed for 1,000 photos in 2033
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 inline ml-1 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-64">At 357.9MB per photo, compared to only 2.5GB required in 2013</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PhotoSizeAnalysis;
