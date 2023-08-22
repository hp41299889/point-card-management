import { useState } from "react";
import {
  Box,
  Divider,
  TableCell,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";

import OrderForm from "@/components/form/management/OrderForm";
import ManagementTable from "@/components/table/ManagementTable";
import {
  useCustomers,
  useGames,
  useMachines,
  useOrders,
  usePayments,
} from "@/components/table/hook";
import { TableMetadata } from "@/components/table/interface";
import { toLocaleDateTime } from "@/utils/time";
import { Order } from "../api/order/interface";
import { FormType } from "@/components/form/management/interface";
import OrderSeachForm from "@/components/form/management/OrderSearchForm";

type Data = Order | null;

const costPreProcess = (cost: string) => {
  const splited = cost.split(",");
  return `${splited[0]}*${splited[1]}=${splited[2]}`;
};

const metadata: TableMetadata[] = [
  { key: "sn", label: "序號" },
  { key: "payment.name", label: "支付方式" },
  { key: "product.game.name", label: "遊戲" },
  { key: "product.name", label: "項目" },
  { key: "customer.name", label: "客源" },
  { key: "machine.name", label: "機台" },
  { key: "cost", label: "成本", preDisplay: (d) => costPreProcess(d.cost) },
  { key: "price", label: "售價" },
  { key: "amount", label: "數量" },
  {
    key: "user.name",
    label: "處理人員",
  },
  { key: "status", label: "訂單狀態" },
  { key: "description", label: "描述" },
  { key: "note", label: "備註" },
  {
    key: "createdAt",
    label: "建立日期",
    preDisplay: (u) => toLocaleDateTime(u.updatedAt),
    width: "150px",
  },
  {
    key: "updatedAt",
    label: "更新日期",
    preDisplay: (u) => toLocaleDateTime(u.updatedAt),
    width: "150px",
  },
];

const Page = () => {
  const { data, fetcher, loading } = useOrders();
  const { data: payments } = usePayments();
  const { data: customers } = useCustomers();
  const { data: machines } = useMachines();
  const { data: games } = useGames();

  //TODO
  const [orders, setOrders] = useState<Order[]>(data);
  console.log(orders);
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

  const extraRow = (data: Order[]) => (
    <TableRow>
      {metadata.map((m, i) => (
        <>
          {m.key !== "cost" && m.key !== "machine.name" && <TableCell />}
          {m.key === "machine.name" && (
            <TableCell key={`e_${m.key}_${i}`}>總計</TableCell>
          )}
          {m.key === "cost" && (
            <TableCell>
              {data.reduce((pre, cur) => {
                const cost: string = cur.cost;
                const multy = cost.split(",")[2];
                return pre + Number(multy);
              }, 0)}
            </TableCell>
          )}
        </>
      ))}
      <TableCell />
    </TableRow>
  );

  return (
    <Box>
      <Typography variant="h6">管理員</Typography>
      <Divider />
      <OrderSeachForm fileds={{ payments, customers, machines }} />
      <Divider />
      {loading ? (
        <CircularProgress />
      ) : (
        <ManagementTable<Order>
          title="用戶管理"
          metadata={metadata}
          datas={orders}
          onClickData={{
            onNew: onClickNewData,
            onWatch: onClickWatchData,
            onEdit: onClickEditData,
            onDelete: onClickDeleteData,
          }}
          extraRow={extraRow}
        />
      )}
      <OrderForm
        open={formModal}
        type={formType}
        data={selected}
        fields={{
          payments,
          customers,
          machines,
          games,
        }}
        onClose={onClose}
        afterAction={fetcher}
      />
    </Box>
  );
};

export default Page;
