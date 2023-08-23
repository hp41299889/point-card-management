import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  IconButton,
  Stack,
  Box,
  Tooltip,
} from "@mui/material";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";

import { TableMetadata, TableData } from "./interface";

interface Props<T> {
  title: string;
  metadata: TableMetadata[];
  datas: Array<T> | null;
  onClickData: {
    onNew: () => void;
    onWatch: (d: T | null) => void;
    onEdit: (d: T | null) => void;
    onDelete: (d: T | null) => void;
  };
  extraRow?: (data: Array<any>) => JSX.Element;
}

const ManagementTable = <T extends TableData>(props: Props<T>) => {
  const { title, metadata, datas, onClickData, extraRow } = props;
  const { onNew, onWatch, onEdit, onDelete } = onClickData;

  const getValueByPath = (object: any, path: any) => {
    const keys = path.split(".");
    let current = object;

    for (let key of keys) {
      if (current[key] === undefined) return undefined;
      current = current[key];
    }

    return current;
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Box paddingY="6px">
          <Tooltip title="新增">
            <Button variant="contained" startIcon={<Add />} onClick={onNew}>
              新增
            </Button>
          </Tooltip>
        </Box>
      </Stack>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {metadata.map((m, i) => (
                <TableCell
                  key={m.label}
                  sx={{ width: m.width ? m.width : "auto" }}
                >
                  {m.label}
                </TableCell>
              ))}
              <TableCell sx={{ width: "150px" }}>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas?.map((d, i) => (
              <TableRow key={`${title}_${i}`}>
                {metadata.map((m, index) => (
                  <TableCell key={m.key}>
                    {m.key === "sn" ? (
                      i + 1
                    ) : (
                      <>
                        {m.preDisplay
                          ? m.preDisplay(d)
                          : getValueByPath(d, m.key)}
                      </>
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  <Stack direction="row">
                    <Tooltip title="查看" onClick={() => onWatch(d)}>
                      <IconButton>
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="編輯">
                      <IconButton onClick={() => onEdit(d)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="刪除">
                      <IconButton onClick={() => onDelete(d)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {extraRow && datas && extraRow(datas)}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManagementTable;
