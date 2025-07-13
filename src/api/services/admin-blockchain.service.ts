import apiClient from "@/api/apiClient";
import {
  IGetBlockchainSettingsResponse,
  IUpdateBlockchainSettingsResponse,
  IGetBlockchainStatisticsResponse,
  IManualBlockchainSyncResponse,
} from "@/interface/response/admin-blockchain";
import {
  IUpdateBlockchainSettingsRequest,
  IGetBlockchainStatisticsRequest,
  IManualBlockchainSyncRequest,
} from "@/interface/request/admin-blockchain";
import { AdminBlockchainEndPoint } from "./admin-blockchain";

export const getBlockchainSettings = async (): Promise<IGetBlockchainSettingsResponse> => {
  const response = await apiClient.get({ url: AdminBlockchainEndPoint.GET_SETTINGS });
  return response.data;
};

export const updateBlockchainSettings = async (
  payload: IUpdateBlockchainSettingsRequest
): Promise<IUpdateBlockchainSettingsResponse> => {
  const response = await apiClient.put({ url: AdminBlockchainEndPoint.UPDATE_SETTINGS, data: payload });
  return response.data;
};

export const getBlockchainStatistics = async (
  params?: IGetBlockchainStatisticsRequest
): Promise<IGetBlockchainStatisticsResponse> => {
  const response = await apiClient.get({
    url: AdminBlockchainEndPoint.GET_STATISTICS,
    params,
  });
  return response.data;
};

export const manualBlockchainSync = async (payload: IManualBlockchainSyncRequest): Promise<IManualBlockchainSyncResponse> => {
  const response = await apiClient.post({ url: AdminBlockchainEndPoint.MANUAL_SYNC, data: payload });
  return response.data;
}; 