import React from "react";
import { Link, Grid, Typography, Stack } from "@mui/material";
// css
import "../../asset/css/footer.css";

// images
// import footerTop from "../../asset/images/footer/footerTop.png";
import facebook from "../../asset/images/footer/facebook.png";
import twitter from "../../asset/images/footer/twitter.png";
import insta from "../../asset/images/footer/insta.png";
import linkedIn from "../../asset/images/footer/linkedin.png";
import youtube from "../../asset/images/footer/youTube.png";
import visa from "../../asset/images/footer/visa.png";
import master from "../../asset/images/footer/master.png";
import paypal from "../../asset/images/footer/paypal.png";

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
            {/* About Us */}
            <Grid item xs={12} md={2.5}>
              <Stack>
                <Typography variant="h6">About Us</Typography>
                <Typography variant="body1">Our Story</Typography>
                <Typography variant="body1">FAQ</Typography>
                <Typography variant="body1">Blog</Typography>
                <Typography variant="body1">Theme feature</Typography>
                <Typography variant="body1">
                  Architects/interior/Sourcing{" "}
                </Typography>
              </Stack>
            </Grid>
            {/* Customer Support */}
            <Grid item xs={12} md={2.5}>
              <Stack>
                <Typography variant="h6">Customer Support</Typography>
                <Typography variant="body1">Shipping Info</Typography>
                <Typography variant="body1">Refunds & returns </Typography>
                <Typography variant="body1">Terms & Conditions </Typography>
                <Typography variant="body1">My account</Typography>
              </Stack>
            </Grid>
            {/* Get in touch */}
            <Grid item xs={12} md={2.5}>
              <Stack>
                <Typography variant="h6">Get in touch</Typography>
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
                <Grid item xs={12}>
                  <Typography variant="h6">Follow Us</Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Link
                    href="https://www.facebook.com/onlinewoodsala"
                    target="_black"
                  >
                    <img src={facebook} alt="facebook.svg" />
                  </Link>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Link
                    href="https://twitter.com/onlinewoodsala"
                    target="_black"
                  >
                    <img src={twitter} alt="twitter.svg" />
                  </Link>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Link
                    href="https://www.instagram.com/woodsala/"
                    target="_black"
                  >
                    <img src={insta} alt="insta.svg" />
                  </Link>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Link
                    href="https://www.linkedin.com/company/woodsala"
                    target="_black"
                  >
                    <img src={linkedIn} alt="linkedIn.svg" />
                  </Link>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Link
                    href="https://www.youtube.com/channel/UCVHH1fClT0nK-TqwcC6TFjg"
                    target="_black"
                  >
                    <img src={youtube} alt="youtube.svg" />
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            {/* We accept */}
            <Grid item xs={12} md={2.5}>
              <Typography variant="h6">We accept</Typography>
              <Grid container className="payIcons">
                <Grid item xs={12} md={2}>
                  <img src={visa} alt="facebook.svg" />
                </Grid>
                <Grid item xs={12} md={2}>
                  <img src={master} alt="facebook.svg" />
                </Grid>
                <Grid item xs={12} md={2}>
                  <img src={paypal} alt="facebook.svg" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* links Ends */}
        {/* bottom */}
        <Grid item xs={12} className="footerBottom">
          <Typography variant="body1" align="center" sx={{ flex: 1 }}>
            © {new Date().getFullYear()} Woodsala (All Rights Reserved) The unit
            of S.K.EXPORTS || GST:08ARTPK3236G1ZJ || Plot no. 82, Hasti colony,
            jhalamand, Jodhpur, 342001.
          </Typography>
          <Typography variant="caption" align="right">
            <a
              rel="noreferrer"
              target="_blank"
              style={{ textDecoration: "none", color: "white" }}
              href="https://www.bitwittech.com/"
            >
              Crafted By BITWIT
            </a>
          </Typography>
        </Grid>
        {/* bottom Ends */}
      </Grid>
    </>
  );
}
