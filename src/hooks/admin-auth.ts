import { useMutation, type UseMutationResult, useQuery, type UseQueryResult, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
  adminLogin,
  adminLogout,
  getAdminProfile,
  refreshAdminToken,
} from "@/api/services/admin-auth.service";
import {
  IAdminLoginResponse,
  IAdminLogoutResponse,
  IGetAdminProfileResponse,
  IRefreshAdminTokenResponse,
} from "@/interface/response/admin-auth";
import { IAdminLoginRequest } from "@/interface/request/admin-auth";

const ADMIN_AUTH_KEYS = {
  PROFILE: "adminProfile",
};

export const useAdminLogin = (): UseMutationResult<
  IAdminLoginResponse,
  Error,
  IAdminLoginRequest
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminLogin,
    onSuccess: (data) => {
      Cookies.set("accessToken", data.token, { expires: 7 }); // Store token for 7 days
      queryClient.invalidateQueries({ queryKey: [ADMIN_AUTH_KEYS.PROFILE] });
    },
  });
};

export const useAdminLogout = (): UseMutationResult<IAdminLogoutResponse, Error, void> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminLogout,
    onSuccess: () => {
      Cookies.remove("accessToken");
      queryClient.removeQueries({ queryKey: [ADMIN_AUTH_KEYS.PROFILE] });
    },
  });
};

export const useGetAdminProfile = (): UseQueryResult<IGetAdminProfileResponse> => {
  return useQuery({
    queryKey: [ADMIN_AUTH_KEYS.PROFILE],
    queryFn: getAdminProfile,
    enabled: !!Cookies.get("accessToken"), // Only fetch if token exists
  });
};

export const useRefreshAdminToken = (): UseMutationResult<IRefreshAdminTokenResponse, Error, void> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: refreshAdminToken,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_AUTH_KEYS.PROFILE] });
    },
  });
}; 