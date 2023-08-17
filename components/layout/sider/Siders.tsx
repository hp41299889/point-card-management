import { List } from "@mui/material";

import RecursiveList, { ListItems } from "./RecursiveList";
import {
  Category,
  ListAlt,
  ManageAccounts,
  Payment,
  PermContactCalendar,
  PrecisionManufacturing,
  Receipt,
  Settings,
  SportsEsports,
} from "@mui/icons-material";

const listItems: ListItems = [
  {
    title: "系統管理",
    icon: <Settings color="primary" />,
    children: [
      {
        href: "/admin",
        title: "管理員",
        icon: <ManageAccounts color="primary" />,
      },
      {
        href: "/payment",
        title: "支付方式",
        icon: <Payment color="primary" />,
      },
      {
        href: "/customer",
        title: "客源名單",
        icon: <PermContactCalendar color="primary" />,
      },
      {
        href: "/machine",
        title: "機台管理",
        icon: <PrecisionManufacturing color="primary" />,
      },
    ],
  },
  {
    title: "產品與分類管理",
    icon: <Category color="primary" />,
    children: [
      {
        href: "/game",
        title: "遊戲管理",
        icon: <SportsEsports color="primary" />,
      },
      {
        href: "/product",
        title: "品項管理",
        icon: <ListAlt color="primary" />,
      },
    ],
  },
  {
    title: "訂單管理",
    href: "/order",
    icon: <Receipt color="primary" />,
  },
];

const Sider = () => {
  return (
    <List
      sx={{
        width: "300px",
        bgcolor: "#101418",
        color: "white",
      }}
      component="nav"
    >
      <RecursiveList items={listItems} level={0} />
    </List>
  );
};

export default Sider;
