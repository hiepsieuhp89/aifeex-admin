export interface IDeletedAt {
  time: string;
  valid: boolean;
}

export interface IInviteCode {
  code: string;
  created_at: string;
  deleted_at: IDeletedAt;
  id: number;
  is_active: boolean;
  owner_id: number;
  owner_type: string;
  updated_at: string;
  usage_count: number;
  usage_limit: number;
}

export interface IUser {
  account_name: string;
  avatar_url: string;
  ban_reason: string;
  banned_until: string;
  city: string;
  country: string;
  created_at: string;
  current_level: number;
  email: string;
  full_name: string;
  id: number;
  invite_code_id: number;
  is_active: boolean;
  is_banned: boolean;
  language: string;
  last_login: string;
  login_count: number;
  my_invite_code: IInviteCode;
  my_invite_code_id: number;
  notification_enabled: boolean;
  phone: string;
  referrals: string[];
  role: string;
  total_points: number;
  updated_at: string;
  used_invite_code: IInviteCode;
  vip_tier: string;
  voice_enabled: boolean;
}

export interface IGetAllUsersResponse {
  pagination: {
    limit: number;
    page: number;
    total: number;
    total_pages: number;
  };
  users: IUser[];
}

export interface IGetUserStatsResponse {
  active_users: number;
  banned_users: number;
  country_distribution: Record<string, number>;
  generated_at: string;
  new_users_this_month: number;
  new_users_this_week: number;
  new_users_today: number;
  total_users: number;
  vip_distribution: Record<string, number>;
}

export interface IGetUserByIdResponse extends IUser {}

export interface IUpdateUserResponse extends IUser {}

export interface IDeleteUserResponse {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}

export interface IBanUserResponse {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}

export interface IUnbanUserResponse {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
} 