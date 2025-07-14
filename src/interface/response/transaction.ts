import { TransactionStatus, TransactionType } from "../request/transaction";

// Base interface cho metadata phân trang
interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

// Base interface cho response API
interface APIResponse<T> {
  message: string;
  statusCode: number;
  data: {
    items: T[];
    meta: PaginationMeta;
  };
}

// Base interface cho transaction
interface BaseTransaction {
  id: number; // Thay đổi type từ string sang number
  createdAt: string;
  userId: number; // Thay đổi type từ string sang number
  bankAccountNumber: string;
  bankAccountName: string;
  realAmount: number;
  status: string;
}

// Interface cho giao dịch nạp tiền
interface IDepositTransaction extends BaseTransaction {
  type: "recharge"; // Literal type cho nạp tiền
}

// Interface cho giao dịch rút tiền
interface IWithdrawalTransaction extends BaseTransaction {
  type: "cashout"; // Literal type cho rút tiền
}

// Interface cho cập nhật trạng thái
interface IUpdateTransactionStatus {
  status: string;
  note?: string;
}

// Interface cho thống kê
interface IStatisticsSummary {
  totalDeposit: number;
  totalWithdrawal: number;
  totalUsers: number;
}

// Interface cho người nạp tiền nhiều nhất
interface ITopDepositor {
  userId: number; // Thay đổi type từ string sang number
  username: string;
  totalAmount: number;
}

export interface ITransaction {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  money: string;
  status: TransactionStatus;
  description: string;
  type: TransactionType;
  referenceId: string | null;
  userId: string;
  data: any;
}

export interface ITransactionListResponse {
  filters: Filters;
  pagination: Pagination;
  stats: Stats;
  transactions: Transaction[];
}
export interface Filters {}

export interface Pagination {
  has_next: boolean;
  has_previous: boolean;
  limit: number;
  page: number;
  total_count: number;
  total_pages: number;
}

export interface Stats {
  pending_withdrawals: number;
  total_deposit_amount: string;
  total_deposits: number;
  total_withdrawal_amount: string;
  total_withdrawals: number;
}

export interface Transaction {
  amount: string;
  confirmations: number;
  from_address: string;
  id: number;
  network: string;
  status: string;
  timestamp: string;
  to_address: string;
  token: string;
  transaction_hash: string;
  type: string;
  user_email: string;
  user_id: number;
}

export interface ITransactionResponse {
  status: boolean;
  message: string;
  data: ITransaction;
  errors: any | null;
  timestamp: string;
}

export interface IRechargeResponse extends ITransactionListResponse {}

export interface IWithdrawResponse extends ITransactionResponse {}

// Export tất cả các types
export type {
  PaginationMeta,
  APIResponse,
  BaseTransaction,
  IDepositTransaction,
  IWithdrawalTransaction,
  IUpdateTransactionStatus,
  IStatisticsSummary,
  ITopDepositor,
};
