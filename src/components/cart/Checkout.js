/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from "react";
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
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { Helmet } from "react-helmet";
import defaultIMG from "../../asset/images/defaultProduct.svg";

// css
import "../../asset/css/checkout.css";

// icon
// import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
// import OutlinedFlagSharpIcon from "@mui/icons-material/OutlinedFlagSharp";
// import bajot from "../asset/images/home/bajot_TC.png";

// apis function
import {
  getCustomer,
  getLastOrder,
  placeOrder,
  removeCartItem,
  verifyPayment,
  getCartItem,
  abandonedOrder,
  getCODLimits,
  getAddress,
  simpleOrder,
} from "../../service/service";

// // store
// import {Store} from '../store/Context';
// import {Notify} from '../store/Types';

// redux
import { useDispatch, useSelector } from "react-redux";
import { setAlert, setCart, thanks } from "../../Redux/action/action";
// import { AbcRounded } from "@mui/icons-material";

export default function Checkout() {
  // global Store
  // const {state,dispatch} = Store();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  let abandoned = null;
  // url parameter
  const location = useLocation();
  // (location)
  const { total, subtotal, product, quantity } = location.state;

  const [OID, setOID] = useState(null);
  // data form state
  const initial = {
    O: "",
    CID: state.auth.CID || "Not Logged In",
    status: "processing",
    customer_name: "",
    customer_email: "",
    customer_mobile: "",
    city: "",
    state: "",
    shipping: "",
    address: [],
    subTotal: subtotal,
    quantity,
    pincode: "",
    discount: 0,
    paid: 0,
    total,
    note: "",
    CUS: "",
    GST: null,
    open: false,
    payload: {},
    classification: "personal",
    customer_type: "",
    has_GST: "no",
    fulfilled: false,
    advance_received: false,
    pay_method_remaining: "UPI",
    pay_method_advance: "",
    inventory_location: "",
    courier_company: "",
    AWB: "",
    billing: "",
    product_array: [],
    product_price: {},
    items: {},
    customizations: [],
    discount_per_product: {},
    country: "India",
    custom_order: true,
    sale_channel: "Online",
    PO: "",
    refresh: 0,
    sales_person: "",
  };
  const [data, setData] = useState(initial);

  // catalog for city
  const [cities, setCity] = useState([]);

  const [codLimit, setLimit] = useState({
    limit_without_advance: 0,
    max_advance_limit: 0,
    min_advance_limit: 0,
    limit: 0,
  });
  const ref = {
    customer_name: useRef(),
    customer_email: useRef(),
    customer_mobile: useRef(),
    city: useRef(),
    state: useRef(),
    shipping: useRef(),
    note: useRef(),
    pincode: useRef(),
  };

  // event for monitoring the user behavior with cart
  useEffect(() => {
    getLimits();

    // 30 minutes timeout for now
    // for tab change event
    window.addEventListener("visibilitychange", (e) => setAbandonedTime(e));
    // on window unload
    window.onbeforeunload = (e) => setAbandonedTime(e);
    // path changes event

    // if (window.location.pathname !== "/checkout") setAbandonedTime();
  }, []);

  useEffect(() => {
    if (data.total > codLimit.limit_without_advance)
      setData((old) => ({
        ...old,
        advance_received: Math.ceil(
          (data.total / 100) * codLimit.min_advance_limit
        ),
      }));
  }, [data.pay_method_remaining]);

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
          });
        })
        .catch((err) => {
          console.log(err);
        });

      getCartItem(state.auth.CID).then((response) => {
        if (response.data.length > 0)
          dispatch(setCart({ items: response.data }));
      });
      getOID();
    } else {
      getOID();
    }
  }, [state.auth.isAuth]);

  useEffect(() => {
    setData((old) => ({ ...old, O: OID }));
  }, [OID]);

  useEffect(() => {
    handelPincode();
  }, [data.pincode]);

  // setting up the other information about order
  useEffect(() => {
    let newDiscount = {}; // for the check on removal product
    let newProduct = {}; // for the check on removal product
    let items = {}; // for the check on removal product

    // console.log(product)

    product.map((row) => {
      newDiscount = {
        ...newDiscount,
        [row.SKU]: (row.discount / row.price) * 100,
      };
      newProduct = { ...newProduct, [row.SKU]: row.price };
      items = {
        ...items,
        [row.SKU]: [],
      };
      return 1;
    });

    setData((old) => ({
      ...old,
      discount_per_product: newDiscount,
      product_price: newProduct,
      items,
    }));
  }, [quantity]);

  async function handelPincode() {
    // console.log(changeData.pincode);
    if (data.pincode && data.pincode.toString().length === 6) {
      const res = await getAddress(data.pincode);
      if (res.status === 200) {
        const pincode = res.data.results[data.pincode] || [];
        setCity(pincode);
        setData((old) => ({
          ...old,
          state: pincode[0].state,
        }));
      }
    } else {
      setData((old) => ({ ...old, pincode: data.pincode }));
    }
  }

  async function placeSimpleOrder(e) {
    try {
      e.preventDefault();

      const res = await simpleOrder(data);
      if (res.status === 200) {
        setData(initial);
        // removing the item for the cart after order
        if (state.auth.isAuth) {
          Promise.all(
            state.cart.items.map(
              async (row) =>
                (await row.product_id) &&
                removeCartItem({
                  CID: state.auth.CID,
                  product_id: row.product_id,
                })
            )
          );
        }
        dispatch(setCart({ items: [] }));
        dispatch(
          setAlert({
            open: true,
            variant: "success",
            message: res.data.message,
          })
        );
        dispatch(
          thanks({
            open: true,
            payload: OID,
          })
        );
      }
    } catch (error) {}
  }

  // for getting the COD limit to impose while choosing the he COD options
  async function getLimits() {
    // console.log('fire')
    const response = await getCODLimits();
    if (response) setLimit(response.data[0]);
  }

  // set the time for abandoned cart
  function setAbandonedTime(e) {
    e.preventDefault();

    // console.log("Invoked");
    if (abandoned !== null) {
      // console.log("clear", abandoned);
      clearInterval(abandoned);
    } else {
      abandoned = setInterval(async (e) => {
        // console.log(abandoned);
        clearInterval(abandoned);
        // this is because i want current state of the textfield without rereading too much
        const finalData = { ...data };
        Object.keys(ref).map((key) => {
          return (
            ref[`${key}`].current &&
            (finalData[key] = ref[`${key}`].current.value)
          );
        });
        // Object.keys(ref).map((key) => console.log(ref[key], key));

        // now the send the data to the backend
        await abandonedOrder(finalData);
      }, 600000); // 10 minute
    }
    window.onfocus = () => {
      clearInterval(abandoned);
      abandoned = null;
    };
  }

  // verify Payment
  async function verifyPay(response, order_id) {
    try {
      const order = {
        ...data,
        O: OID,
        orderCreationId: order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
      };

      console.log(order);

      const res = await verifyPayment(order);

      if (res.status !== 200) {
        dispatch(
          setAlert({
            open: true,
            variant: "error",
            message: res.data.message || "Something Went Wrong !!!",
          })
        );
      } else {
        setData(initial);
        // removing the item for the cart after order
        if (state.auth.isAuth) {
          Promise.all(
            state.cart.items.map(
              async (row) =>
                (await row.product_id) &&
                removeCartItem({
                  CID: state.auth.CID,
                  product_id: row.product_id,
                })
            )
          );
        }
        dispatch(setCart({ items: [] }));
        dispatch(
          setAlert({
            open: true,
            variant: "success",
            message: res.data.message,
          })
        );
        dispatch(
          thanks({
            open: true,
            payload: OID,
          })
        );

        // window.location.href = '/'
      }
    } catch (err) {
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        })
      );
    }
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
    console.log(data);

    // return 1
    // UI response check
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const response = await placeOrder({
      ...data,
      limit_without_advance: codLimit.limit_without_advance,
    }); // local APIs for saving Order

    if (response.status !== 200) return;

    if (data.pay_method_remaining === "COD")
      setData((old) => ({ ...old, pay_method_advance: "Razorpay" }));
    else setData((old) => ({ ...old, pay_method_advance: "" }));

    const order_id = response.data.id.toString(); // Order Id from Payment Getaway

    // amount: amount,

    // Config for Payment Getaway
    const options = {
      key: process.env.REACT_APP_PAY_KEY, // Enter the Key ID generated from the Dashboard
      currency: "INR",
      name: "WoodShala",
      description: "Product Order",
      image: "https://admin.woodshala.in/favicon.ico",
      order_id,
      handler: (response) => {
        verifyPay(response, order_id);
      },
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
          const index = parseInt(res.data[0].O.split("-")[1]) + 1;

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
  };

  return (
    <>
      {/* helmet tag  */}
      <Helmet>
        <title>Check-Out</title>
        <meta
          name="description"
          content="This page is for finale checkout and bill paying."
        />
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
      <form
        method="post"
        onSubmit={
          data.pay_method_remaining === "COD" &&
          codLimit.limit_without_advance > total
            ? placeSimpleOrder
            : displayRazorpay
        }
        encType="multipart/form-data"
      >
        <Grid container className="mainSec">
          <Grid sx={{ mb: 2 }} item xs={12}>
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
                {/* <TextField
                  required
                  label="OID"
                  name="OID"
                  disabled
                  value={OID || ""}
                  onChange={handleData}
                  fullWidth
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                /> */}
                <TextField
                  required
                  label="Name"
                  name="customer_name"
                  inputProps={{ ref: ref.customer_name }}
                  onChange={handleData}
                  value={data.customer_name || ""}
                  fullWidth
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                />
                <TextField
                  required
                  name="customer_email"
                  inputProps={{ ref: ref.customer_email }}
                  onChange={handleData}
                  value={data.customer_email || ""}
                  label="Email"
                  fullWidth
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                />
                <TextField
                  required
                  name="customer_mobile"
                  inputProps={{ ref: ref.customer_mobile }}
                  onChange={handleData}
                  value={data.customer_mobile || ""}
                  label="Phone Number"
                  fullWidth
                  id="outlined-start-adornment"
                  sx={{ marginTop: "2%" }}
                  size="small"
                />

                {state.auth.isAuth && data.address.length > 0 ? (
                  <TextField
                    sx={{ mt: 2 }}
                    size="small"
                    fullWidth
                    // required
                    id="outlined-select"
                    select
                    required
                    name="shipping"
                    inputProps={{ ref: ref.shipping }}
                    label="Address"
                    value={data.shipping || ""}
                    multiple
                    onChange={handleData}
                    helperText="Please select your address"
                  >
                    {data.address.map((option) => (
                      <MenuItem key={option.address} value={option.address}>
                        {option.customer_name} : {option.address}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <>
                    <TextField
                      required
                      name="shipping"
                      inputProps={{ ref: ref.shipping }}
                      onChange={handleData}
                      value={data.shipping || ""}
                      label="Address"
                      fullWidth
                      id="outlined-start-adornment"
                      sx={{ marginTop: "2%" }}
                      size="small"
                    />
                    <TextField
                      label="Pin Code"
                      name="pincode"
                      fullWidth
                      inputProps={{ ref: ref.pincode }}
                      value={data.pincode || ""}
                      id="outlined-start-adornment"
                      sx={{ marginTop: "2%" }}
                      size="small"
                      onChange={handleData}
                    />

                    <TextField
                      label="State"
                      fullWidth
                      value={data.state || ""}
                      inputProps={{ ref: ref.state }}
                      name="state"
                      onChange={handleData}
                      id="outlined-start-adornment"
                      sx={{ marginTop: "2%" }}
                      size="small"
                    />
                    <TextField
                      label="Town/City"
                      value={data.city || ""}
                      inputProps={{ ref: ref.city }}
                      name="city"
                      select
                      onChange={handleData}
                      fullWidth
                      id="outlined-start-adornment"
                      sx={{ marginTop: "2%" }}
                      size="small"
                    >
                      {cities.map((option) => (
                        <MenuItem key={option.city} value={option.city}>
                          {option.city}
                        </MenuItem>
                      ))}
                    </TextField>
                  </>
                )}
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

                <Typography sx={{ marginTop: "3%" }} variant="h6">
                  Additional Information
                </Typography>

                <TextField
                  sx={{ marginTop: "2%" }}
                  id="standard-multiline-static"
                  label="Order Notes (Optional)"
                  inputProps={{ ref: ref.note }}
                  value={data.note}
                  name="note"
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
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Your Order
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container className="orderSummary">
                  <Grid item xs={12} sx={{ mb: 2 }}>
                    <Stack className="productStack">
                      {product.map((item, index) => {
                        return (
                          <Box key={index}>
                            <Box className="productBox">
                              <img
                                src={item.product || defaultIMG}
                                alt="productImage"
                              />
                              <Typography variant="body2">
                                {item.product_name}
                              </Typography>
                              <Typography variant="body2">
                                ₹ {item.total}
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
                      <Typography sx={{ fontWeight: 500 }} variant="body1">
                        Subtotal
                      </Typography>
                      <Typography sx={{ fontWeight: 500 }} variant="body1">
                        ₹ {subtotal}
                      </Typography>
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
                      <Typography sx={{ fontWeight: 500 }} variant="body1">
                        Total
                      </Typography>
                      <Typography sx={{ fontWeight: 500 }} variant="body1">
                        ₹ {total}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              {/* // pay method */}
              <Grid item xs={12}>
                <Grid container className="payMethod text">
                  {/* // advance pay module  */}
                  {data.pay_method_remaining === "COD" &&
                    codLimit.limit_without_advance <= total && (
                      <Grid
                        mb={1}
                        item
                        sx={{
                          display: "flex",
                          gap: "1rem",
                          flexDirection: "column",
                        }}
                        xs={12}
                      >
                        <Typography variant="body1" className="text">
                          Advance Pay
                        </Typography>
                        <TextField
                          variant="outlined"
                          size="small"
                          disabled
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                ₹
                              </InputAdornment>
                            ),
                          }}
                          value={data.advance_received}
                        />
                        {/* <Button size='small' fullWidth variant='outlined'>Pay Advance </Button> */}
                      </Grid>
                    )}
                  {/* // advance pay module ends */}
                  <Grid item xs={12}>
                    <Typography
                      sx={{ fontWeight: 500, fontSize: "1.1rem" }}
                      variant="body1"
                      className="text"
                    >
                      Select a payment method
                    </Typography>
                    <FormControl>
                      <RadioGroup
                        required={true}
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="UPI"
                        value={data.pay_method_remaining}
                        onChange={(e) =>
                          setData((old) => ({
                            ...old,
                            pay_method_remaining: e.target.value,
                          }))
                        }
                        name="pay_method_remaining"
                      >
                        <FormControlLabel
                          value="COD"
                          control={<Radio size="small" />}
                          label="Cash on Delivery"
                        />
                        <FormControlLabel
                          value="UPI"
                          control={<Radio size="small" />}
                          label="UPI (Razorpay)"
                        />
                        <FormControlLabel
                          value="Card"
                          control={<Radio size="small" />}
                          label="Debit/Credit Card Method"
                        />
                        <FormControlLabel
                          value="EMI"
                          disabled
                          control={<Radio size="small" />}
                          label="EMI"
                        />
                        <FormControlLabel
                          value="Card"
                          disabled
                          control={<Radio size="small" />}
                          label="Net Banking"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className="orderButton">
                <Button
                  type="submit"
                  sx={{ fontWeight: "500" }}
                  fullWidth
                  variant="contained"
                >
                  Place Order
                </Button>
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
