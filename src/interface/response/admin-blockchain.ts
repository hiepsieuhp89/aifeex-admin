export interface IBlockchainSettings {
  network: string;
  contract_address: string;
  private_key: string;
  rpc_url: string;
  gas_limit: number;
  gas_price: string;
  confirmation_blocks: number;
  auto_sync_enabled: boolean;
  sync_interval: number;
  created_at: string;
  updated_at: string;
}

export interface IGetBlockchainSettingsResponse {
  settings: IBlockchainSettings;
}

export interface IUpdateBlockchainSettingsResponse {
  success: boolean;
  message: string;
  settings: IBlockchainSettings;
}

export interface IBlockchainStatistics {
  total_transactions: number;
  confirmed_transactions: number;
  pending_transactions: number;
  failed_transactions: number;
  total_gas_used: string;
  average_gas_price: string;
  last_sync_time: string;
  current_block_height: number;
  network_status: 'connected' | 'disconnected' | 'syncing';
  wallet_balance: string;
  daily_transaction_count: number;
  weekly_transaction_count: number;
  monthly_transaction_count: number;
}

export interface IGetBlockchainStatisticsResponse {
  statistics: IBlockchainStatistics;
  generated_at: string;
}

export interface IManualBlockchainSyncResponse {
  success: boolean;
  message: string;
  sync_result: {
    processed_blocks: number;
    new_transactions: number;
    updated_transactions: number;
    sync_duration: number;
    last_processed_block: number;
  };
} 