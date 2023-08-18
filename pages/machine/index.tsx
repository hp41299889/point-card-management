import { Box, Typography, Divider } from "@mui/material";

import ManagementTable from "@/components/table/ManagementTable";
import { TableMetadata } from "@/components/table/interface";
import { useMachines } from "@/components/table/hook";
import MachineForm from "@/components/form/management/MachineForm";
import { toLocaleDateTime } from "@/utils/time";

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
      <Typography variant="h6">機台管理</Typography>
      <Divider />
      <ManagementTable
        title="機台管理"
        metadata={metadata}
        useData={useMachines}
        Form={MachineForm}
      />
    </Box>
  );
};

export default Page;
