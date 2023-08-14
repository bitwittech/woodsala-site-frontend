/* eslint-disable no-case-declarations */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useEffect, useReducer } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  getCODLimits,
  getCartItem,
  getCustomer,
  getDetails,
  placeOrder,
  removeCartItem,
  simpleOrder,
  updateQuantity,
  verifyPayment,
} from "../../service/service";
import {
  handleItemQTY,
  removeItem,
  setAlert,
  setCart,
  thanks,
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
        razorpaySignature: response.razorpay_signature,
      };

      //console.log(order);

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
        // setState(initial);
        // removing the item for the cart after order
        if (auth.isAuth) {
          Promise.all(
            cart.items.map(
              async (row) =>
                (await row.product_id) &&
                removeCartItem({
                  CID: auth.CID,
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
            payload: localState.OID,
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
    //console.log(">>>",process.env.REACT_APP_PAY_KEY)

    //console.log(localState)

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const response = await placeOrder({
      ...localState,
      limit_without_advance: localState.codLimit.limit_without_advance,
    }); // local APIs for saving Order

    if (response.status !== 200) return;

    if (localState.pay_method_remaining === "COD")
      setState({
        type: "Set_State",
        payload: { pay_method_advance: "Razorpay" },
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
        contact: localState.customer_mobile,
      },
      notes: {
        address: localState.shipping,
      },
      theme: {
        color: "#91441f",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  // helper function
  async function fetchProductDetails() {
    const response = await getDetails(
      JSON.stringify(
        cart.items.map((item) => {
          return item.product_id;
        })
      )
    );

    if (response) {
      const CartItems = response.data.map((dataSet, index) => {
        const discount_product = dataSet[0].categories[0].discount_limit
          ? dataSet[0].discount_limit > dataSet[0].categories[0].discount_limit
            ? dataSet[0].categories[0].discount_limit
            : dataSet[0].discount_limit
          : dataSet[0].discount_limit;

        const discount =
          ((cart.items.filter((data) => {
            return data.product_id === dataSet[0].SKU;
          })[0].quantity *
            dataSet[0].selling_price) /
            100) *
          discount_product;
        return {
          price:
            cart.items.filter((data) => {
              return data.product_id === dataSet[0].SKU;
            })[0].quantity * dataSet[0].selling_price,
          qty: cart.items.filter((data) => {
            return data.product_id === dataSet[0].SKU;
          })[0].quantity,
          discount,
          total:
            cart.items.filter((data) => {
              return data.product_id === dataSet[0].SKU;
            })[0].quantity *
              dataSet[0].selling_price -
            discount,
          discount_product,
          SKU: dataSet[0].SKU,
          image: dataSet[0].featured_image || dataSet[0].product_image[0],
          assembly_part: dataSet[0].assembly_part,
          size:
            dataSet[0].length_main +
            "X" +
            dataSet[0].breadth +
            "X" +
            dataSet[0].height,
          product_title: dataSet[0].product_title,
          dispatch: dataSet[0].polish_time + dataSet[0].manufacturing_time,
          material: dataSet[0].primary_material_name,
        };
      });

      setState({
        type: "Set_Cart",
        payload: {
          products: CartItems,
        },
      });
      setState({
        type: "Set_Total",
        payload: {
          products: CartItems,
        },
      });
    }
  }

  async function fetchCustomerDetails() {
    if (auth.CID && auth.isAuth) {
      const customer = await getCustomer(auth.CID);
      if (customer) {
        setState({
          type: "Set_Customer",
          payload: {
            CID: auth.CID,
            customer_name: customer.data.username,
            customer_email: customer.data.email,
            customer_mobile: customer.data.mobile,
            city: customer.data.city,
            state: customer.data.state,
            shipping:
              customer.data.address.length > 0
                ? customer.data.address[0].address
                : "",
          },
        });
      }

      const cart = await getCartItem(auth.CID);
      if (cart) {
        if (cart.data.length > 0) dispatch(setCart({ items: cart.data }));
      }
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
            payload: localState.OID,
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

function ReviewOrder({ size, localState, setState, auth, dispatch }) {
  // decrease quantity
  async function handleQTY(e, product_id) {
    dispatch(handleItemQTY({ quantity: parseInt(e.target.value), product_id }));
    if (auth.isAuth && auth.CID) {
      const res = await updateQuantity({
        CID: auth.CID,
        product_id,
        quantity: parseInt(e.target.value),
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
        product_id: item.SKU,
      });
      if (response) {
        // for client side
        dispatch(removeItem(item.SKU));

        return dispatch(
          setAlert({
            variant: "warning",
            message: response.data.message,
            open: true,
          })
        );
      } else {
        return dispatch(
          setAlert({
            variant: "error",
            message: "Something Went Wrong !!!",
            open: true,
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
          open: true,
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
          {details.product_title}
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
            ),
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

function Delivery({ size, localState, setState }) {
  function handleValue(e) {
    setState({
      type: "Set_Values",
      payload: { [e.target.name]: e.target.value },
    });
  }
  return (
    <Grid xs={12} md={size} className="delivery-wrapper flex-utility">
      {/* // add customer address  */}
      <Box className="delivery-inner-wrapper">
        <Box className="step-heading">
          <Typography variant="body1">2. Delivery Address</Typography>
        </Box>

        {/* address cards is available */}
        <Grid container className="available_address">
          <Grid item xs={12} className="address_card" p={1}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label={
                  <>
                    <Typography variant="body1">
                      {" "}
                      <h4> Yashwant Sahu </h4> 8302043259 |
                      yashwantsahu3002@gmail.com | Dargah Bazar Ajmer
                    </Typography>
                  </>
                }
              />
            </RadioGroup>
          </Grid>
        </Grid>

        <Box>
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
            <FormControlLabel
              control={<Checkbox size="small" defaultChecked />}
              label="Same billing address "
            />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}

function SelectPayment({
  size,
  localState,
  placeSimpleOrder,
  displayRazorpay,
  setState,
}) {
  function handlePayment(e) {
    setState({
      type: "Set_State",
      payload: {
        pay_method_remaining: e.target.value,
      },
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
      <Box sx={{ width: "50%" }}>
        <Typography className="review-text-clip" variant="body1">
          {details.product_title}
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
      const { products } = action.payload;
      if (products.length > 0) {
        state = {
          ...state,
          subTotal: products.reduce((sum, row) => sum + row.price, 0),
          total: products.reduce((sum, row) => sum + row.total, 0),
        };
      } else {
        state = { ...state, subTotal: 0, total: 0 };
      }
      return { ...state };
    default:
      return state;
  }
}

export default CheckOutNew;
