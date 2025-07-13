import apiClient from "@/api/apiClient";
import {
  IGetAllUsersResponse,
  IGetUserStatsResponse,
  IGetUserByIdResponse,
  IUpdateUserResponse,
  IDeleteUserResponse,
  IBanUserResponse,
  IUnbanUserResponse,
} from "@/interface/response/admin-users";
import {
  IGetAllUsersRequest,
  IUpdateUserRequest,
  IBanUserRequest,
} from "@/interface/request/admin-users";
import { AdminUsersEndPoint } from "./admin-users";

export const getAllUsers = async (params?: IGetAllUsersRequest): Promise<IGetAllUsersResponse> => {
  const response = await apiClient.get({
    url: AdminUsersEndPoint.GET_ALL_USERS,
    params,
  });
  return response.data;
};

export const getUserStats = async (): Promise<IGetUserStatsResponse> => {
  const response = await apiClient.get({ url: AdminUsersEndPoint.GET_USER_STATS });
  return response.data;
};

export const getUserById = async (id: number): Promise<IGetUserByIdResponse> => {
  const response = await apiClient.get({ url: AdminUsersEndPoint.GET_USER_BY_ID(id) });
  return response.data;
};

export const updateUser = async (
  id: number,
  payload: IUpdateUserRequest
): Promise<IUpdateUserResponse> => {
  const response = await apiClient.put({ url: AdminUsersEndPoint.UPDATE_USER(id), data: payload });
  return response.data;
};

export const deleteUser = async (id: number): Promise<IDeleteUserResponse> => {
  const response = await apiClient.delete({ url: AdminUsersEndPoint.DELETE_USER(id) });
  return response.data;
};

export const banUser = async (id: number, payload: IBanUserRequest): Promise<IBanUserResponse> => {
  const response = await apiClient.post({ url: AdminUsersEndPoint.BAN_USER(id), data: payload });
  return response.data;
};

export const unbanUser = async (id: number): Promise<IUnbanUserResponse> => {
  const response = await apiClient.post({ url: AdminUsersEndPoint.UNBAN_USER(id) });
  return response.data;
}; 