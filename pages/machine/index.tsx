import { Box, Typography, Divider, CircularProgress } from "@mui/material";

import ManagementTable from "@/components/table/ManagementTable";
import { TableMetadata } from "@/components/table/interface";
import { useMachines } from "@/components/table/hook";
import MachineForm from "@/components/form/management/MachineForm";
import { toLocaleDateTime } from "@/utils/time";
import { Machine } from "../api/machine/interface";

const metadata: TableMetadata[] = [
  {
    key: "sn",
    label: "序號",
    width: "40px",
  },
  { key: "name", label: "名稱", width: "100px" },
  { key: "note", label: "備註" },
  {
    key: "createdAt",
    label: "建立時間",
    preDisplay: (u) => toLocaleDateTime(u.createdAt),
    width: "150px",
  },
  // {
  //   key: "updatedAt",
  //   label: "更新時間",
  //   preDisplay: (u) => toLocaleDateTime(u.updatedAt),
  //   width: "150px",
  // },
];

const Page = () => {
  const { data, fetcher, loading } = useMachines();

  const sortedDatas = data.sort((a, b) => a.id - b.id);

  return (
    <Box>
      <Typography variant="h6">機台管理</Typography>
      <Divider />
      {loading ? (
        <CircularProgress />
      ) : (
        <ManagementTable<Machine>
          title="machine"
          metadata={metadata}
          datas={sortedDatas}
          afterAction={fetcher}
          Form={MachineForm}
        />
      )}
    </Box>
  );
};

export default Page;
