import { Fragment } from "react";
import {
  Box,
  Divider,
  TableCell,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import _ from "lodash";

import OrderForm from "@/components/form/management/OrderForm";
import ManagementTable from "@/components/table/ManagementTable";
import {
  useCustomers,
  useGames,
  useMachines,
  useOrders,
  usePayments,
  useProducts,
} from "@/components/table/hook";
import { TableMetadata } from "@/components/table/interface";
import { toLocaleDateTime } from "@/utils/time";
import { Order } from "../api/order/interface";
import OrderSeachForm from "@/components/form/management/OrderSearchForm";

const costPreProcess = (cost: string) => {
  const splited = cost.split(",");
  return splited[0];
};

const cardPricePreProcess = (cost: string) => {
  const splited = cost.split(",");
  return `${splited[1]}*${splited[2]}`;
};

const metadata: TableMetadata[] = [
  { key: "sn", label: "序號", width: "40px" },
  {
    key: "payment.name",
    label: "支付方式",
    preDisplay: (d) => _.get(d, "payment.name"),
  },
  {
    key: "product.game.name",
    label: "遊戲",
    preDisplay: (d) => _.get(d, "product.game.name"),
  },
  {
    key: "product.name",
    label: "項目",
    preDisplay: (d) => _.get(d, "product.name"),
  },
  {
    key: "customer.name",
    label: "客源",
    preDisplay: (d) => _.get(d, "customer.name"),
  },
  {
    key: "machine.name",
    label: "機台",
    preDisplay: (d) => _.get(d, "machine.name"),
  },
  { key: "cost", label: "成本", preDisplay: (d) => costPreProcess(d.cost) },
  {
    key: "cardPrice",
    label: "卡價",
    preDisplay: (d) => cardPricePreProcess(d.cost),
  },
  { key: "price", label: "售價" },
  { key: "amount", label: "數量" },
  {
    key: "user.name",
    label: "處理人員",
    preDisplay: (d) => _.get(d, "user.name"),
  },
  { key: "status", label: "訂單狀態" },
  { key: "note", label: "備註" },
  {
    key: "createdAt",
    label: "建立日期",
    preDisplay: (u) => toLocaleDateTime(u.createdAt),
    width: "150px",
  },
  // {
  //   key: "updatedAt",
  //   label: "更新日期",
  //   preDisplay: (u) => toLocaleDateTime(u.updatedAt),
  //   width: "150px",
  // },
];

const extraKey = ["machine.name", "cost", "cardPrice", "price"];

const Page = () => {
  const { data, fetcher, loading } = useOrders();
  const { data: products } = useProducts();
  const { data: payments } = usePayments();
  const { data: customers } = useCustomers();
  const { data: machines } = useMachines();
  const { data: games } = useGames();

  const extraRow = (data: Order[]) => (
    <TableRow>
      {metadata.map((m, i) => (
        <Fragment key={`e_${m.key}_${i}`}>
          {!extraKey.includes(m.key) && <TableCell />}
          {m.key === "machine.name" && <TableCell>總計</TableCell>}
          {m.key === "cost" && (
            <TableCell>
              {data
                .reduce((pre, cur) => {
                  const cost = cur.cost.split(",");
                  return pre + Number(cost[0]) * cur.amount;
                }, 0)
                .toFixed(2)}
            </TableCell>
          )}
          {m.key === "cardPrice" && (
            <TableCell>
              {data
                .reduce((pre, cur) => {
                  const cost = cur.cost.split(",");
                  return (
                    pre +
                    Number(cost[0]) *
                      Number(cost[1]) *
                      Number(cost[2]) *
                      cur.amount
                  );
                }, 0)
                .toFixed(2)}
            </TableCell>
          )}
          {m.key === "price" && (
            <TableCell>
              {data.reduce((pre, cur) => {
                return pre + cur.price * cur.amount;
              }, 0)}
            </TableCell>
          )}
        </Fragment>
      ))}
      <TableCell />
    </TableRow>
  );

  const sortedDatas = data.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <Box>
      <Typography variant="h6">訂單管理</Typography>
      <Divider />
      <OrderSeachForm
        fetcher={fetcher}
        fileds={{ games, products, payments, customers, machines }}
      />
      <Divider />
      {loading ? (
        <CircularProgress />
      ) : (
        <ManagementTable<Order>
          title="order"
          metadata={metadata}
          datas={sortedDatas}
          afterAction={fetcher}
          fields={{ games, payments, customers, machines }}
          Form={OrderForm}
          extraRow={extraRow}
        />
      )}
    </Box>
  );
};

export default Page;
