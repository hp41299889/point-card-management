import { ReduxState } from "@/utils/client/redux/store";

export const selectUser = (state: ReduxState) => {
  return state.user.user;
};
