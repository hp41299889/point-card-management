import { Box, Typography, Divider, CircularProgress } from "@mui/material";

import ManagementTable from "@/components/table/ManagementTable";
import { TableMetadata } from "@/components/table/interface";
import { useGames, useProducts } from "@/components/table/hook";
import { toLocaleDateTime } from "@/utils/time";
import ProductForm from "@/components/form/management/ProductForm";
import { Product } from "../api/product/interface";

const metadata: TableMetadata[] = [
  {
    key: "sn",
    label: "序號",
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
  const { data, fetcher, loading } = useProducts();
  const { data: games } = useGames();

  return (
    <Box>
      <Typography variant="h6">項目管理</Typography>
      <Divider />
      {loading ? (
        <CircularProgress />
      ) : (
        <ManagementTable<Product>
          title="product"
          metadata={metadata}
          datas={data}
          afterAction={fetcher}
          fields={{ games: games }}
          Form={ProductForm}
        />
      )}
    </Box>
  );
};

export default Page;
