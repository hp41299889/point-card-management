import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
} from "@mui/material";

import { FormProps } from "./interface";
import { PostPayment, PatchPayment } from "@/pages/api/payment/interface";
import { Payment } from "@/pages/api/payment/interface";
import ModalAction from "@/components/modal/ModalAction";
import {
  postPayment,
  patchPaymentById,
  deletePaymentById,
} from "@/utils/client/api/payment";
import { useDispatch } from "@/utils/client/redux/store";
import { setAppFeedbackSnackbar } from "@/utils/client/redux/app";

interface FormData extends PostPayment {
  confirm: boolean;
}

interface Props extends FormProps {
  data: Payment | null;
}

const initData: FormData = {
  name: "",
  description: "",
  note: "",
  confirm: false,
};

const PaymentForm = (props: Props) => {
  const { open, type, data, onClose, afterAction } = props;
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: initData });

  const onSubmit = async (formData: FormData) => {
    const { confirm, ...payload } = formData;
    switch (type) {
      case "create": {
        try {
          setValue("confirm", true);
          const res = await postPayment(payload);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "新增支付方式成功！",
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
              message: "新增支付方式失敗！",
            })
          );
        }
        break;
      }
      case "edit": {
        try {
          setValue("confirm", true);
          const res = await patchPaymentById(data?.id!, payload);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "編輯支付方式成功！",
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
              message: "編輯支付方式失敗！",
            })
          );
        }
      }
      case "delete": {
        try {
          const res = await deletePaymentById(data?.id!);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "刪除支付方式成功！",
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
              message: "刪除支付方式失敗！",
            })
          );
        }
      }
    }
  };

  useEffect(() => {
    data ? reset({ ...data }) : reset(initData);
  }, [data, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {type === "create" && "新增"}
        {type === "edit" && "編輯"}
        {type === "delete" && "刪除"}
        支付方式表單
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
                <TextField
                  id="name"
                  label="名稱"
                  fullWidth
                  {...register("name", { required: true })}
                  disabled={type === "watch"}
                  error={Boolean(errors.name)}
                  helperText={errors.name && "請輸入名稱"}
                />
              </Grid>
              <Grid item lg={7} />
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
            </Grid>
          )}
        </DialogContent>
        <Divider />
        <ModalAction type={type} control={control} onClose={onClose} />
      </Box>
    </Dialog>
  );
};

export default PaymentForm;
