export interface IGetAllUsersRequest {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  vip_tier?: string;
  country?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export interface IUpdateUserRequest {
  account_name?: string;
  city?: string;
  country?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  points?: number;
  status?: string;
  vip_tier?: string;
}

export interface IBanUserRequest {
  admin_notes?: string;
  ban_type?: string;
  duration?: number;
  reason?: string;
} 