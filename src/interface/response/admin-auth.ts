export interface IAdmin {
  created_at: string;
  created_by: number;
  email: string;
  full_name: string;
  id: number;
  is_active: boolean;
  last_login: string;
  permissions: string;
  role: "super_admin" | "admin" | "staff"; // Assuming possible roles
  updated_at: string;
  username: string;
}

export interface IAdminLoginResponse {
  admin: IAdmin;
  message: string;
  token: string;
  jwt_token: string;
  session_token: string;
}

export interface IAdminLogoutResponse {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}

export interface IGetAdminProfileResponse extends IAdmin {}

export interface IRefreshAdminTokenResponse {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}
