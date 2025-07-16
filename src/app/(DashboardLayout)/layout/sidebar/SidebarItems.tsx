import React from "react";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import './style.css'
import {
  IconUsers,
  IconTransactionDollar,
  IconBuildingWarehouse,
  IconPackages,
  IconBrandTelegram,
  IconLayoutGridAdd,
  IconPrinter,
  IconLayoutDashboard,
  IconArchive,
  IconBell,
  IconSettings,
  IconShoppingCart,
  IconTicket,
  IconRobotFace,
  IconBlockquote,
  IconWallet,
  IconChartBar,
  IconCurrencyBitcoin,
  IconUserStar,
  IconCoin
} from "@tabler/icons-react"
import { useGetAdminProfile } from "@/hooks/admin-auth";

const generateUniqueId = (() => {
  const usedIds = new Set()
  return () => {
    let id
    do {
      id = Math.floor(Math.random() * 1000000) // Generate a random number
    } while (usedIds.has(id))
    usedIds.add(id)
    return id
  }
})()

const Menuitems = [
  {
    navlabel: true,
    subheader: "Menu",
  },
  {
    id: generateUniqueId(),
    title: "Bảng điều khiển",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: generateUniqueId(),
    title: "Quản lý người dùng",
    icon: IconUsers,
    href: "/admin/users",
  },
  {
    id: generateUniqueId(),
    title: "Quản lý đại lý",
    icon: IconUserStar,
    href: "javascript:void(0)",
    children: [
      {
        id: generateUniqueId(),
        title: "Danh sách đại lý",
        href: "/admin/agents",
      },
      {
        id: generateUniqueId(),
        title: "Thống kê hệ thống",
        href: "/admin/agents/statistics",
      },
      {
        id: generateUniqueId(),
        title: "Tạo mã mời",
        href: "/admin/agents/invite-codes",
      },
    ],
  },
  {
    id: generateUniqueId(),
    title: "Quản lý Blockchain",
    icon: IconCurrencyBitcoin,
    href: "javascript:void(0)",
    children: [
      {
        id: generateUniqueId(),
        title: "Cài đặt Blockchain",
        href: "/admin/blockchain/settings",
      },
      {
        id: generateUniqueId(),
        title: "Thống kê Blockchain",
        href: "/admin/blockchain/statistics",
      },
      {
        id: generateUniqueId(),
        title: "Đồng bộ thủ công",
        href: "/admin/blockchain/sync",
      },
    ],
  },
  {
    id: generateUniqueId(),
    title: "Quản lý ví",
    icon: IconWallet,
    href: "javascript:void(0)",
    children: [
      {
        id: generateUniqueId(),
        title: "Ví chính",
        href: "/admin/wallet/master",
      },
      {
        id: generateUniqueId(),
        title: "Tổng ví",
        href: "/admin/wallet/total",
      },
      {
        id: generateUniqueId(),
        title: "Ví người dùng",
        href: "/admin/wallet/users",
      },
      {
        id: generateUniqueId(),
        title: "Xử lý rút tiền",
        href: "/admin/wallet/withdrawals",
      },
    ],
  },
  {
    id: generateUniqueId(),
    title: "Các sản phẩm",
    icon: IconArchive,
    href: "javascript:void(0)",
    children: [
      {
        id: generateUniqueId(),
        title: "Thêm sản phẩm mới",
        href: "/admin/products/create-new",
      },
      {
        id: generateUniqueId(),
        title: "Tất cả sản phẩm",
        href: "/admin/products",
      },
    ],
  },
  {
    id: generateUniqueId(),
    title: "Quản lý nạp/rút",
    icon: IconTransactionDollar,
    href: "/transaction/history",
  },
  {
    id: generateUniqueId(),
    title: "Thông báo",
    icon: IconBell,
    href: "javascript:void(0)",
    children: [
      {
        id: generateUniqueId(),
        title: "Lệnh nạp",
        href: "/admin/notifications/deposit-orders",
      },
      {
        id: generateUniqueId(),
        title: "Lệnh rút",
        href: "/admin/notifications/withdraw-orders",
      },
    ],
  },
  {
    id: generateUniqueId(),
    title: "Thiết lập và cấu hình",
    icon: IconSettings,
    href: "javascript:void(0)",
    children: [
      {
        id: generateUniqueId(),
        title: "Kích hoạt tính năng",
        href: "/admin/settings/feature-activation",
      },
      {
        id: generateUniqueId(),
        title: "Cấu hình vận chuyển",
        href: "/admin/settings/shipping-config",
      },
      {
        id: generateUniqueId(),
        title: "Nước vận chuyển",
        href: "/admin/settings/shipping-countries",
      },
      {
        id: generateUniqueId(),
        title: "Shipping States",
        href: "/admin/settings/shipping-states",
      },
      {
        id: generateUniqueId(),
        title: "Thành phố vận chuyển",
        href: "/admin/settings/shipping-cities",
      },
      {
        id: generateUniqueId(),
        title: "Shipping Zones",
        href: "/admin/settings/shipping-zones",
      },
      {
        id: generateUniqueId(),
        title: "Shipping Carrier",
        href: "/admin/settings/shipping-carriers",
      },
      {
        id: generateUniqueId(),
        title: "Quản lý Template Email",
        href: "/admin/settings/email-templates",
      },
    ],
  },
]

const filterMenuItems = (items: any[], role?: string) => {
  const userRole = role; // Use the passed role

  if (userRole === "super_admin") return items;

  if (userRole === "admin") {
    return items.filter(item =>
      ["Quản lý người dùng", "Quản lý đại lý", "Quản lý Blockchain", "Quản lý ví", "Quản lý nạp/rút", "Thông báo"].includes(item.title)
    );
  }

  return items;
};

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;
  const { data: profileData } = useGetAdminProfile()

  const filteredMenuItems = filterMenuItems(
    Menuitems,
    profileData?.role,
  );

  return (
    <Box sx={{ px: 2 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {filteredMenuItems.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} onClick={toggleMobileSidebar} />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
