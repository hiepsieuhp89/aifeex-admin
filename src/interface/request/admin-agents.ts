export interface IGetAllAgentsRequest {
  page?: number;
  limit?: number;
  search?: string;
  status?: "pending_agency" | "agency" | "rejected";
}

export interface IApproveOrRejectAgentRequest {
  approve: boolean;
  rejected_reason?: string;
}

export interface ICreateInviteCodeRequest {
  expires_at?: string;
  usage_limit?: number;
  notes?: string;
} 