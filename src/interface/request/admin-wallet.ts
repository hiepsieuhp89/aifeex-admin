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