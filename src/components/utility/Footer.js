import React from "react";

// css
import "../../asset/css/footer.css";

// images
import footerTop from "../../asset/images/footer/footerTop.png";
import facebook from "../../asset/images/footer/facebook.svg";
import twitter from "../../asset/images/footer/twitter.svg";
import insta from "../../asset/images/footer/insta.svg";

import { Grid, Typography, Stack, Box } from "@mui/material";

export default function Footer() {
  return (
    <>
      <Grid container className="footerContainer">
        {/* // top image */}
        <Grid item xs={12}>
          <img src={footerTop} alt="FooterImage" />
        </Grid>
        {/* links */}
        <Grid item xs={12}>
          <Grid container className="linkContainer">
            <Grid item xs={12} md={2.5}>
              <Stack>
                <Typography variant="h6">Relations</Typography>
                <Typography variant="body2">Bulk Orders</Typography>
                <Typography variant="body2">Bespoke Furniture </Typography>
                <Typography variant="body2">
                  Architects/interior/Sourcing{" "}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={2.5}>
              <Stack>
                <Typography variant="h6">Reviews</Typography>
                <Typography variant="body2">Google Review </Typography>
                <Typography variant="body2">Website Reviews </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={2.5}>
              <Stack>
                <Typography variant="h6">Policy</Typography>
                <Typography variant="body2">Assembly Services</Typography>
                <Typography variant="body2">Refund/Exchange </Typography>
                <Typography variant="body2">Privacy Policy</Typography>
                <Typography variant="body2">Terms of Service</Typography>
                <Typography variant="body2">Warranty</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={2.5}>
              <Stack>
                <Typography variant="h6">About Us</Typography>
                <Typography variant="body2">Company</Typography>
                <Typography variant="body2">Videos</Typography>
                <Typography variant="body2">Blogs</Typography>
              </Stack>
              <br></br>
              <Stack>
                <Typography variant="body2">Whatsapp: +91 950658944</Typography>
                <Typography variant="body2">
                  Toll Free: +91 8587918978
                </Typography>
                <Typography variant="body2">
                  Email: sales@woodsala.com
                </Typography>
              </Stack>
              <br></br>

              <Grid container className="socialIcons">
                <Grid item xs={12} md={3}>
                  <img src={facebook} alt="facebook.svg" />
                </Grid>
                <Grid item xs={12} md={3}>
                  <img src={twitter} alt="twitter.svg" />
                </Grid>
                <Grid item xs={12} md={3}>
                  <img src={insta} alt="insta.svg" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* links Ends */}
        {/* bottom */}
        <Grid item xs={12} className="footerBottom">
          <Typography variant="body2">
            DESIGN BY Bitwit- © 2022 ALL RIGHTS RESERVED.
          </Typography>
        </Grid>
        {/* bottom Ends*/}
      </Grid>
    </>
  );
}
