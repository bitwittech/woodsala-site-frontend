// css
import ".././asset/css/cart.css";
// react
import React from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Divider,
  MenuItem,
  InputAdornment,
} from "@mui/material";

// test image
import testImage from "../asset/images/cart/cartHead.png";

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
  const [country, setcountry] = React.useState("EUR");

  const handleChange = (event) => {
    setcountry(event.target.value);
  };

  const columns = [
    { field: "id", renderHeader: () => <strong>{"S.No"}</strong>, width: 50 },
    {
      field: "product",
      align: "center",
      width: 200,
      renderHeader: () => <strong>{"Product"}</strong>,
      renderCell: (params) => (
        <div>
          {params.formattedValue !== "undefined" ? (
            <img className="productImage" src={testImage} alt="category" />
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
            <Button variant="outlined" size="small">
              -
            </Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="button">0</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button variant="outlined" size="small">
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
  ];

  const rows = [
    { id: 1, product_name: "Snow", price: 10000, qty: 0, total: 10000 },
    { id: 2, product_name: "Lannister", price: 10000, qty: 0, total: 10000 },
    { id: 3, product_name: "Lannister", price: 10000, qty: 0, total: 10000 },
    { id: 4, product_name: "Stark", price: 10000, qty: 0, total: 10000 },
    { id: 5, product_name: "Targaryen", price: 10000, qty: 0, total: 10000 },
    { id: 6, product_name: "Melisandre", price: 10000, qty: 0, total: 100000 },
    { id: 7, product_name: "Clifford", price: 10000, qty: 0, total: 10000 },
    { id: 8, product_name: "Frances", price: 10000, qty: 0, total: 10000 },
    { id: 9, product_name: "Roxie", price: 10000, qty: 0, total: 10000 },
  ];

  function DataGridView() {
    return (
      <div style={{ height: "400px", width: "100%" }}>
        <DataGrid
          rows={rows}
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
                  <Typography variant="body2">100000</Typography>
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
                          small = "true"
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
                      <Typography variant="body1">100000</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <br></br>
                      <Divider></Divider>
                      <br></br>
                    </Grid>
                    <Grid item xs={12}>
                      <Button onClick = {()=>{
                        props.history("/checkout")
                      }}  sx = {{fontWeight : "500"}} variant="contained" fullWidth>
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
