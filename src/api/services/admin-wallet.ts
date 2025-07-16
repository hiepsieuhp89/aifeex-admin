export const AdminWalletEndPoint = {
  COLLECT: "/admin/wallet/collect",
  MASTER: "/admin/wallet/master",
  PROCESS_WITHDRAWALS: "/admin/wallet/process-withdrawals",
  TOTAL: "/admin/wallet/total",
  USERS: "/admin/wallet/users",
  USER_BY_ID: (id: number) => `/admin/wallet/users/${id}`,
  WITHDRAW: "/admin/wallet/withdraw",
  WITHDRAWAL_REQUESTS: "/admin/withdrawals",
  WITHDRAWAL_REQUEST_DETAIL: (id: number) => `/admin/withdrawals/${id}`,
  APPROVE_WITHDRAWAL: "/admin/transactions/approve",
  REJECT_WITHDRAWAL: "/admin/transactions/reject",
  PENDING_WITHDRAWALS: "/admin/transactions/pending",
}; 