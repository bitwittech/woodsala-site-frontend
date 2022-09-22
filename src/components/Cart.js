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
import { getDetails, updateQuantity,removeCartItem } from "../service/service"

// state global
import { Store } from '../store/Context'
import { AddCartItem,Notify } from "../store/Types";


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
  const { state, dispatch } = Store();

// states 
  const [row, setRow] = useState([])
  const [country, setCountry] = useState("EUR");
  const [data,setData] = useState(
    {
      total : 0,
      subtotal : 0
    }
  );


  // fetching the cart item
  useEffect(() => {
    console.log(state.AddCartItem.items)
    getDetails(JSON.stringify(state.AddCartItem.items.map((item) => { return item.product_id })))
      .then((response) => {
        setRow(
          response.data.map((dataSet,index)=>{
            return {
              id : index+1,
              SKU : dataSet.SKU,
              product : dataSet.featured_image,
              product_name : dataSet.product_title,
              price : state.AddCartItem.items.filter((data)=> { return data.product_id === dataSet.SKU   } )[0].quantity * dataSet.MRP,
              qty : state.AddCartItem.items.filter((data)=> { return data.product_id === dataSet.SKU   } )[0].quantity,
              total : state.AddCartItem.items.filter((data)=> { return data.product_id === dataSet.SKU   } )[0].quantity * dataSet.selling_price,
              action : dataSet.SKU
            } 
          })
        )
        // setRow(data.data)
      })
  },[state.AddCartItem])

  // for calculating total on value on runtime
useEffect(()=>{

    setData({total : row.reduce((partial,set)=> partial + parseInt(set.total),0)
   })
},[row])

   // removeItemFromCart 
   const removeItemFromCart = async (item) => {

    // server side 
    if (state.Auth.isAuth) {
      await removeCartItem({
        CID: state.Auth.CID,
        product_id: item.SKU
      })
        .then((response) => {
          // for client side
          dispatch(
            {
              type: AddCartItem,
              payload: {
                items: state.AddCartItem.items.filter((row) => { return row.product_id !== item.SKU })
              }
            }
          )
          return dispatch({
            type: Notify,
            payload: {
              variant: 'warning',
              message: response.data.message,
              open: true
            }
          })
        })
        .catch((err) => {
          return dispatch({
            type: Notify,
            payload: {
              variant: 'error',
              message: 'Something Went Wrong !!!',
              open: true
            }
          })
        })
    }
    else {
      // for client side
      dispatch(
        {
          type: AddCartItem,
          payload: {
            items: state.AddCartItem.items.filter((row) => { return row.product_id !== item.SKU })
          }
        }
      )
      return dispatch({
        type: Notify,
        payload: {
          variant: 'warning',
          message: 'Item removed added to the cart !!!',
          open: true
        }
      })

    }
  }

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  // decrease quantity
const handleDecrease = (e)=>{
  const modifiedData = state.AddCartItem.items.map((data)=>{

    if(e.product_id === data.product_id) 
    {
      return {
        CID : data.CID,
        product_id : data.product_id,
        quantity : e.quantity -= 1
      }
    }
    else return data

  })

  if(state.Auth.isAuth)
  {
    updateQuantity({CID : state.Auth.CID, product_id : e.product_id, quantity : e.quantity  })
    .then((response)=>{
      dispatch({
        type : AddCartItem,
        payload : {items : [
          ...modifiedData,
        ]}
      })  
    })

  }
  else {
    dispatch({
      type : AddCartItem,
      payload : {items : [
        ...modifiedData,
      ]}
    })

  }
}
  // increase quantity
const handleIncrease = (e)=>{
  const modifiedData = state.AddCartItem.items.map((data)=>{

    if(e.product_id === data.product_id) 
    {
      return {
        CID : data.CID,
        product_id : data.product_id,
        quantity : e.quantity += 1
      }
    }
    else return data

  })

  if(state.Auth.isAuth)
  {
    updateQuantity({CID : state.Auth.CID, product_id : e.product_id, quantity : e.quantity  })
    .then((response)=>{
      dispatch({
        type : AddCartItem,
        payload : {items : [
          ...modifiedData,
        ]}
      })  
    })

  }
  else {
    dispatch({
      type : AddCartItem,
      payload : {items : [
        ...modifiedData,
      ]}
    })

  }

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
      renderHeader: () => <strong>{"Price"}</strong>,
      type: "number",
      width: 120,
    },

    {
      field: "qty",
      renderHeader: () => <strong>{"Quantity"}</strong>,
      width: 150,
      renderCell: (params) => (
        <Grid container className="qtyButtons">
          <Grid item xs={12} md={3}>
            <Button
            onClick = {()=> handleDecrease({product_id : params.row.SKU,quantity : params.row.qty})}
            variant="outlined" size="small">
              -
            </Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="button">{params.formattedValue}</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button 
            onClick = {()=> handleIncrease({product_id : params.row.SKU,quantity : params.row.qty})}
            
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
      width: 120,
    },
    {
      field: "action",
      renderHeader: () => <strong>{"Remove"}</strong>,
      headerName: "Actions",
      width: 70,
      renderCell: (params) => 
      <div className="categoryImage" >
        <IconButton onClick={() => { console.log(params.formattedValue); removeItemFromCart({SKU : params.formattedValue}).then((res)=>{
           setRow(row.filter((set)=>{
            return  set.action !== params.formattedValue  ;
          }))
         dispatch({type : Notify,payload : {
            open : true,
            variant : 'warning',
            message : 'Item Removed !!!'
          }})
        }) }} aria-label="delete"  >
          <DeleteIcon />
        </IconButton>
        
      </div>,
    }

  ];


  // data grid view
  function DataGridView() {
    return (
      <div style={{ height: "400px", width: "100%" }}>
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={3}
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
                <Grid item xs={12}>
                  <br></br>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={12} className="subTotal">
                  <Typography variant="body2">Subtotal</Typography>
                  <Typography variant="body2">{data.total}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider></Divider>
                  <br></br>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="button">Shipping</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">Shipping Charges (0)</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    Shipping To Jaipur 302001, Rajasthan
                  </Typography>
                </Grid>
                <Grid item xs={12} className="address">
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
                    <Grid item xs={12}>
                      <Divider></Divider>
                      <br></br>
                    </Grid>
                    <Grid item xs={12} className="Total">
                      <Typography variant="body1">Total</Typography>
                      <Typography variant="body1">{data.total}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <br></br>
                      <Divider></Divider>
                      <br></br>
                    </Grid>
                    <Grid item xs={12}>
                      <Button onClick={() => {
                        props.history("/checkout")
                      }} sx={{ fontWeight: "500" }} variant="contained" fullWidth>
                        Proceed To CheckOut
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}></Grid>
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
