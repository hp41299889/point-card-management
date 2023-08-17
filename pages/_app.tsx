import type { AppProps } from "next/app";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from "@mui/material";

import "@/styles/style.css";
import Layout from "@/components/layout/Layout";
import { Providers } from "@/utils/client/redux/provider";
import GlobalComponent from "@/components/global/GlobalComponent";

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
        <GlobalComponent>
          {router.pathname === "/" ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </GlobalComponent>
      </Providers>
    </CssVarsProvider>
  );
};

export default App;
