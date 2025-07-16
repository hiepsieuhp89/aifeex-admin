"use client"

import DataTable from "@/components/DataTable"
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Menu,
  Select,
  TableCell,
  TableRow,
  TextField,
  Typography
} from "@mui/material"
import { 
  IconEye, 
  IconSearch, 
  IconCheck, 
  IconX, 
  IconDotsVertical, 
  IconMoodSadDizzy, 
  IconUserStar,
  IconPlus
} from "@tabler/icons-react"
import { message } from "antd"
import { useRouter } from "next/navigation"
import { useState } from "react"
import dayjs from 'dayjs'

import {
  useGetAllAgents,
  useApproveOrRejectAgent,
} from "@/hooks/admin-agents"
import { IAgent } from "@/interface/response/admin-agents"

export default function AgentsPage() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"pending_agency" | "agency" | "rejected" | "">("")
  const [actionDialogOpen, setActionDialogOpen] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null)
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [menuAgentId, setMenuAgentId] = useState<number | null>(null)

  const { data: agentData, isLoading, error } = useGetAllAgents({
    page,
    limit: rowsPerPage,
    search: searchTerm,
    status: statusFilter || undefined
  })

  const approveOrRejectMutation = useApproveOrRejectAgent()

  const filteredAgents: IAgent[] = agentData?.agents || []
  const pagination = {
    page: agentData?.pagination?.page || 1,
    take: agentData?.pagination?.limit || 10,
    itemCount: agentData?.pagination?.total || 0,
    pageCount: agentData?.pagination?.total_pages || 1,
    hasPreviousPage: (agentData?.pagination?.page || 1) > 1,
    hasNextPage: (agentData?.pagination?.page || 1) < (agentData?.pagination?.total_pages || 1)
  }

  const handleView = (id: number) => {
    router.push(`/admin/agents/${id}`)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, agentId: number) => {
    setAnchorEl(event.currentTarget)
    setMenuAgentId(agentId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setMenuAgentId(null)
  }

  const openActionDialog = (agentId: number, action: 'approve' | 'reject') => {
    setSelectedAgent(agentId)
    setActionType(action)
    setActionDialogOpen(true)
    handleMenuClose()
  }

  const handleActionConfirm = async () => {
    if (!selectedAgent) return

    try {
      await approveOrRejectMutation.mutateAsync({
        id: selectedAgent,
        payload: { 
          approve: actionType === 'approve',
          rejected_reason: actionType === 'reject' ? 'Không đủ điều kiện' : undefined
        }
      })
      message.success(`Đại lý đã được ${actionType === 'approve' ? 'phê duyệt' : 'từ chối'} thành công!`)
      setActionDialogOpen(false)
      setSelectedAgent(null)
    } catch (error) {
      message.error(`Không thể ${actionType === 'approve' ? 'phê duyệt' : 'từ chối'} đại lý. Vui lòng thử lại.`)
      console.error(error)
    }
  }

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'agency':
        return <Chip label="Đã phê duyệt" color="success" size="small" />
      case 'rejected':
        return <Chip label="Đã từ chối" color="error" size="small" />
      case 'pending_agency':
        return <Chip label="Chờ duyệt" color="warning" size="small" />
      default:
        return <Chip label={status} size="small" />
    }
  }

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
        <IconMoodSadDizzy size={64} className="text-gray-400" />
        <Typography className="text-gray-500">Có lỗi xảy ra khi tải dữ liệu đại lý</Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Box className="flex justify-between items-center mb-6">
        <Box className="flex items-center gap-2">
          <IconUserStar size={32} className="text-blue-600" />
          <Typography variant="h4" className="font-bold text-gray-800">
            Quản lý đại lý
          </Typography>
        </Box>
      </Box>

      <DataTable
        columns={[
          { key: "id", label: "ID", width: "80px" },
          { key: "account_name", label: "Tên tài khoản", width: "150px" },
          { key: "email", label: "Email", width: "200px" },
          { key: "full_name", label: "Họ tên", width: "180px" },
          { key: "phone", label: "Số điện thoại", width: "120px" },
          { key: "status", label: "Trạng thái", width: "120px" },
          { key: "created_at", label: "Ngày tạo", width: "120px" },
          { key: "actions", label: "Thao tác", width: "100px" }
        ]}
        data={filteredAgents}
        isLoading={isLoading}
        pagination={pagination}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
        emptyMessage="Không tìm thấy đại lý nào"
        searchComponent={
          <Box className="flex gap-2 items-center">
            <TextField
              size="small"
              placeholder="Tìm kiếm đại lý..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch size={20} />
                  </InputAdornment>
                )
              }}
              className="w-64"
            />
            <FormControl size="small" className="w-40">
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={statusFilter}
                label="Trạng thái"
                onChange={(e) => setStatusFilter(e.target.value as any)}
              >
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem value="pending_agency">Chờ duyệt</MenuItem>
                <MenuItem value="agency">Đã phê duyệt</MenuItem>
                <MenuItem value="rejected">Đã từ chối</MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
        renderRow={(agent: IAgent) => (
          <TableRow key={agent.id}>
            <TableCell>{agent.id}</TableCell>
            <TableCell>{agent.account_name}</TableCell>
            <TableCell>{agent.email}</TableCell>
            <TableCell>{agent.full_name || '-'}</TableCell>
            <TableCell>{agent.phone || '-'}</TableCell>
            <TableCell>{getStatusChip(agent.status)}</TableCell>
            <TableCell>{dayjs(agent.created_at).format('DD/MM/YYYY')}</TableCell>
            <TableCell>
              <Box className="flex gap-1">
                <IconButton
                  size="small"
                  onClick={() => handleView(agent.id)}
                  className="text-blue-600 hover:bg-blue-50"
                >
                  <IconEye size={18} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpen(e, agent.id)}
                  className="text-gray-600 hover:bg-gray-50"
                >
                  <IconDotsVertical size={18} />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        )}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => openActionDialog(menuAgentId!, 'approve')}>
          <IconCheck size={16} className="mr-2 text-green-600" />
          Phê duyệt
        </MenuItem>
        <MenuItem onClick={() => openActionDialog(menuAgentId!, 'reject')}>
          <IconX size={16} className="mr-2 text-red-600" />
          Từ chối
        </MenuItem>
      </Menu>

      <Dialog open={actionDialogOpen} onClose={() => setActionDialogOpen(false)}>
        <DialogTitle>
          {actionType === 'approve' ? 'Phê duyệt đại lý' : 'Từ chối đại lý'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn {actionType === 'approve' ? 'phê duyệt' : 'từ chối'} đại lý này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActionDialogOpen(false)}>Hủy</Button>
          <Button
            onClick={handleActionConfirm}
            color={actionType === 'approve' ? 'success' : 'error'}
            variant="contained"
            disabled={approveOrRejectMutation.isPending}
          >
            {approveOrRejectMutation.isPending ? <CircularProgress size={20} /> : 'Xác nhận'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
} 