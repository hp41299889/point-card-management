import { ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";

import { useDispatch, useSelector } from "@/utils/client/redux/store";
import {
  selectAppFeedbackSnackbar,
  setAppFeedbackSnackbar,
} from "@/utils/client/redux/app";

interface Props {
  children: ReactNode;
}

const GlobalComponent = (props: Props) => {
  const { children } = props;
  const dispatch = useDispatch();
  const snackbar = useSelector(selectAppFeedbackSnackbar);

  return (
    <>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() =>
          dispatch(
            setAppFeedbackSnackbar({ open: false, type: "error", message: "" })
          )
        }
      >
        <Alert
          onClose={() =>
            dispatch(
              setAppFeedbackSnackbar({
                open: false,
                type: "error",
                message: "",
              })
            )
          }
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default GlobalComponent;
