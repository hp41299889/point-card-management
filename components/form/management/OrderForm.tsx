import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  AlertTitle,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Autocomplete,
  Stack,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { FormProps } from "./interface";
import { PostOrder, PatchOrder } from "@/pages/api/order/interface";
import { Order } from "@/pages/api/order/interface";
import ModalAction from "@/components/modal/ModalAction";
import {
  postOrder,
  patchOrderByUid,
  deleteOrderByUid,
} from "@/utils/client/api/order";
import {
  useCustomers,
  useGames,
  useMachines,
  usePayments,
  useProducts,
} from "@/components/table/hook";
import { useDispatch } from "@/utils/client/redux/store";
import { setAppFeedbackSnackbar } from "@/utils/client/redux/app";
import { Product } from "@/pages/api/product/interface";
import { getProductsByGameId } from "@/utils/client/api/product";

interface FormData extends PostOrder {
  confirm: boolean;
}

interface Props extends FormProps {
  data: Order | null;
}

const initData: FormData = {
  amount: 0,
  cost: "",
  price: 0,
  status: "",
  description: "",
  note: "",
  userId: 0,
  paymentId: 0,
  machineId: 0,
  productId: 0,
  customerId: 0,
  confirm: false,
};

const OrderForm = (props: Props) => {
  const { open, type, data, onClose, afterAction } = props;
  const [products, setProducts] = useState<Product[]>([]);
  const [cost1, setCost1] = useState<number>(0);
  const [cost2, setCost2] = useState<number>(0);
  const [equal, setEqual] = useState<number>(0);
  const dispatch = useDispatch();
  const {
    data: payments,
    fetcher: fetchPayments,
    loading: loadingPayments,
  } = usePayments();
  const {
    data: customers,
    fetcher: fetchCustomers,
    loading: loadingCustomers,
  } = useCustomers();
  const {
    data: machines,
    fetcher: fetchMachines,
    loading: loadingMachines,
  } = useMachines();
  const {
    data: games,
    fetcher: fetchGames,
    loading: loadingGames,
  } = useGames();

  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: initData });

  const onSubmit = async (formData: FormData) => {
    console.log(data);

    const { confirm, ...payload } = formData;
    const cost = `${cost1},${cost2},${equal}`;
    payload.cost = cost;
    payload.userId = 1;
    payload.amount = Number(payload.amount);
    payload.price = Number(payload.price);
    switch (type) {
      case "create": {
        try {
          setValue("confirm", true);
          const res = await postOrder(payload);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "新增訂單成功！",
              })
            );
            afterAction();
          }
        } catch (err) {
          console.error(err);
          dispatch(
            setAppFeedbackSnackbar({
              open: true,
              type: "error",
              message: "新增訂單失敗！",
            })
          );
        }
        break;
      }
      case "edit": {
        try {
          setValue("confirm", true);
          const res = await patchOrderByUid(data?.uid!, payload);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "編輯訂單成功！",
              })
            );
            afterAction();
          }
        } catch (err) {
          console.error(err);
          dispatch(
            setAppFeedbackSnackbar({
              open: true,
              type: "error",
              message: "編輯訂單失敗！",
            })
          );
        }
        break;
      }
      case "delete": {
        try {
          const res = await deleteOrderByUid(data?.uid!);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "刪除訂單成功！",
              })
            );
            afterAction();
          }
        } catch (err) {
          console.error(err);
          dispatch(
            setAppFeedbackSnackbar({
              open: true,
              type: "error",
              message: "刪除訂單失敗！",
            })
          );
        }
        break;
      }
    }
  };

  const fetchProducts = async (gameId: number) => {
    const res = await getProductsByGameId(gameId);
    if (res.data.status === "success") {
      setProducts(res.data.data);
    }
  };

  useEffect(() => {
    data ? reset({ ...data }) : reset(initData);
  }, [data, reset]);

  useEffect(() => {
    fetchPayments();
    fetchMachines();
    fetchCustomers();
    fetchGames();
  }, [fetchPayments, fetchMachines, fetchCustomers, fetchGames]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {type === "create" && "新增"}
        {type === "edit" && "編輯"}
        {type === "delete" && "刪除"}
        項目表單
      </DialogTitle>
      <Divider />
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {type === "delete" ? (
            <Alert severity="error">
              <AlertTitle>警告！</AlertTitle>
              此動作確認後無法反悔
            </Alert>
          ) : (
            <Grid container spacing={2}>
              <Grid item lg={5}>
                <Controller
                  name="paymentId"
                  control={control}
                  rules={{ validate: (v) => v !== 0 || "請選擇支付方式" }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Autocomplete
                      id="paymentId"
                      options={payments}
                      loading={loadingPayments}
                      value={payments.find((g) => g.id === value) || null}
                      onChange={(_, v) => onChange(v?.id ? v.id : 0)}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      getOptionLabel={(o) => o.name}
                      renderOption={(props, option) => (
                        <li key={`paymentOption_${option.id}`} {...props}>
                          {option.name}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="支付方式"
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                      fullWidth
                      disabled={type === "watch"}
                    />
                  )}
                />
              </Grid>
              <Grid item lg={7} />
              <Grid item lg={5}>
                {/* TODO 關閉modal不會重製product */}
                <Autocomplete
                  id="game"
                  options={games}
                  loading={loadingGames}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(_, g) =>
                    g?.id ? fetchProducts(g.id) : setProducts([])
                  }
                  getOptionLabel={(o) => o.name}
                  renderOption={(props, option) => (
                    <li key={`productOption_${option.id}`} {...props}>
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="遊戲" />
                  )}
                  fullWidth
                  disabled={type === "watch"}
                />
              </Grid>
              <Grid item lg={5}>
                <Controller
                  name="productId"
                  control={control}
                  rules={{ validate: (v) => v !== 0 || "請選擇項目" }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Autocomplete
                      id="productId"
                      options={products}
                      value={products.find((g) => g.id === value) || null}
                      onChange={(_, v) => onChange(v?.id ? v.id : 0)}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      getOptionLabel={(o) => o.name}
                      renderOption={(props, option) => (
                        <li key={`productOption_${option.id}`} {...props}>
                          {option.name}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="項目"
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                      fullWidth
                      disabled={type === "watch"}
                    />
                  )}
                />
              </Grid>
              <Grid item lg={5}>
                <Controller
                  name="customerId"
                  control={control}
                  rules={{ validate: (v) => v !== 0 || "請選擇客源" }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Autocomplete
                      id="customerId"
                      options={customers}
                      loading={loadingCustomers}
                      value={customers.find((g) => g.id === value) || null}
                      onChange={(_, v) => onChange(v?.id ? v.id : 0)}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      getOptionLabel={(o) => o.name}
                      renderOption={(props, option) => (
                        <li key={`customerOption_${option.id}`} {...props}>
                          {option.name}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="客源"
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                      fullWidth
                      disabled={type === "watch"}
                    />
                  )}
                />
              </Grid>
              <Grid item lg={7} />
              <Grid item lg={5}>
                <Controller
                  name="machineId"
                  control={control}
                  rules={{ validate: (v) => v !== 0 || "請選擇機台" }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Autocomplete
                      id="machineId"
                      options={machines}
                      loading={loadingMachines}
                      value={machines.find((g) => g.id === value) || null}
                      onChange={(_, v) => onChange(v?.id ? v.id : 0)}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      getOptionLabel={(o) => o.name}
                      renderOption={(props, option) => (
                        <li key={`machineOption_${option.id}`} {...props}>
                          {option.name}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="機台"
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                      fullWidth
                      disabled={type === "watch"}
                    />
                  )}
                />
              </Grid>
              <Grid item lg={7} />
              <Grid item lg={5}>
                <TextField
                  id="amount"
                  label="數量"
                  fullWidth
                  type="number"
                  value={watch("amount") || ""}
                  {...register("amount", { required: true })}
                  disabled={type === "watch"}
                  error={Boolean(errors.amount)}
                  helperText={errors.amount && "請輸入數量"}
                />
              </Grid>
              <Grid item lg={7} />
              <Grid item lg={10}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField
                    id="cost1"
                    fullWidth
                    type="number"
                    value={cost1 || ""}
                    onChange={(e) => setCost1(Number(e.target.value))}
                    disabled={type === "watch"}
                  />
                  <Typography variant="h5">x</Typography>
                  <TextField
                    id="cost2"
                    fullWidth
                    type="number"
                    value={cost2 || ""}
                    onChange={(e) => setCost2(Number(e.target.value))}
                    disabled={type === "watch"}
                  />
                  <Typography variant="h5">=</Typography>
                  <TextField
                    id="cost3"
                    fullWidth
                    type="number"
                    value={equal || ""}
                    onChange={(e) => setEqual(Number(e.target.value))}
                    disabled={type === "watch"}
                  />
                </Stack>
              </Grid>
              <Grid item lg={2} />
              <Grid item lg={5}>
                <TextField
                  id="price"
                  label="售價"
                  fullWidth
                  type="number"
                  value={watch("price") || ""}
                  {...register("price", { required: true })}
                  disabled={type === "watch"}
                  error={Boolean(errors.price)}
                  helperText={errors.price && "請輸入售價"}
                />
              </Grid>
              <Grid item lg={12}>
                <TextField
                  id="description"
                  label="描述"
                  fullWidth
                  {...register("description")}
                  disabled={type === "watch"}
                />
              </Grid>
              <Grid item lg={12}>
                <TextField
                  id="note"
                  label="備註"
                  fullWidth
                  {...register("note")}
                  disabled={type === "watch"}
                />
              </Grid>
              <Grid item lg={5}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <FormControl fullWidth disabled={type === "watch"}>
                      <InputLabel>狀態</InputLabel>
                      <Select label="狀態" onChange={onChange}>
                        <MenuItem value="正常">正常</MenuItem>
                        <MenuItem value="異常">異常</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <Divider />
        <ModalAction type={type} control={control} onClose={onClose} />
      </Box>
    </Dialog>
  );
};

export default OrderForm;