export interface IAgent {
  id: number;
  account_name: string;
  email: string;
  full_name?: string;
  phone?: string;
  status: 'pending_agency' | 'agency' | 'rejected';
  created_at: string;
  updated_at: string;
  invite_code_id?: number;
  my_invite_code_id?: number;
}

export interface IGetAllAgentsResponse {
  agents: IAgent[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface IGetAgentByIdResponse {
  agent: IAgent;
}

export interface IApproveOrRejectAgentResponse {
  success: boolean;
  message: string;
  agent: IAgent;
}

export interface ICreateInviteCodeResponse {
  success: boolean;
  message: string;
  invite_code: {
    id: number;
    code: string;
    created_at: string;
    expires_at?: string;
    usage_limit?: number;
    used_count: number;
  };
}

export interface IGetSystemStatisticsResponse {
  total_agents: number;
  pending_agents: number;
  approved_agents: number;
  rejected_agents: number;
  total_invite_codes: number;
  active_invite_codes: number;
  total_registrations_today: number;
  total_registrations_this_month: number;
} 