import type { AppProps } from "next/app";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from "@mui/material";

// import "@/styles/globals.css";
import "@/styles/style.css";
import Layout from "@/components/layout/Layout";

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
      {router.pathname === "/" ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </CssVarsProvider>
  );
};

export default App;
