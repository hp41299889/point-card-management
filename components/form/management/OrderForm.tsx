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
  Button,
  FormControlLabel,
  FormLabel,
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
import { useDispatch } from "@/utils/client/redux/store";
import { setAppFeedbackSnackbar } from "@/utils/client/redux/app";
import { PostProduct, Product } from "@/pages/api/product/interface";
import { getProductsByGameId, postProduct } from "@/utils/client/api/product";
import { Payment } from "@/pages/api/payment/interface";
import { Customer } from "@/pages/api/customer/interface";
import { Machine } from "@/pages/api/machine/interface";
import { Game } from "@/pages/api/game/interface";

interface FormData extends PostOrder {
  confirm: boolean;
}

interface Props extends FormProps<Order> {
  data: Order | null;
  fields?: {
    [key: string]: any[];
  };
}

const initData: FormData = {
  amount: 0,
  cost: "",
  price: 0,
  status: "正常",
  note: "",
  userId: 0,
  paymentId: 0,
  machineId: 0,
  productId: 0,
  customerId: 0,
  confirm: false,
};

const OrderForm = (props: Props) => {
  const { open, type, data, fields, onClose, afterAction } = props;
  const payments = fields?.payments as Payment[];
  const customers = fields?.customers as Customer[];
  const machines = fields?.machines as Machine[];
  const games = fields?.games as Game[];
  const [products, setProducts] = useState<Product[]>([]);
  const [cost1, setCost1] = useState<number>(0);
  const [cost2, setCost2] = useState<number>(0);
  const [cost3, setCost3] = useState<number>(0);
  const [gameId, setGameId] = useState<number>(0);
  const [productName, setProductName] = useState<string>("");
  const dispatch = useDispatch();

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
    const { confirm, ...payload } = formData;
    const cost = `${cost1},${cost2},${cost3}`;
    payload.cost = cost;
    payload.userId = Number(localStorage.getItem("userId"));
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
          // TODO use find
          const patch: PatchOrder = {
            amount: payload.amount,
            cost: payload.cost,
            price: payload.price,
            status: payload.status,
            note: payload.note,
            userId: payload.userId,
            paymentId: payload.paymentId,
            productId: payload.productId,
            machineId: payload.machineId,
            customerId: payload.customerId,
          };
          const res = await patchOrderByUid(data?.uid!, patch);
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

  const fetchProductsByGameId = async (gameId: number) => {
    const res = await getProductsByGameId(gameId);
    if (res.data.status === "success") {
      setProducts(res.data.data);
    }
  };

  const onSubmitProduct = async () => {
    const payload: PostProduct = {
      name: productName,
      showable: true,
      gameId: gameId,
    };
    try {
      const res = await postProduct(payload);
      if (res.data.status === "success") {
        dispatch(
          setAppFeedbackSnackbar({
            open: true,
            type: "success",
            message: "新增項目成功！",
          })
        );
        setValue("productId", res.data.data.id);
        fetchProductsByGameId(gameId);
      }
    } catch (err) {
      console.error(err);
      dispatch(
        setAppFeedbackSnackbar({
          open: true,
          type: "error",
          message: "新增項目失敗！",
        })
      );
    }
  };

  useEffect(() => {
    if (data) {
      const cost = data?.cost;
      const splited = cost?.split(",");
      reset({ ...data });
      setGameId(data.product.gameId);
      setCost1(Number(splited[0]));
      setCost2(Number(splited[1]));
      setCost3(Number(splited[2]));
    } else {
      reset(initData);
      setGameId(0);
      setCost1(0);
      setCost2(0);
      setCost3(0);
    }
  }, [data, reset]);

  useEffect(() => {
    fetchProductsByGameId(gameId);
  }, [gameId]);

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
                <Autocomplete
                  id="game"
                  options={games}
                  value={games.find((g) => g.id === gameId) || null}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(_, g) => {
                    if (g?.id) {
                      setGameId(g?.id);
                      fetchProductsByGameId(g.id);
                    } else {
                      setGameId(0);
                      setProducts([]);
                    }
                  }}
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
                      options={products.map((p) => p.name)}
                      value={products.find((p) => p.id === value)?.name || ""}
                      freeSolo
                      onChange={(_, v) =>
                        onChange(products.find((p) => p.name === v)?.id || 0)
                      }
                      onInputChange={(_, v) => setProductName(v)}
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
              <Grid item lg={2} display="flex" alignItems="center">
                <Button variant="contained" onClick={onSubmitProduct}>
                  新增
                </Button>
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
              <Grid item lg={5}>
                <TextField
                  id="cost1"
                  label="成本"
                  fullWidth
                  type="number"
                  value={cost1 || ""}
                  onChange={(e) => setCost1(Number(e.target.value))}
                  disabled={type === "watch"}
                />
              </Grid>
              <Grid item lg={7} />
              <Grid item lg={1.5} display="flex" alignItems="center">
                <FormLabel>卡價</FormLabel>
              </Grid>
              <Grid item lg={5}>
                <TextField
                  id="cost2"
                  fullWidth
                  type="number"
                  value={cost2 || ""}
                  onChange={(e) => setCost2(Number(e.target.value))}
                  disabled={type === "watch"}
                />
              </Grid>
              <Grid item lg={0.5} display="flex" alignItems="center">
                <Typography variant="h5">x</Typography>
              </Grid>
              <Grid item lg={5}>
                <TextField
                  id="cost3"
                  fullWidth
                  type="number"
                  value={cost3 || ""}
                  onChange={(e) => setCost3(Number(e.target.value))}
                  disabled={type === "watch"}
                />
              </Grid>
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
                  rules={{ required: "請選擇狀態" }}
                  render={({ field: { onChange, value } }) => (
                    <FormControl fullWidth disabled={type === "watch"}>
                      <InputLabel>狀態</InputLabel>
                      <Select label="狀態" onChange={onChange} value={value}>
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
