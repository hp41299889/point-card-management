import { ReactNode } from "react";
import Sider from "./sider/sider";
import { Box, Stack } from "@mui/material";

interface Props {
  children: ReactNode;
}

const Layout = (props: Props) => {
  const { children } = props;
  return (
    <Box height="100vh" width="100vh">
      <Stack direction="row" width="100%" height="100%">
        <Box width="300px">
          <Sider />
        </Box>
        <Box width="100%">{children}</Box>
      </Stack>
    </Box>
  );
};

export default Layout;
