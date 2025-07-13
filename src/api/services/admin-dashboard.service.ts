import apiClient from "@/api/apiClient";
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
import { AdminDashboardEndPoint } from "./admin-dashboard";

export const getAdvancedStatistics = async (): Promise<IAdvancedStatsResponse> => {
  const response = await apiClient.get({ url: AdminDashboardEndPoint.ADVANCED_STATS });
  return response.data;
};

export const getAdminDashboard = async (): Promise<IAdminDashboardResponse> => {
  const response = await apiClient.get({ url: AdminDashboardEndPoint.DASHBOARD });
  return response.data;
};

export const getDashboardOverview = async (): Promise<IDashboardOverview> => {
  const response = await apiClient.get({ url: AdminDashboardEndPoint.DASHBOARD_OVERVIEW });
  return response.data;
};

export const getFundPerformanceAnalysis = async (
  payload: IGetFundPerformanceRequest
): Promise<IFundPerformanceListResponse> => {
  const response = await apiClient.post({ url: AdminDashboardEndPoint.FUND_PERFORMANCE, data: payload });
  return response.data;
};

export const getProfitTrends = async (days?: number): Promise<IProfitTrendListResponse> => {
  const response = await apiClient.get({
    url: AdminDashboardEndPoint.PROFIT_TRENDS,
    params: { days },
  });
  return response.data;
};

export const getRecentActivity = async (limit?: number): Promise<IRecentActivityListResponse> => {
  const response = await apiClient.get({
    url: AdminDashboardEndPoint.RECENT_ACTIVITY,
    params: { limit },
  });
  return response.data;
};

export const manualProfitGeneration = async (): Promise<IManualProfitGenerationResponse> => {
  const response = await apiClient.post({ url: AdminDashboardEndPoint.MANUAL_PROFIT_GENERATION });
  return response.data;
};

export const getTopInvestors = async (limit?: number): Promise<ITopInvestorListResponse> => {
  const response = await apiClient.get({
    url: AdminDashboardEndPoint.TOP_INVESTORS,
    params: { limit },
  });
  return response.data;
}; 