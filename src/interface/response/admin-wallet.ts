export interface ICollectWalletResponse {
  additionalProp1: Record<string, any>; // Placeholder for actual structure
}

export interface IGetMasterWalletResponse {
  additionalProp1: Record<string, any>; // Placeholder for actual structure
}

export interface IProcessWithdrawalsResponse {
  additionalProp1: Record<string, any>; // Placeholder for actual structure
}

export interface IGetTotalWalletResponse {
  additionalProp1: Record<string, any>; // Placeholder for actual structure
}

export interface IGetWalletUsersResponse {
  additionalProp1: Record<string, any>; // Placeholder for actual structure
}

export interface IGetWalletUserByIdResponse {
  additionalProp1: Record<string, any>; // Placeholder for actual structure
}

export interface IWithdrawWalletResponse {
  additionalProp1: Record<string, any>; // Placeholder for actual structure
}

export interface IWithdrawalRequest {
  id: number;
  user_id: number;
  user_email: string;
  amount: string;
  network: string;
  status: string;
  from_address: string;
  to_address: string;
  token: string;
  transaction_hash: string;
  confirmations: number;
  timestamp: string;
  type: string;
}

export interface IWithdrawalRequestsStats {
  pending_withdrawals: number;
  total_deposit_amount: string;
  total_deposits: number;
  total_withdrawal_amount: string;
  total_withdrawals: number;
}

export interface IWithdrawalRequestsPagination {
  has_next: boolean;
  has_previous: boolean;
  limit: number;
  page: number;
  total_count: number;
  total_pages: number;
}

export interface IGetWithdrawalRequestsResponse {
  filters: Record<string, any>;
  pagination: IWithdrawalRequestsPagination;
  stats: IWithdrawalRequestsStats;
  withdrawal_requests: IWithdrawalRequest[];
}

export interface IGetWithdrawalRequestDetailResponse {
  withdrawal_request: IWithdrawalRequest;
}

export interface IApproveOrRejectWithdrawalResponse {
  success: boolean;
  message: string;
}

export interface IGetPendingWithdrawalsResponse {
  pending_withdrawals: IWithdrawalRequest[];
  pagination: IWithdrawalRequestsPagination;
} 