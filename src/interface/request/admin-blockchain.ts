export interface IUpdateBlockchainSettingsRequest {
  apply_globally: boolean;
  network: string;
  settings: Record<string, any>; // Placeholder for actual settings structure
  updated_reason: string;
}

export interface IGetBlockchainStatisticsRequest {
  network?: string;
  timeframe?: "1h" | "24h" | "7d" | "30d";
}

export interface IManualBlockchainSyncRequest {
  end_block: number;
  force_sync: boolean;
  networks: string[];
  start_block: number;
  sync_reason: string;
  sync_type: string;
}

export interface IGetBlockchainTransactionsRequest {
  page?: number;
  limit?: number;
  user_id?: number;
  network?: string; // ethereum|bsc|bitcoin|tron
  status?: string; // pending|confirmed|failed
  type?: string; // deposit|withdrawal
  start_date?: string; // YYYY-MM-DD
  end_date?: string; // YYYY-MM-DD
} 