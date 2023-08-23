import { useState } from "react";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";

import { TableMetadata } from "@/components/table/interface";
import { toLocaleDateTime } from "@/utils/time";
import ManagementTable from "@/components/table/ManagementTable";
import UserForm from "@/components/form/management/UserForm";
import { useUsers } from "@/components/table/hook";
import { User } from "../api/user/interface";
import { FormType } from "@/components/form/management/interface";

type Data = User | null;

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
  const { data, fetcher, loading } = useUsers();
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
      <Typography variant="h6">管理員</Typography>
      <Divider />
      {loading ? (
        <CircularProgress />
      ) : (
        <ManagementTable<User>
          title="用戶管理"
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
      <UserForm
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
