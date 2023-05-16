import React from "react";
import { Grid, Typography, Box, Breadcrumbs } from "@mui/material";
import "../../asset/css/order.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
const Order = () => {
  return (
    <>
      {/* helmet tag  */}
      <Helmet>
        <title>Orders</title>
        <meta
          name="description"
          content="Customer details and order sections"
        />
      </Helmet>
      {/* helmet tag ends  */}
      {/* Banner */}
      <Grid container className="Banner">
        <Grid item xs={12}>
          <Typography variant="h1">My Orders</Typography>
        </Grid>
      </Grid>
      {/* Banner ends */}

      {/* main section  */}
      <Box className="orderListContainer" color="primary">
        <Box className={"breadcrumbs"}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/profile">
              Account
            </Link>
            <Typography color="text.primary">Order</Typography>
          </Breadcrumbs>
        </Box>
        <Box className={"orderItem"}>
          <Box className="metaDetails">
            <Box>
              <Typography variant="body1">Order Placed</Typography>
              <Typography variant="button">1 jan 1970</Typography>
            </Box>
            <Box>
              <Typography variant="body1">Total</Typography>
              <Typography variant="button">₹ 1970</Typography>
            </Box>
            <Box sx={{ position: "absolute", right: "2%" }}>
              <Typography variant="body1">Order ID</Typography>
              <Typography variant="button">O-01001</Typography>
            </Box>
          </Box>
          <Box className="productITems"></Box>
        </Box>
      </Box>
      {/* main section ends */}
    </>
  );
};

export default Order;
