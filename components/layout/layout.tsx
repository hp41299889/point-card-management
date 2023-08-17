import { ReactNode } from "react";
import { Box } from "@mui/material";

import Sider from "./sider/Sider";

interface Props {
  children: ReactNode;
}

const Layout = (props: Props) => {
  const { children } = props;

  return (
    <Box height="100vh" width="100%">
      <Box display="flex" height="100%">
        <Sider />
        <Box width="100%" m={3} bgcolor="white" borderRadius={5} p={3}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
