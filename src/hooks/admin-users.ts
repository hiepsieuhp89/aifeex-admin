import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAllUsers,
  getUserStats,
  getUserById,
  updateUser,
  deleteUser,
  banUser,
  unbanUser,
} from "@/api/services/admin-users.service";

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

const ADMIN_USERS_KEYS = {
  ALL_USERS: "allUsers",
  USER_STATS: "userStats",
  USER_BY_ID: "userById",
};

export const useGetAllUsers = (
  params?: IGetAllUsersRequest
): UseQueryResult<IGetAllUsersResponse> => {
  return useQuery({
    queryKey: [ADMIN_USERS_KEYS.ALL_USERS, params],
    queryFn: () => getAllUsers(params),
  });
};

export const useGetUserStats = (): UseQueryResult<IGetUserStatsResponse> => {
  return useQuery({
    queryKey: [ADMIN_USERS_KEYS.USER_STATS],
    queryFn: getUserStats,
  });
};

export const useGetUserById = (id: number): UseQueryResult<IGetUserByIdResponse> => {
  return useQuery({
    queryKey: [ADMIN_USERS_KEYS.USER_BY_ID, id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};

export const useUpdateUser = (): UseMutationResult<
  IUpdateUserResponse,
  Error,
  { id: number; payload: IUpdateUserRequest }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateUser(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_USERS_KEYS.USER_BY_ID, id] });
      queryClient.invalidateQueries({ queryKey: [ADMIN_USERS_KEYS.ALL_USERS] });
      queryClient.invalidateQueries({ queryKey: [ADMIN_USERS_KEYS.USER_STATS] });
    },
  });
};

export const useDeleteUser = (): UseMutationResult<IDeleteUserResponse, Error, number> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_USERS_KEYS.ALL_USERS] });
      queryClient.invalidateQueries({ queryKey: [ADMIN_USERS_KEYS.USER_STATS] });
    },
  });
};

export const useBanUser = (): UseMutationResult<
  IBanUserResponse,
  Error,
  { id: number; payload: IBanUserRequest }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => banUser(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_USERS_KEYS.USER_BY_ID, id] });
      queryClient.invalidateQueries({ queryKey: [ADMIN_USERS_KEYS.ALL_USERS] });
      queryClient.invalidateQueries({ queryKey: [ADMIN_USERS_KEYS.USER_STATS] });
    },
  });
};

export const useUnbanUser = (): UseMutationResult<IUnbanUserResponse, Error, number> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => unbanUser(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_USERS_KEYS.USER_BY_ID, id] });
      queryClient.invalidateQueries({ queryKey: [ADMIN_USERS_KEYS.ALL_USERS] });
      queryClient.invalidateQueries({ queryKey: [ADMIN_USERS_KEYS.USER_STATS] });
    },
  });
}; 