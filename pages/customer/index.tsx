import { Box, Divider, Typography } from "@mui/material";

import ManagementTable from "@/components/table/ManagementTable";
import CustomerForm from "@/components/form/management/CustomerForm";
import { TableMetadata } from "@/components/table/interface";
import { useCustomers } from "@/components/table/hook";
import { toLocaleDateTime } from "@/utils/time";

const metadata: TableMetadata[] = [
  {
    key: "id",
    label: "ID",
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
  return (
    <Box>
      <Typography variant="h6">客源管理</Typography>
      <Divider />
      <ManagementTable
        title="客源管理"
        metadata={metadata}
        useData={useCustomers}
        Form={CustomerForm}
      />
    </Box>
  );
};

export default Page;
