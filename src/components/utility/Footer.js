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
        {/* <Grid item xs={12}>
          <img src={footerTop} alt="FooterImage" />
        </Grid> */}
        {/* links */}
        <Grid item xs={12}>
          <Grid container className="linkContainer">
            <Grid item xs={12} md={2.5}>
              <Stack>
                <Typography variant="h6">Relations</Typography>
                <Typography variant="body1">Bulk Orders</Typography>
                <Typography variant="body1">Bespoke Furniture </Typography>
                <Typography variant="body1">
                  Architects/interior/Sourcing{" "}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={2.5}>
              <Stack>
                <Typography variant="h6">Reviews</Typography>
                <Typography variant="body1">Google Review </Typography>
                <Typography variant="body1">Website Reviews </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={2.5}>
              <Stack>
                <Typography variant="h6">Policy</Typography>
                <Typography variant="body1">Assembly Services</Typography>
                <Typography variant="body1">Refund/Exchange </Typography>
                <Typography variant="body1">Privacy Policy</Typography>
                <Typography variant="body1">Terms of Service</Typography>
                <Typography variant="body1">Warranty</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={2.5}>
              <Stack>
                <Typography variant="h6">About Us</Typography>
                <Typography variant="body1">Company</Typography>
                <Typography variant="body1">Videos</Typography>
                <Typography variant="body1">Blogs</Typography>
              </Stack>
              <br></br>
              <Stack>
                <Typography variant="body1">Whatsapp: +91 950658944</Typography>
                <Typography variant="body1">
                  Toll Free: +91 8587918978
                </Typography>
                <Typography variant="body1">
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
            <Typography  variant="body1">
            © 2022 Woodsala (All Rights Reserved) The unit of S.K.EXPORTS || GST:08ARTPK3236G1ZJ || Plot no. 82, Hasti colony, jhalamand, Jodhpur, 342001.
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
