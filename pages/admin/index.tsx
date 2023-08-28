import { Box, CircularProgress, Divider, Typography } from "@mui/material";

import { TableMetadata } from "@/components/table/interface";
import { toLocaleDateTime } from "@/utils/time";
import ManagementTable from "@/components/table/ManagementTable";
import UserForm from "@/components/form/management/UserForm";
import { useUsers } from "@/components/table/hook";
import { User } from "../api/user/interface";

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
  const { data, fetcher, loading } = useUsers();

  const sortedDatas = data.sort((a, b) => a.id - b.id);

  return (
    <Box>
      <Typography variant="h6">管理員</Typography>
      <Divider />
      {loading ? (
        <CircularProgress />
      ) : (
        <ManagementTable<User>
          title="admin"
          metadata={metadata}
          datas={sortedDatas}
          afterAction={fetcher}
          Form={UserForm}
        />
      )}
    </Box>
  );
};

export default Page;
