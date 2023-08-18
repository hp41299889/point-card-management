import { Box, Divider, Typography } from "@mui/material";

import { TableMetadata } from "@/components/table/interface";
import { toLocaleDateTime } from "@/utils/time";
import ManagementTable from "@/components/table/ManagementTable";
import UserForm from "@/components/form/management/UserForm";
import { useUsers } from "@/components/table/hook";

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
