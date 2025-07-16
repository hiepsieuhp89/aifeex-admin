export interface ICollectWalletRequest {
  dry_run: boolean;
  min_amount: number;
  network: string;
  reason: string;
  token_symbol: string;
  user_ids: number[];
}

export interface IGetWalletUsersRequest {
  page?: number;
  limit?: number;
  network?: string;
}

export interface IWithdrawWalletRequest {
  admin_note: string;
  amount: number;
  network: string;
  reason: string;
  to_address: string;
  token_symbol: string;
}

export interface IGetWithdrawalRequestsRequest {
  page?: number;
  limit?: number;
  user_id?: number;
  network?: string;
  status?: string; // pending|approved|rejected|completed|failed
  start_date?: string; // YYYY-MM-DD
  end_date?: string; // YYYY-MM-DD
}

export interface IApproveOrRejectWithdrawalRequest {
  note: string;
  withdrawal_id: number;
}

export interface IGetPendingWithdrawalsRequest {
  page?: number;
  limit?: number;
} 