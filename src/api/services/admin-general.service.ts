import apiClient from "@/api/apiClient";
import {
  IGenerateProfitsResponse,
  IGetInvestmentStatsResponse,
} from "@/interface/response/admin-general";
import { AdminEndPoint } from "./admin-general";

export const generateProfits = async (): Promise<IGenerateProfitsResponse> => {
  const response = await apiClient.post({ url: AdminEndPoint.GENERATE_PROFITS });
  return response.data;
};

export const getInvestmentStats = async (): Promise<IGetInvestmentStatsResponse> => {
  const response = await apiClient.get({ url: AdminEndPoint.GET_INVESTMENT_STATS });
  return response.data;
}; 