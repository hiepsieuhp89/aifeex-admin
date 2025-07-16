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
  getBlockchainTransactions,
  getBlockchainTransactionDetail,
} from "@/api/services/admin-blockchain.service";

import {
  IGetBlockchainSettingsResponse,
  IUpdateBlockchainSettingsResponse,
  IGetBlockchainStatisticsResponse,
  IManualBlockchainSyncResponse,
  IGetBlockchainTransactionsResponse,
  IGetBlockchainTransactionDetailResponse,
} from "@/interface/response/admin-blockchain";
import {
  IUpdateBlockchainSettingsRequest,
  IGetBlockchainStatisticsRequest,
  IManualBlockchainSyncRequest,
  IGetBlockchainTransactionsRequest,
} from "@/interface/request/admin-blockchain";

const ADMIN_BLOCKCHAIN_KEYS = {
  SETTINGS: "blockchainSettings",
  STATISTICS: "blockchainStatistics",
  TRANSACTIONS: "blockchainTransactions",
  TRANSACTION_DETAIL: "blockchainTransactionDetail",
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

export const useGetBlockchainTransactions = (
  params?: IGetBlockchainTransactionsRequest
): UseQueryResult<IGetBlockchainTransactionsResponse> => {
  return useQuery({
    queryKey: [ADMIN_BLOCKCHAIN_KEYS.TRANSACTIONS, params],
    queryFn: () => getBlockchainTransactions(params),
  });
};

export const useGetBlockchainTransactionDetail = (
  id: number
): UseQueryResult<IGetBlockchainTransactionDetailResponse> => {
  return useQuery({
    queryKey: [ADMIN_BLOCKCHAIN_KEYS.TRANSACTION_DETAIL, id],
    queryFn: () => getBlockchainTransactionDetail(id),
    enabled: !!id,
  });
}; 