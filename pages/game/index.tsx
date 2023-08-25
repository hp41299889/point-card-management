import { Box, Typography, Divider, CircularProgress } from "@mui/material";

import ManagementTable from "@/components/table/ManagementTable";
import { TableMetadata } from "@/components/table/interface";
import { useGames } from "@/components/table/hook";
import { toLocaleDateTime } from "@/utils/time";
import GameForm from "@/components/form/management/GameForm";
import { Game } from "../api/game/interface";

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
  const { data, fetcher, loading } = useGames();

  return (
    <Box>
      <Typography variant="h6">遊戲管理</Typography>
      <Divider />
      {loading ? (
        <CircularProgress />
      ) : (
        <ManagementTable<Game>
          title="game"
          metadata={metadata}
          datas={data}
          afterAction={fetcher}
          Form={GameForm}
        />
      )}
    </Box>
  );
};

export default Page;
