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
import { PostGame, PatchGame } from "@/pages/api/game/interface";
import { Game } from "@/pages/api/game/interface";
import ModalAction from "@/components/modal/ModalAction";
import {
  postGame,
  patchGameById,
  deleteGameById,
} from "@/utils/client/api/game";
import { useDispatch } from "@/utils/client/redux/store";
import { setAppFeedbackSnackbar } from "@/utils/client/redux/app";

interface FormData extends PostGame {
  confirm: boolean;
}

interface Props extends FormProps<Game> {
  data: Game | null;
}

const initData: FormData = {
  name: "",
  note: "",
  showable: true,
  confirm: false,
};

const GameForm = (props: Props) => {
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
          const res = await postGame(payload);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "新增遊戲成功！",
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
              message: "新增遊戲失敗！",
            })
          );
        }
        break;
      }
      case "edit": {
        try {
          setValue("confirm", true);
          const res = await patchGameById(data?.id!, payload);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "編輯遊戲成功！",
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
              message: "編輯遊戲失敗！",
            })
          );
        }
        break;
      }
      case "delete": {
        try {
          const res = await deleteGameById(data?.id!);
          if (res.data.status === "success") {
            onClose();
            dispatch(
              setAppFeedbackSnackbar({
                open: true,
                type: "success",
                message: "刪除遊戲成功！",
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
              message: "刪除遊戲失敗！",
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
        遊戲表單
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

export default GameForm;
