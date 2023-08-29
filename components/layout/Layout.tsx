import { ReactNode, useState } from "react";
import { Box } from "@mui/material";

import Sider from "./sider/Sider";

interface Props {
  children: ReactNode;
}

const Layout = (props: Props) => {
  const { children } = props;
  const [siderCollapsed, setSiderCollapsed] = useState<boolean>(false);

  const toggleSider = () => {
    setSiderCollapsed(!siderCollapsed);
  };

  return (
    <Box width="100%">
      <Box display="flex" height="100%">
        <Sider collapsed={siderCollapsed} onToggle={toggleSider} />
        <Box
          width="100%"
          m={2}
          ml={siderCollapsed ? 15 : 33}
          bgcolor="white"
          borderRadius={5}
          p={3}
          sx={{
            transition: "margin-left 0.3s ease-in-out",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
