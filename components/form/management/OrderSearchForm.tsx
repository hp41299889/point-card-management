import { useState, useEffect } from "react";
import { Box, Button, Stack, Autocomplete, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Controller, useForm } from "react-hook-form";

import { Payment } from "@/pages/api/payment/interface";
import { Customer } from "@/pages/api/customer/interface";
import { Machine } from "@/pages/api/machine/interface";
import { getOrders } from "@/utils/client/api/order";
import { useOrders } from "@/components/table/hook";
import { Game } from "@/pages/api/game/interface";
import { Product } from "@/pages/api/product/interface";
import { getProductsByGameId } from "@/utils/client/api/product";

interface FormData {
  startAt: Dayjs | null;
  endAt: Dayjs | null;
  gameId: number;
  productId: number;
  paymentId: number;
  customerId: number;
  machineId: number;
}

interface Props {
  fetcher: (q?: object | undefined) => Promise<void>;
  fileds: {
    games: Game[];
    products: Product[];
    payments: Payment[];
    customers: Customer[];
    machines: Machine[];
  };
}

const initData: FormData = {
  startAt: null,
  endAt: null,
  gameId: 0,
  productId: 0,
  paymentId: 0,
  customerId: 0,
  machineId: 0,
};

const OrderSeachForm = (props: Props) => {
  const { fileds, fetcher } = props;
  const {
    games,
    products: allProducts,
    payments,
    customers,
    machines,
  } = fileds;
  const [products, setProducts] = useState<Product[]>([]);

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: initData,
  });

  const fetchProducts = async (gameId: number) => {
    const res = await getProductsByGameId(gameId);
    if (res.data.status === "success") {
      setProducts(res.data.data);
    }
  };

  useEffect(() => {
    setProducts(allProducts);
  }, []);

  const onSubmit = async (formData: FormData) => {
    const {
      gameId,
      productId,
      paymentId,
      customerId,
      machineId,
      startAt,
      endAt,
    } = formData;
    const query = {
      gameId: gameId ? gameId : undefined,
      productId: productId ? productId : undefined,
      paymentId: paymentId ? paymentId : undefined,
      customerId: customerId ? customerId : undefined,
      machineId: machineId ? machineId : undefined,
      startAt: startAt ? startAt.toISOString() : undefined,
      endAt: endAt ? endAt.toISOString() : undefined,
    };
    fetcher(query);
  };

  return (
    <Box component="form" paddingY={2} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Controller
          control={control}
          name="startAt"
          render={({ field: { value, onChange } }) => (
            <DateTimePicker
              value={value}
              onChange={onChange}
              ampm={false}
              format="YYYY-MM-DD HH:mm:ss"
              timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
              views={["year", "month", "day", "hours", "minutes", "seconds"]}
              slotProps={{
                actionBar: { actions: ["today", "clear", "accept", "cancel"] },
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="endAt"
          render={({ field: { value, onChange } }) => (
            <DateTimePicker
              value={value}
              onChange={onChange}
              ampm={false}
              format="YYYY-MM-DD HH:mm:ss"
              timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
              views={["year", "month", "day", "hours", "minutes", "seconds"]}
              slotProps={{
                actionBar: { actions: ["today", "clear", "accept", "cancel"] },
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="paymentId"
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              id="paymentId"
              value={payments.find((p) => p.id === value) || null}
              onChange={(_, v) => onChange(v?.id || 0)}
              options={payments}
              getOptionLabel={(o) => o.name}
              renderInput={(params) => (
                <TextField {...params} label="支付方式" />
              )}
              sx={{ width: "180px" }}
            />
          )}
        />
        <Controller
          control={control}
          name="gameId"
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              id="gameId"
              value={games.find((g) => g.id === value) || null}
              onChange={(_, v) => {
                if (v?.id) {
                  onChange(v.id);
                  fetchProducts(v.id);
                } else {
                  onChange(0);
                  setProducts(allProducts);
                }
              }}
              options={games}
              getOptionLabel={(o) => o.name}
              renderInput={(params) => <TextField {...params} label="遊戲" />}
              sx={{ width: "180px" }}
            />
          )}
        />
        <Controller
          control={control}
          name="productId"
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              id="productId"
              value={products.find((p) => p.id === value) || null}
              onChange={(_, v) => onChange(v?.id || 0)}
              options={products}
              getOptionLabel={(o) => o.name}
              renderInput={(params) => <TextField {...params} label="項目" />}
              sx={{ width: "180px" }}
            />
          )}
        />
        <Controller
          control={control}
          name="customerId"
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              id="customerId"
              value={customers.find((c) => c.id === value) || null}
              onChange={(_, v) => onChange(v?.id || 0)}
              options={customers}
              getOptionLabel={(o) => o.name}
              renderInput={(params) => <TextField {...params} label="客源" />}
              sx={{ width: "180px" }}
            />
          )}
        />
        <Controller
          control={control}
          name="machineId"
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              id="machineId"
              value={machines.find((m) => m.id === value) || null}
              onChange={(_, v) => onChange(v?.id || 0)}
              options={machines}
              getOptionLabel={(o) => o.name}
              renderInput={(params) => <TextField {...params} label="機台" />}
              sx={{ width: "180px" }}
            />
          )}
        />
        <Button variant="contained" type="submit">
          查詢
        </Button>
      </Stack>
    </Box>
  );
};

export default OrderSeachForm;
