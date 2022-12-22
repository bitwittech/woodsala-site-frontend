import React from "react";
import {Link} from '@mui/material' 
// css
import "../../asset/css/footer.css";

// images
import footerTop from "../../asset/images/footer/footerTop.png";
import facebook from "../../asset/images/footer/facebook.svg";
import twitter from "../../asset/images/footer/twitter.svg";
import insta from "../../asset/images/footer/insta.svg";
import linkedIn from "../../asset/images/footer/linkedIn.svg";
import youtube from "../../asset/images/footer/youtube.svg";

import { Grid, Typography, Stack } from "@mui/material";

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
                <Typography variant="h5">Relations</Typography>
                <Typography variant="h6">Bulk Orders</Typography>
                <Typography variant="h6">Bespoke Furniture </Typography>
                <Typography variant="h6">
                  Architects/interior/Sourcing{" "}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={2.5}>
              <Stack>
                <Typography variant="h6">Reviews</Typography>
                <Typography variant="h6">Google Review </Typography>
                <Typography variant="h6">Website Reviews </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={2.5}>
              <Stack>
                <Typography variant="h6">Policy</Typography>
                <Typography variant="h6">Assembly Services</Typography>
                <Typography variant="h6">Refund/Exchange </Typography>
                <Typography variant="h6">Privacy Policy</Typography>
                <Typography variant="h6">Terms of Service</Typography>
                <Typography variant="h6">Warranty</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={2.5}>
              <Stack>
                <Typography variant="h6">About Us</Typography>
                <Typography variant="h6">Company</Typography>
                <Typography variant="h6">Videos</Typography>
                <Typography variant="h6">Blogs</Typography>
              </Stack>
              <br></br>
              <Stack>
                <Typography variant="h6">Whatsapp: +91 950658944</Typography>
                <Typography variant="h6">
                  Toll Free: +91 8587918978
                </Typography>
                <Typography variant="h6">
                  Email: sales@woodsala.com
                </Typography>
              </Stack>
              <br></br>

              <Grid container className="socialIcons">
                <Grid item xs={12} md={2}>
                  <Link href = 'https://www.facebook.com/onlinewoodsala' target = '_black'>
                  <img src={facebook} alt="facebook.svg" />
                  </Link>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Link href = 'https://twitter.com/onlinewoodsala' target = '_black'>
                  <img src={twitter} alt="twitter.svg" />
                  </Link>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Link href = 'https://www.instagram.com/woodsala/' target = '_black'>
                  <img src={insta} alt="insta.svg" />
                  </Link>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Link href = 'https://www.linkedin.com/company/woodsala' target = '_black'>
                  <img src={linkedIn} alt="linkedIn.svg" />
                  </Link>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Link href = 'https://www.youtube.com/channel/UCVHH1fClT0nK-TqwcC6TFjg' target = '_black'>
                  <img src={youtube} alt="youtube.svg" />
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* links Ends */}
        {/* bottom */}
        <Grid item xs={12} className="footerBottom">
            <Typography  variant="h6">
           © Copyright 2022 Woodshala, All Right Reserved
          </Typography>
          <Typography  variant="caption">
           <a  rel="noreferrer" target = '_blank' style = {{textDecoration : 'none', color : 'white'}} href = 'https://www.bitwittech.com/'>Crafted By BITWIT</a>
          </Typography>     

        </Grid>
        {/* bottom Ends*/}
      </Grid>
    </>
  );
}
