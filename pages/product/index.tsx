import { Box, Typography, Divider } from "@mui/material";

import ManagementTable from "@/components/table/ManagementTable";
import { TableMetadata } from "@/components/table/interface";
import { useProducts } from "@/components/table/hook";
import { toLocaleDateTime } from "@/utils/time";
import ProductForm from "@/components/form/management/ProductForm";

const metadata: TableMetadata[] = [
  {
    key: "id",
    label: "ID",
  },
  { key: "name", label: "名稱" },
  { key: "game.name", label: "遊戲名稱" },
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
      <Typography variant="h6">項目管理</Typography>
      <Divider />
      <ManagementTable
        title="項目管理"
        metadata={metadata}
        useData={useProducts}
        Form={ProductForm}
      />
    </Box>
  );
};

export default Page;
