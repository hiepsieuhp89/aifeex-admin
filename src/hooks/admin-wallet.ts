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
} from "@/api/services/admin-wallet.service";

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

const ADMIN_WALLET_KEYS = {
  MASTER_WALLET: "masterWallet",
  TOTAL_WALLET: "totalWallet",
  WALLET_USERS: "walletUsers",
  WALLET_USER_BY_ID: "walletUserById",
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