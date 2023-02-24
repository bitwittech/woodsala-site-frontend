import React, { useState } from "react";

//mui
import {
  MenuItem,
  Grid,
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  TextareaAutosize,
  CircularProgress,
} from "@mui/material";
// css
import "../../asset/css/contactUs.css";
//icon
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import { Helmet } from "react-helmet";
import { addContact, verifyReview } from "../../service/service";
import SendIcon from "@mui/icons-material/Send";

// redux
import { useDispatch } from "react-redux";
import { setAlert } from "../../Redux/action/action";

export default function ContactUs() {
  const subject = [
    "Order",
    "General",
    "Pre-Sales",
    "Post Sales",
    "Customization",
    "Others",
  ];

  const dispatch = useDispatch();
  const [data, setData] = useState({
    isLoading: false,
    button: "verify",
    images: [],
  });

  function handleChange(e) {
    if (e.target.files)
      setData((old) => ({
        ...old,
        [e.target.name]: Object.values(e.target.files),
      }));
    else setData((old) => ({ ...old, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      console.log(data);

      const FD = new FormData();
      console.log(data.images);

      if (data.images.length > 0) {
        data.images.map((file) => {
          return FD.append("images", file);
        });
      }

      FD.append("reason", data.reason);
      FD.append("email", data.email);
      FD.append("customer_name", data.customer_name);
      FD.append("mobile_no", data.mobile_no);
      FD.append("message", data.message);

      data.reason === "Order" && FD.append("order_no", data.order_no);

      if (data.check !== parseInt(data.otp)) {
        dispatch(
          setAlert({
            open: true,
            variant: "error",
            message: "Received Otp is incorrect?",
          })
        );
      } else {
        setData((old) => ({ ...old, isLoading: true }));
        let res = await addContact(FD);

        if (res) {
          setData((old) => ({
            images: [],
            isLoading: false,
            button: "verify",
          }));
          dispatch(
            setAlert({
              open: true,
              variant: "success",
              message: res.data.message,
            })
          );
        }
      }
    } catch (error) {}
  }

  async function handleVerify(e) {
    e.preventDefault();

    setData((old) => ({ ...old, isLoading: true }));
    const FD = new FormData();
    FD.append("reviewer_name", data.customer_name);
    FD.append("reviewer_email", data.email);

    const response = await verifyReview(FD);

    if (response) {
      setData((old) => ({
        ...old,
        isLoading: false,
        button: "emailSent",
        check: response.data.otp,
      }));

      dispatch(
        setAlert({
          open: true,
          variant: "success",
          message: response.data.message,
        })
      );
      // handleClose();
    } else {
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        })
      );
      setData((old) => ({ ...old, isLoading: false }));
    }
  }

  return (
    <>
      {/* helmet tag  */}
      <Helmet>
        <title>Contact Us</title>
        <meta
          name="description"
          content="This Page contains all catact details for Woodsala."
        />
        <meta
          name="keywords"
          content="contact us,contact Woodsala,react out woodsala,how to connect with woodsala,search catact woodsala"
        />
      </Helmet>
      {/* helmet tag ends  */}

      {/* Banner */}
      <Grid container className="Banner">
        <Grid item xs={12}>
          <Typography variant="h1">Contact Us</Typography>
        </Grid>
      </Grid>
      {/* Banner Ends */}

      {/* Main Section */}
      <Grid container className="formContainer" sx={{ boxShadow: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h5">Leave A Message</Typography>
        </Grid>
        <Grid xs={12} md={7.5} item>
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={data.button !== "verify" ? handleSubmit : handleVerify}
            className="contactForm"
          >
            <TextField
              id="outlined-select-currency"
              select
              fullWidth
              size="small"
              name="reason"
              required
              label="Select Purpose"
              helperText="Please select your purpose"
              onChange={handleChange}
              value={data.reason || ""}
            >
              {subject.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            {data.reason === "Order" && (
              <TextField
                fullWidth
                size="small"
                required
                label="Order Number"
                type="text"
                name="order_no"
                onChange={handleChange}
                value={data.order_no || ""}
              />
            )}

            <TextField
              fullWidth
              size="small"
              label="Name"
              type="text"
              name="customer_name"
              onChange={handleChange}
              value={data.customer_name || ""}
            />
            <TextField
              fullWidth
              size="small"
              label="Email"
              type="email"
              required
              name="email"
              onChange={handleChange}
              value={data.email || ""}
            />
            <TextField
              fullWidth
              size="small"
              label="Mobile"
              type="text"
              name="mobile_no"
              onChange={handleChange}
              value={data.mobile_no || ""}
            />
            <TextareaAutosize
              minRows={5}
              maxRows={5}
              fullWidth
              onChange={handleChange}
              value={data.message || ""}
              type="text"
              className="messageBox"
              name="message"
            />
            <label for="upload">Upload Image If you have any </label>
            <Button
              sx={{ float: "left", width: "150px" }}
              component="label"
              id="upload"
              variant="outlined"
            >
              Upload
              <input
                hidden
                onChange={handleChange}
                name="images"
                accept="image/*"
                multiple
                type="file"
              />
            </Button>

            {data.button !== "verify" && (
              <TextField
                fullWidth
                size="small"
                required
                label="OTP"
                type="number"
                name="otp"
                onChange={handleChange}
                value={data.otp || ""}
              />
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "fit-Content", margin: "auto" }}
              disabled={data.isLoading}
              startIcon={data.isLoading && <CircularProgress size={20} />}
              endIcon={!data.isLoading && <SendIcon />}
            >
              {data.button !== "verify" ? "Send" : "Verify"}
            </Button>
          </form>
        </Grid>

        <Grid xs={12} md={4} item className="sideBox">
          <Stack>
            <Typography variant="h6">Let's start a conversation.</Typography>
            <Typography variant="body1">
              Team Woodsala is always a Message away! Please let us know for any
              Query! For us Customer Satisfaction is Top Most Priority & That
              Commitment is shown by Our Customer Service!!!
            </Typography>
            <Box className="subheadings">
              <HomeIcon />
              <Typography variant="h6">Address</Typography>
            </Box>
            <Typography variant="body1">
              82, Hasti Colony, Jhalamand, Jodhpur, Rajasthan, India, 342001
            </Typography>
            <Box className="subheadings">
              <EmailIcon />
              <Typography variant="h6">Email</Typography>
            </Box>
            <Typography variant="body1">sales@woodsala.com</Typography>
            <Box className="subheadings">
              <CallRoundedIcon />
              <Typography variant="h6">Have Any Questions?</Typography>
            </Box>
            <Typography variant="body1">
              +91-8587918978 (10:00 AM to 6:00 PM) (Mon to Sat)
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      {/* Main Section ends */}

      {/* Map  */}
      <Grid container>
        <Grid item xs={12}>
          <iframe
            frameBorder="0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.9125711873676!2d73.03114981472437!3d26.23203018342546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418b7695555555%3A0xb91d331a8528cdb8!2sWoodsala!5e0!3m2!1sen!2sin!4v1671699612456!5m2!1sen!2sin"
            width={"100%"}
            height={500}
            allowFullScreen={true}
            loading={"lazy"}
            referrerpolicy={"no-referrer-when-downgrade"}
          ></iframe>
        </Grid>
      </Grid>
      {/* Map  Ends */}
    </>
  );
}
