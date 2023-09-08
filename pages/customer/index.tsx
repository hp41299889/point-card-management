import { Box, Divider, Typography, CircularProgress } from "@mui/material";

import ManagementTable from "@/components/table/ManagementTable";
import CustomerForm from "@/components/form/management/CustomerForm";
import { TableMetadata } from "@/components/table/interface";
import { toLocaleDateTime } from "@/utils/time";
import { Customer } from "../api/customer/interface";
import { useFetchData } from "@/utils/client/hook";
import { getCustomers } from "@/utils/client/api";

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
  const { data, fetcher, loading } = useFetchData<Customer>(getCustomers);

  const sortedDatas = data.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <Box>
      <Typography variant="h6">客源管理</Typography>
      <Divider />
      {loading ? (
        <CircularProgress />
      ) : (
        <ManagementTable<Customer>
          title="customer"
          metadata={metadata}
          datas={sortedDatas}
          afterAction={fetcher}
          Form={CustomerForm}
        />
      )}
    </Box>
  );
};

export default Page;
