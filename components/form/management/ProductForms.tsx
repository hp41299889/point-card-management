import { useEffect } from "react";
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
} from "@mui/material";

import { FormProps } from "./interface";
import { PostProduct, PatchProduct } from "@/pages/api/product/interface";
import { Product } from "@/pages/api/product/interface";
import ModalAction from "@/components/modal/ModalActions";
import {
  postProduct,
  patchProductById,
  deleteProductById,
} from "@/utils/client/api/product";
import { useGames } from "@/components/table/hook";
import { useDispatch } from "@/utils/client/redux/store";
import { setAppFeedbackSnackbar } from "@/utils/client/redux/app";

interface FormData extends PostProduct {
  confirm: boolean;
  gameId: number;
}

interface Props extends FormProps {
  data: Product | null;
}

const initData: FormData = {
  name: "",
  description: "",
  note: "",
  gameId: 0,
  confirm: false,
};

const ProductForm = (props: Props) => {
  const { open, type, data, onClose, afterAction } = props;
  const dispatch = useDispatch();
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
    formState: { errors },
  } = useForm<FormData>({ defaultValues: initData });

  const onSubmit = async (formData: FormData) => {
    const { confirm, ...payload } = formData;
    switch (type) {
      case "create": {
        try {
          setValue("confirm", true);
          const res = await postProduct(payload);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "新增項目成功！",
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
              message: "新增項目失敗！",
            })
          );
        }
        break;
      }
      case "edit": {
        try {
          setValue("confirm", true);
          const res = await patchProductById(data?.id!, payload);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "編輯客源成功！",
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
              message: "編輯客源失敗！",
            })
          );
        }
      }
      case "delete": {
        try {
          const res = await deleteProductById(data?.id!);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "刪除客源成功！",
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
              message: "刪除客源失敗！",
            })
          );
        }
      }
    }
  };

  useEffect(() => {
    data ? reset({ ...data }) : reset(initData);
  }, [data, reset]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

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
              <Grid item lg={5}>
                <Controller
                  name="gameId"
                  control={control}
                  rules={{ validate: (v) => v !== 0 || "請選擇遊戲" }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Autocomplete
                      id="gameId"
                      options={games}
                      loading={loadingGames}
                      value={games.find((g) => g.id === value) || null}
                      onChange={(_, v) => onChange(v?.id ? v.id : 0)}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      getOptionLabel={(o) => o.name}
                      renderOption={(props, option) => (
                        <li key={`gameOption_${option.id}`} {...props}>
                          {option.name}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="遊戲名稱"
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

export default ProductForm;
