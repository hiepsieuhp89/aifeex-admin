export interface IGetAllAgentsRequest {
  page?: number;
  limit?: number;
  status?: "pending_agency" | "agency" | "rejected";
}

export interface IApproveOrRejectAgentRequest {
  agent_id: number;
  approve: boolean;
  rejected_reason?: string;
}

export interface ICreateInviteCodeRequest {
  [key: string]: any;
} 