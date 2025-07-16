"use client"

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  TextField,
  Typography,
  Chip
} from "@mui/material"
import {
  IconTicket,
  IconPlus,
  IconCalendar,
  IconUsers,
  IconCopy
} from "@tabler/icons-react"
import { message } from "antd"
import { useState } from "react"
import dayjs from 'dayjs'

import { useCreateInviteCode } from "@/hooks/admin-agents"

export default function InviteCodesPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    expires_at: '',
    usage_limit: '',
    notes: ''
  })

  const createInviteCodeMutation = useCreateInviteCode()

  const handleCreateDialogOpen = () => {
    setCreateDialogOpen(true)
  }

  const handleCreateDialogClose = () => {
    setCreateDialogOpen(false)
    setFormData({
      expires_at: '',
      usage_limit: '',
      notes: ''
    })
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCreateInviteCode = async () => {
    try {
      const payload = {
        expires_at: formData.expires_at || undefined,
        usage_limit: formData.usage_limit ? parseInt(formData.usage_limit) : undefined,
        notes: formData.notes || undefined
      }

      const response = await createInviteCodeMutation.mutateAsync(payload)
      
      if (response.success) {
        message.success('Mã mời đã được tạo thành công!')
        handleCreateDialogClose()
        
        // Copy the invite code to clipboard
        if (response.invite_code?.code) {
          navigator.clipboard.writeText(response.invite_code.code)
          message.info('Mã mời đã được sao chép vào clipboard!')
        }
      } else {
        message.error('Không thể tạo mã mời. Vui lòng thử lại.')
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi tạo mã mời.')
      console.error(error)
    }
  }

  // Mock data for display - in real app this would come from an API
  const mockInviteCodes = [
    {
      id: 1,
      code: 'AGENT2024001',
      created_at: '2024-01-15T10:00:00Z',
      expires_at: '2024-12-31T23:59:59Z',
      usage_limit: 10,
      used_count: 3,
      notes: 'Mã cho đại lý Q1 2024'
    },
    {
      id: 2,
      code: 'AGENT2024002',
      created_at: '2024-01-20T14:30:00Z',
      expires_at: null,
      usage_limit: null,
      used_count: 7,
      notes: 'Mã không giới hạn'
    }
  ]

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    message.success('Đã sao chép mã mời!')
  }

  const getStatusChip = (code: any) => {
    const now = new Date()
    const expiresAt = code.expires_at ? new Date(code.expires_at) : null
    const isExpired = expiresAt && expiresAt < now
    const isLimitReached = code.usage_limit && code.used_count >= code.usage_limit

    if (isExpired) {
      return <Chip label="Đã hết hạn" color="error" size="small" />
    }
    if (isLimitReached) {
      return <Chip label="Đã đầy" color="warning" size="small" />
    }
    return <Chip label="Hoạt động" color="success" size="small" />
  }

  return (
    <Box>
      <Box className="flex justify-between items-center mb-6">
        <Box className="flex items-center gap-2">
          <IconTicket size={32} className="text-purple-600" />
          <Typography variant="h4" className="font-bold text-gray-800">
            Quản lý mã mời
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<IconPlus size={20} />}
          onClick={handleCreateDialogOpen}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Tạo mã mời mới
        </Button>
      </Box>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Box className="flex items-center justify-between">
              <Box>
                <Typography variant="h6" className="text-gray-600 mb-2">
                  Tổng mã mời
                </Typography>
                <Typography variant="h3" className="font-bold text-purple-600">
                  {mockInviteCodes.length}
                </Typography>
              </Box>
              <Box className="p-3 rounded-full bg-purple-100">
                <IconTicket size={32} className="text-purple-600" />
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Box className="flex items-center justify-between">
              <Box>
                <Typography variant="h6" className="text-gray-600 mb-2">
                  Tổng lượt sử dụng
                </Typography>
                <Typography variant="h3" className="font-bold text-green-600">
                  {mockInviteCodes.reduce((sum, code) => sum + code.used_count, 0)}
                </Typography>
              </Box>
              <Box className="p-3 rounded-full bg-green-100">
                <IconUsers size={32} className="text-green-600" />
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Box className="flex items-center justify-between">
              <Box>
                <Typography variant="h6" className="text-gray-600 mb-2">
                  Mã hoạt động
                </Typography>
                <Typography variant="h3" className="font-bold text-blue-600">
                  {mockInviteCodes.filter(code => {
                    const now = new Date()
                    const expiresAt = code.expires_at ? new Date(code.expires_at) : null
                    const isExpired = expiresAt && expiresAt < now
                    const isLimitReached = code.usage_limit && code.used_count >= code.usage_limit
                    return !isExpired && !isLimitReached
                  }).length}
                </Typography>
              </Box>
              <Box className="p-3 rounded-full bg-blue-100">
                <IconCalendar size={32} className="text-blue-600" />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>

      {/* Invite Codes List */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <Typography variant="h5" className="font-bold text-gray-800 mb-4">
            Danh sách mã mời
          </Typography>
          
          <div className="space-y-4">
            {mockInviteCodes.map((code) => (
              <Box
                key={code.id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <Box>
                    <Typography variant="h6" className="font-bold text-gray-800 mb-1">
                      {code.code}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {code.notes || 'Không có ghi chú'}
                    </Typography>
                  </Box>
                  <Box className="flex items-center gap-2">
                    {getStatusChip(code)}
                    <Button
                      size="small"
                      startIcon={<IconCopy size={16} />}
                      onClick={() => copyToClipboard(code.code)}
                      className="text-gray-600"
                    >
                      Sao chép
                    </Button>
                  </Box>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <Box>
                    <Typography variant="body2" className="text-gray-500">
                      Ngày tạo
                    </Typography>
                    <Typography variant="body2" className="font-medium">
                      {dayjs(code.created_at).format('DD/MM/YYYY HH:mm')}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" className="text-gray-500">
                      Hết hạn
                    </Typography>
                    <Typography variant="body2" className="font-medium">
                      {code.expires_at 
                        ? dayjs(code.expires_at).format('DD/MM/YYYY HH:mm')
                        : 'Không giới hạn'}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" className="text-gray-500">
                      Giới hạn sử dụng
                    </Typography>
                    <Typography variant="body2" className="font-medium">
                      {code.usage_limit || 'Không giới hạn'}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" className="text-gray-500">
                      Đã sử dụng
                    </Typography>
                    <Typography variant="body2" className="font-medium">
                      {code.used_count}
                    </Typography>
                  </Box>
                </div>
              </Box>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Invite Code Dialog */}
      <Dialog 
        open={createDialogOpen} 
        onClose={handleCreateDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Tạo mã mời mới</DialogTitle>
        <DialogContent className="space-y-4 mt-4">
          <TextField
            fullWidth
            label="Ngày hết hạn"
            name="expires_at"
            type="datetime-local"
            value={formData.expires_at}
            onChange={handleFormChange}
            InputLabelProps={{
              shrink: true,
            }}
            helperText="Để trống nếu không muốn giới hạn thời gian"
          />
          
          <TextField
            fullWidth
            label="Giới hạn số lần sử dụng"
            name="usage_limit"
            type="number"
            value={formData.usage_limit}
            onChange={handleFormChange}
            helperText="Để trống nếu không muốn giới hạn số lần sử dụng"
          />
          
          <TextField
            fullWidth
            label="Ghi chú"
            name="notes"
            multiline
            rows={3}
            value={formData.notes}
            onChange={handleFormChange}
            helperText="Ghi chú về mục đích sử dụng mã mời này"
          />
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={handleCreateDialogClose}>
            Hủy
          </Button>
          <Button
            onClick={handleCreateInviteCode}
            variant="contained"
            disabled={createInviteCodeMutation.isPending}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {createInviteCodeMutation.isPending ? (
              <>
                <CircularProgress size={16} className="mr-2" />
                Đang tạo...
              </>
            ) : (
              'Tạo mã mời'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
} 