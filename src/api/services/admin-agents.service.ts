import apiClient from "@/api/apiClient";
import {
  IGetAllAgentsResponse,
  IGetAgentByIdResponse,
  IApproveOrRejectAgentResponse,
  ICreateInviteCodeResponse,
  IGetSystemStatisticsResponse,
} from "@/interface/response/admin-agents";
import {
  IGetAllAgentsRequest,
  IApproveOrRejectAgentRequest,
  ICreateInviteCodeRequest,
} from "@/interface/request/admin-agents";
import { AdminAgentsEndPoint } from "./admin-agents";

export const getAllAgents = async (params?: IGetAllAgentsRequest): Promise<IGetAllAgentsResponse> => {
  const response = await apiClient.get({
    url: AdminAgentsEndPoint.GET_ALL_AGENTS,
    params,
  });
  return response.data;
};

export const getAgentById = async (id: number): Promise<IGetAgentByIdResponse> => {
  const response = await apiClient.get({ url: AdminAgentsEndPoint.GET_AGENT_BY_ID(id) });
  return response.data;
};

export const approveOrRejectAgent = async (
  id: number,
  payload: IApproveOrRejectAgentRequest
): Promise<IApproveOrRejectAgentResponse> => {
  const response = await apiClient.patch({ url: AdminAgentsEndPoint.APPROVE_OR_REJECT_AGENT(id), data: payload });
  return response.data;
};

export const createInviteCode = async (payload: ICreateInviteCodeRequest): Promise<ICreateInviteCodeResponse> => {
  const response = await apiClient.post({ url: AdminAgentsEndPoint.CREATE_INVITE_CODE, data: payload });
  return response.data;
};

export const getSystemStatistics = async (): Promise<IGetSystemStatisticsResponse> => {
  const response = await apiClient.get({ url: AdminAgentsEndPoint.GET_SYSTEM_STATISTICS });
  return response.data;
}; 