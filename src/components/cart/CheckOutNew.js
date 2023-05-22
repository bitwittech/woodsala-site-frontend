/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from "react";
// css
import "../../asset/css/newCheckout.css";
// MUI
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  // FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet";
//image
import defaultProduct from "../../asset/images/defaultProduct.svg";
import { CloseRounded } from "@mui/icons-material";

const CheckOutNew = () => {
  return (
    <>
      {/* helmet tag  */}
      <Helmet>
        <title>Checkout</title>
        <meta name="description" content="Woodsala cart and checkout page." />
      </Helmet>
      {/* helmet tag ends  */}
      {/* Banner */}
      <Grid container className="Banner">
        <Grid item xs={12}>
          <Typography variant="h1">Checkout</Typography>
        </Grid>
      </Grid>
      {/* Banner Ends */}

      {/* Main Code Section */}
      <Grid container className="checkout-main-container">
        <ReviewOrder size={3.8} />
        <Delivery size={3.8} />
        <SelectPayment size={3.8} />
      </Grid>
      {/* Main Code Section Ends */}
    </>
  );
};

function ReviewOrder({ size }) {
  return (
    <Grid xs={12} md={size} className="review-order-wrapper flex-utility">
      <Box className="step-heading">
        <Typography variant="body1">1. Review Your Order</Typography>
      </Box>
      <Box className="review-order-inner-wrapper">
        <Box className="review-order-products flex-utility">
          <ProductCard />
          <ProductCard />
        </Box>
      </Box>
    </Grid>
  );
}
// childe Components for ReviewOrder
function ProductCard() {
  return (
    <Box className="review-product-card-wrapper flex-utility">
      <Box className="close-icon flex-utility">
        <Tooltip title="remove Product">
          <IconButton size="small">
            <CloseRounded />
          </IconButton>
        </Tooltip>
      </Box>
      <Box className="review-product-img">
        <img src={defaultProduct} alt="product_image" />
      </Box>
      <Box className="review-product-card-details flex-utility">
        <Typography
          className="review-text-clip"
          sx={{ fontWeight: 500 }}
          variant="body1"
        >
          Teak Wood Foldable Kids Chair
        </Typography>
        <Typography className="review-text-clip" variant="caption">
          SKU
        </Typography>
        <Typography className="review-text-clip" variant="caption">
          Size
        </Typography>
        <Typography className="review-text-clip" variant="caption">
          Material
        </Typography>
        <Typography className="review-text-clip" variant="caption">
          Dispatch By
        </Typography>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Qty</InputAdornment>
            ),
          }}
          size="small"
          type="number"
          value={1}
          small
        />
      </Box>
      <Box className="review-product-price flex-utility">
        <Typography sx={{ fontWeight: 500 }} variant="body2">
          Rs.200000
        </Typography>
      </Box>
    </Box>
  );
}

function Delivery({ size }) {
  return (
    <Grid xs={12} md={size} className="delivery-wrapper flex-utility">
      <Box className="delivery-inner-wrapper">
        <Box className="step-heading">
          <Typography variant="body1">2. Delivery Address</Typography>
        </Box>
        <Box p={1}>
          <Typography variant="body2">All fields are required.</Typography>
        </Box>
        <Box className="delivery-form flex-utility">
          <TextField
            required
            variant="outlined"
            size="small"
            name="email"
            label="Email Address"
          ></TextField>
          <TextField
            required
            variant="outlined"
            size="small"
            name="name"
            label="Full Name"
          ></TextField>
          <TextField
            required
            variant="outlined"
            size="small"
            name="mobile"
            label="Mobile Number"
          ></TextField>
          <TextField
            required
            variant="outlined"
            size="small"
            name="pincode"
            label="Pincode/ZIP code"
          ></TextField>
          <TextField
            required
            variant="outlined"
            size="small"
            name="shipping"
            label="Shipping Address"
          ></TextField>
          <TextField
            required
            variant="outlined"
            size="small"
            name="city"
            label="City/Town"
          ></TextField>
          <TextField
            required
            variant="outlined"
            size="small"
            name="state"
            label="State/territory"
          ></TextField>
          <TextField
            required
            variant="outlined"
            size="small"
            name="country"
            label="country"
          ></TextField>
          <FormControlLabel
            control={<Checkbox size="small" defaultChecked />}
            label="Same billing address "
          />
        </Box>
      </Box>
    </Grid>
  );
}
function SelectPayment({ size }) {
  return (
    <Grid xs={12} md={size} className="payment-method-wrapper flex-utility">
      <Box className="pay-inner-wrapper">
        <Box className="step-heading">
          <Typography variant="body1">3. Select Payment Method</Typography>
        </Box>
        <Box p={1}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel value="card" control={<Radio />} label="Card" />
              <FormControlLabel
                value="COD"
                control={<Radio />}
                label="Cash On Delivery"
              />
              <FormControlLabel
                value="UPI"
                control={<Radio />}
                label="UPI (Razorpay)"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
      {/* Order summary  */}
      <Box className="order-summary-wrapper">
        <Box className="step-heading">
          <Typography
            sx={{ fontWeight: 500, fontSize: "1.1rem" }}
            variant="button"
          >
            Order Summary
          </Typography>
        </Box>
        <Box className="order-summary">
          {/* Product rows */}
          <Box p={1}>
            <ProductRowOrder />
            <ProductRowOrder />
          </Box>
          <Divider />
          {/* Product rows ends */}
          <Box className="order-cal">
            <Box
              mt={1}
              sx={{ justifyContent: "space-between" }}
              className="flex-utility"
            >
              <Typography sx={{ fontWeight: 500 }} variant="h6">
                Subtotal
              </Typography>
              <Typography sx={{ fontWeight: 500 }} variant="h6">
                Rs.4000
              </Typography>
            </Box>
            <Box
              sx={{ justifyContent: "space-between" }}
              className="flex-utility"
            >
              <Typography variant="body1">Shipping</Typography>
              <Typography variant="body1">Free</Typography>
            </Box>
            <Box
              sx={{ justifyContent: "space-between" }}
              className="flex-utility"
            >
              <Typography variant="body1">Tax</Typography>
              <Typography variant="body1">Rs.50</Typography>
            </Box>
            <Divider />
            {/* Total */}
            <Box mt={2} className="flex-utility order-total">
              <Typography variant="h5">Order Total</Typography>
              <Typography variant="h5">Rs.4050</Typography>
            </Box>
            {/* button complete order */}
            <Box mt={2}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                color="primary"
              >
                Complete Order
              </Button>
            </Box>
            {/* button complete order ends */}
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}

function ProductRowOrder() {
  return (
    <Box className="order-summary-product flex-utility">
      <Box sx={{ width: "50%" }}>
        <Typography className="review-text-clip" variant="body1">
          Teak Wood Foldable Kid
        </Typography>
      </Box>
      <Typography variant="body1">X 1</Typography>
      <Typography  variant="body1">
        Rs.2000
      </Typography>
    </Box>
  );
}

export default CheckOutNew;
