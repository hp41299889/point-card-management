import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { postAuth } from "@/utils/client/api/auth";
import { PostAuth } from "./api/auth/interface";
import { useDispatch } from "@/utils/client/redux/store";
import { setAppFeedbackSnackbar } from "@/utils/client/redux/app";
import { setUser } from "@/utils/client/redux/user";
import { User } from "./api/user/interface";
import { UserSlice } from "@/utils/client/redux/user/slice";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostAuth>();

  const onSubmit = async (payload: PostAuth) => {
    try {
      const res = await postAuth(payload);
      if (res.data.status === "success") {
        const { token, user }: { token: string; user: User } = res.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", user.name);
        localStorage.setItem("userId", String(user.id));
        localStorage.setItem("role", user.name === "admin" ? "admin" : "user");
        // dispatch(setUser(user));
        dispatch(
          setAppFeedbackSnackbar({
            type: "success",
            message: "登入成功！",
            open: true,
          })
        );
        router.push("/payment");
      }
    } catch (err) {
      console.error(err);
      dispatch(
        setAppFeedbackSnackbar({
          type: "error",
          message: "登入失敗！",
          open: true,
        })
      );
    }
  };

  return (
    <Box display="flex" height="100vh">
      <Box component="form" margin="auto" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="帳號"
            {...register("username", { required: true })}
            error={Boolean(errors.username)}
            helperText={errors.username && "請輸入帳號"}
          />
          <TextField
            label="密碼"
            type="password"
            {...register("password", { required: true })}
            error={Boolean(errors.username)}
            helperText={errors.username && "請輸入密碼"}
          />
          <Button variant="contained" type="submit">
            登入
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Page;
