import { Box, Button, Stack, Autocomplete, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Controller, useForm } from "react-hook-form";

import { Payment } from "@/pages/api/payment/interface";
import { Customer } from "@/pages/api/customer/interface";
import { Machine } from "@/pages/api/machine/interface";
import { getOrders } from "@/utils/client/api/order";
import { useOrders } from "@/components/table/hook";

interface FormData {
  startAt: Dayjs | null;
  endAt: Dayjs | null;
  paymentId: number;
  customerId: number;
  machineId: number;
}

interface Props {
  fileds: {
    payments: Payment[];
    customers: Customer[];
    machines: Machine[];
  };
}

const initData: FormData = {
  startAt: null,
  endAt: dayjs(),
  paymentId: 0,
  customerId: 0,
  machineId: 0,
};

const OrderSeachForm = (props: Props) => {
  const { fileds } = props;
  const { payments, customers, machines } = fileds;
  const { fetcher } = useOrders();

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: initData,
  });

  const onSubmit = async (formData: FormData) => {
    const { paymentId, customerId, machineId, startAt, endAt } = formData;
    const query = {
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
              views={["year", "month", "day", "hours", "minutes", "seconds"]}
            />
          )}
        />
        -
        <Controller
          control={control}
          name="endAt"
          render={({ field: { value, onChange } }) => (
            <DateTimePicker
              value={value}
              onChange={onChange}
              ampm={false}
              format="YYYY-MM-DD HH:mm:ss"
              views={["year", "month", "day", "hours", "minutes", "seconds"]}
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
