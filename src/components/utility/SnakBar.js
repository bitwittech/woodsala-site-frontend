import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Action
import { setAlert } from "../../Redux/action/action";

export default function SnackBar() {
  // const { state, dispatch } = Store();

  const dispatch = useDispatch();

  // getting state
  const state = useSelector((state) => state.alert);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      {/* {console.log(state)} */}
      {state.open === true && (
        <Snackbar
          className="snackbar"
          open={state.open}
          autoHideDuration={3000}
          onClose={() =>
            dispatch(setAlert({ open: false, variant: null, massage: null }))
          }
        >
          <Alert
            className="alert"
            onClose={() =>
              dispatch(setAlert({ open: false, variant: null, massage: null }))
            }
            severity={state.variant}
            sx={{ width: "100%" }}
          >
            {state.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

// error warning info success
