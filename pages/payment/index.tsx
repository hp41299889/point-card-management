import { Box, Typography, Divider, CircularProgress } from "@mui/material";

import ManagementTable from "@/components/table/ManagementTable";
import { TableMetadata } from "@/components/table/interface";
import { usePayments } from "@/components/table/hook";
import { toLocaleDateTime } from "@/utils/time";
import PaymentForm from "@/components/form/management/PaymentForm";
import { Payment } from "../api/payment/interface";

const metadata: TableMetadata[] = [
  {
    key: "sn",
    label: "序號",
  },
  { key: "name", label: "名稱" },
  { key: "description", label: "描述" },
  { key: "note", label: "備註" },
  {
    key: "createdAt",
    label: "建立時間",
    preDisplay: (u) => toLocaleDateTime(u.createdAt),
    width: "150px",
  },
  {
    key: "updatedAt",
    label: "更新時間",
    preDisplay: (u) => toLocaleDateTime(u.updatedAt),
    width: "150px",
  },
];

const Page = () => {
  const { data, fetcher, loading } = usePayments();
  return (
    <Box>
      <Typography variant="h6">支付方式管理</Typography>
      <Divider />
      {loading ? (
        <CircularProgress />
      ) : (
        <ManagementTable<Payment>
          title="payment"
          metadata={metadata}
          datas={data}
          afterAction={fetcher}
          Form={PaymentForm}
        />
      )}
    </Box>
  );
};

export default Page;
