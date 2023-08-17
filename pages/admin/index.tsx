import { Box, Divider, Typography } from "@mui/material";

import { TableMetadata } from "@/components/table/interface";
import { toLocaleDateTime } from "@/utils/time";
import ManagementTable from "@/components/table/ManagementTable";
import UserForm from "@/components/form/management/UserForm";
import { useUsers } from "@/components/table/hook";

const metadata: TableMetadata[] = [
  {
    key: "id",
    label: "ID",
  },
  { key: "name", label: "名稱" },
  {
    key: "createdAt",
    label: "建立時間",
    preDisplay: (u) => toLocaleDateTime(u.createdAt),
  },
  {
    key: "updatedAt",
    label: "更新時間",
    preDisplay: (u) => toLocaleDateTime(u.updatedAt),
  },
];

const Page = () => {
  return (
    <Box>
      <Typography variant="h6">管理員</Typography>
      <Divider />
      <ManagementTable
        title="用戶管理"
        metadata={metadata}
        useData={useUsers}
        Form={UserForm}
      />
    </Box>
  );
};

export default Page;
