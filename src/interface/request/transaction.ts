export enum TransactionStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  REJECTED = "rejected",
  APPROVED = "approved",
  FAILED = "failed",
  CONFIRMED = "confirmed",
}

export enum TransactionType {
  PACKAGE_PURCHASE = "package_purchase",
  PACKAGE_SPREAD = "package_spread",
  PACKAGE_REFUND = "package_refund",
  ORDER_PAYMENT = "order_payment",
  ORDER_PROFIT = "order_profit",
  RECHARGE = "recharge",
  WITHDRAW = "withdraw",
}

export enum TransactionNetwork {
  ETHEREUM = "ethereum",
  BSC = "bsc",
  BITCOIN = "bitcoin",
  TRON = "tron",
}

export interface ITransactionHistoryParams {
  page?: number;
  limit?: number;
  status?: TransactionStatus;
  type?: TransactionType;
  user_id?: string;
  start_date?: string;
  end_date?: string;
  network?: "ethereum" | "bsc" | "bitcoin" | "tron";
}

export interface IRechargeRequest {
  amount: number;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
  withdrawPassword: string;
}

export interface IWithdrawRequest {
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  withdrawPassword: string;
}
