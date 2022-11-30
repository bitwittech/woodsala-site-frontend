// css
import ".././asset/css/cart.css";
// react
import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Divider,
  MenuItem,
  InputAdornment,
  IconButton
} from "@mui/material";


import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";

// icon
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import OutlinedFlagSharpIcon from "@mui/icons-material/OutlinedFlagSharp";
import DeleteIcon from '@mui/icons-material/Delete';
// APis services 
import { getDetails, updateQuantity, removeCartItem, getCartItem } from "../service/service"

// state global
// import { Store } from '../store/Context'
// import { cart, Notify } from "../store/Types";

// state Redux
import { useDispatch, useSelector } from 'react-redux'

// action 
import {setCart,removeItem,setAlert,addQTY,subQTY} from '../Redux/action/action'

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

// pagination
function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const Cart = (props) => {

  // global 
  // const { state, dispatch } = Store();

  // Redux 
  const dispatch = useDispatch();
  // state 
  const state = useSelector(state => state);

  // states 
  const [row, setRow] = useState([])
  const [country, setCountry] = useState("EUR");
  const [data, setData] = useState(
    {
      total: 0,
      subtotal: 0
    }
  );

  useEffect(()=>{
    if(state.auth.isAuth)
    {
      getCartItem(state.auth.CID)
      .then((response) => {
        if(response.data.length > 0)
          dispatch(setCart({ items: response.data }))
      })  
    }
  },[state.auth.isAuth])


  // fetching the cart item
  useEffect(() => {
    // (state.cart.items)
    getDetails(JSON.stringify(state.cart.items.map((item) => { return item.product_id })))
      .then((response) => {
        console.log(state.cart.items)
        setRow(
          response.data.map((dataSet, index) => {
            return {
              id: index + 1,
              SKU: dataSet.SKU,
              product: dataSet.featured_image || dataSet.product_image[0],
              product_name: dataSet.product_title,
              price: state.cart.items.filter((data) => { return data.product_id === dataSet.SKU })[0].quantity * dataSet.selling_price,
              qty: state.cart.items.filter((data) => { return data.product_id === dataSet.SKU })[0].quantity,
              total: state.cart.items.filter((data) => { return data.product_id === dataSet.SKU })[0].quantity * dataSet.selling_price - (state.cart.items.filter((data) => { return data.product_id === dataSet.SKU })[0].quantity * dataSet.selling_price)/100*dataSet.discount_limit,
              action: dataSet.SKU
            }
          })
        )
        // setRow(data.data)
      })
  }, [state.cart])

  // for calculating total on value on runtime
  useEffect(() => {

    setData({
      total: row.reduce((partial, set) => partial + parseInt(set.total), 0),
      subtotal: row.reduce((partial, set) => partial + parseInt(set.price), 0),
    })
  }, [row])

  // removeItemFromCart 
  const removeItemFromCart = async (item) => {

    // server side 
    if (state.auth.isAuth) {
      await removeCartItem({
        CID: state.auth.CID,
        product_id: item.SKU
      })
        .then((response) => {
          // for client side
          dispatch(removeItem(item.SKU))

          return dispatch(setAlert({
              variant: 'warning',
              message: response.data.message,
              open: true
            }))
        })
        .catch((err) => {
          return dispatch(setAlert({
              variant: 'error',
              message: 'Something Went Wrong !!!',
              open: true
            }))
        })
    }
    else {
      // for client side
      dispatch(removeItem(item.SKU))

      return dispatch(setAlert({
          variant: 'warning',
          message: 'Item removed added to the cart !!!',
          open: true
        }))

    }
  }

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  // decrease quantity
  const handleDecrease = (e) => {
    if (state.auth.isAuth) {
      updateQuantity({ CID: state.auth.CID, product_id: e.product_id, quantity: e.quantity-1 })
        .then(() => {
         dispatch(subQTY(e.product_id));
        })
    }
    else dispatch(subQTY(e.product_id));
  }
  // increase quantity
  const handleIncrease = (e) => {
    if (state.auth.isAuth) {
      updateQuantity({ CID: state.auth.CID, product_id: e.product_id, quantity: e.quantity+1 })
        .then(() => {
         dispatch(addQTY(e.product_id));
        })
    }
    else dispatch(addQTY(e.product_id));
  }

  // columns section 
  const columns = [
    { field: "id", renderHeader: () => <strong>{"S.No"}</strong>, width: 50 },
    { field: "SKU", renderHeader: () => <strong>{"SKU"}</strong>, width: 100 },
    {
      field: "product",
      align: "center",
      width: 200,
      renderHeader: () => <strong>{"Product"}</strong>,
      renderCell: (params) => (
        <div>
          {params.formattedValue !== "undefined" ? (
            <img className="productImage" src={params.formattedValue} alt="category" />
          ) : (
            "Image Not Give"
          )}
        </div>
      ),
    },
    {
      field: "product_name",
      renderHeader: () => <strong>{"Product Name"}</strong>,
      width: 200,
    },
    {
      field: "price",
      renderHeader: () => <strong>{"Price (Rupee)"}</strong>,
      type: "number",
      width: 120,
      align : 'center'
    },

    {
      field: "qty",
      renderHeader: () => <strong>{"Quantity"}</strong>,
      width: 150,
      renderCell: (params) => (
        <Grid container className="qtyButtons">
          <Grid item xs={12} md={3}>
            <Button
              onClick={() => handleDecrease({ product_id: params.row.SKU, quantity: params.row.qty })}
              variant="outlined" size="small">
              -
            </Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="body">{params.formattedValue}</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              onClick={() => handleIncrease({ product_id: params.row.SKU, quantity: params.row.qty })}
              variant="outlined" size="small">
              +
            </Button>
          </Grid>
        </Grid>
      ),
    },
    {
      field: "total",
      renderHeader: () => <strong>{"Total"}</strong>,
      type: "number",
      width: 100,
      align : 'center'

    },
    {
      field: "action",
      renderHeader: () => <strong>{"Remove"}</strong>,
      headerName: "Actions",
      width: 70,
      renderCell: (params) =>
        <div className="categoryImage" >
          <IconButton onClick={() => {
            removeItemFromCart({ SKU: params.formattedValue }).then((res) => {
              setRow(row.filter((set) => {
                return set.action !== params.formattedValue;
              }))
              dispatch(setAlert( {
                  open: true,
                  variant: 'warning',
                  message: 'Item Removed !!!'
              }))
            })
          }} aria-label="delete"  >
            <DeleteIcon />
          </IconButton>

        </div>,
    }

  ];


  // data grid view
  function DataGridView() {
    return (
      <div style={{ height: "450px", width: "100%" }}>
        <DataGrid
        sx = {{
          fontWeight : 400,
          fontSize : '1rem'
        }}
          rows={row}
          columns={columns}
          pageSize={5}
          getRowHeight={() => 100}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          disableColumnMenu
          components={{
            Pagination: CustomPagination,
          }}
        />
      </div>
    );
  }



  return (
    <>
      <title> Cart </title>
      {/* Banner */}
      <Grid container className="cartBanner">
        <Grid item xs={12}>
          <Typography variant="h1">Cart</Typography>
        </Grid>
      </Grid>
      {/* Banner Ends */}
      {/* Main Section */}
      <Grid container className="mainSec">
        <Grid item xs={12}>
          <Typography variant="h4">Cart Details</Typography>
        </Grid>
        <Grid item xs={12} className="tableContainer" md={8.5}>
          {DataGridView()}
        </Grid>

        {/* // Cart Totals  */}
        <Grid item xs={12} className="tableContainer" md={3.5}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h5">Cart Total</Typography>
              <Grid container className="cartTotals">
           
                {/* <Grid item xs={12}>
                  <Typography variant="body1">Shipping</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Shipping Charges (0)</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    Shipping To Jaipur 302001, Rajasthan
                  </Typography>
                </Grid> */}
                {/* <Grid item xs={12} className="address">
                  <Grid container>
                    <Grid className="changeAddress" item xs={12}>
                      <LocationOnOutlinedIcon />
                      <Typography variant="body2">Change Address</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ padding: "5% 0%" }}>
                      <form className="fromSec">
                        <TextField
                          select
                          size="small"
                          label="Country"
                          value={country}
                          fullWidth
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PublicOutlinedIcon small="true" />
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
                          select
                          sx={{ marginTop: "7%" }}
                          size="small"
                          label="State"
                          value={country}
                          fullWidth
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <OutlinedFlagSharpIcon small="true" />
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
                          id="outlined-start-adornment"
                          sx={{ marginTop: "7%" }}
                          size="small"
                        />
                        <TextField
                          label="Pin Code"
                          id="outlined-start-adornment"
                          sx={{ marginTop: "7%" }}
                          size="small"
                        />
                        <Button
                          sx={{ marginTop: "7%" }}
                          small="true"
                          variant="outlined"
                        >
                          Update
                        </Button>
                      </form>
                    </Grid>
                  </Grid>
                </Grid> */}
                 {/* coupon section */}

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
          </Grid>
          {/* coupon section ends */}
          <Grid sx = {{mt:2, mb : 2}} item xs={12}>
                      <Divider></Divider>
                    </Grid>
          <Grid item xs={12} className="subTotal">
                  <Typography variant="body">Number Items</Typography>
                  <Typography variant="body">{state.cart.items.length} unit</Typography>
                </Grid>
              <Grid item xs={12} className="subTotal">
                  <Typography variant="body">Discount</Typography>
                  <Typography variant="body">-  `&#8377; {data.subtotal - data.total }</Typography>
                </Grid>
                <Grid item xs={12} className="subTotal">
                  <Typography variant="body">Subtotal</Typography>
                  <Typography variant="body">&#8377; {data.subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
                </Grid>
                <Grid sx = {{mt:2}} item xs={12}>
                  <Divider></Divider>
                  <br></br>
                </Grid>
                   
                    <Grid item xs={12} className="Total">
                      <Typography variant="body1">Total</Typography>
                      <Typography variant="body1">&#8377; {data.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider></Divider>
                    </Grid>
                    <Grid item xs={12}>
                      <Button disabled={row.length <= 0 ? true : false} onClick={() => {
                        props.history("/checkout", { state: { total: data.total, subtotal: data.subtotal, quantity: row.map((set) => { return { [set.SKU]: set.qty } }), product: row } })
                      }} sx={{ fontWeight: "500" }} variant="contained" fullWidth>
                        Proceed To CheckOut
                      </Button>
                    </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* Main Section Ends */}
    </>
  );
};

export default Cart;
