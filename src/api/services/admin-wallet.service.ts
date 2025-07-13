import apiClient from "@/api/apiClient";
import {
  ICollectWalletResponse,
  IGetMasterWalletResponse,
  IProcessWithdrawalsResponse,
  IGetTotalWalletResponse,
  IGetWalletUsersResponse,
  IGetWalletUserByIdResponse,
  IWithdrawWalletResponse,
} from "@/interface/response/admin-wallet";
import {
  ICollectWalletRequest,
  IGetWalletUsersRequest,
  IWithdrawWalletRequest,
} from "@/interface/request/admin-wallet";
import { AdminWalletEndPoint } from "./admin-wallet";

export const collectWallet = async (payload: ICollectWalletRequest): Promise<ICollectWalletResponse> => {
  const response = await apiClient.post({ url: AdminWalletEndPoint.COLLECT, data: payload });
  return response.data;
};

export const getMasterWallet = async (): Promise<IGetMasterWalletResponse> => {
  const response = await apiClient.get({ url: AdminWalletEndPoint.MASTER });
  return response.data;
};

export const processWithdrawals = async (): Promise<IProcessWithdrawalsResponse> => {
  const response = await apiClient.post({ url: AdminWalletEndPoint.PROCESS_WITHDRAWALS });
  return response.data;
};

export const getTotalWallet = async (): Promise<IGetTotalWalletResponse> => {
  const response = await apiClient.get({ url: AdminWalletEndPoint.TOTAL });
  return response.data;
};

export const getWalletUsers = async (params?: IGetWalletUsersRequest): Promise<IGetWalletUsersResponse> => {
  const response = await apiClient.get({
    url: AdminWalletEndPoint.USERS,
    params,
  });
  return response.data;
};

export const getWalletUserById = async (id: number): Promise<IGetWalletUserByIdResponse> => {
  const response = await apiClient.get({ url: AdminWalletEndPoint.USER_BY_ID(id) });
  return response.data;
};

export const withdrawWallet = async (payload: IWithdrawWalletRequest): Promise<IWithdrawWalletResponse> => {
  const response = await apiClient.post({ url: AdminWalletEndPoint.WITHDRAW, data: payload });
  return response.data;
}; 