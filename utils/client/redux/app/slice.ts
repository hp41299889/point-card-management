import { createSlice } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material";

interface SnackBar {
  open: boolean;
  type: AlertColor;
  message: string;
}

interface AppSlice {
  feedback: {
    snackbar: SnackBar;
  };
}

const initialState: AppSlice = {
  feedback: {
    snackbar: {
      open: false,
      type: "warning",
      message: "",
    },
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppFeedbackSnackbar: (state, action: { payload: SnackBar }) => {
      state.feedback.snackbar = action.payload;
    },
  },
});

export const { setAppFeedbackSnackbar } = appSlice.actions;
