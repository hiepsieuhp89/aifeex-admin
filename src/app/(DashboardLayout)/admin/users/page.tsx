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
import { IconCopy, IconEye, IconMessage, IconSearch, IconTrash, IconWallet, IconDotsVertical, IconMoodSadDizzy, IconUsers, IconUserCog } from "@tabler/icons-react"
import { message } from "antd"
import { useRouter } from "next/navigation"
import { useState } from "react"

import ChatDialog from "@/components/ChatDialog"
import {
  useGetAllUsers,
  useUpdateUser,
  useDeleteUser,
  useBanUser,
  useUnbanUser,
} from "@/hooks/admin-users";
import dayjs from 'dayjs';

// Define User and Pagination types to match the new API
interface User {
  id: number;
  account_name: string;
  email: string;
  role: string;
  invite_code_id: number | null;
  my_invite_code_id: number | null;
  full_name?: string;
  avatar_url?: string;
  language?: string;
  vip_tier?: string;
  total_points?: number;
  current_level?: number;
  notification_enabled?: boolean;
  voice_enabled?: boolean;
  is_active?: boolean;
  is_banned?: boolean;
  last_login?: string;
  login_count?: number;
  created_at?: string;
  updated_at?: string;
  used_invite_code?: any;
  phone?: string;
  country?: string;
}
interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

