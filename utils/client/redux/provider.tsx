import { PropsWithChildren } from "react";
import { Provider } from "react-redux";

import { reduxStore } from "./store";

export const Providers = (props: PropsWithChildren) => {
  return <Provider store={reduxStore}>{props.children}</Provider>;
};
