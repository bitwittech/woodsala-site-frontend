import React from "react";

//mui
import { MenuItem,Grid, Box, Typography, TextField, Stack, Button, TextareaAutosize } from "@mui/material";
// css
import "../asset/css/contactUs.css";
//icon
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import { Helmet } from "react-helmet";

export default function ContactUs() {

  const subject = [
    "Order", "General", "Pre-Sales", "Post Sales", "Customization","Others"
  ]

  return (
    <>
      {/* helmet tag  */}
     <Helmet>
    <title>Contact Us</title>
    <meta name="description" content="This Page contains all catact details for Woodsala." />
    <meta name="keywords" content="contact us,contact Woodsala,react out woodsala,how to connect with woodsala,search catact woodsala" />
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
        <Grid xs={12} md={7.5} item >
         <form className = 'contactForm'>
          <TextField
          id="outlined-select-currency"
          select
          fullWidth
          size="small"
          label="Select"
          helperText="Please select your currency"
        >
          {subject.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        
          <TextField
          fullWidth
          size="small"
          label = 'Name'
          type = 'text'
          name = 'customer_name'
        />
          <TextField
          fullWidth
          size="small"
          label = 'Email'
          type = 'email'
          name = 'email'
        />
          <TextField
          fullWidth
          size="small"
          label = 'Mobile'
          type = 'text'
          name = 'mobile_no'
        />
         <TextareaAutosize
         minRows={5}
         maxRows={5}
          fullWidth
          placeholder="Message..."
          type = 'text'
          className="messageBox"
          name = 'customer_name'
        />
        <label for = 'upload'>Upload Image If you have any </label>
    <Button sx = {{float : 'left', width : '150px'}} component = 'label' id = 'upload'  variant="outlined" >
  Upload
  <input hidden accept="image/*" multiple type="file" />
</Button>
<Button sx = {{margin : 'auto', width : '150px'}} variant = 'contained'>Send</Button>
         
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
