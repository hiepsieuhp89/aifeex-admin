export const AdminUsersEndPoint = {
  GET_ALL_USERS: "/admin/users",
  GET_USER_STATS: "/admin/users/stats",
  GET_USER_BY_ID: (id: number) => `/admin/users/${id}`,
  UPDATE_USER: (id: number) => `/admin/users/${id}`,
  DELETE_USER: (id: number) => `/admin/users/${id}`,
  BAN_USER: (id: number) => `/admin/users/${id}/ban`,
  UNBAN_USER: (id: number) => `/admin/users/${id}/unban`,
}; 