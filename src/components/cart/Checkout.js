import React, { useState, useEffect } from "react";
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
  Radio,
  MenuItem
} from "@mui/material";
import { Helmet } from "react-helmet";

// css
import "../../asset/css/checkout.css";

// icon
// import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
// import OutlinedFlagSharpIcon from "@mui/icons-material/OutlinedFlagSharp";
// import bajot from "../asset/images/home/bajot_TC.png";

// apis function 
import { getCustomer, getLastOrder, placeOrder, removeCartItem, verifyPayment, getCartItem } from '../../service/service'

// // store
// import {Store} from '../store/Context';
// import {Notify} from '../store/Types';

// redux 
import { useDispatch, useSelector } from 'react-redux'
import { setAlert, setCart, thanks } from '../../Redux/action/action'




export default function Checkout() {

  // global Store
  // const {state,dispatch} = Store();
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  // url parameter
  const location = useLocation();
  // (location)
  const { total, subtotal, product, quantity } = location.state;

  const [OID, setOID] = useState();
  // data form state
  const [data, setData] = useState({
    O: '',
    CID: state.auth.CID || 'Not Logged In',
    status: 'processing',
    customer_name: '',
    customer_email: '',
    customer_mobile: '',
    city: '',
    state: '',
    shipping: '',
    address: [],
    quantity: quantity,
    discount: 0,
    paid: 0,
    total: total,
    note: '',
  })


  useEffect(() => {
    if (state.auth.CID) {
      getCustomer(state.auth.CID)
        .then((response) => {
          setData({
            ...data,
            CID: state.auth.CID,
            customer_name: response.data.username,
            customer_email: response.data.email,
            customer_mobile: response.data.mobile,
            city: response.data.city,
            state: response.data.state,
            address: response.data.address,
          })
        })
        .catch((err) => {
          console.log(err)
        })

        getCartItem(state.auth.CID)
      .then((response) => {
        if(response.data.length > 0)
          dispatch(setCart({ items: response.data }))
      })  
      getOID();
    }
    else {
      getOID();
    }
  }, [state.auth.isAuth])

  useEffect(() => {
    setData({ ...data, OID: OID })
  }, [OID])

  // verify Payment 
  async function verifyPay (response,order_id) {
          
    const order = {...data,
        O : OID,
        orderCreationId: order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature}

        console.log(order)
      
        const res = verifyPayment(order);

        res
        .then(async(response) => {
          if (response.status !== 200) {
            setData({
              O: '',
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
              note: ''
            })
            dispatch(setAlert({
              open: true,
              variant: "error",
              message: response.data.message || "Something Went Wrong !!!",
            }));
  
          } else {
            // removing the item for the cart after order
            if(state.auth.isAuth)
            {
              Promise.all(state.cart.items.map(async row => await row.product_id && removeCartItem({
                CID: state.auth.CID,
                product_id: row.product_id,
              })))  
            }
            dispatch(setCart({ items: [] }))
                  dispatch(setAlert({
                    open: true,
                    variant: "success",
                    message: response.data.message,
                  }));
                  dispatch(thanks({
                    open: true,
                    payload : OID,
                  }));
  
            // window.location.href = '/'
          }
        })
        .catch((err) => {
          dispatch(setAlert({
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
  
          }));
        });

  }

  // function for payment Gateway
  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

// FOR Pay UI 
async function displayRazorpay(e) {
  e.preventDefault();

  // UI response check
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    const response  = await placeOrder(data) // local APIs for saving Order

    if(response.status !== 200) return;

    const order_id = response.data.id.toString() // Order Id from Payment Getaway

    // Config for Payment Getaway 
    const options = {
        key: process.env.REACT_APP_PAY_KEY, // Enter the Key ID generated from the Dashboard
        amount: (total * 100).toString(),
        currency: 'INR',
        name: "WoodShala",
        description: "Product Order",
        image: 'https://admin.woodshala.in/favicon.ico',
        order_id: order_id,
        handler: (response)=>{verifyPay(response,order_id)},
        prefill: {
            name: data.customer_name,
            email: data.customer_email,
            contact: data.customer_mobile,
        },
        notes: {
            address: data.shipping,
        },
        theme: {
            color: "#91441f",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}
  // function for generating product OID ID
  const getOID = async () => {
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

  // const [country, setCountry] = React.useState("EUR");

  const handleData = (e) => {
    // (e.target.name)
    setData({ ...data, [e.target.name]: e.target.value });
  }

  /// submit order
  // const handleSubmit = async (e) => {

  //   e.preventDefault();
  //   const formVal = { ...data, O: OID };

  //   // (formVal)
  //   // return 'x'
  //   const res = addOrder(formVal)

  //   res
  //     .then((response) => {
  //       if (response.status !== 200) {
  //         setData({
  //           O: '',
  //           CUS: '',
  //           CID: null,
  //           customer_email: '',
  //           customer_mobile: '',
  //           customer_name: '',
  //           shipping: [],
  //           product_array: [],
  //           quantity: [],
  //           subTotal: 0,
  //           discount: 0,
  //           total: 0,
  //           status: 'processing',
  //           city: '',
  //           state: '',
  //           paid: 0,
  //           note: ''
  //         })
  //         dispatch(setAlert({
  //           open: true,
  //           variant: "error",
  //           message: response.data.message || "Something Went Wrong !!!",

  //         }));

  //       } else {
  //         // removing the item for the cart after order
  //         Promise.all(state.cart.items.map(async row => await removeCartItem({
  //           CID: state.auth.CID,
  //           product_id: row.product_id,
  //         })))
  //           .then(() => {
  //             dispatch(setCart({ items: [] }))
  //           })

  //         dispatch(setAlert({
  //           open: true,
  //           variant: "success",
  //           message: response.data.message,
  //         }));

  //         window.location.href = '/'
  //       }
  //     })
  //     .catch((err) => {
  //       dispatch(setAlert({
  //         open: true,
  //         variant: "error",
  //         message: "Something Went Wrong !!!",

  //       }));
  //     });
  // }


  return (
    <>
    
     {/* helmet tag  */}
     <Helmet>
    <title>Check-Out</title>
    <meta name="description" content="This page is for finall checkout and bill paying." />
    </Helmet>
    {/* helmet tag ends  */}
      {/* Banner */}
      <Grid container className="Banner">
        <Grid item xs={12}>
          <Typography variant="h1">CheckOut</Typography>
        </Grid>
      </Grid>
      {/* Banner Ends */}
      {/* Main Section */}
      <form method='post' onSubmit={displayRazorpay} encType='multipart/form-data'>
        <Grid container className="mainSec" >
          <Grid sx = {{mb :2}} item xs={12}>
            <Typography variant="h4">CheckOut</Typography>
          </Grid>

          {/* coupon section */}
          {/* 
          <Grid item xs={12} className="couponBox">
            <Typography variant="body1">
              Have Any Coupon Code? Apply here.
            </Typography>
            <br></br>
            <div className="applyBox">
              <TextField size="small" variant="outlined" label="Coupon Code" />
              <Button sx={{ fontWeight: "400" }} size="small" variant="contained">
                Apply
              </Button>
            </div>
          </Grid> */}
          {/* coupon section ends */}

          {/* Billing Section */}

          <Grid item xs={12} md={8.5} sx={{ p: 2 }} className="billingDetails">
            <Grid item xs={12}>
              <Typography variant="h6">Billing Details</Typography>
            </Grid>

            <Grid item xs={12}>
              <Grid container className="billingForm">
                <TextField
                  required
                  label="OID"
                  name='OID'
                  disabled
                  value={OID || ''}
                  onChange={handleData}
                  fullWidth
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                />
                <TextField
                  required
                  label="Name"
                  name='customer_name'
                  onChange={handleData}
                  value={data.customer_name || ''}
                  fullWidth
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                />
                <TextField
                  required
                  name='customer_email'
                  onChange={handleData}
                  value={data.customer_email || ''}
                  label="Email"
                  fullWidth
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                />
                <TextField
                  required
                  name='customer_mobile'
                  onChange={handleData}
                  value={data.customer_mobile || ''}
                  label="Phone Number"
                  fullWidth
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                />

               {state.auth.isAuth ? <TextField sx={{ mt: 2 }}
                  size="small"
                  fullWidth
                  // required
                  id="outlined-select"
                  select
                  required 
                  name="shipping"
                  label="Address"
                  value={data.shipping || ''}
                  multiple
                  onChange={handleData}
                  helperText="Please select your address"
                >
                  {data.address.map(
                    (option) =>
                      <MenuItem
                        key={option.address}
                        value={option.address}
                      >
                        {option.customer_name} : {option.address}
                      </MenuItem>)}
                </TextField> : 
                <>
                <TextField
                  required
                  name='shipping'
                  onChange={handleData}
                  value={data.shipping || ''}
                  label="Address"
                  fullWidth
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                />
                <TextField
                label="State"
                fullWidth
                value={data.state || ''}
                name='state'
                onChange={handleData}
                id="outlined-start-adornment"
                sx={{ marginTop: "2%" }}
                size="small"
              />
              <TextField
                label="Town/City"
                value={data.city || ''}
                name='city'
                onChange={handleData}
                fullWidth
                id="outlined-start-adornment"
                sx={{ marginTop: "2%" }}
                size="small"
              /></>
                }
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
                  value={data.note}
                  name='note'
                  onChange={handleData}
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
                  <Grid item xs={12} sx={{ mb: 2 }}>
                    <Stack className='productStack'>
                      {product.map((item, index) => {
                        return (
                          <Box key={index}>
                            <Box className="productBox">
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
                    <Divider />
                    <Box className="productBox text">
                      <Typography variant="body">Subtotal</Typography>
                      <Typography variant="body">&#8377; {subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
                    </Box>
                    <Divider />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <Box className="productBox text">
                      <Typography variant="body2">Tax</Typography>
                      <Typography variant="body2">18%</Typography>
                    </Box>
                    <Divider />
                  </Grid> */}
                  <Grid item xs={12}>
                    <Box className="productBox text">
                      <Typography variant="body">Total</Typography>
                      <Typography variant="body">&#8377; {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
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
              <Grid item xs={12} className="orderButton" >
                <Button type='submit'  sx={{ fontWeight: "500" }} fullWidth variant='contained'>Place Order</Button>
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
