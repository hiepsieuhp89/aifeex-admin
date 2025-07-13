export interface IAdvancedStatsResponse {
  additionalProp1: Record<string, any>; // Placeholder for actual structure
}

export interface IFundPerformance {
  active_investments: number;
  average_roi: number;
  completion_rate: number;
  fund_id: number;
  fund_name: string;
  popularity_score: number;
  profit_margin: number;
  total_invested: number;
  total_investments: number;
  total_profit_generated: number;
}

export interface IDashboardOverview {
  active_investments: number;
  avg_daily_profit: number;
  avg_investment_amount: number;
  completed_investments: number;
  total_invested: number;
  total_investments: number;
  total_management_fees: number;
  total_platform_revenue: number;
  total_profit_generated: number;
  total_users: number;
}

export interface IProfitTrend {
  date: string;
  management_fees: number;
  new_investments: number;
  platform_revenue: number;
  total_profit: number;
  user_return: number;
}

export interface IRecentActivity {
  amount: number;
  description: string;
  fund_id: number;
  fund_name: string;
  id: number;
  timestamp: string;
  type: string;
  user_id: number;
  username: string;
}

export interface ITopInvestor {
  active_investments: number;
  email: string;
  join_date: string;
  last_activity: string;
  total_invested: number;
  total_profit: number;
  user_id: number;
  username: string;
}

export interface IAdminDashboardResponse {
  fund_performance: IFundPerformance[];
  overview: IDashboardOverview;
  profit_trends: IProfitTrend[];
  recent_activity: IRecentActivity[];
  top_investors: ITopInvestor[];
}

export interface IManualProfitGenerationResponse {
  additionalProp1: Record<string, any>; // Placeholder for actual structure
}

export interface IFundPerformanceListResponse extends Array<IFundPerformance> {}
export interface IProfitTrendListResponse extends Array<IProfitTrend> {}
export interface IRecentActivityListResponse extends Array<IRecentActivity> {}
export interface ITopInvestorListResponse extends Array<ITopInvestor> {} 