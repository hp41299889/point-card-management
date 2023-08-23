import { useState, useEffect } from "react";
import { Box, Divider, IconButton, List, Stack, Tooltip } from "@mui/material";
import { useRouter } from "next/router";

import RecursiveList, { ListItems } from "./RecursiveList";
import {
  Category,
  ListAlt,
  Logout,
  ManageAccounts,
  Payment,
  PermContactCalendar,
  PrecisionManufacturing,
  Receipt,
  Settings,
  SportsEsports,
} from "@mui/icons-material";

const adminItems = [
  {
    href: "/admin",
    title: "管理員",
    icon: <ManageAccounts color="primary" />,
  },
];

const systemItems = [
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
];

const Sider = () => {
  const router = useRouter();
  const [user, setUser] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const listItems: ListItems = [
    {
      title: "系統管理",
      icon: <Settings color="primary" />,
      children:
        role === "admin" ? [...adminItems, ...systemItems] : [...systemItems],
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

  useEffect(() => {
    const u = localStorage.getItem("user");
    const r = localStorage.getItem("role");
    u ? setUser(u) : router.push("/");
    if (r) {
      setRole(r);
    }
  }, []);

  useEffect(() => {
    if (role !== "admin") {
    }
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="300px"
      bgcolor="#101418"
      color="white"
    >
      <List component="nav" sx={{ flexGrow: 1 }}>
        <RecursiveList items={listItems} level={0} />
      </List>
      <Divider />
      <Box width="100%">
        <Stack direction="row" justifyContent="space-around">
          {user}
          <Tooltip
            title="登出"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              localStorage.removeItem("userId");
              localStorage.removeItem("role");
              router.push("/");
            }}
          >
            <IconButton color="primary">
              <Logout />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </Box>
  );
};

export default Sider;
