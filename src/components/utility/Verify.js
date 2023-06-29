import React, { useEffect, useState } from "react";
import { Grid, Typography, CircularProgress, IconButton } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { verify, register, login } from "../../service/service";

// icon
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
// state

// redux
import { useDispatch } from "react-redux";

// action
import { setAlert, setAuth } from "../../Redux/action/action";

export default function Verify(props) {
  const [search] = useSearchParams();

  // const { state, dispatch } = Store()

  const dispatch = useDispatch();

  // user
  const [user, setUser] = useState({
    name: "",
    email: "",
    verify: "loading",
  });

  // for login
  async function handleLogIn(data) {
    const FD = new FormData();
    FD.append("email", data.email);
    FD.append("password", data.password);
    const response = await login(FD);

    console.log(response);
    if (response.status === 200) {
      window.location.href = "/";

      dispatch(
        setAlert({
          open: true,
          message: response.data.message,
          variant: "success",
        })
      );

      dispatch(
        setAuth({
          isAuth: true,
          username: response.data.data.name,
          email: response.data.data.email,
          CID: response.data.data.CID,
          token: response.data.data.token,
        })
      );

      return (window.location.href = "/");
    } else {
      setUser({ ...user, verify: "Not Done" });
      dispatch(
        setAlert({
          open: true,
          message: response.data.message,
          variant: "error",
        })
      );
    }
  }

  async function verifyToken(token) {
    const res = await verify(token);
    if (res.data.status === 200) {
      const isRegistered = await register(res.data.data);
      if (isRegistered.data.status === 200) {
        setUser({
          name: isRegistered.data.username,
          email: isRegistered.data.email,
          verify: "done",
        });
        return handleLogIn(isRegistered.data.data);
      } else {
        setUser({ ...user, verify: "Not Done" });
        return dispatch(
          setAlert({
            open: true,
            message: isRegistered.data.message,
            variant: "error",
          })
        );
      }
    } else {
      setUser({ ...user, verify: "Not Done" });
      dispatch(
        setAlert({
          open: true,
          message: res.data.data.message,
          variant: "error",
        })
      );
    }
  }

  useEffect(() => {
    if (search.get("token")) verifyToken(search.get("token"));
  }, []);

  const style = {
    width: "50%",
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    transform: "translate(50%,50%)",
  };

  return (
    <>
      <title>Verification</title>
      <Grid container sx={style}>
        <Grid item xs={12}>
          {user.verify !== "Not Done" ? (
            <Typography variant="h2">Verifying Your Email</Typography>
          ) : (
            <Typography variant="h2">Opps !!!</Typography>
          )}
        </Grid>
        <Grid item sx={{ mt: 2 }} xs={8}>
          {user.verify !== "Not Done" ? (
            <Typography variant="body">
              Hello {user.name}, thanks for choosing Woodshala.Please wait, our
              team is verifying your email. After it you will be redirected to
              home page.
            </Typography>
          ) : (
            <Typography variant="body">
              Sorry, verification failed due false token or may be you have
              already registered.
            </Typography>
          )}
        </Grid>
        <Grid item sx={{ mt: 3 }} xs={8}>
          {user.verify === "loading" ? (
            <IconButton>
              {" "}
              <CircularProgress />
            </IconButton>
          ) : user.verify === "done" ? (
            <IconButton>
              <CheckCircleIcon color="primary" sx={{ transform: "scale(2)" }} />
            </IconButton>
          ) : (
            <IconButton color="primary">
              <CancelIcon sx={{ transform: "scale(2)" }} size="large" />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </>
  );
}
