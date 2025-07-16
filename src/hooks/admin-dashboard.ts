import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAdvancedStatistics,
  getAdminDashboard,
  getDashboardOverview,
  getFundPerformanceAnalysis,
  getProfitTrends,
  getRecentActivity,
  manualProfitGeneration,
  getTopInvestors,
} from "@/api/services/admin-dashboard.service";

import {
  IAdvancedStatsResponse,
  IAdminDashboardResponse,
  IDashboardOverview,
  IFundPerformanceListResponse,
  IProfitTrendListResponse,
  IRecentActivityListResponse,
  ITopInvestorListResponse,
  IManualProfitGenerationResponse,
} from "@/interface/response/admin-dashboard";
import { IGetFundPerformanceRequest } from "@/interface/request/admin-dashboard";

const ADMIN_DASHBOARD_KEYS = {
  ADVANCED_STATS: "advancedStats",
  DASHBOARD: "adminDashboard",
  OVERVIEW: "dashboardOverview",
  FUND_PERFORMANCE: "fundPerformance",
  PROFIT_TRENDS: "profitTrends",
  RECENT_ACTIVITY: "recentActivity",
  TOP_INVESTORS: "topInvestors",
  MANUAL_PROFIT_GENERATION: "manualProfitGeneration",
};

export const useGetAdvancedStatistics =
  (): UseQueryResult<IAdvancedStatsResponse> => {
    return useQuery({
      queryKey: [ADMIN_DASHBOARD_KEYS.ADVANCED_STATS],
      queryFn: getAdvancedStatistics,
    });
  };

export const useGetAdminDashboard =
  (): UseQueryResult<IAdminDashboardResponse> => {
    return useQuery({
      queryKey: [ADMIN_DASHBOARD_KEYS.DASHBOARD],
      queryFn: getAdminDashboard,
    });
  };

export const useGetDashboardOverview =
  (): UseQueryResult<IDashboardOverview> => {
    return useQuery({
      queryKey: [ADMIN_DASHBOARD_KEYS.OVERVIEW],
      queryFn: getDashboardOverview,
    });
  };

export const useGetFundPerformanceAnalysis = (): UseMutationResult<
  IFundPerformanceListResponse,
  Error,
  IGetFundPerformanceRequest
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => getFundPerformanceAnalysis(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_DASHBOARD_KEYS.FUND_PERFORMANCE],
      });
      queryClient.invalidateQueries({
        queryKey: [ADMIN_DASHBOARD_KEYS.DASHBOARD],
      });
    },
  });
};

export const useGetProfitTrends = (
  days?: number
): UseQueryResult<IProfitTrendListResponse> => {
  return useQuery({
    queryKey: [ADMIN_DASHBOARD_KEYS.PROFIT_TRENDS, days],
    queryFn: () => getProfitTrends(days),
  });
};

export const useGetRecentActivity = (
  limit?: number
): UseQueryResult<IRecentActivityListResponse> => {
  return useQuery({
    queryKey: [ADMIN_DASHBOARD_KEYS.RECENT_ACTIVITY, limit],
    queryFn: () => getRecentActivity(limit),
  });
};

export const useManualProfitGeneration = (): UseMutationResult<
  IManualProfitGenerationResponse,
  Error,
  void
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: manualProfitGeneration,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_DASHBOARD_KEYS.DASHBOARD],
      });
      queryClient.invalidateQueries({
        queryKey: [ADMIN_DASHBOARD_KEYS.OVERVIEW],
      });
      queryClient.invalidateQueries({
        queryKey: [ADMIN_DASHBOARD_KEYS.PROFIT_TRENDS],
      });
      queryClient.invalidateQueries({
        queryKey: [ADMIN_DASHBOARD_KEYS.RECENT_ACTIVITY],
      });
      queryClient.invalidateQueries({
        queryKey: [ADMIN_DASHBOARD_KEYS.TOP_INVESTORS],
      });
    },
  });
};

export const useGetTopInvestors = (
  limit?: number
): UseQueryResult<ITopInvestorListResponse> => {
  return useQuery({
    queryKey: [ADMIN_DASHBOARD_KEYS.TOP_INVESTORS, limit],
    queryFn: () => getTopInvestors(limit),
  });
};
