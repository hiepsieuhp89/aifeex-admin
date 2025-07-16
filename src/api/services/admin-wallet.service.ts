import apiClient from "@/api/apiClient";
import {
  ICollectWalletResponse,
  IGetMasterWalletResponse,
  IProcessWithdrawalsResponse,
  IGetTotalWalletResponse,
  IGetWalletUsersResponse,
  IGetWalletUserByIdResponse,
  IWithdrawWalletResponse,
  IGetWithdrawalRequestsResponse,
  IGetWithdrawalRequestDetailResponse,
  IApproveOrRejectWithdrawalResponse,
  IGetPendingWithdrawalsResponse,
} from "@/interface/response/admin-wallet";
import {
  ICollectWalletRequest,
  IGetWalletUsersRequest,
  IWithdrawWalletRequest,
  IGetWithdrawalRequestsRequest,
  IApproveOrRejectWithdrawalRequest,
  IGetPendingWithdrawalsRequest,
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

export const getWithdrawalRequests = async (
  params?: IGetWithdrawalRequestsRequest
): Promise<IGetWithdrawalRequestsResponse> => {
  const response = await apiClient.get({
    url: AdminWalletEndPoint.WITHDRAWAL_REQUESTS,
    params,
  });
  return response.data;
};

export const getWithdrawalRequestDetail = async (
  id: number
): Promise<IGetWithdrawalRequestDetailResponse> => {
  const response = await apiClient.get({
    url: AdminWalletEndPoint.WITHDRAWAL_REQUEST_DETAIL(id),
  });
  return response.data;
};

export const approveWithdrawal = async (
  payload: IApproveOrRejectWithdrawalRequest
): Promise<IApproveOrRejectWithdrawalResponse> => {
  const response = await apiClient.post({
    url: AdminWalletEndPoint.APPROVE_WITHDRAWAL,
    data: payload,
  });
  return response.data;
};

export const rejectWithdrawal = async (
  payload: IApproveOrRejectWithdrawalRequest
): Promise<IApproveOrRejectWithdrawalResponse> => {
  const response = await apiClient.post({
    url: AdminWalletEndPoint.REJECT_WITHDRAWAL,
    data: payload,
  });
  return response.data;
};

export const getPendingWithdrawals = async (
  params?: IGetPendingWithdrawalsRequest
): Promise<IGetPendingWithdrawalsResponse> => {
  const response = await apiClient.get({
    url: AdminWalletEndPoint.PENDING_WITHDRAWALS,
    params,
  });
  return response.data;
}; 