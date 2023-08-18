import { Box, Divider, Typography } from "@mui/material";

import OrderForm from "@/components/form/management/OrderForm";
import ManagementTable from "@/components/table/ManagementTable";
import { useOrders } from "@/components/table/hook";
import { TableMetadata } from "@/components/table/interface";
import { toLocaleDateTime } from "@/utils/time";

const metadata: TableMetadata[] = [
  { key: "sn", label: "序號" },
  { key: "payment.name", label: "支付方式" },
  { key: "product.game.name", label: "遊戲" },
  { key: "product.name", label: "項目" },
  { key: "customer.name", label: "客源" },
  { key: "machine.name", label: "機台" },
  { key: "cost", label: "成本" },
  { key: "price", label: "售價" },
  { key: "amount", label: "數量" },
  // {key:'user.name', label:'處理人員'},
  { key: "status", label: "訂單狀態" },
  { key: "descrption", label: "描述" },
  { key: "note", label: "備註" },
  {
    key: "createdAt",
    label: "建立日期",
    preDisplay: (u) => toLocaleDateTime(u.updatedAt),
    width: "150px",
  },
  {
    key: "updatedAt",
    label: "更新日期",
    preDisplay: (u) => toLocaleDateTime(u.updatedAt),
    width: "150px",
  },
];

const Page = () => {
  return (
    <Box>
      <Typography variant="h6">訂單管理</Typography>
      <Divider />
      <ManagementTable
        title="訂單管理"
        metadata={metadata}
        useData={useOrders}
        Form={OrderForm}
      />
    </Box>
  );
};

export default Page;
