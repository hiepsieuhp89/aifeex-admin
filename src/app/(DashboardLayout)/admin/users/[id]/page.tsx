"use client";

import { useDeleteUser, useGetUserById, useUpdateUser } from "@/hooks/admin-users";
import { IUpdateUserRequest } from "@/interface/request/admin-users";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from "@mui/material";
import { IconArrowLeft, IconEdit, IconMessage, IconTrash } from "@tabler/icons-react";
import { message } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Update the formData type to match admin-users interface
  const [formData, setFormData] = useState<IUpdateUserRequest>({
    email: "",
    account_name: "",
    first_name: "",
    last_name: "",
    city: "",
    country: "",
    points: 0,
    status: "active",
    vip_tier: ""
  });

  // Update the errors type
  const [errors, setErrors] = useState({
    email: "",
    account_name: "",
    first_name: "",
    last_name: ""
  });

  const { data: userData, isLoading, error } = useGetUserById(Number(id));
  const deleteUserMutation = useDeleteUser();
  const updateUserMutation = useUpdateUser();

  useEffect(() => {
    if (userData) {
      // Split full_name into first_name and last_name
      const nameParts = userData.full_name ? userData.full_name.split(" ") : ["", ""];
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      setFormData({
        email: userData.email || "",
        account_name: userData.account_name || "",
        first_name: firstName,
        last_name: lastName,
        city: userData.city || "",
        country: userData.country || "",
        points: userData.total_points || 0,
        status: userData.is_active ? "active" : "inactive",
        vip_tier: userData.vip_tier || ""
      });
    }
  }, [userData]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      account_name: "",
      first_name: "",
      last_name: ""
    };

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email không được để trống";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Email không hợp lệ";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBack = () => {
    router.push("/admin/users");
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUserMutation.mutateAsync(Number(id));
      message.success("Người dùng đã được xóa thành công!");
      router.push("/admin/users");
    } catch (error) {
      message.error("Không thể xóa người dùng. Vui lòng thử lại.");
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>
  ) => {
    const target = e.target as { name?: string; value: unknown };
    const name = target.name;
    const value = target.value;

    if (name) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      message.error("Vui lòng kiểm tra lại thông tin nhập");
      return;
    }
    
    try {
      await updateUserMutation.mutateAsync({
        id: Number(id),
        payload: formData
      });
      message.success("Thông tin người dùng đã được cập nhật!");
      setIsEditing(false);
    } catch (error) {
      message.error("Không thể cập nhật thông tin người dùng. Vui lòng thử lại.");
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center p-6 py-12">
        <CircularProgress className="text-main-golden-orange" />
      </Box>
    );
  }

  if (error || !userData) {
    return (
      <Box className="p-8 text-center">
        <Typography variant="h6" className="mb-2 text-red-400">
          Lỗi khi tải thông tin người dùng
        </Typography>
        <Typography className="mb-4 text-gray-400">
          {error?.message || "Không tìm thấy người dùng hoặc đã bị xóa"}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<IconArrowLeft size={18} />}
          onClick={handleBack}
          className="text-gray-300 border-gray-500 hover:bg-gray-700"
        >
          Quay lại danh sách
        </Button>
      </Box>
    );
  }

  return (
    <div className="p-6">
      <Box className="flex justify-between items-center mb-4">
        <Button
          variant="text"
          startIcon={<IconArrowLeft size={18} />}
          onClick={handleBack}
          className="mr-4"
        >
          Quay lại
        </Button>
        <Typography
          fontSize={18}
          fontWeight={700}
          variant="h5"
          className="!text-main-golden-orange relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-[50%] after:h-0.5 after:bg-main-golden-orange after:rounded-full"
        >
          Chi tiết người dùng
        </Typography>
      </Box>

      <Paper className="p-6 border">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Thông tin cơ bản */}
          <Typography variant="h6" className="font-medium">Thông tin cơ bản</Typography>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TextField
              size="small"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              className="rounded"
              disabled={!isEditing}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              size="small"
              label="Tên tài khoản"
              name="account_name"
              value={formData.account_name}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              className="rounded"
              disabled={!isEditing}
              error={!!errors.account_name}
              helperText={errors.account_name}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TextField
              size="small"
              label="Họ"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              className="rounded"
              disabled={!isEditing}
              error={!!errors.first_name}
              helperText={errors.first_name}
            />
            <TextField
              size="small"
              label="Tên"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              className="rounded"
              disabled={!isEditing}
              error={!!errors.last_name}
              helperText={errors.last_name}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TextField
              size="small"
              label="Thành phố"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              className="rounded"
              disabled={!isEditing}
            />
            <TextField
              size="small"
              label="Quốc gia"
              name="country"
              value={formData.country}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              className="rounded"
              disabled={!isEditing}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TextField
              size="small"
              label="Điểm"
              name="points"
              type="number"
              value={formData.points}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              className="rounded"
              disabled={!isEditing}
            />
            <FormControl fullWidth size="small" disabled={!isEditing}>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                name="status"
                value={formData.status}
                label="Trạng thái"
                onChange={(e) => handleChange(e as any)}
              >
                <MenuItem value="active">Hoạt động</MenuItem>
                <MenuItem value="inactive">Không hoạt động</MenuItem>
                <MenuItem value="banned">Bị cấm</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormControl fullWidth size="small" disabled={!isEditing}>
              <InputLabel>Cấp độ VIP</InputLabel>
              <Select
                name="vip_tier"
                value={formData.vip_tier}
                label="Cấp độ VIP"
                onChange={(e) => handleChange(e as any)}
              >
                <MenuItem value="">Không</MenuItem>
                <MenuItem value="bronze">Đồng</MenuItem>
                <MenuItem value="silver">Bạc</MenuItem>
                <MenuItem value="gold">Vàng</MenuItem>
                <MenuItem value="platinum">Bạch kim</MenuItem>
                <MenuItem value="diamond">Kim cương</MenuItem>
              </Select>
            </FormControl>
          </div>

          {isEditing && (
            <Box className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outlined"
                onClick={() => setIsEditing(false)}
              >
                Hủy bỏ
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={updateUserMutation.isPending}
                className="text-black !bg-main-golden-orange hover:bg-amber-600"
              >
                {updateUserMutation.isPending ? (
                  <CircularProgress size={16} className="text-white" />
                ) : (
                  "Cập nhật"
                )}
              </Button>
            </Box>
          )}
        </form>

        <Box className={`flex justify-end gap-2 ${isEditing ? 'mt-0' : 'mt-6'}`}>
          {!isEditing ? (
            <>
              <Button
                variant="contained"
                startIcon={<IconMessage size={18} />}
                onClick={() => {
                  router.push(`/admin/users?chat=${id}`)
                }}
                className="!bg-blue-500 !text-white"
              >
                Chat
              </Button>
              <Button
                variant="contained"
                startIcon={<IconTrash size={18} />}
                onClick={() => setDeleteDialogOpen(true)}
                className="!bg-red-500 !text-white"
              >
                Xóa
              </Button>
              <Button
                variant="contained"
                startIcon={<IconEdit size={18} />}
                onClick={() => setIsEditing(true)}
                className="!normal-case !bg-main-golden-orange"
              >
                Cập nhật
              </Button>
            </>
          ) : null}
        </Box>
      </Paper>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          className: "!rounded-[6px] shadow-xl",
        }}
      >
        <DialogTitle fontSize={18}>
          Xác nhận xóa
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="text-gray-400">
            Bạn có chắc chắn muốn xóa người dùng này? Hành động này không
            thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="!p-4 !pb-6">
          <Button variant="outlined" onClick={() => setDeleteDialogOpen(false)}>
            Hủy bỏ
          </Button>
          <Button
            variant="outlined"
            onClick={handleDeleteConfirm}
            className="text-white transition-colors !bg-red-500"
            disabled={deleteUserMutation.isPending}
          >
            {deleteUserMutation.isPending ? (
              <div className="flex gap-2 items-center text-white">
                <CircularProgress size={16} className="text-white" />
                Đang xóa...
              </div>
            ) : (
              <span className="!text-white">Xóa</span>
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserDetailPage;
