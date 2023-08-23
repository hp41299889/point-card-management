import type { AppProps } from "next/app";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/zh-tw";

import "@/styles/style.css";
import Layout from "@/components/layout/Layout";
import { Providers } from "@/utils/client/redux/provider";
import GlobalComponent from "@/components/global/GlobalComponent";

dayjs.locale("zh-tw");

const theme = extendTheme({
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#20282e",
          },
        },
      },
    },
  },
});

export const App = (props: AppProps) => {
  const { Component, pageProps, router } = props;
  return (
    <CssVarsProvider theme={theme}>
      <Providers>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          localeText={{
            okButtonLabel: "確認",
            todayButtonLabel: "現在",
            clearButtonLabel: "清除",
            cancelButtonLabel: "取消",
          }}
        >
          <GlobalComponent>
            {router.pathname === "/" ? (
              <Component {...pageProps} />
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </GlobalComponent>
        </LocalizationProvider>
      </Providers>
    </CssVarsProvider>
  );
};

export default App;
