"use client";
import React, { useState } from "react";
import { useGetBlockchainTransactions } from "@/hooks/admin-blockchain";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import {
  IconSearch,
  IconCurrencyBitcoin,
  IconEye,
  IconCopy,
} from "@tabler/icons-react";
import { message } from "antd";
import { useRouter } from "next/navigation";
import DataTable from "@/components/DataTable";

const BlockchainTransactionsPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    order: "DESC",
    type: "",
    status: "",
  });

  const { data, isLoading, error } = useGetBlockchainTransactions({
    page,
    limit: rowsPerPage,
    type: filters.type || undefined,
    status: filters.status || undefined,
    start_date: undefined,
    end_date: undefined,
  });

  const handleView = (id: number) => {
    router.push(`/admin/blockchain/transactions/${id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "warning";
      case "confirmed":
        return "success";
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type.toLowerCase()) {
      case "deposit":
        return "Nạp tiền";
      case "withdrawal":
        return "Rút tiền";
      default:
        return type;
    }
  };

  const renderRow = (tx: any, index: number) => (
    <TableRow
      key={tx.id}
      sx={{
        "&:first-child td, &:first-child th": { borderTop: "1px solid #E0E0E0" },
        "& td": { borderBottom: "1px solid #E0E0E0" },
        backgroundColor: index % 2 !== 1 ? "#F5F5F5" : "#FFFFFF",
        "&:hover": {
          backgroundColor: "#FAFAFA",
        },
      }}
    >
      <TableCell>{tx.id}</TableCell>
      <TableCell>
        <Box display="flex" alignItems="center" gap={1}>
          {tx.tx_hash}
          <IconButton
            size="small"
            onClick={() => {
              navigator.clipboard.writeText(tx.tx_hash || "");
              message.success(`Đã sao chép hash: ${tx.tx_hash}`);
            }}
          >
            <IconCopy size={16} className="text-blue-500" />
          </IconButton>
        </Box>
      </TableCell>
      <TableCell>
        <Chip
          label={getTypeLabel(tx.type)}
          color={tx.type.toLowerCase() === "deposit" ? "success" : "warning"}
          size="small"
          variant="outlined"
        />
      </TableCell>
      <TableCell>{tx.amount}</TableCell>
      <TableCell>
        <Box display="flex" alignItems="center" gap={1}>
          {tx.from_address}
          <IconButton
            size="small"
            onClick={() => {
              navigator.clipboard.writeText(tx.from_address || "");
              message.success(`Đã sao chép địa chỉ gửi: ${tx.from_address}`);
            }}
          >
            <IconCopy size={16} className="text-blue-500" />
          </IconButton>
        </Box>
      </TableCell>
      <TableCell>
        <Box display="flex" alignItems="center" gap={1}>
          {tx.to_address}
          <IconButton
            size="small"
            onClick={() => {
              navigator.clipboard.writeText(tx.to_address || "");
              message.success(`Đã sao chép địa chỉ nhận: ${tx.to_address}`);
            }}
          >
            <IconCopy size={16} className="text-blue-500" />
          </IconButton>
        </Box>
      </TableCell>
      <TableCell>
        <Chip
          label={tx.status}
          color={getStatusColor(tx.status)}
          size="small"
          variant="filled"
        />
      </TableCell>
      <TableCell>{new Date(tx.created_at).toLocaleDateString("vi-VN")}</TableCell>
      <TableCell>
        <IconButton
          onClick={() => handleView(tx.id)}
          size="small"
          className="!bg-blue-100"
        >
          <IconEye size={18} className="text-blue-400" />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  const columns = [
    { key: "id", label: "ID", width: "80px" },
    { key: "tx_hash", label: "Hash", width: "150px" },
    { key: "type", label: "Loại", width: "100px" },
    { key: "amount", label: "Số lượng", width: "120px" },
    { key: "from_address", label: "Từ địa chỉ", width: "150px" },
    { key: "to_address", label: "Đến địa chỉ", width: "150px" },
    { key: "status", label: "Trạng thái", width: "120px" },
    { key: "created_at", label: "Thời gian", width: "120px" },
    { key: "actions", label: "Thao tác", width: "80px" },
  ];

  return (
    <>
      <Box className="relative flex flex-col items-center justify-center py-8">
        <Box className="absolute" />
        <Box className="relative flex flex-col items-center gap-2">
          <Box className="p-4 mb-3 rounded-full shadow-lg bg-gradient-to-r from-amber-100 to-orange-100">
            <IconCurrencyBitcoin size={36} className="text-main-golden-orange" />
          </Box>
          <Typography
            variant="h3"
            className="font-semibold tracking-wide text-center uppercase text-main-charcoal-blue"
          >
            Danh sách giao dịch Blockchain
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 3, display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          size="small"
          placeholder="Tìm kiếm giao dịch..."
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
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, order: e.target.value }))
            }
          >
            <MenuItem value="DESC">Mới nhất</MenuItem>
            <MenuItem value="ASC">Cũ nhất</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Loại</InputLabel>
          <Select
            className="bg-white"
            value={filters.type}
            label="Loại"
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, type: e.target.value }))
            }
          >
            <MenuItem value="">Tất cả</MenuItem>
            <MenuItem value="deposit">Nạp tiền</MenuItem>
            <MenuItem value="withdrawal">Rút tiền</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Trạng thái</InputLabel>
          <Select
            className="bg-white"
            value={filters.status}
            label="Trạng thái"
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            <MenuItem value="">Tất cả</MenuItem>
            <MenuItem value="pending">Đang chờ</MenuItem>
            <MenuItem value="confirmed">Đã xác nhận</MenuItem>
            <MenuItem value="failed">Thất bại</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <DataTable
        columns={columns}
        data={data?.transactions || []}
        isLoading={isLoading}
        pagination={{
          page: page,
          take: rowsPerPage,
          itemCount: data?.total || 0,
          pageCount: Math.ceil((data?.total || 0) / rowsPerPage),
          hasPreviousPage: page > 1,
          hasNextPage: page < Math.ceil((data?.total || 0) / rowsPerPage),
        }}
        onPageChange={setPage}
        onRowsPerPageChange={(newRowsPerPage) => {
          setRowsPerPage(newRowsPerPage);
          setPage(1);
        }}
        renderRow={renderRow}
        emptyMessage="Không tìm thấy giao dịch nào"
      />
    </>
  );
};

export default BlockchainTransactionsPage; 