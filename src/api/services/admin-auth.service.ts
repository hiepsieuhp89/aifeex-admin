import apiClient from "@/api/apiClient";
import {
  IAdminLoginResponse,
  IAdminLogoutResponse,
  IGetAdminProfileResponse,
  IRefreshAdminTokenResponse,
} from "@/interface/response/admin-auth";
import { IAdminLoginRequest } from "@/interface/request/admin-auth";
import { AdminAuthEndPoint } from "./admin-auth";

export const adminLogin = async (payload: IAdminLoginRequest): Promise<IAdminLoginResponse> => {
  const response = await apiClient.post({ url: AdminAuthEndPoint.LOGIN, data: payload });
  return response.data;
};

export const adminLogout = async (): Promise<IAdminLogoutResponse> => {
  const response = await apiClient.post({ url: AdminAuthEndPoint.LOGOUT });
  return response.data;
};

export const getAdminProfile = async (): Promise<IGetAdminProfileResponse> => {
  const response = await apiClient.get({ url: AdminAuthEndPoint.PROFILE });
  return response.data;
};

export const refreshAdminToken = async (): Promise<IRefreshAdminTokenResponse> => {
  const response = await apiClient.post({ url: AdminAuthEndPoint.REFRESH_TOKEN });
  return response.data;
}; 