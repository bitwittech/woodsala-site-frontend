/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useEffect, useReducer, useState } from "react";
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
  FormGroup,
  // FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import { Helmet } from "react-helmet";
//image
import defaultProduct from "../../asset/images/defaultProduct.svg";
import { CloseRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getCODLimits,
  getCartItem,
  getCartItemDetails,
  getCustomer,
  getCustomerAddress,
  getDetails,
  placeOrder,
  removeCartItem,
  simpleOrder,
  updateQuantity,
  verifyPayment
} from "../../service/service";
import {
  handleItemQTY,
  removeItem,
  setAlert,
  setCart,
  thanks
} from "../../Redux/action/action";
// import localStorage from "redux-persist/es/storage";

function CheckOutNew() {
  const dispatch = useDispatch();
  const { cart, auth } = useSelector((state) => state);
  const initialState = {
    O: "",
    CID: auth.CID || "Not Logged In",
    status: "processing",
    customer_name: "",
    customer_email: "",
    customer_mobile: "",
    city: "",
    state: "",
    shipping: "",
    address: [],
    subTotal: 0,
    total: 0,
    quantity: {},
    pincode: "",
    discount: 0,
    paid: 0,
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
    products: [],
    saved_address: []
  };
  const [localState, setState] = useReducer(reducer, initialState);

  // this effect will fetch all the data from cart DB
  useEffect(() => {
    fetchProductDetails();
  }, [cart]);
  // this effect is for getting user details
  useEffect(() => {
    fetchCustomerDetails();
  }, [auth]);

  useEffect(() => {
    getLimits();
  }, []);


  // verify Payment
  async function verifyPay(response, order_id) {
    try {
      const order = {
        ...localState,
        O: localState,
        orderCreationId: order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature
      };

      //console.log(order);

      const res = await verifyPayment(order);

      if (res.status !== 200) {
        dispatch(
          setAlert({
            open: true,
            variant: "error",
            message: res.data.message || "Something Went Wrong !!!"
          })
        );
      } else {
        // setState(initial);
        // removing the item for the cart after order
        if (auth.isAuth) {
          Promise.all(
            cart.items.map(
              async (row) =>
                (await row.product_id) &&
                removeCartItem({
                  CID: auth.CID,
                  product_id: row.product_id
                })
            )
          );
        }
        dispatch(setCart({ items: [] }));
        dispatch(
          setAlert({
            open: true,
            variant: "success",
            message: res.data.message
          })
        );
        dispatch(
          thanks({
            open: true,
            payload: localState.OID
          })
        );

        // window.location.href = '/'
      }
    } catch (err) {
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!"
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

    console.log(localState)

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const response = await placeOrder({
      ...localState,
      limit_without_advance: localState.codLimit.limit_without_advance
    }); // local APIs for saving Order

    if (response.status !== 200) return;

    if (localState.pay_method_remaining === "COD")
      setState({
        type: "Set_State",
        payload: { pay_method_advance: "Razorpay" }
      });
    else setState({ type: "Set_State", payload: { pay_method_advance: "" } });

    const order_id = response.data.id.toString(); // Order Id from Payment Getaway

    // amount: amount,

    // Config for Payment Getaway
    const options = {
      // key: process.env.REACT_APP_PAY_KEY, // Enter the Key ID generated from the Dashboard
      currency: "INR",
      name: "WoodShala",
      description: "Product Order",
      image: "https://admin.woodshala.in/favicon.ico",
      order_id,
      handler: (response) => {
        verifyPay(response, order_id);
      },
      prefill: {
        name: localState.customer_name,
        email: localState.customer_email,
        contact: localState.customer_mobile
      },
      notes: {
        address: localState.shipping
      },
      theme: {
        color: "#91441f"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  // helper function
  async function fetchProductDetails() {
    const response = await getCartItemDetails({ CID: auth.CID || undefined });

    if (response.data.status === 200 && response.data.data[0].cartItems) {
      const cart_data = response.data.data[0].cartItems;
      const CartItems = cart_data.map((item) => {
        console.log(item);
        return {
          title: item.productDetails.title,
          price: item.productDetails.price,
          qty: item.quantity,
          discount: item.effectiveDiscount,
          total: item.totalPricePerItem,
          SKU: item.productDetails.SKU,
          image:
            item.productDetails.featured_image ||
            item.productDetails.product_images[0],
          size:
            item.productDetails.length +
            "X" +
            item.productDetails.breadth +
            "X" +
            item.productDetails.height,
          dispatch:
            item.productDetails.polish_time +
            item.productDetails.manufacturing_time,
          material: item.productDetails.material.join()
        };
      });

      setState({
        type: "Set_Cart",
        payload: {
          products: CartItems
        }
      });
      setState({
        type: "Set_Total",
        payload: {
          subTotal: response.data.data[0] ? response.data.data[0].subtotal : 0,
          total: response.data.data[0] ? response.data.data[0].total : 0
        }
      });
    }
  }

  async function fetchCustomerDetails() {
    const customer = await getCustomerAddress(auth.CID);
    if (customer.data.status === 200) {
      setState({
        type: "Set_Customer",
        payload: {
          CID: auth.CID,
          saved_address: [...customer.data.data]
        }
      });
    }
  }

  // for getting the COD limit to impose while choosing the he COD options
  async function getLimits() {
    // //console.log('fire')
    const response = await getCODLimits();
    if (response)
      setState({ type: "Set_State", payload: { codLimit: response.data[0] } });
  }

  async function placeSimpleOrder(e) {
    try {
      e.preventDefault();
      //console.log(localState)

      const res = await simpleOrder(localState);
      if (res.status === 200) {
        // setData(initial);
        // removing the item for the cart after order
        if (auth.isAuth) {
          Promise.all(
            cart.items.map(
              async (row) =>
                (await row.product_id) &&
                removeCartItem({
                  CID: auth.CID,
                  product_id: row.product_id
                })
            )
          );
        }
        dispatch(setCart({ items: [] }));
        dispatch(
          setAlert({
            open: true,
            variant: "success",
            message: res.data.message
          })
        );
        dispatch(
          thanks({
            open: true,
            payload: localState.OID
          })
        );
      }
    } catch (error) {}
  }

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
        <ReviewOrder
          auth={auth}
          dispatch={dispatch}
          localState={localState}
          setState={setState}
          size={3.8}
        />
        <Delivery
          dispatch={dispatch}
          localState={localState}
          setState={setState}
          size={3.8}
        />
        <SelectPayment
          setState={setState}
          dispatch={dispatch}
          placeOrder= {placeOrder}
          displayRazorpay={displayRazorpay}
          placeSimpleOrder={placeSimpleOrder}
          localState={localState}
          size={3.8}
        />
      </Grid>
      {/* Main Code Section Ends */}
    </>
  );
}
// step 1
function ReviewOrder({ size, localState, setState, auth, dispatch }) {
  // decrease quantity
  async function handleQTY(e, product_id) {
    dispatch(handleItemQTY({ quantity: parseInt(e.target.value), product_id }));
    if (auth.isAuth && auth.CID) {
      const res = await updateQuantity({
        CID: auth.CID,
        product_id,
        quantity: parseInt(e.target.value)
      });
      if (res) console.log(res);
    }
  }

  // removeItemFromCart
  async function removeItemFromCart(item) {
    // server side
    if (auth.isAuth) {
      const response = await removeCartItem({
        CID: auth.CID,
        product_id: item.SKU
      });
      if (response) {
        // for client side
        dispatch(removeItem(item.SKU));

        return dispatch(
          setAlert({
            variant: "warning",
            message: response.data.message,
            open: true
          })
        );
      } else {
        return dispatch(
          setAlert({
            variant: "error",
            message: "Something Went Wrong !!!",
            open: true
          })
        );
      }
    } else {
      // for client side
      dispatch(removeItem(item.SKU));

      return dispatch(
        setAlert({
          variant: "warning",
          message: "Item removed added to the cart !!!",
          open: true
        })
      );
    }
  }

  return (
    <Grid xs={12} md={size} className="review-order-wrapper flex-utility">
      <Box className="step-heading">
        <Typography variant="body1">1. Review Your Order</Typography>
      </Box>
      <Box className="review-order-inner-wrapper">
        <Box className="review-order-products flex-utility">
          {localState.products.map((row, index) => (
            <ProductCard
              key={index}
              details={row}
              removeItemFromCart={removeItemFromCart}
              handleQTY={handleQTY}
              auth={auth}
            />
          ))}
        </Box>
      </Box>
    </Grid>
  );
}
// childe Components for ReviewOrder
function ProductCard({ details, handleQTY, removeItemFromCart }) {
  return (
    <Box className="review-product-card-wrapper flex-utility">
      <Box className="close-icon flex-utility">
        <Tooltip title="Remove Product">
          <IconButton size="small" onClick={() => removeItemFromCart(details)}>
            <CloseRounded />
          </IconButton>
        </Tooltip>
      </Box>
      <Box className="review-product-img">
        <img src={details.image || defaultProduct} alt="product_image" />
      </Box>
      <Box className="review-product-card-details flex-utility">
        <Typography
          className="review-text-clip"
          sx={{ fontWeight: 500 }}
          variant="body1"
        >
          {details.title}
        </Typography>
        <Typography className="review-text-clip" variant="caption">
          SKU : {details.SKU}
        </Typography>
        <Typography className="review-text-clip" variant="caption">
          Size : {details.size}
        </Typography>
        <Typography className="review-text-clip" variant="caption">
          Material : {details.material}
        </Typography>
        <Typography className="review-text-clip" variant="caption">
          Dispatch By : : {details.dispatch} days
        </Typography>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Qty</InputAdornment>
            )
          }}
          size="small"
          onChange={(e) => handleQTY(e, details.SKU)}
          type="number"
          value={details.qty || 1}
          small
        />
      </Box>
      <Box className="review-product-price flex-utility">
        <Typography sx={{ fontWeight: 500 }} variant="body1">
          ₹ {details.total}
        </Typography>
      </Box>
    </Box>
  );
}
// step 2
function Delivery({ size, localState, setState }) {
  const [addressToggle, setAddressToggle] = useState({ open: false });
  function handleValue(e) {
    setState({
      type: "Set_Values",
      payload: { [e.target.name]: e.target.value }
    });
  }
  function handleToggle() {
    setAddressToggle({
      open: !addressToggle.open
    });
   // this will remove the address_id if customer wants to write a new address 
    setState(
      {
        type: "Set_Values",
        payload: { address_id : addressToggle.open ? "" : localState.address_id }
      }
    )
  }
  function handleAddress(e){
    setState(
      {
        type: "Set_Values",
        payload: { address_id : e.target.value }
      }
    )
  }
  return (
    <Grid xs={12} md={size} className="delivery-wrapper flex-utility">
      <Box className="delivery-inner-wrapper">
        <Box className="step-heading">
          <Typography variant="body1">2. Delivery Address</Typography>
        </Box>
        {!addressToggle.open ? (
          <Grid container className="available_address">
            {/* address cards is available */}
            <Grid item xs={12} className="address_card_wrapper" p={1}>
              <RadioGroup
                onChange={handleAddress}
                value={localState.address_id || ""}
                 sx={{width:"100%"}}
                name="address_id"
              >
                {localState.saved_address.map((row) => (
                  <FormControlLabel
                    className="address_card"
                    key={row.id}
                    value={row.id}
                    control={<Radio />}
                    label={
                      <>
                        <Typography variant="body1">
                          <h4> {row.name || row.customer_name} </h4> {row.mobile} |
                          {row.email} | {row.shipping || row.address}
                        </Typography>
                      </>
                    }
                  />
                ))}
              </RadioGroup>
            </Grid>
            <Grid>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox size="small" onChange={handleToggle} />}
                  label="Add new address"
                />
              </FormGroup>
            </Grid>
          </Grid>
        ) : (
          <Box>
            {/* // add customer address  */}
            <Box p={1}>
              <Typography variant="body2">All fields are required.</Typography>
            </Box>
            <Box className="delivery-form flex-utility">
              <TextField
                required
                variant="outlined"
                size="small"
                name="customer_email"
                label="Email Address"
                value={localState.customer_email || ""}
                onChange={handleValue}
              ></TextField>
              <TextField
                required
                variant="outlined"
                size="small"
                name="customer_name"
                label="Full Name"
                value={localState.customer_name || ""}
                onChange={handleValue}
              ></TextField>
              <TextField
                required
                variant="outlined"
                size="small"
                name="customer_mobile"
                label="Mobile Number"
                value={localState.customer_mobile || ""}
                onChange={handleValue}
              ></TextField>
              <TextField
                required
                variant="outlined"
                size="small"
                name="pincode"
                label="Pincode/ZIP code"
                value={localState.pincode || ""}
                onChange={handleValue}
              ></TextField>
              <TextField
                required
                variant="outlined"
                size="small"
                name="shipping"
                value={localState.shipping || ""}
                onChange={handleValue}
                label="Shipping Address"
              ></TextField>
              <TextField
                required
                variant="outlined"
                size="small"
                name="city"
                value={localState.city || ""}
                onChange={handleValue}
                label="City/Town"
              ></TextField>
              <TextField
                required
                variant="outlined"
                size="small"
                name="state"
                label="State/territory"
                value={localState.state || ""}
                onChange={handleValue}
              ></TextField>
              <TextField
                required
                variant="outlined"
                disabled
                size="small"
                name="country"
                label="Country"
                value={localState.country || ""}
                onChange={handleValue}
              ></TextField>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Same billing address."
                />
                <FormControlLabel
                  control={<Checkbox size="small" onChange={handleToggle} />}
                  label="Choose from address."
                />
              </FormGroup>
            </Box>
          </Box>
        )}
      </Box>
    </Grid>
  );
}
// step 3 
function SelectPayment({
  size,
  localState,
  placeSimpleOrder,
  displayRazorpay,
  setState
}) {
  function handlePayment(e) {
    setState({
      type: "Set_State",
      payload: {
        pay_method_remaining: e.target.value
      }
    });
  }

  return (
    <Grid
      component={"form"}
      xs={12}
      md={size}
      className="payment-method-wrapper flex-utility"
      method="post"
      onSubmit={
        localState.pay_method_remaining === "COD" &&
        localState.codLimit.limit_without_advance > localState.total
          ? placeSimpleOrder
          : displayRazorpay
      }
      encType="multipart/form-data"
    >
      <Box className="pay-inner-wrapper">
        <Box className="step-heading">
          <Typography variant="body1">3. Select Payment Method</Typography>
        </Box>
        <Box p={1}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="UPI"
              name="payMethod"
              onChange={handlePayment}
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
            {localState.products.map((row, i) => (
              <ProductRowOrder key={i} details={row} />
            ))}
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
                ₹ {localState.subTotal}
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
              <Typography variant="body1"> ₹ 0</Typography>
            </Box>
            <Divider />
            {/* Total */}
            <Box mt={2} className="flex-utility order-total">
              <Typography variant="h5">Order Total</Typography>
              <Typography variant="h5"> ₹ {localState.total}</Typography>
            </Box>
            {/* button complete order */}
            <Box mt={2}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                type="submit"
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

function ProductRowOrder({ details }) {
  return (
    <Box className="order-summary-product flex-utility">
      {console.log(details)}
      <Box sx={{ width: "50%" }}>
        <Typography className="review-text-clip" variant="body1">
          {details.title}
        </Typography>
      </Box>
      <Typography variant="body1">X{details.qty}</Typography>
      <Typography variant="body1">₹ {details.total}</Typography>
    </Box>
  );
}

// localState
function reducer(state, action) {
  // //console.log(action.payload);
  switch (action.type) {
    case "Set_State":
      state = { ...state, ...action.payload };
      return state;
    case "Set_Cart":
      state = { ...state, ...action.payload };
      return state;
    case "Set_Customer":
      state = { ...state, ...action.payload };
      return state;
    case "Set_Values":
      state = { ...state, ...action.payload };
      return state;
    case "Set_Total":
      state = { ...state, ...action.payload };
      // const { products } = action.payload;
      // if (products.length > 0) {
      //   state = {
      //     ...state,
      //     subTotal: products.reduce((sum, row) => sum + row.price, 0),
      //     total: products.reduce((sum, row) => sum + row.total, 0),
      //   };
      // } else {
      //   state = { ...state, subTotal: 0, total: 0 };
      // }
      return { ...state };
    default:
      return state;
  }
}

export default CheckOutNew;
