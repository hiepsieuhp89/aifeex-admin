import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getBlockchainSettings,
  updateBlockchainSettings,
  getBlockchainStatistics,
  manualBlockchainSync,
} from "@/api/services/admin-blockchain.service";

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

const ADMIN_BLOCKCHAIN_KEYS = {
  SETTINGS: "blockchainSettings",
  STATISTICS: "blockchainStatistics",
};

export const useGetBlockchainSettings = (): UseQueryResult<IGetBlockchainSettingsResponse> => {
  return useQuery({
    queryKey: [ADMIN_BLOCKCHAIN_KEYS.SETTINGS],
    queryFn: getBlockchainSettings,
  });
};

export const useUpdateBlockchainSettings = (): UseMutationResult<
  IUpdateBlockchainSettingsResponse,
  Error,
  IUpdateBlockchainSettingsRequest
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBlockchainSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_BLOCKCHAIN_KEYS.SETTINGS] });
    },
  });
};

export const useGetBlockchainStatistics = (
  params?: IGetBlockchainStatisticsRequest
): UseQueryResult<IGetBlockchainStatisticsResponse> => {
  return useQuery({
    queryKey: [ADMIN_BLOCKCHAIN_KEYS.STATISTICS, params],
    queryFn: () => getBlockchainStatistics(params),
  });
};

export const useManualBlockchainSync = (): UseMutationResult<
  IManualBlockchainSyncResponse,
  Error,
  IManualBlockchainSyncRequest
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: manualBlockchainSync,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_BLOCKCHAIN_KEYS.STATISTICS] });
      // Depending on what a manual sync affects, you might want to invalidate other relevant queries.
    },
  });
}; 