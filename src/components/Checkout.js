import React, {useState,useEffect} from "react";
import { useLocation } from "react-router-dom";
// mui
import {
  Grid,
  Typography,
  TextField,
  Button,
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
// import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
// import OutlinedFlagSharpIcon from "@mui/icons-material/OutlinedFlagSharp";
import bajot from "../asset/images/home/bajot_TC.png";

// apis function 
import {getCustomer,getLastOrder, addOrder} from '../service/service'

// store
import {Store} from '../store/Context';
import {Notify} from '../store/Types';


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

  // url parameter
  const location = useLocation();
  // console.log(location)
  const {total,subtotal,product,quantity} = location.state;

  const [OID,setOID] = useState();
  // data form state
  const [data,setData]= useState({
    O : '',
    CID : state.Auth.CID || 'Not Logged In',
    status : 'processing',
    customer_name : '' , 
    customer_email : '' , 
    customer_mobile : '' , 
    city : '' ,
    state : '' ,
    shipping : '' ,
    quantity : quantity,
    discount : 0,
    paid : 0 , 
    total : total ,
    note : '',
  })

  // function for generating product OID ID

  const getOID = async() => {
    return await getLastOrder()
      .then((res) => {
        if (res.data.length > 0) {
          let index = parseInt(res.data[0].O.split("-")[1]) + 1;

          return setOID(`O-0${index}`);
        } else {
          return setOID("O-01001");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(()=>{ 
    if (state.Auth.CID)
    {
      getCustomer(state.Auth.CID)
      .then((response)=>{
        setData({
          ...data,
          CID : state.Auth.CID,
          customer_name : response.data.username,
          customer_email : response.data.mobile,
          customer_mobile : response.data.email,
          city : response.data.city,
          state : response.data.state,
          shipping : '',
        })
      })
      .catch((err)=>{console.log(err)})
      getOID();
    }
    else{
       getOID();
    }
  },[state.Auth])

  useEffect(()=>{
    setData({...data,OID : OID})
  },[OID])

  // const [country, setCountry] = React.useState("EUR");

  const handleData = (e)=>{
    console.log(e.target.name)
    setData({...data,[e.target.name] : e.target.value});
  }

  /// submit order
  const handleSubmit = async (e) => {
   
    e.preventDefault();
    const formVal = {...data,O : OID};

    console.log(formVal)
// return 'x'
    const res = addOrder(formVal)
   
    res
      .then((response) => {
        if (response.status !== 200) {
          setData({ O: '',
          CUS: '',
          CID: null,
          customer_email: '',
          customer_mobile: '',
          customer_name: '',
          shipping: '',
          product_array: [],
          quantity: [],
          subTotal: 0,
          discount: 0,
          total: 0,
          status: 'processing',
          city: '',
          state: '',
          paid: 0,
          note: ''})
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "error",
              message: response.data.message || "Something Went Wrong !!!",
            }
          });
        } else {
         
          dispatch({
            type: Notify, payload: {
              open: true,
              variant: "success",
              message: response.data.message,
            }
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: Notify, payload: {
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          }
        });
      });
  }


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
      <form method = 'post' onSubmit = {handleSubmit} encType = 'multipart/form-data'>
      <Grid container className="mainSec">
        <Grid item xs={12}>
          <Typography variant="h4">CheckOut</Typography>
        </Grid>

        {/* coupon section */}

        <Grid item xs={12} className="couponBox">
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

        <Grid item xs={12} md={8.5} className="billingDetails">
          <Grid item xs={12}>
            <Typography variant="h6">Billing Details</Typography>
          </Grid>

          <Grid item xs={12}>
            <Grid container className="billingForm">
                <TextField
                  required
                  label="OID"
                  name = 'OID'
                  disabled
                  value = {OID || ''}
                  onChange = {handleData}
                  fullWidth
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                />
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
                {/* <TextField
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
                </TextField> */}
                <TextField
                  label="State"
                  fullWidth
                  value = {data.state || ''}
                  name = 'state'
                  onChange = {handleData}
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                />
                <TextField
                  label="Town/City"
                value = {data.city || ''}
                  name = 'city'
                  onChange = {handleData}
                  fullWidth
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                />
                {/* <TextField
                  label="Pin Code"
                  fullWidth
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                /> */}

                <Typography sx={{ marginTop: "3%" }} variant="h6">
                  Additional Information
                </Typography>

                <TextField
                  sx={{ marginTop: "2%" }}
                  id="standard-multiline-static"
                  label="Order Notes (Optional)"
                  value = {data.note}
                  name = 'note'
                  onChange = {handleData}
                  // required
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                />
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
                    {product.map((item, index) => {
                      return (
                        <Box key = {index}>
                          <Box  className="productBox">
                            <img src={item.product} alt="productImage" />
                            <Typography variant="body2">
                              {item.product_name}
                            </Typography>
                            <Typography variant="body2">
                              Rs.{item.total}
                            </Typography>
                          </Box>
                          <Divider />
                        </Box>
                      );
                    })}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Box className="productBox text">
                    <Typography variant="body2">Subtotal</Typography>
                    <Typography variant="body2">{subtotal}</Typography>
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
                    <Typography variant="body2">{total}</Typography>
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
                <Button type = 'submit' sx = {{fontWeight : "500"}}  fullWidth variant = 'contained'>Place Order</Button>
            </Grid>
          </Grid>
        </Grid>
        {/* Your Order ends */}
      </Grid>
        </form>
      {/* Main Section Ends */}
    </>
  );
}
