/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Helmet } from "react-helmet";
import { setAlert, setMasterToken } from "../../Redux/action/action";
import { useDispatch } from "react-redux";
import { master } from "../../service/service";
import config from "../../config.json";

const LockIn = ({ history }) => {
  const dispatch = useDispatch();

  const client_key = config.client_side_recaptcha;

  function handleVerification(e) {
    // console.log(e)
    // // let res = await  verifyRecaptcha(e)
    if (e) {
      setData({ ...data, readyToSubmit: true });
    } else {
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: "Captacha error !!!",
        })
      );
    }
  }
  // data state
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  // controller state
  const [controller, setController] = useState({
    visible: false,
    loading: false,
  });

  // for login
  async function handleLogIn(e) {
    try {
      e.preventDefault();

      const response = await master(data);

      setController({
        ...controller,
        loading: true,
      });
      console.log(response);

      // (data)
      if (response.status === 200) {
        setController({
          ...controller,
          loading: false,
        });
        dispatch(
          setMasterToken({
            masterToken: response.data.masterToken,
          })
        );
        dispatch(
          setAlert({
            open: true,
            variant: "success",
            message: response.data.message,
          })
        );
        history("/");
      } else {
        setController({
          ...controller,
          loading: false,
        });
        dispatch(
          setAlert({
            open: true,
            message: response.data.message,
            variant: "error",
          })
        );
      }
    } catch (error) {
      setController({
        ...controller,
        loading: false,
      });
      dispatch(
        setAlert({
          open: true,
          message: "You are not allowed to access this content !!!",
          variant: "error",
        })
      );
    }
  }

  // validation
  const handleValue = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const boxStyle = {
    width: "90%",
    display: "flex",
    margin: "auto",
    justifyContent: "center",
    padding: "50px",
  };

  const formBox = {
    width: "95%",
    display: "flex",
    margin: "auto",
    justifyContent: "center",
    padding: "50px",
    boxShadow: 2,
  };

  return (
    <>
      {/* helmet tag  */}
      <Helmet>
        <title>Master Login</title>
        <meta
          name="description"
          content="Woodsala is an online furniture store that provides customized furniture solutions for all your need. Buy premium quality wooden furniture at a reasonable price."
        />
        <meta
          name="keywords"
          content="furniture,wooden furniture,online furniture,which furniture store is the cheapest,search furniture,table,bajot,gift,chair"
        />
      </Helmet>
      {/* helmet tag ends  */}

      {/* log in box  */}
      <Grid container style={boxStyle}>
        {/* // form  */}
        <Grid style={formBox} sx={{ boxShadow: 2 }} item xs={12} md={5}>
          <form onSubmit={handleLogIn} className="form" action="" method="post">
            <Typography sx={{ marginBottom: "5px" }} variant="h4">
              Master Log-In
            </Typography>
            <Typography variant="body2">
              Log-In with valid credentials.
            </Typography>

            <FormControl sx={{ mt: 2 }} variant="outlined">
              {/* <InputLabel htmlFor="outlined-adornment-password">email</InputLabel> */}
              <TextField
                sx={{ width: "100%" }}
                required
                name="email"
                onChange={handleValue}
                id="outlined-adornment-email"
                type="email"
                label="Email"
                size={"small"}
              />
            </FormControl>
            <FormControl sx={{ mt: 2, mb: 2 }} variant="outlined">
              <TextField
                sx={{ width: "100%" }}
                required
                name="password"
                id="outlined-adornment-password"
                type={controller.visible ? "text" : "password"}
                size={"small"}
                onChange={handleValue}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setController({
                            ...controller,
                            visible: !controller.visible,
                          });
                        }}
                        edge="end"
                      >
                        {!controller.visible ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label="Password"
              />
            </FormControl>
            <Box p={1} sx={{ display: "flex", justifyContent: "center" }}>
              <ReCAPTCHA
                small={"compact"}
                sitekey={client_key}
                onChange={handleVerification}
              />
            </Box>
            <Button
              sx={{ width: "100%" }}
              type="submit"
              disabled={controller.loading || !data.readyToSubmit}
              variant="contained"
            >
              <Typography
                sx={{ fontWeight: 400, fontSize: "1rem" }}
                variant="button"
              >
                {controller.loading ? (
                  <CircularProgress size={"2rem"} />
                ) : (
                  "Log In"
                )}
              </Typography>
            </Button>
          </form>
        </Grid>
        {/* // form end  */}
      </Grid>
      {/* log in box ends */}
    </>
  );
};

export default LockIn;