function UsersPage() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<number | null>(null)
  const [chatDialogOpen, setChatDialogOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [selectedShop, setSelectedShop] = useState<any>(null)
  const [filters, setFilters] = useState({
    order: 'DESC',
    status: '',
    role: '',
    hasShop: '',
  } as any);
  const updateUserMutation = useUpdateUser();
  const { data: userData, isLoading, error } = useGetAllUsers({
    page,
    limit: rowsPerPage,
    search: searchTerm,
    order: (filters.order as 'asc' | 'desc' | undefined),
    status: filters.status || undefined
  }) as { data: { users: User[]; pagination: Pagination } | undefined, isLoading: boolean, error: any };

  // Use correct fields from API response
  const filteredUsers: User[] = userData?.users || [];
  const pagination = {
    page: userData?.pagination?.page || 1,
    take: userData?.pagination?.limit || 10,
    itemCount: userData?.pagination?.total || 0,
    pageCount: userData?.pagination?.total_pages || 1,
    hasPreviousPage: (userData?.pagination?.page || 1) > 1,
    hasNextPage: (userData?.pagination?.page || 1) < (userData?.pagination?.total_pages || 1)
  };
  const deleteUserMutation = useDeleteUser()
  const banUserMutation = useBanUser();
  const unbanUserMutation = useUnbanUser();
  const { data: allUsers } = useGetAllUsers({
    limit: 1000
  })

  // Add back anchorEl and menuUserId state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuUserId, setMenuUserId] = useState<number | null>(null);

  // Add back handleMenuOpen and handleMenuClose
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, userId: number) => {
    setAnchorEl(event.currentTarget);
    setMenuUserId(userId);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuUserId(null);
  };

  const handleCreateNew = () => {
    router.push("/admin/users/create-new")
  }

  const handleView = (id: number) => {
    router.push(`/admin/users/${id}`)
  }

  const openDeleteDialog = (id: number) => {
    setUserToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return

    try {
      await deleteUserMutation.mutateAsync(userToDelete)
      message.success("Người dùng đã được xóa thành công!")
      setDeleteDialogOpen(false)
      setUserToDelete(null)
    } catch (err) {
      message.error("Không thể xóa người dùng. Vui lòng thử lại.")
      console.error(err)
    }
  }

  const handleOpenChat = (userId: number) => {
    const shop = filteredUsers.find((u: User) => u.id === userId);
    setSelectedShop(shop);
    setSelectedUserId(userId);
    setChatDialogOpen(true);
  }

  const handleToggleFreeze = async (userId: number) => {
    try {
      const user = filteredUsers.find((u: User) => u.id === userId);
      if (!user) return;
      const newStatus = !user.is_active;
      await updateUserMutation.mutateAsync({
        id: userId,
        payload: {
          is_active: newStatus
        } as any // Use 'as any' if is_active is not in IUpdateUserRequest
      });
      message.success(newStatus ? "Đã mở khóa người dùng thành công!" : "Đã khóa người dùng thành công!");
      handleMenuClose();
    } catch (error) {
      message.error("Không thể thay đổi trạng thái người dùng. Vui lòng thử lại.");
      console.error(error);
    }
  };

  const handleToggleBan = async (userId: number) => {
    try {
      const user = filteredUsers.find((u: User) => u.id === userId);
      if (!user) return;
      const newStatus = !user.is_banned;
      if (newStatus) {
        await banUserMutation.mutateAsync({ id: userId, payload: {} });
        message.success("Đã khóa người dùng thành công!");
      } else {
        await unbanUserMutation.mutateAsync(userId);
        message.success("Đã mở khóa người dùng thành công!");
      }
      handleMenuClose();
    } catch (error) {
      message.error("Không thể thay đổi trạng thái người dùng. Vui lòng thử lại.");
      console.error(error);
    }
  };

  const columns = [
    { key: 'stt', label: 'STT' },
    { key: 'id', label: 'ID' },
    { key: 'account_name', label: 'Tên tài khoản' },
    { key: 'email', label: 'Email' },
    { key: 'invite_code_id', label: 'Mã mời' },
    { key: 'my_invite_code_id', label: 'Mã mời của tôi' },
    { key: 'language', label: 'Ngôn ngữ' },
    { key: 'vip_tier', label: 'VIP' },
    { key: 'total_points', label: 'Điểm' },
    { key: 'current_level', label: 'Cấp độ' },
    { key: 'notification_enabled', label: 'Nhận thông báo' },
    { key: 'voice_enabled', label: 'Voice' },
    { key: 'is_active', label: 'Hoạt động' },
    { key: 'is_banned', label: 'Banned' },
    { key: 'login_count', label: 'Số lần đăng nhập' },
    { key: 'created_at', label: 'Ngày tạo' },
    { key: 'updated_at', label: 'Ngày cập nhật' },
    { key: 'used_invite_code', label: 'Mã mời đã dùng' },
    { key: 'actions', label: 'Thao tác' },
  ];

  const renderRow = (user: User, index: number) => (
    <TableRow
      key={user.id}
      sx={{
        "&:first-child td, &:first-child th": { borderTop: "1px solid #E0E0E0" },
        "& td": { borderBottom: "1px solid #E0E0E0" },
        backgroundColor: index % 2 !== 1 ? '#F5F5F5' : '#FFFFFF'
      }}
    >
      <TableCell>{(page - 1) * rowsPerPage + filteredUsers.indexOf(user) + 1}</TableCell>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.account_name}</TableCell>
      <TableCell>
        <Box display="flex" alignItems="center" gap={1}>
          {user.email}
          <IconButton
            size="small"
            onClick={() => {
              navigator.clipboard.writeText(user.email || "");
              message.success(`Đã sao chép email: ${user.email}`);
            }}
          >
            <IconCopy size={16} className="text-blue-500" />
          </IconButton>
        </Box>
      </TableCell>
      <TableCell>{user.invite_code_id}</TableCell>
      <TableCell>{user.my_invite_code_id}</TableCell>
      <TableCell>{user.language}</TableCell>
      <TableCell>{user.vip_tier}</TableCell>
      <TableCell>{user.total_points}</TableCell>
      <TableCell>{user.current_level}</TableCell>
      <TableCell>{user.notification_enabled ? '✔️' : ''}</TableCell>
      <TableCell>{user.voice_enabled ? '✔️' : ''}</TableCell>
      <TableCell>
        <Chip
          label={user.is_active ? "Đang hoạt động" : "Đã khóa"}
          color={user.is_active ? "success" : "error"}
          size="small"
          variant="filled"
        />
      </TableCell>
      <TableCell>
        <Chip
          label={user.is_banned ? "Banned" : "Không"}
          color={user.is_banned ? "error" : "success"}
          size="small"
          variant="filled"
        />
      </TableCell>
      <TableCell>{user.login_count}</TableCell>
      <TableCell>{dayjs(user.created_at).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
      <TableCell>{dayjs(user.updated_at).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
      <TableCell>
        <IconButton
          size="small"
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(user.used_invite_code, null, 2));
            message.success(`Đã sao chép mã mời đã dùng`);
          }}
        >
          <IconCopy size={16} className="text-blue-500" />
        </IconButton>
        <span style={{ fontSize: 10, color: '#888' }}>{user.used_invite_code?.code || ''}</span>
      </TableCell>
      <TableCell>
        <Box className="flex items-center justify-center gap-4">
          <IconButton
            onClick={(e) => handleMenuOpen(e, user.id)}
            size="medium"
          >
            <IconDotsVertical size={18} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && menuUserId === user.id}
            onClose={handleMenuClose}
            PaperProps={{
              className: "!rounded-[6px] shadow-xl",
            }}
          >
            <MenuItem onClick={() => {
              handleView(user.id);
              handleMenuClose();
            }}>
              <Box className="flex items-center gap-2">
                <IconEye size={16} className="text-blue-400" />
                <span>Xem chi tiết</span>
              </Box>
            </MenuItem>
            <MenuItem onClick={() => {
              handleOpenChat(user.id);
              handleMenuClose();
            }}>
              <Box className="flex items-center gap-2">
                <IconMessage size={16} className="text-green-400" />
                <span>Nhắn tin</span>
              </Box>
            </MenuItem>
            <MenuItem onClick={() => {
              openDeleteDialog(user.id);
              handleMenuClose();
            }}>
              <Box className="flex items-center gap-2">
                <IconTrash size={16} className="text-red-400" />
                <span>Xóa</span>
              </Box>
            </MenuItem>
            <MenuItem onClick={() => {
              handleToggleFreeze(user.id);
              handleMenuClose();
            }}>
              <Box className="flex items-center gap-2">
                {user.is_active ? (
                  <IconEye size={16} className="text-red-400" />
                ) : (
                  <IconEye size={16} className="text-green-400" />
                )}
                <span>{user.is_active ? "Khóa" : "Mở khóa"}</span>
              </Box>
            </MenuItem>
            <MenuItem onClick={() => {
              handleToggleBan(user.id);
              handleMenuClose();
            }}>
              <Box className="flex items-center gap-2">
                {user.is_banned ? (
                  <IconEye size={16} className="text-red-400" />
                ) : (
                  <IconEye size={16} className="text-green-400" />
                )}
                <span>{user.is_banned ? "Mở khóa" : "Khóa"}</span>
              </Box>
            </MenuItem>
          </Menu>
        </Box>
      </TableCell>
    </TableRow>
  );

  if (error) {
    return (
      <Box className="flex flex-col items-center justify-center min-h-screen gap-2 p-8 text-center">
        <IconMoodSadDizzy size={48} className="text-gray-400" />
        <Typography variant="h6" className="mb-2 text-red-400">
          Lỗi khi tải danh sách người dùng
        </Typography>
        <Typography className="text-gray-400">{error.message || "Vui lòng thử lại sau"}</Typography>
      </Box>
    )
  }

  return (
    <>
      <Box className="relative flex flex-col items-center justify-center py-8">
        <Box className="absolute" />
        <Box className="relative flex flex-col items-center gap-2">
          <Box className="p-4 mb-3 rounded-full shadow-lg bg-gradient-to-r from-amber-100 to-orange-100">
            <IconUserCog size={36} className="text-main-golden-orange" />
          </Box>
          <Typography variant="h3" className="font-semibold tracking-wide text-center uppercase text-main-charcoal-blue">
            Quản lý người dùng
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ p: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Tìm kiếm người dùng..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-white"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size={20} />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sắp xếp</InputLabel>
            <Select
              className="bg-white"
              value={filters.order}
              label="Sắp xếp"
              onChange={(e) => setFilters((prev: any) => ({ ...prev, order: e.target.value }))}
            >
              <MenuItem value="DESC">Mới nhất</MenuItem>
              <MenuItem value="ASC">Cũ nhất</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              className="bg-white"
              value={filters.status}
              label="Trạng thái"
              onChange={(e) => setFilters((prev: any) => ({ ...prev, status: e.target.value }))}
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="pending">Đang chờ duyệt</MenuItem>
              <MenuItem value="completed">Đã duyệt</MenuItem>
              <MenuItem value="rejected">Đã từ chối</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Vai trò</InputLabel>
            <Select
              className="bg-white"
              value={filters.role}
              label="Vai trò"
              onChange={(e) => setFilters((prev: any) => ({ ...prev, role: e.target.value }))}
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="user">Người dùng</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="shop">Người bán</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Có shop</InputLabel>
            <Select
              className="bg-white"
              value={filters.hasShop}
              label="Có shop"
              onChange={(e) => setFilters((prev: any) => ({ ...prev, hasShop: e.target.value }))}
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="true">Có</MenuItem>
              <MenuItem value="false">Không</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <DataTable
          columns={columns}
          data={filteredUsers}
          isLoading={isLoading}
          pagination={pagination}
          onPageChange={setPage}
          onRowsPerPageChange={(newRowsPerPage: number) => {
            setRowsPerPage(newRowsPerPage);
            setPage(1);
          }}
          renderRow={renderRow}
          emptyMessage="Không tìm thấy người dùng nào"
          createNewButton={{
            label: "Tạo người dùng mới",
            onClick: handleCreateNew
          }}
        />
      </Box>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          className: "!rounded-[6px] shadow-xl",
        }}
      >
        <DialogTitle fontSize={18}>
          Xác nhận xóa người dùng
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="text-gray-400">
            Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="!p-4 !pb-6">
          <Button
            variant="outlined"
            onClick={() => setDeleteDialogOpen(false)}
          >
            Hủy bỏ
          </Button>
          <Button
            variant="outlined"
            onClick={handleDeleteConfirm}
            className="text-white transition-colors !bg-red-500 !border-red-500"
            disabled={deleteUserMutation.isPending}
          >
            {deleteUserMutation.isPending ?
              <div className="flex items-center gap-2 text-white">
                <CircularProgress size={16} className="text-white" />
                Đang xóa...
              </div> : <span className="!text-white">Xóa</span>}
          </Button>
        </DialogActions>
      </Dialog>

      <ChatDialog
        open={chatDialogOpen}
        onClose={() => setChatDialogOpen(false)}
        userId={selectedUserId ? selectedUserId.toString() : null}
        allUsers={allUsers?.users || []}
        shop={selectedShop}
      />
    </>
  )
}

export default UsersPage

