import { List } from "@mui/material";

import RecursiveList, { ListItems } from "./recursiveList";
import {
  ListAlt,
  ManageAccounts,
  Payment,
  PermContactCalendar,
  PrecisionManufacturing,
  SportsEsports,
} from "@mui/icons-material";

const listItems: ListItems = [
  {
    title: "系統管理",
    icon: <ManageAccounts />,
    children: [
      { href: "/admin", title: "管理員" },
      { href: "/payment", title: "支付方式", icon: <Payment color="action" /> },
      {
        href: "/customer",
        title: "客源名單",
        icon: <PermContactCalendar color="success" />,
      },
      {
        href: "/machine",
        title: "機台管理",
        icon: <PrecisionManufacturing color="info" />,
      },
    ],
  },
  {
    title: "產品與分類管理",
    children: [
      {
        href: "/game",
        title: "遊戲管理",
        icon: <SportsEsports color="secondary" />,
      },
      { href: "/product", title: "品項管理" },
    ],
  },
  {
    title: "訂單管理",
    href: "/order",
    icon: <ListAlt color="primary" />,
  },
];

const Sider = () => {
  return (
    <List
      sx={{
        width: "100%",
        height: "100%",
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
