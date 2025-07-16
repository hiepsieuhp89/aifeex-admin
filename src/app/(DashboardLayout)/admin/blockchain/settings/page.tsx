"use client"

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
  Alert
} from "@mui/material"
import {
  IconSettings,
  IconDeviceFloppy,
  IconRefresh
} from "@tabler/icons-react"
import { message } from "antd"
import { useState, useEffect } from "react"

import {
  useGetBlockchainSettings,
  useUpdateBlockchainSettings
} from "@/hooks/admin-blockchain"

export default function BlockchainSettingsPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    network: '',
    contract_address: '',
    rpc_url: '',
    gas_limit: 0,
    gas_price: '',
    confirmation_blocks: 0,
    auto_sync_enabled: false,
    sync_interval: 0,
  })

  const { data: settingsData, isLoading, error, refetch } = useGetBlockchainSettings()
  const updateSettingsMutation = useUpdateBlockchainSettings()

  useEffect(() => {
    if (settingsData?.settings) {
      setFormData({
        network: settingsData.settings.network || '',
        contract_address: settingsData.settings.contract_address || '',
        rpc_url: settingsData.settings.rpc_url || '',
        gas_limit: settingsData.settings.gas_limit || 0,
        gas_price: settingsData.settings.gas_price || '',
        confirmation_blocks: settingsData.settings.confirmation_blocks || 0,
        auto_sync_enabled: settingsData.settings.auto_sync_enabled || false,
        sync_interval: settingsData.settings.sync_interval || 0,
      })
    }
  }, [settingsData])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) || 0 : value
    }))
  }

  const handleSelectChange = (name: string) => (e: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: e.target.value
    }))
  }

  const handleSave = async () => {
    try {
      // Format the data according to IUpdateBlockchainSettingsRequest interface
      const payload = {
        apply_globally: true,
        network: formData.network,
        settings: {
          network: formData.network,
          contract_address: formData.contract_address,
          rpc_url: formData.rpc_url,
          gas_limit: formData.gas_limit,
          gas_price: formData.gas_price,
          confirmation_blocks: formData.confirmation_blocks,
          auto_sync_enabled: formData.auto_sync_enabled,
          sync_interval: formData.sync_interval,
        },
        updated_reason: "Cập nhật cài đặt blockchain từ admin panel"
      }

      await updateSettingsMutation.mutateAsync(payload)
      message.success('Cài đặt blockchain đã được cập nhật thành công!')
      setIsEditing(false)
      refetch()
    } catch (error) {
      message.error('Không thể cập nhật cài đặt blockchain. Vui lòng thử lại.')
      console.error(error)
    }
  }

  const handleCancel = () => {
    if (settingsData?.settings) {
      setFormData({
        network: settingsData.settings.network || '',
        contract_address: settingsData.settings.contract_address || '',
        rpc_url: settingsData.settings.rpc_url || '',
        gas_limit: settingsData.settings.gas_limit || 0,
        gas_price: settingsData.settings.gas_price || '',
        confirmation_blocks: settingsData.settings.confirmation_blocks || 0,
        auto_sync_enabled: settingsData.settings.auto_sync_enabled || false,
        sync_interval: settingsData.settings.sync_interval || 0,
      })
    }
    setIsEditing(false)
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
        <Typography className="text-red-500">Có lỗi xảy ra khi tải cài đặt blockchain</Typography>
        <Button onClick={() => refetch()}>Thử lại</Button>
      </Box>
    )
  }

  return (
    <Box>
      <Box className="flex justify-between items-center mb-6">
        <Box className="flex items-center gap-2">
          <IconSettings size={32} className="text-blue-600" />
          <Typography variant="h4" className="font-bold text-gray-800">
            Cài đặt Blockchain
          </Typography>
        </Box>
        <Box className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outlined"
                onClick={handleCancel}
                disabled={updateSettingsMutation.isPending}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                startIcon={<IconDeviceFloppy size={20} />}
                onClick={handleSave}
                disabled={updateSettingsMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {updateSettingsMutation.isPending ? (
                  <>
                    <CircularProgress size={16} className="mr-2" />
                    Đang lưu...
                  </>
                ) : (
                  'Lưu thay đổi'
                )}
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Chỉnh sửa
            </Button>
          )}
        </Box>
      </Box>

      <Alert severity="warning" className="mb-6">
        <Typography variant="body2">
          <strong>Cảnh báo:</strong> Thay đổi cài đặt blockchain có thể ảnh hưởng đến toàn bộ hệ thống. 
          Vui lòng kiểm tra kỹ trước khi lưu.
        </Typography>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Network Configuration */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Typography variant="h5" className="font-bold text-gray-800 mb-4">
              Cấu hình mạng
            </Typography>
            
            <div className="space-y-4">
              <FormControl fullWidth disabled={!isEditing}>
                <InputLabel>Mạng Blockchain</InputLabel>
                <Select
                  value={formData.network}
                  label="Mạng Blockchain"
                  onChange={handleSelectChange('network')}
                >
                  <MenuItem value="ethereum">Ethereum Mainnet</MenuItem>
                  <MenuItem value="sepolia">Sepolia Testnet</MenuItem>
                  <MenuItem value="goerli">Goerli Testnet</MenuItem>
                  <MenuItem value="polygon">Polygon Mainnet</MenuItem>
                  <MenuItem value="mumbai">Mumbai Testnet</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Địa chỉ hợp đồng"
                name="contract_address"
                value={formData.contract_address}
                onChange={handleFormChange}
                disabled={!isEditing}
                placeholder="0x..."
              />

              <TextField
                fullWidth
                label="RPC URL"
                name="rpc_url"
                value={formData.rpc_url}
                onChange={handleFormChange}
                disabled={!isEditing}
                placeholder="https://..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Gas Configuration */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Typography variant="h5" className="font-bold text-gray-800 mb-4">
              Cấu hình Gas
            </Typography>
            
            <div className="space-y-4">
              <TextField
                fullWidth
                label="Gas Limit"
                name="gas_limit"
                type="number"
                value={formData.gas_limit}
                onChange={handleFormChange}
                disabled={!isEditing}
              />

              <TextField
                fullWidth
                label="Gas Price (Gwei)"
                name="gas_price"
                value={formData.gas_price}
                onChange={handleFormChange}
                disabled={!isEditing}
                placeholder="20"
              />

              <TextField
                fullWidth
                label="Số block xác nhận"
                name="confirmation_blocks"
                type="number"
                value={formData.confirmation_blocks}
                onChange={handleFormChange}
                disabled={!isEditing}
                helperText="Số block cần thiết để xác nhận giao dịch"
              />
            </div>
          </CardContent>
        </Card>

        {/* Sync Configuration */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Typography variant="h5" className="font-bold text-gray-800 mb-4">
              Cấu hình đồng bộ
            </Typography>
            
            <div className="space-y-4">
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.auto_sync_enabled}
                    onChange={handleFormChange}
                    name="auto_sync_enabled"
                    disabled={!isEditing}
                  />
                }
                label="Bật đồng bộ tự động"
              />

              <TextField
                fullWidth
                label="Khoảng thời gian đồng bộ (giây)"
                name="sync_interval"
                type="number"
                value={formData.sync_interval}
                onChange={handleFormChange}
                disabled={!isEditing || !formData.auto_sync_enabled}
                helperText="Khoảng thời gian giữa các lần đồng bộ tự động"
              />
            </div>
          </CardContent>
        </Card>

        {/* Settings Information */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Typography variant="h5" className="font-bold text-gray-800 mb-4">
              Thông tin cài đặt
            </Typography>
            
            <div className="space-y-3">
              <Box>
                <Typography variant="body2" className="text-gray-500">
                  Lần cập nhật cuối
                </Typography>
                <Typography variant="body1" className="font-medium">
                  {settingsData?.settings?.updated_at 
                    ? new Date(settingsData.settings.updated_at).toLocaleString('vi-VN')
                    : 'Chưa có dữ liệu'}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" className="text-gray-500">
                  Ngày tạo
                </Typography>
                <Typography variant="body1" className="font-medium">
                  {settingsData?.settings?.created_at 
                    ? new Date(settingsData.settings.created_at).toLocaleString('vi-VN')
                    : 'Chưa có dữ liệu'}
                </Typography>
              </Box>
            </div>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<IconRefresh size={16} />}
              onClick={() => refetch()}
              className="mt-4"
            >
              Làm mới dữ liệu
            </Button>
          </CardContent>
        </Card>
      </div>
    </Box>
  )
} 