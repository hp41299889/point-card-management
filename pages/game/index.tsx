import { Box, Typography, Divider } from "@mui/material";

import ManagementTable from "@/components/table/ManagementTables";
import { TableMetadata } from "@/components/table/interface";
import { useGames } from "@/components/table/hook";
import { toLocaleDateTime } from "@/utils/time";
import GameForm from "@/components/form/management/GameForm";

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
      <Typography variant="h6">遊戲管理</Typography>
      <Divider />
      <ManagementTable
        title="遊戲管理"
        metadata={metadata}
        useData={useGames}
        Form={GameForm}
      />
    </Box>
  );
};

export default Page;
