"use client"

import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Chip
} from "@mui/material"
import {
  IconUsers,
  IconUserCheck,
  IconUserX,
  IconUserPlus,
  IconTicket,
  IconCalendar,
  IconTrendingUp,
  IconChartBar
} from "@tabler/icons-react"

import { useGetSystemStatistics } from "@/hooks/admin-agents"

interface StatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  color: string
  bgColor: string
}

function StatCard({ title, value, icon, color, bgColor }: StatCardProps) {
  return (
    <Card className="h-full shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <Box className="flex items-center justify-between">
          <Box>
            <Typography variant="h6" className="text-gray-600 mb-2">
              {title}
            </Typography>
            <Typography variant="h3" className={`font-bold ${color}`}>
              {value.toLocaleString()}
            </Typography>
          </Box>
          <Box className={`p-3 rounded-full ${bgColor}`}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default function AgentStatisticsPage() {
  const { data: statistics, isLoading, error } = useGetSystemStatistics()

  if (isLoading) {
    return (
      <Box className="flex items-center justify-center w-full h-64">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box className="flex items-center justify-center w-full h-64 flex-col gap-4">
        <Typography className="text-red-500">Có lỗi xảy ra khi tải thống kê hệ thống</Typography>
      </Box>
    )
  }

  const stats = statistics || {
    total_agents: 0,
    pending_agents: 0,
    approved_agents: 0,
    rejected_agents: 0,
    total_invite_codes: 0,
    active_invite_codes: 0,
    total_registrations_today: 0,
    total_registrations_this_month: 0
  }

  return (
    <Box>
      <Box className="flex items-center gap-2 mb-6">
        <IconChartBar size={32} className="text-blue-600" />
        <Typography variant="h4" className="font-bold text-gray-800">
          Thống kê hệ thống đại lý
        </Typography>
      </Box>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Agent Statistics */}
        <StatCard
          title="Tổng số đại lý"
          value={stats.total_agents}
          icon={<IconUsers size={32} className="text-blue-600" />}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />

        <StatCard
          title="Đại lý đã phê duyệt"
          value={stats.approved_agents}
          icon={<IconUserCheck size={32} className="text-green-600" />}
          color="text-green-600"
          bgColor="bg-green-100"
        />

        <StatCard
          title="Đại lý chờ duyệt"
          value={stats.pending_agents}
          icon={<IconUserPlus size={32} className="text-yellow-600" />}
          color="text-yellow-600"
          bgColor="bg-yellow-100"
        />

        <StatCard
          title="Đại lý bị từ chối"
          value={stats.rejected_agents}
          icon={<IconUserX size={32} className="text-red-600" />}
          color="text-red-600"
          bgColor="bg-red-100"
        />

        {/* Invite Code Statistics */}
        <StatCard
          title="Tổng mã mời"
          value={stats.total_invite_codes}
          icon={<IconTicket size={32} className="text-purple-600" />}
          color="text-purple-600"
          bgColor="bg-purple-100"
        />

        <StatCard
          title="Mã mời hoạt động"
          value={stats.active_invite_codes}
          icon={<IconTicket size={32} className="text-green-600" />}
          color="text-green-600"
          bgColor="bg-green-100"
        />

        {/* Registration Statistics */}
        <StatCard
          title="Đăng ký hôm nay"
          value={stats.total_registrations_today}
          icon={<IconCalendar size={32} className="text-orange-600" />}
          color="text-orange-600"
          bgColor="bg-orange-100"
        />

        <StatCard
          title="Đăng ký tháng này"
          value={stats.total_registrations_this_month}
          icon={<IconTrendingUp size={32} className="text-indigo-600" />}
          color="text-indigo-600"
          bgColor="bg-indigo-100"
        />
      </div>

      {/* Summary Card */}
      <div className="mt-6">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Typography variant="h5" className="font-bold text-gray-800 mb-4">
              Tóm tắt hiệu suất
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Box className="text-center p-4 bg-gray-50 rounded-lg">
                <Typography variant="h6" className="text-gray-600 mb-2">
                  Tỷ lệ phê duyệt
                </Typography>
                <Typography variant="h4" className="font-bold text-green-600">
                  {stats.total_agents > 0 
                    ? Math.round((stats.approved_agents / stats.total_agents) * 100)
                    : 0}%
                </Typography>
              </Box>
              <Box className="text-center p-4 bg-gray-50 rounded-lg">
                <Typography variant="h6" className="text-gray-600 mb-2">
                  Tỷ lệ từ chối
                </Typography>
                <Typography variant="h4" className="font-bold text-red-600">
                  {stats.total_agents > 0 
                    ? Math.round((stats.rejected_agents / stats.total_agents) * 100)
                    : 0}%
                </Typography>
              </Box>
              <Box className="text-center p-4 bg-gray-50 rounded-lg">
                <Typography variant="h6" className="text-gray-600 mb-2">
                  Mã mời hoạt động
                </Typography>
                <Typography variant="h4" className="font-bold text-purple-600">
                  {stats.total_invite_codes > 0 
                    ? Math.round((stats.active_invite_codes / stats.total_invite_codes) * 100)
                    : 0}%
                </Typography>
              </Box>
            </div>
          </CardContent>
        </Card>
      </div>
    </Box>
  )
} 