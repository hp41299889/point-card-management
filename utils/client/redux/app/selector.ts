import { ReduxState } from "@/utils/client/redux/store";

export const selectAppFeedbackSnackbar = (state: ReduxState) => {
  return state.app.feedback.snackbar;
};
