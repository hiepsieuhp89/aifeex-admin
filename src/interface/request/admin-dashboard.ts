export interface IGetFundPerformanceRequest {
  end_date: string;
  fund_id: number;
  period: "weekly" | "monthly" | "quarterly" | "yearly";
  start_date: string;
} 