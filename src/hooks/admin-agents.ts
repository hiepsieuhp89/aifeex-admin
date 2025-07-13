import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAllAgents,
  getAgentById,
  approveOrRejectAgent,
  createInviteCode,
  getSystemStatistics,
} from "@/api/services/admin-agents.service";

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

const ADMIN_AGENTS_KEYS = {
  ALL_AGENTS: "allAgents",
  AGENT_BY_ID: "agentById",
  SYSTEM_STATISTICS: "systemStatistics",
};

export const useGetAllAgents = (params?: IGetAllAgentsRequest): UseQueryResult<IGetAllAgentsResponse> => {
  return useQuery({
    queryKey: [ADMIN_AGENTS_KEYS.ALL_AGENTS, params],
    queryFn: () => getAllAgents(params),
  });
};

export const useGetAgentById = (id: number): UseQueryResult<IGetAgentByIdResponse> => {
  return useQuery({
    queryKey: [ADMIN_AGENTS_KEYS.AGENT_BY_ID, id],
    queryFn: () => getAgentById(id),
    enabled: !!id,
  });
};

export const useApproveOrRejectAgent = (): UseMutationResult<
  IApproveOrRejectAgentResponse,
  Error,
  { id: number; payload: IApproveOrRejectAgentRequest }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => approveOrRejectAgent(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_AGENTS_KEYS.AGENT_BY_ID, id] });
      queryClient.invalidateQueries({ queryKey: [ADMIN_AGENTS_KEYS.ALL_AGENTS] });
    },
  });
};

export const useCreateInviteCode = (): UseMutationResult<
  ICreateInviteCodeResponse,
  Error,
  ICreateInviteCodeRequest
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createInviteCode(payload),
    onSuccess: () => {
      // Invalidate queries that might be affected by new invite codes, if any
      // For now, no specific invalidation, but can be added later if needed.
    },
  });
};

export const useGetSystemStatistics = (): UseQueryResult<IGetSystemStatisticsResponse> => {
  return useQuery({
    queryKey: [ADMIN_AGENTS_KEYS.SYSTEM_STATISTICS],
    queryFn: getSystemStatistics,
  });
}; 