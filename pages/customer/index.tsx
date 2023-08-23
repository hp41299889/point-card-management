import { useState } from "react";
import { Box, Divider, Typography, CircularProgress } from "@mui/material";

import ManagementTable from "@/components/table/ManagementTable";
import CustomerForm from "@/components/form/management/CustomerForm";
import { TableMetadata } from "@/components/table/interface";
import { useCustomers } from "@/components/table/hook";
import { toLocaleDateTime } from "@/utils/time";
import { Customer } from "../api/customer/interface";
import { FormType } from "@/components/form/management/interface";

type Data = Customer | null;

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
  const { data, fetcher, loading } = useCustomers();
  const [selected, setSelected] = useState<Data>(null);
  const [formType, setFormType] = useState<FormType>("create");
  const [formModal, setFormModal] = useState<boolean>(false);

  const onClose = () => {
    setFormModal(false);
    setSelected(null);
  };

  const onClickNewData = () => {
    setFormType("create");
    setSelected(null);
    setFormModal(true);
  };

  const onClickWatchData = (data: Data) => {
    setFormType("watch");
    setSelected(data);
    setFormModal(true);
  };

  const onClickEditData = (data: Data) => {
    setFormType("edit");
    setSelected(data);
    setFormModal(true);
  };

  const onClickDeleteData = (data: Data) => {
    setFormType("delete");
    setSelected(data);
    setFormModal(true);
  };

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
          datas={data}
          onClickData={{
            onNew: onClickNewData,
            onWatch: onClickWatchData,
            onEdit: onClickEditData,
            onDelete: onClickDeleteData,
          }}
        />
      )}
      <CustomerForm
        open={formModal}
        type={formType}
        data={selected}
        onClose={onClose}
        afterAction={fetcher}
      />
    </Box>
  );
};

export default Page;
