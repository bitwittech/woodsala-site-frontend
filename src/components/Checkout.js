import React, {useState,useEffect} from "react";

// mui
import {
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  MenuItem,
  Stack,
  Box,
  Divider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material";

// css
import "../asset/css/checkout.css";

// icon
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import OutlinedFlagSharpIcon from "@mui/icons-material/OutlinedFlagSharp";
import bajot from "../asset/images/home/bajot_TC.png";

// apis function 
import {getCustomer} from '../service/service'

// store
import {Store} from '../store/Context';
import {Notify} from '../store/Context';


const orders = [
  {
    image: bajot,
    title: "Bajot",
    price: 1000,
  },
  {
    image: bajot,
    title: "Table",
    price: 1000,
  },
  {
    image: bajot,
    title: "Chair",
    price: 1000,
  },
];

const countries = [
  {
    value: "USD",
  },
  {
    value: "EUR",
  },
  {
    value: "BTC",
  },
  {
    value: "JPY",
  },
];

export default function Checkout() {

  // global Store
  const {state,dispatch} = Store();

  // data form state
  const [data,setData]= useState({
    status : 'processing',
    customer_name : '' , 
    customer_email : '' , 
    customer_mobile : '' , 
    city : '' ,
    state : '' ,
    shipping : '' ,
    quantity : [],
    discoun : 0,
    paid : 0 , 
    total : 0 ,
    note : '',
  })

  const handleData = ()=>{

  }
  useEffect(()=>{
    if (state.Auth.CID)
    {
      getCustomer(state.Auth.CID)
      .then((response)=>{
        setData({
          ...data,
          customer_name : response.data.username,
          customer_email : response.data.mobile,
          customer_mobile : response.data.email,
          city : response.data.city,
          state : response.data.state,
          shipping : response.data.shipping,
        })
        
      })
    }

  },[state.Auth.CID])

  const [country, setCountry] = React.useState("EUR");

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <>
      <title>Checkout</title>

      {/* Banner */}
      <Grid container className="cartBanner">
        <Grid item xs={12}>
          <Typography variant="h1">CheckOut</Typography>
        </Grid>
      </Grid>
      {/* Banner Ends */}
      {/* Main Section */}
      <Grid container className="mainSec">
        <Grid xs={12}>
          <Typography variant="h4">CheckOut</Typography>
        </Grid>

        {/* coupon section */}

        <Grid xs={12} className="couponBox">
          <Typography variant="body1">
            Have Any Coupon Code? Apply here.
          </Typography>
          <br></br>
          <div className="applyBox">
            <TextField size="small" variant="outlined" label="Coupon Code" />
            <Button  sx = {{fontWeight : "400"}} size="small" variant="contained">
              Apply
            </Button>
          </div>
        </Grid>
        {/* coupon section ends */}

        {/* Billing Section */}

        <Grid xs={12} md={8.5} className="billingDetails">
          <Grid item xs={12}>
            <Typography variant="h6">Billing Details</Typography>
          </Grid>

          <Grid item xs={12}>
            <Grid container className="billingForm">
              <form>
                <TextField
                  required
                  label="Name"
                  name = 'customer_name'
                  onChange = {handleData}
                  value = {data.customer_name || ''}
                  fullWidth
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                />
                <TextField
                  required
                  name = 'customer_email'
                  onChange = {handleData}
                  value = {data.customer_email || ''}
                  label="Email"
                  fullWidth
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                />
                <TextField
                  required
                  name = 'customer_mobile'
                  onChange = {handleData}
                  value = {data.customer_mobile || ''}
                  label="Phone Number"
                  fullWidth
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                />
                <TextField
                  required
                  name = 'shipping'
                  onChange = {handleData}
                  value = {data.shipping || ''}
                  label="Address"
                  fullWidth
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                />
{/* 
                <TextField
                  select
                  size="small"
                  sx={{ marginTop: "2%" }}
                  name = 'country'
                  onChange = {handleData}
                  value = {data.country || ''}
                  label="Country"
                  value={country}
                  fullWidth
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PublicOutlinedIcon small = "true" />
                      </InputAdornment>
                    ),
                  }}
                >
                  {countries.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField> */}
                <TextField
                  select
                  sx={{ marginTop: "2%" }}
                  size="small"
                  label="State"
                  value={country}
                  fullWidth
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <OutlinedFlagSharpIcon small = "true" />
                      </InputAdornment>
                    ),
                  }}
                >
                  {countries.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Town/City"
                  fullWidth
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                />
                <TextField
                  label="Pin Code"
                  fullWidth
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                />

                <Typography sx={{ marginTop: "3%" }} variant="h6">
                  Additional Information
                </Typography>

                <TextField
                  sx={{ marginTop: "2%" }}
                  id="standard-multiline-static"
                  label="Order Notes"
                  required
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </form>
            </Grid>
          </Grid>
        </Grid>
        {/* Billing Section */}

        {/* Your Order */}
        <Grid xs={12} md={3.5} className="yourOrder">
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h6">Your Order</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container className="orderSummary">
                <Grid item xs={12}>
                  <Stack>
                    {orders.map((item, idex) => {
                      return (
                        <>
                          <Box className="productBox">
                            <img src={item.image} alt="productImage" />
                            <Typography variant="body2">
                              {item.title}
                            </Typography>
                            <Typography variant="body2">
                              Rs.{item.price}
                            </Typography>
                          </Box>
                          <Divider />
                        </>
                      );
                    })}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Box className="productBox text">
                    <Typography variant="body2">Subtotal</Typography>
                    <Typography variant="body2">Rs.3000</Typography>
                  </Box>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Box className="productBox text">
                    <Typography variant="body2">Tax</Typography>
                    <Typography variant="body2">18%</Typography>
                  </Box>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Box className="productBox text">
                    <Typography variant="body2">Total</Typography>
                    <Typography variant="body2">Rs.3300</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container className="payMethod text">
                <Grid item xs={12}>
                  <Typography variant="body2" className="text">
                    Select a payment method
                  </Typography>
                  <br></br>
                  <FormControl>
            
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >

                      <FormControlLabel
                        value="COD"
                      
                        control={<Radio size="small" />}
                        label="Cash on Delivery"
                      />
                      <FormControlLabel
                        value="UPIe"
                        control={<Radio size="small" />}
                        label="UPI Method"
                      />
                      <FormControlLabel
                        value="DC"
                        control={<Radio size="small" />}
                        label="Debit/Credit Card Method"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs = {12} className = "orderButton" >
                <Button sx = {{fontWeight : "500"}} fullWidth variant = 'contained'>Place Order</Button>
            </Grid>
          </Grid>
        </Grid>
        {/* Your Order ends */}
      </Grid>
      {/* Main Section Ends */}
    </>
  );
}
