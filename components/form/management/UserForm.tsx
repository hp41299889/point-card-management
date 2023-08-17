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
import { PostUser, User } from "@/pages/api/user/interface";
import ModalAction from "@/components/modal/modalAction";
import { deleteUserById, patchUserById, postUser } from "@/utils/client/api";

interface FormData extends PostUser {
  confirm: boolean;
}

interface Props extends FormProps {
  data: User | null;
}

const initData: FormData = {
  name: "",
  username: "",
  password: "",
  admin: false,
  confirm: false,
};

const UserForm = (props: Props) => {
  const { open, type, data, onClose, afterAction } = props;
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
          const res = await postUser(payload);
          if (res.data.status === "success") {
            onClose();
            afterAction();
          }
        } catch (err) {
          console.error(err);
        }
        break;
      }
      case "edit": {
        try {
          setValue("confirm", true);
          const res = await patchUserById(data?.id!, payload);
          if (res.data.status === "success") {
            onClose();
            afterAction();
          }
        } catch (err) {
          console.error(err);
        }
      }
      case "delete": {
        try {
          const res = await deleteUserById(data?.id!);
          if (res.data.status === "success") {
            onClose();
            afterAction();
          }
        } catch (err) {
          console.error(err);
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
        用戶表單
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
              <Grid item lg>
                <TextField
                  id="username"
                  label="帳號"
                  fullWidth
                  {...register("username", { required: true })}
                  disabled={type === "watch"}
                  error={Boolean(errors.username)}
                  helperText={errors.username && "請輸入帳號"}
                />
              </Grid>
              <Grid item lg>
                <TextField
                  id="password"
                  label="密碼"
                  type="password"
                  fullWidth
                  {...register("password", { required: true })}
                  disabled={type === "watch"}
                  error={Boolean(errors.password)}
                  helperText={errors.password && "請輸入密碼"}
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

export default UserForm;
