import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { FC, ReactElement, useState } from "react";
import { useRouter } from "next/router";

import Link from "@/components/link/Link";

interface ListItem {
  title: string;
  href: string;
  icon?: ReactElement;
}

interface ListGroup {
  title: string;
  children: ListItems;
  icon?: ReactElement;
}

export type ListItems = Array<ListItem | ListGroup>;

interface Props {
  items: ListItems;
  level: number;
}

const RecursiveList: FC<Props> = (props) => {
  const { items, level } = props;
  const router = useRouter();
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItemOpen = (title: string) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(title)
        ? prevOpenItems.filter((i) => i !== title)
        : [...prevOpenItems, title]
    );
  };

  return (
    <>
      {items.map((item, index) => {
        if ("children" in item) {
          return (
            <div key={`group_${item.title}_${index}`}>
              <ListItemButton onClick={() => toggleItemOpen(item.title)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
                {openItems.includes(item.title) ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItemButton>
              <Collapse in={openItems.includes(item.title)}>
                <List>
                  <RecursiveList items={item.children} level={level + 1} />
                </List>
              </Collapse>
            </div>
          );
        } else {
          return (
            <Link key={`item_${item.title}_${index}`} href={item.href}>
              <ListItem disablePadding>
                <ListItemButton
                  selected={router.pathname === item.href}
                  sx={{ pl: level === 0 ? "" : `${level * 30}px` }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            </Link>
          );
        }
      })}
    </>
  );
};

export default RecursiveList;
