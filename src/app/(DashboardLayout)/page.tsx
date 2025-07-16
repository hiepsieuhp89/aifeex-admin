"use client"

import { Box, CircularProgress, Typography } from "@mui/material"
import {
  IconActivity,
  IconCurrencyDollar,
  IconPackage,
  IconTrendingUp,
  IconUsers
} from "@tabler/icons-react"

import {
  useGetAdminDashboard,
  useGetDashboardOverview,
  useGetProfitTrends,
  useGetRecentActivity,
  useGetTopInvestors,
} from "@/hooks/admin-dashboard"

const HomePage = () => {
  // Fetch dashboard data using hooks
  const { data: dashboardData, isLoading: isDashboardLoading, error: dashboardError } = useGetAdminDashboard()
  const { data: overviewData, isLoading: isOverviewLoading, error: overviewError } = useGetDashboardOverview()
  const { data: recentActivity, isLoading: isActivityLoading } = useGetRecentActivity(5)
  const { data: topInvestors, isLoading: isInvestorsLoading } = useGetTopInvestors(5)
  const { data: profitTrends, isLoading: isTrendsLoading } = useGetProfitTrends(30)

  // Loading state
  if (isDashboardLoading || isOverviewLoading) {
    return (
      <Box className="flex items-center justify-center w-full h-64">
        <CircularProgress />
      </Box>
    )
  }

  // Error state
  if (dashboardError || overviewError) {
    return (
      <Box className="flex items-center justify-center w-full h-64">
        <Typography className="text-red-500">Error loading dashboard data</Typography>
      </Box>
    )
  }

  // Extract data with fallbacks
  const overview = overviewData || {
    total_users: 0,
    total_investments: 0,
    active_investments: 0,
    completed_investments: 0,
    total_invested: 0,
    total_profit_generated: 0,
    avg_daily_profit: 0,
    avg_investment_amount: 0,
    total_management_fees: 0,
    total_platform_revenue: 0,
  }

  const dashboard = dashboardData || {
    fund_performance: [],
    overview: overview,
    profit_trends: [],
    recent_activity: [],
    top_investors: [],
  }

  // Calculate derived values
  const totalSales = overview.total_profit_generated + overview.total_management_fees
  const thisMonthSales = profitTrends?.reduce((sum, trend) => sum + trend.total_profit, 0) || 0
  const inHouseSales = overview.total_management_fees
  const sellersSales = overview.total_profit_generated

  return (
    <Box className="px-4 py-6">
      {/* SMTP Configuration Alert */}
      <Box className="mb-6">
        <Box className="flex items-center p-4 text-blue-800 bg-blue-100 rounded-xl">
          <Typography>Vui lòng định cấu hình. Cài đặt SMTP để hoạt động tất cả chức năng gửi email.{" "}</Typography>
          <Typography component="a" href="#" className="pl-1 font-semibold text-blue-800 hover:underline">
            Định cấu hình ngay
          </Typography>
        </Box>
      </Box>

      <Box className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* First Row - Left Column */}
        <Box className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Total Users */}
          <Box className="flex flex-col justify-between h-56 p-6 bg-white shadow-sm rounded-xl">
            <Box className="flex justify-between">
              <Box>
                <Typography variant="h4" className="mb-1 text-3xl font-semibold text-gray-800">
                  {overview.total_users.toLocaleString()}
                </Typography>
                <Typography className="text-sm font-semibold text-gray-500">Total Users</Typography>
              </Box>
              <Box className="mt-2 text-gray-300">
                <IconUsers size={32} />
              </Box>
            </Box>
            <Box>
              <Box className="flex items-center mb-1">
                <Box className="w-2 h-2 mr-2 bg-red-500 rounded-full"></Box>
                <Typography className="text-sm font-semibold">Active Users</Typography>
              </Box>
              <Box className="flex">
                <Typography className="text-sm font-semibold text-gray-600">
                  {overview.active_investments} active investments
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Total Investments */}
          <Box className="flex flex-col justify-between h-56 p-6 bg-white shadow-sm rounded-xl">
            <Box className="flex justify-between">
              <Box>
                <Typography variant="h4" className="mb-1 text-3xl font-semibold text-gray-800">
                  {overview.total_investments.toLocaleString()}
                </Typography>
                <Typography className="text-sm font-semibold text-gray-500">Total Investments</Typography>
              </Box>
              <Box className="mt-2 text-gray-300">
                <IconPackage size={32} />
              </Box>
            </Box>
            <Box>
              {/* Active Investments */}
              <Box className="flex justify-between mb-2">
                <Box className="flex items-center">
                  <Box className="w-2 h-2 mr-2 bg-green-500 rounded-full"></Box>
                  <Typography className="mr-2 text-sm font-semibold truncate">Active</Typography>
                </Box>
                <Typography className="text-sm font-semibold">{overview.active_investments}</Typography>
              </Box>
              {/* Completed Investments */}
              <Box className="flex justify-between">
                <Box className="flex items-center">
                  <Box className="w-2 h-2 mr-2 bg-blue-500 rounded-full"></Box>
                  <Typography className="mr-2 text-sm font-semibold truncate">Completed</Typography>
                </Box>
                <Typography className="text-sm font-semibold">{overview.completed_investments}</Typography>
              </Box>
            </Box>
          </Box>

          {/* Total Invested */}
          <Box className="flex flex-col justify-between h-56 p-6 bg-white shadow-sm rounded-xl">
            <Box className="flex justify-between">
              <Box>
                <Typography variant="h4" className="mb-1 text-3xl font-semibold text-gray-800">
                  ${overview.total_invested.toLocaleString()}
                </Typography>
                <Typography className="text-sm font-semibold text-gray-500">Total Invested</Typography>
              </Box>
              <Box className="mt-2 text-gray-300">
                <IconCurrencyDollar size={32} />
              </Box>
            </Box>
            <Box>
              <Typography className="text-sm font-semibold text-gray-500">
                Avg: ${overview.avg_investment_amount.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          {/* Total Profit */}
          <Box className="flex flex-col justify-between h-56 p-6 bg-white shadow-sm rounded-xl">
            <Box className="flex justify-between">
              <Box>
                <Typography variant="h4" className="mb-1 text-3xl font-semibold text-gray-800">
                  ${overview.total_profit_generated.toLocaleString()}
                </Typography>
                <Typography className="text-sm font-semibold text-gray-500">Total Profit</Typography>
              </Box>
              <Box className="mt-2 text-gray-300">
                <IconTrendingUp size={32} />
              </Box>
            </Box>
            <Box>
              <Typography className="mb-2 text-sm font-semibold text-gray-500">
                Daily Avg: ${overview.avg_daily_profit.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* First Row - Right Column */}
        <Box className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Total Sales */}
          <Box
            className="flex flex-col justify-between p-6 shadow-sm rounded-xl bg-blue-50"
            style={{ height: "470px" }}
          >
            <Box>
              <Typography variant="h4" className="mb-1 text-3xl font-semibold text-blue-500">
                ${totalSales.toLocaleString()}
              </Typography>
              <Typography className="text-sm font-semibold text-blue-500">Total Revenue</Typography>
            </Box>

            <Box className="flex items-center justify-between p-3 text-white bg-blue-500 !rounded-[4px] my-2">
              <Typography className="text-sm font-semibold">This month</Typography>
              <Typography className="text-sm font-semibold">${thisMonthSales.toLocaleString()}</Typography>
            </Box>

            <Box>
              <Typography className="text-sm font-semibold text-blue-500">Revenue Breakdown</Typography>
            </Box>

            <Box className="w-full h-64">
              {/* Chart would go here */}
              <Box className="flex items-center justify-center w-full h-full bg-blue-100 bg-opacity-50 rounded-xl">
                <Typography className="text-center text-blue-300">Profit Trends Chart</Typography>
              </Box>
            </Box>

            <Box>
              {/* Management Fees */}
              <Box className="flex justify-between mb-1">
                <Box className="flex items-center">
                  <Box className="w-2 h-2 mr-2 bg-blue-400 rounded-full"></Box>
                  <Typography className="text-sm font-semibold">Management Fees</Typography>
                </Box>
                <Typography className="text-sm font-semibold">${inHouseSales.toLocaleString()}</Typography>
              </Box>
              {/* Platform Revenue */}
              <Box className="flex justify-between">
                <Box className="flex items-center">
                  <Box className="w-2 h-2 mr-2 bg-green-500 rounded-full"></Box>
                  <Typography className="text-sm font-semibold">Platform Revenue</Typography>
                </Box>
                <Typography className="text-sm font-semibold">${sellersSales.toLocaleString()}</Typography>
              </Box>
            </Box>
          </Box>

          {/* Fund Performance */}
          <Box className="flex flex-col justify-between p-6 bg-white shadow-sm rounded-xl" style={{ height: "470px" }}>
            <Box>
              <Typography variant="h4" className="mb-1 text-3xl font-semibold text-gray-800">
                {dashboard.fund_performance?.length || 0}
              </Typography>
              <Typography className="text-sm font-semibold text-gray-500">Active Funds</Typography>
            </Box>

            <Box>
              {/* Average ROI */}
              <Box className="flex justify-between mb-1">
                <Box className="flex items-center">
                  <Box className="w-2 h-2 mr-2 bg-red-500 rounded-full"></Box>
                  <Typography className="text-sm font-semibold">Avg ROI</Typography>
                </Box>
                <Typography className="text-sm font-semibold">
                  {dashboard.fund_performance?.length > 0 
                    ? `${(dashboard.fund_performance.reduce((sum, fund) => sum + fund.average_roi, 0) / dashboard.fund_performance.length).toFixed(2)}%`
                    : '0%'
                  }
                </Typography>
              </Box>
              {/* Completion Rate */}
              <Box className="flex justify-between">
                <Box className="flex items-center">
                  <Box className="w-2 h-2 mr-2 bg-green-500 rounded-full"></Box>
                  <Typography className="text-sm font-semibold">Completion Rate</Typography>
                </Box>
                <Typography className="text-sm font-semibold">
                  {dashboard.fund_performance?.length > 0 
                    ? `${(dashboard.fund_performance.reduce((sum, fund) => sum + fund.completion_rate, 0) / dashboard.fund_performance.length).toFixed(2)}%`
                    : '0%'
                  }
                </Typography>
              </Box>
            </Box>

            <Box>
              <Box className="flex items-center mb-1">
                <Box className="w-2 h-2 mr-2 bg-yellow-500 rounded-full"></Box>
                <Typography className="text-sm font-semibold">Top Performing Funds</Typography>
              </Box>
              <Box className="flex">
                {dashboard.fund_performance?.slice(0, 3).map((fund, index) => (
                  <Box key={fund.fund_id} className="mr-2">
                    <Typography className="text-xs font-semibold text-gray-600">{fund.fund_name}</Typography>
                  </Box>
                ))}
              </Box>
              <Box className="my-4 border-t border-gray-300 border-dashed"></Box>
            </Box>

            <Box>
              <Box className="p-3 mb-3 text-center text-green-600 transition-colors cursor-pointer rounded-xl bg-green-50 hover:bg-green-100">
                <Typography className="text-sm font-semibold">View All Funds</Typography>
              </Box>
              <Box className="p-3 text-center text-red-600 transition-colors cursor-pointer rounded-xl bg-red-50 hover:bg-red-100">
                <Typography className="text-sm font-semibold">Performance Report</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Second Row - Recent Activity */}
        <Box className="p-6 bg-white shadow-sm rounded-xl">
          <Box className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Box className="flex flex-col gap-3">
              {/* Recent Activity */}
              <Box className="bg-blue-50 rounded-xl p-4 h-[90px] flex items-center justify-between text-blue-500">
                <Box className="flex items-center">
                  <IconActivity size={20} className="mr-3" />
                  <Typography className="text-sm font-semibold text-gray-800">Recent Activity</Typography>
                </Box>
                <Typography variant="h5" className="text-2xl font-semibold">
                  {recentActivity?.length || 0}
                </Typography>
              </Box>

              {/* Top Investors */}
              <Box className="bg-green-50 rounded-xl p-4 h-[90px] flex items-center justify-between text-green-500">
                <Box className="flex items-center">
                  <IconUsers size={20} className="mr-3" />
                  <Typography className="text-sm font-semibold text-gray-800">Top Investors</Typography>
                </Box>
                <Typography variant="h5" className="text-2xl font-semibold">
                  {topInvestors?.length || 0}
                </Typography>
              </Box>

              {/* Profit Trends */}
              <Box className="bg-red-50 rounded-xl p-4 h-[90px] flex items-center justify-between text-red-500">
                <Box className="flex items-center">
                  <IconTrendingUp size={20} className="mr-3" />
                  <Typography className="text-sm font-semibold text-gray-800">Profit Trends</Typography>
                </Box>
                <Typography variant="h5" className="text-2xl font-semibold">
                  {profitTrends?.length || 0}
                </Typography>
              </Box>

              {/* Management Fees */}
              <Box className="bg-yellow-50 rounded-xl p-4 h-[90px] flex items-center justify-between text-yellow-500">
                <Box className="flex items-center">
                  <IconCurrencyDollar size={20} className="mr-3" />
                  <Typography className="text-sm font-semibold text-gray-800">Management Fees</Typography>
                </Box>
                <Typography variant="h5" className="text-2xl font-semibold">
                  ${overview.total_management_fees.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Third Row - Recent Activity Details */}
        <Box className="p-6 bg-white shadow-sm rounded-xl" style={{ height: "474px" }}>
          <Box className="flex items-center justify-between mb-6">
            <Box>
              <Typography variant="h6" className="mb-2 text-base font-semibold text-gray-800">
                Recent Activity
              </Typography>
              <Typography className="text-sm font-semibold text-gray-500">Latest transactions and activities</Typography>
            </Box>

            <Box className="flex space-x-2">
              <Box className="flex items-center px-3 py-1 text-xs font-semibold text-white bg-yellow-500 rounded-full cursor-pointer">
                All
              </Box>
              <Box className="flex items-center px-3 py-1 text-xs font-semibold text-gray-600 rounded-full cursor-pointer hover:bg-gray-100">
                Today
              </Box>
              <Box className="flex items-center px-3 py-1 text-xs font-semibold text-gray-600 rounded-full cursor-pointer hover:bg-gray-100">
                Week
              </Box>
              <Box className="flex items-center px-3 py-1 text-xs font-semibold text-gray-600 rounded-full cursor-pointer hover:bg-gray-100">
                Month
              </Box>
            </Box>
          </Box>
          
          {isActivityLoading ? (
            <Box className="h-[350px] flex items-center justify-center">
              <CircularProgress />
            </Box>
          ) : recentActivity && recentActivity.length > 0 ? (
            <Box className="h-[350px] overflow-y-auto">
              {recentActivity.map((activity) => (
                <Box key={activity.id} className="flex items-center justify-between p-3 mb-3 border border-gray-200 rounded-lg">
                  <Box className="flex items-center">
                    <Box className="w-3 h-3 mr-3 bg-blue-500 rounded-full"></Box>
                    <Box>
                      <Typography className="text-sm font-semibold text-gray-800">
                        {activity.username} - {activity.description}
                      </Typography>
                      <Typography className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography className="text-sm font-semibold text-green-600">
                    ${activity.amount.toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Box className="h-[350px] flex items-center justify-center text-gray-400">
              No recent activity available
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default HomePage


