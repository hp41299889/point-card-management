import NextLink from "next/link";
import { Link as MuiLink } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  href: string;
}

const Link = (props: Props) => {
  const { children, href } = props;
  return (
    <NextLink href={href} passHref legacyBehavior>
      <MuiLink component="a" variant="body1" underline="none" color="white">
        {children}
      </MuiLink>
    </NextLink>
  );
};

export default Link;
