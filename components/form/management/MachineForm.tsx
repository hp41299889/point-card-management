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
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

import { FormProps } from "./interface";
import { PostMachine, PatchMachine } from "@/pages/api/machine/interface";
import { Machine } from "@/pages/api/machine/interface";
import ModalAction from "@/components/modal/ModalAction";
import {
  postMachine,
  patchMachineById,
  deleteMachineById,
} from "@/utils/client/api/machine";
import { useDispatch } from "@/utils/client/redux/store";
import { setAppFeedbackSnackbar } from "@/utils/client/redux/app";

interface FormData extends PostMachine {
  confirm: boolean;
}

interface Props extends FormProps<Machine> {
  data: Machine | null;
}

const initData: FormData = {
  name: "",
  note: "",
  showable: true,
  confirm: false,
};

const MachineForm = (props: Props) => {
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
          const res = await postMachine(payload);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "新增機台成功！",
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
              message: "新增機台失敗！",
            })
          );
        }
        break;
      }
      case "edit": {
        try {
          setValue("confirm", true);
          const res = await patchMachineById(data?.id!, payload);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "編輯機台成功！",
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
              message: "編輯機台成功！",
            })
          );
        }
        break;
      }
      case "delete": {
        try {
          const res = await deleteMachineById(data?.id!);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "刪除機台成功！",
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
              message: "刪除機台失敗！",
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
        機台表單
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

export default MachineForm;
