export const AdminAgentsEndPoint = {
  GET_ALL_AGENTS: "/admin/agents",
  GET_AGENT_BY_ID: (id: number) => `/admin/agents/${id}`,
  APPROVE_OR_REJECT_AGENT: (id: number) => `/admin/agents/${id}/approve`,
  CREATE_INVITE_CODE: "/admin/invite-codes",
  GET_SYSTEM_STATISTICS: "/admin/stats",
}; 