import { Box, Typography, Divider, CircularProgress } from "@mui/material";

import ManagementTable from "@/components/table/ManagementTable";
import { TableMetadata } from "@/components/table/interface";
import { toLocaleDateTime } from "@/utils/time";
import ProductForm from "@/components/form/management/ProductForm";
import { Product } from "../api/product/interface";
import _ from "lodash";
import { useFetchData } from "@/utils/client/hook";
import { getGamesUnshowable, getProducts } from "@/utils/client/api";
import { Game } from "../api/game/interface";

const metadata: TableMetadata[] = [
  {
    key: "sn",
    label: "序號",
    width: "40px",
  },
  { key: "name", label: "名稱", width: "100px" },
  {
    key: "game.name",
    label: "遊戲名稱",
    width: "120px",
    preDisplay: (d) => _.get(d, "game.name"),
  },
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
  const { data, fetcher, loading } = useFetchData<Product>(getProducts);
  const { data: games } = useFetchData<Game>(getGamesUnshowable);

  const sortedDatas = data.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

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
          datas={sortedDatas}
          afterAction={fetcher}
          fields={{ games: games }}
          Form={ProductForm}
        />
      )}
    </Box>
  );
};

export default Page;
