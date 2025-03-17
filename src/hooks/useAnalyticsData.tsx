
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  analyticsService, 
  AnalyticsFilters, 
  AuditCompletionData, 
  ComplianceRateData,
  TopIssueData,
  AuditorPerformanceData,
  LocationComparianceData,
  getDashboardData
} from '@/data/analyticsService';

export type AnalyticsDataState = {
  auditCompletionData: AuditCompletionData[];
  complianceRateData: ComplianceRateData[];
  topIssues: TopIssueData[];
  auditorPerformance: AuditorPerformanceData[];
  locationComparison: LocationComparianceData[];
  isLoading: boolean;
  error: Error | null;
};

/**
 * Hook to fetch and manage analytics data
 */
export const useAnalyticsData = (initialFilters?: AnalyticsFilters) => {
  const [filters, setFilters] = useState<AnalyticsFilters | undefined>(initialFilters);
  const [data, setData] = useState<AnalyticsDataState>({
    auditCompletionData: [],
    complianceRateData: [],
    topIssues: [],
    auditorPerformance: [],
    locationComparison: [],
    isLoading: true,
    error: null
  });

  const refreshData = async () => {
    setData(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await getDashboardData({ filters });
      
      setData({
        ...response,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setData(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error : new Error('Unknown error occurred') 
      }));
      toast.error('Failed to load analytics data');
    }
  };

  // Fetch individual data sets
  const fetchAuditCompletionData = async () => {
    try {
      const auditCompletionData = await analyticsService.getAuditCompletionData(filters);
      setData(prev => ({ ...prev, auditCompletionData, isLoading: false }));
    } catch (error) {
      console.error('Error fetching audit completion data:', error);
      toast.error('Failed to load audit completion data');
    }
  };

  const fetchComplianceRateData = async () => {
    try {
      const complianceRateData = await analyticsService.getComplianceRateData(filters);
      setData(prev => ({ ...prev, complianceRateData, isLoading: false }));
    } catch (error) {
      console.error('Error fetching compliance rate data:', error);
      toast.error('Failed to load compliance rate data');
    }
  };

  const fetchTopIssuesData = async () => {
    try {
      const topIssues = await analyticsService.getTopIssuesData(filters);
      setData(prev => ({ ...prev, topIssues, isLoading: false }));
    } catch (error) {
      console.error('Error fetching top issues data:', error);
      toast.error('Failed to load top issues data');
    }
  };

  const fetchAuditorPerformanceData = async () => {
    try {
      const auditorPerformance = await analyticsService.getAuditorPerformanceData(filters);
      setData(prev => ({ ...prev, auditorPerformance, isLoading: false }));
    } catch (error) {
      console.error('Error fetching auditor performance data:', error);
      toast.error('Failed to load auditor performance data');
    }
  };

  const fetchLocationComparisonData = async () => {
    try {
      const locationComparison = await analyticsService.getLocationComparisonData(filters);
      setData(prev => ({ ...prev, locationComparison, isLoading: false }));
    } catch (error) {
      console.error('Error fetching location comparison data:', error);
      toast.error('Failed to load location comparison data');
    }
  };

  useEffect(() => {
    refreshData();
  }, [filters]);

  return {
    ...data,
    setFilters,
    refreshData,
    fetchAuditCompletionData,
    fetchComplianceRateData,
    fetchTopIssuesData,
    fetchAuditorPerformanceData,
    fetchLocationComparisonData
  };
};
