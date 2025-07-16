import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";

import {
  collectWallet,
  getMasterWallet,
  processWithdrawals,
  getTotalWallet,
  getWalletUsers,
  getWalletUserById,
  withdrawWallet,
  getWithdrawalRequests,
  getWithdrawalRequestDetail,
  approveWithdrawal,
  rejectWithdrawal,
  getPendingWithdrawals,
} from "@/api/services/admin-wallet.service";

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

const ADMIN_WALLET_KEYS = {
  MASTER_WALLET: "masterWallet",
  TOTAL_WALLET: "totalWallet",
  WALLET_USERS: "walletUsers",
  WALLET_USER_BY_ID: "walletUserById",
  WITHDRAWAL_REQUESTS: "withdrawalRequests",
  WITHDRAWAL_REQUEST_DETAIL: "withdrawalRequestDetail",
  PENDING_WITHDRAWALS: "pendingWithdrawals",
};

export const useCollectWallet = (): UseMutationResult<
  ICollectWalletResponse,
  Error,
  ICollectWalletRequest
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: collectWallet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_WALLET_KEYS.MASTER_WALLET] });
      queryClient.invalidateQueries({ queryKey: [ADMIN_WALLET_KEYS.TOTAL_WALLET] });
      queryClient.invalidateQueries({ queryKey: [ADMIN_WALLET_KEYS.WALLET_USERS] });
    },
  });
};

export const useGetMasterWallet = (): UseQueryResult<IGetMasterWalletResponse> => {
  return useQuery({
    queryKey: [ADMIN_WALLET_KEYS.MASTER_WALLET],
    queryFn: getMasterWallet,
  });
};

export const useProcessWithdrawals = (): UseMutationResult<IProcessWithdrawalsResponse, Error, void> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: processWithdrawals,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_WALLET_KEYS.MASTER_WALLET] });
      queryClient.invalidateQueries({ queryKey: [ADMIN_WALLET_KEYS.TOTAL_WALLET] });
      queryClient.invalidateQueries({ queryKey: [ADMIN_WALLET_KEYS.WALLET_USERS] });
    },
  });
};

export const useGetTotalWallet = (): UseQueryResult<IGetTotalWalletResponse> => {
  return useQuery({
    queryKey: [ADMIN_WALLET_KEYS.TOTAL_WALLET],
    queryFn: getTotalWallet,
  });
};

export const useGetWalletUsers = (
  params?: IGetWalletUsersRequest
): UseQueryResult<IGetWalletUsersResponse> => {
  return useQuery({
    queryKey: [ADMIN_WALLET_KEYS.WALLET_USERS, params],
    queryFn: () => getWalletUsers(params),
  });
};

export const useGetWalletUserById = (
  id: number
): UseQueryResult<IGetWalletUserByIdResponse> => {
  return useQuery({
    queryKey: [ADMIN_WALLET_KEYS.WALLET_USER_BY_ID, id],
    queryFn: () => getWalletUserById(id),
    enabled: !!id,
  });
};

export const useWithdrawWallet = (): UseMutationResult<
  IWithdrawWalletResponse,
  Error,
  IWithdrawWalletRequest
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: withdrawWallet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_WALLET_KEYS.MASTER_WALLET] });
      queryClient.invalidateQueries({ queryKey: [ADMIN_WALLET_KEYS.TOTAL_WALLET] });
      queryClient.invalidateQueries({ queryKey: [ADMIN_WALLET_KEYS.WALLET_USERS] });
      // Invalidate specific user wallet if applicable
    },
  });
};

export const useGetWithdrawalRequests = (
  params?: IGetWithdrawalRequestsRequest
): UseQueryResult<IGetWithdrawalRequestsResponse> => {
  return useQuery({
    queryKey: [ADMIN_WALLET_KEYS.WITHDRAWAL_REQUESTS, params],
    queryFn: () => getWithdrawalRequests(params),
  });
};

export const useGetWithdrawalRequestDetail = (
  id: number
): UseQueryResult<IGetWithdrawalRequestDetailResponse> => {
  return useQuery({
    queryKey: [ADMIN_WALLET_KEYS.WITHDRAWAL_REQUEST_DETAIL, id],
    queryFn: () => getWithdrawalRequestDetail(id),
    enabled: !!id,
  });
};

export const useApproveWithdrawal = (): UseMutationResult<
  IApproveOrRejectWithdrawalResponse,
  Error,
  IApproveOrRejectWithdrawalRequest
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveWithdrawal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_WALLET_KEYS.PENDING_WITHDRAWALS] });
      queryClient.invalidateQueries({ queryKey: [ADMIN_WALLET_KEYS.WITHDRAWAL_REQUESTS] });
    },
  });
};

export const useRejectWithdrawal = (): UseMutationResult<
  IApproveOrRejectWithdrawalResponse,
  Error,
  IApproveOrRejectWithdrawalRequest
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectWithdrawal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_WALLET_KEYS.PENDING_WITHDRAWALS] });
      queryClient.invalidateQueries({ queryKey: [ADMIN_WALLET_KEYS.WITHDRAWAL_REQUESTS] });
    },
  });
};

export const useGetPendingWithdrawals = (
  params?: IGetPendingWithdrawalsRequest
): UseQueryResult<IGetPendingWithdrawalsResponse> => {
  return useQuery({
    queryKey: [ADMIN_WALLET_KEYS.PENDING_WITHDRAWALS, params],
    queryFn: () => getPendingWithdrawals(params),
  });
}; 