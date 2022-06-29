import React from "react";

//mui
import { Grid, Box, Typography, TextField, Stack, Button } from "@mui/material";
// css
import "../asset/css/contactUs.css";
//icon
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
export default function ContactUs() {
  return (
    <>
      <title>Contact Us</title>

      {/* Banner */}
      <Grid container className="contactBanner">
        <Grid item xs={12}>
          <Typography variant="h1">Contact Us</Typography>
        </Grid>
      </Grid>
      {/* Banner Ends */}

      {/* Main Section */}
      <Grid container className="formContainer" sx={{ boxShadow: 2 }}>
        <Grid xs={12}>
          <Typography variant="h6">Leave A Message</Typography>
        </Grid>

        <Grid xs={12} md={7.5} item className="form">
          <form>
            <Grid
              container
              sx={{ justifyContent: "space-evenly", paddingTop: "2%" }}
            >
              <Grid item xs={12} md={5}>
                {" "}
                <TextField
                  required
                  label="Subject"
                  fullWidth
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={5}>
                {" "}
                <TextField
                  required
                  label="Name"
                  fullWidth
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                />
              </Grid>
            </Grid>
            <Grid
              container
              sx={{ justifyContent: "space-evenly", paddingTop: "2%" }}
            >
              <Grid item xs={12} md={5}>
                {" "}
                <TextField
                  required
                  label="Email"
                  fullWidth
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={5}>
                {" "}
                <TextField
                  required
                  label="Contact Number"
                  fullWidth
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                />
              </Grid>

              <Grid item xs={12} md={10.8}>
                <TextField
                  sx={{ marginTop: "2%" }}
                  id="standard-multiline-static"
                  label="Your Message"
                  required
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={10.8}
                sx={{ marginTop: "4%", fontWeight: "400" }}
              >
                <Button variant="contained">Send</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>

        <Grid xs={12} md={4} item className="sideBox">
          <Stack>
            <Typography variant="h6">Let's start a conversation.</Typography>
            <Typography variant="body2">
              Team Woodsala is always a Message away! Please let us know for any
              Query! For us Customer Satisfaction is Top Most Priority & That
              Commitment is shown by Our Customer Service!!!
            </Typography>
            <Box className="subheadings">
              <HomeIcon />
              <Typography variant="h6">Address</Typography>
            </Box>
            <Typography variant="body2">
              G-2, G.S. Appartment, Near Sunshine Honda Showroom, Civil Lines,
              Hawa Sadak, Jaipur.
            </Typography>
            <Box className="subheadings">
              <EmailIcon />
              <Typography variant="h6">Email</Typography>
            </Box>
            <Typography variant="body2">sales@woodsala.com</Typography>
            <Box className="subheadings">
              <CallRoundedIcon />
              <Typography variant="h6">Have Any Questions?</Typography>
            </Box>
            <Typography variant="body2">
              +91-8587918978 (10:00 AM to 6:00 PM)
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      {/* Main Section ends */}

      {/* Map  */}
      <Grid container>
        <Grid item xs={12}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d1832211.5585405184!2d72.71205862842459!3d26.24419060339314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d26.461175599999997!2d74.62833119999999!4m5!1s0x39418b7695555555%3A0xb91d331a8528cdb8!2swoodsala!3m2!1d26.2320302!2d73.0333385!5e0!3m2!1sen!2sin!4v1656327635819!5m2!1sen!2sin"
            width={"100%"}
            height={450}
            allowFullScreen= {true}
            loading={"lazy"}
            referrerpolicy={"no-referrer-when-downgrade"}
          ></iframe>
        </Grid>
      </Grid>
      {/* Map  Ends */}
    </>
  );
}
