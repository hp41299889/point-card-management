import { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  IconButton,
  Stack,
  Box,
  Typography,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";

import { TableMetadata, TableHook } from "./interface";
import { FormProps, FormType } from "@/components/form/management/interface";
import { User } from "@/pages/api/user/interface";
import { Customer } from "@/pages/api/customer/interface";

interface Props {
  title: string;
  metadata: TableMetadata[];
  useData: TableHook<User | Customer>;
  Form: React.ComponentType<FormProps>;
}

const ManagementTable = (props: Props) => {
  const { title, metadata, useData, Form } = props;
  const { data, fetcher, loading } = useData();
  const [selected, setSelected] = useState<User | Customer | null>(null);
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

  const onClickWatchData = (data: User | Customer | null) => {
    setFormType("watch");
    setSelected(data);
    setFormModal(true);
  };

  const onClickEditData = (data: User | Customer | null) => {
    setFormType("edit");
    setSelected(data);
    setFormModal(true);
  };

  const onClickDeleteData = (data: User | Customer | null) => {
    setFormType("delete");
    setSelected(data);
    setFormModal(true);
  };

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return (
    <Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Stack direction="row" justifyContent="space-between">
            <Typography>{title}</Typography>
            <Stack direction="row">
              <Tooltip title="新增">
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => onClickNewData()}
                >
                  新增
                </Button>
              </Tooltip>
            </Stack>
          </Stack>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {metadata.map((m, i) => (
                    <TableCell key={m.label}>{m.label}</TableCell>
                  ))}
                  <TableCell>操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((d, i) => (
                  <TableRow key={`${title}_${i}`}>
                    {metadata.map((m, i) => (
                      <TableCell key={m.key}>
                        {m.preDisplay ? m.preDisplay(d) : d[m.key]}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Stack direction="row">
                        <Tooltip
                          title="查看"
                          onClick={() => onClickWatchData(d)}
                        >
                          <IconButton>
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="編輯">
                          <IconButton onClick={() => onClickEditData(d)}>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="刪除">
                          <IconButton onClick={() => onClickDeleteData(d)}>
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Form
            open={formModal}
            type={formType}
            data={selected}
            onClose={onClose}
            afterAction={fetcher}
          />
        </>
      )}
    </Box>
  );
};

export default ManagementTable;
