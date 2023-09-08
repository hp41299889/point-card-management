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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import { FormProps } from "./interface";
import { PostProduct } from "@/pages/api/product/interface";
import { Product } from "@/pages/api/product/interface";
import ModalAction from "@/components/modal/ModalAction";
import {
  postProduct,
  patchProductById,
  deleteProductById,
} from "@/utils/client/api/product";
import { useDispatch } from "@/utils/client/redux/store";
import { setAppFeedbackSnackbar } from "@/utils/client/redux/app";
import { Game } from "@/pages/api/game/interface";

interface FormData extends PostProduct {
  confirm: boolean;
}

interface Props extends FormProps<Product> {
  data: Product | null;
  fields?: {
    [key: string]: any[];
  };
}

const initData: FormData = {
  name: "",
  note: "",
  showable: true,
  gameId: 0,
  confirm: false,
};

const ProductForm = (props: Props) => {
  const { open, type, data, fields, onClose, afterAction } = props;
  const games = fields?.games as Game[];
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
                message: "編輯項目成功！",
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
              message: "編輯項目失敗！",
            })
          );
        }
        break;
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
                message: "刪除項目成功！",
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
              message: "刪除項目失敗！",
            })
          );
        }
        break;
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
                  id="note"
                  label="備註"
                  fullWidth
                  {...register("note")}
                  disabled={type === "watch"}
                />
              </Grid>
              <Grid item lg={4}>
                <Controller
                  name="showable"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControl disabled={type === "watch"}>
                      <FormLabel>顯示於選項</FormLabel>
                      <RadioGroup
                        row
                        value={value}
                        onChange={(e) =>
                          onChange(e.target.value === "true" ? true : false)
                        }
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="是"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="否"
                        />
                      </RadioGroup>
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

export default ProductForm;
