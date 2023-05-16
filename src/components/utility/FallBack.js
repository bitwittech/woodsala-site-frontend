import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Helmet } from "react-helmet";

const Fallback = () => {
  return (
    <>
      {/* helmet tag  */}
      <Helmet>
        <title>Loading....</title>
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
      <Box className="fallback">
        <Typography variant="h5">Please Wait Loading....</Typography>
        <center>
          <CircularProgress color="primary" />
        </center>
      </Box>
    </>
  );
};

export default Fallback;
