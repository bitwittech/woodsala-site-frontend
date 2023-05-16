/* eslint-disable react/prop-types */
import React, { useMemo, useState } from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import { Helmet } from "react-helmet";
// store
import { useSelector, useDispatch } from "react-redux";
import { setAlert, addItem, removeFromList } from "../../Redux/action/action";
// apis services
import {
  getWishedProduct,
  addCartItem,
  removeWshList,
} from "../../service/service";
import { LazyLoadImage } from "react-lazy-load-image-component";
import defaultIMG from "../../asset/images/defaultProduct.svg";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// css
import "../../asset/css/product.css";
// empty image
import wishlistImage from "../../asset/images/productPage/wishlist.gif";

export default function Wishlist(props) {
  const [items, setItems] = useState([]);
  const { wishlist, auth } = useSelector((state) => state);
  const history = props.history;
  const dispatch = useDispatch();

  useMemo(() => {
    fetchData();
  }, [wishlist.items]);

  async function fetchData() {
    if (wishlist.items.length > 0) {
      const response = await getWishedProduct(wishlist.items);
      console.log(response);
      if (response) return setItems(response.data);
      return setItems([]);
    }
  }

  async function moveToCart(item) {
    if (auth.isAuth) {
      // for front end
      dispatch(
        addItem({
          CID: auth.CID,
          product_id: item.SKU,
          quantity: 1,
        })
      );
      dispatch(removeFromList(item.SKU));

      // server DB
      await addCartItem({
        CID: auth.CID,
        product_id: item.SKU,
        quantity: 1,
      });
      await removeWshList({
        CID: auth.CID,
        product_id: item.SKU,
      });

      return dispatch(
        setAlert({
          variant: "success",
          message: "Hurry, Item moved to cart.",
          open: true,
        })
      );
    } else {
      dispatch(
        addItem({
          CID: auth.CID || "Not Logged In",
          product_id: item.SKU,
          quantity: 1,
        })
      );
      dispatch(removeFromList(item.SKU));
      return dispatch(
        setAlert({
          variant: "success",
          message: "Hurry, Item moved to cart.",
          open: true,
        })
      );
    }
  }

  // for No search result available
  function NoItemFound() {
    return (
      <>
        <Box p={3}>
          <center>
            <img width="30%" src={wishlistImage} alt="No More Products !!!" />
            <Typography variant="h4">Oops !!!</Typography>
            <Typography variant="h6">No product in wishlist. </Typography>
          </center>
        </Box>
      </>
    );
  }

  // main code down here
  return (
    <>
      {/* helmet tag  */}
      <Helmet>
        <title>Wishlist</title>
        <meta name="description" content="Woodsala cart and checkout page." />
      </Helmet>
      {/* helmet tag ends  */}

      {/* Banner */}
      <Grid container className="Banner">
        <Grid item xs={12}>
          <Typography variant="h1">Wishlist</Typography>
        </Grid>
      </Grid>
      {/* Banner Ends */}

      {/* {Main Section } */}

      <Grid container className="wishListContainer" p={3}>
        {items.length > 0 &&
          items.map((item, index) => {
            return (
              <Grid
                item
                key={index}
                className="productCard"
                xs={window.innerWidth <= "600" ? 12 : 5.5}
                sx={{
                  boxShadow: 2,
                  maxHeight: "100%",
                  mb: 3,
                  padding: "0.5% !important",
                }}
                md={2.32}
              >
                <Grid container className="innerProductWrap">
                  {item.discount_limit > 0 && (
                    <Grid className="discount" item xs={12}>
                      <Box>
                        <Typography variant="body" sx={{ fontWeight: "400" }}>
                          {item.discount_limit}% Off
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                  <Grid
                    className="imageLoader"
                    item
                    xs={12}
                    onClick={() =>
                      history(
                        `/details/${item.SKU}/${item.product_title}/${item.category_name}`
                      )
                    }
                  >
                    <LazyLoadImage
                      src={
                        item.featured_image ||
                        item.product_image[0] ||
                        defaultIMG
                      }
                      PlaceholderSrc={defaultIMG}
                      effect="blur"
                      alt={item.product_title}
                    />
                    {/* {() ? <img src={item.featured_image || item.product_image[0] || defaultIMG} alt="product_Images" /> : <CircularProgress/> } */}
                  </Grid>
                  <Grid
                    item
                    xs={8.8}
                    onClick={() =>
                      history(
                        `/details/${item.SKU}/${item.product_title}/${item.category_name}`
                      )
                    }
                  >
                    <Box className="productInfo">
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: "bolder" }}
                        className="title"
                      >
                        {item.product_title}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    onClick={() =>
                      history(
                        `/details/${item.SKU}/${item.product_title}/${item.category_name}`
                      )
                    }
                    item
                    xs={12}
                  >
                    <Box className="productInfo">
                      <Typography
                        sx={{ mt: 0.5, mb: 1 }}
                        className="title"
                        variant="body1"
                      >
                        {item.product_description}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        sx={{ fontWeight: "bolder" }}
                        variant="h5"
                      >
                        {" "}
                        {(
                          item.selling_price -
                          (item.selling_price / 100) * item.discount_limit
                        ).toLocaleString("us-Rs", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} p={1}>
                    <Button
                      color="primary"
                      onClick={() => moveToCart(item)}
                      startIcon={<ShoppingBagIcon />}
                      fullWidth
                      variant="outlined"
                    >
                      Move To Cart
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
      </Grid>

      {items.length === 0 && (
        <center>
          <NoItemFound />
        </center>
      )}

      {/* {Main Section ends } */}
    </>
  );
}
