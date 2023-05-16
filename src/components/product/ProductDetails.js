/* eslint-disable react/prop-types */
// Old Page ==============

import React, { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import defaultIMG from "../../asset/images/defaultProduct.svg";
import Review from "../user/Review";
import amazon from "../../asset/images/productPage/amazon.png";
import flipkart from "../../asset/images/productPage/flipkart.png";
import jioMart from "../../asset/images/productPage/JioMart.png";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
// css
import "../../asset/css/productDetails.css";

// mui
import {
  Grid,
  Button,
  Typography,
  Rating,
  Box,
  Divider,
  CircularProgress,
  TextField,
  InputAdornment,
  Stack,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Breadcrumbs,
  IconButton,
  Link as A,
} from "@mui/material";
import { Helmet } from "react-helmet";

// APis function
import {
  getProductDetails,
  addCartItem,
  getRelatedProduct,
  removeWshList,
  addWshList,
  fetchVariants,
} from "../../service/service";
// import defaultIMG from "../../asset/images/defaultProduct.svg";

// redux
import { useDispatch, useSelector } from "react-redux";
// action
import {
  addItem,
  removeItem,
  setAlert,
  addToList,
  removeFromList,
} from "../../Redux/action/action";

export default function ProductDetails(props) {
  // state Redux
  const state = useSelector((state) => state);

  // redux
  const dispatch = useDispatch();

  // state
  const [imageIndex, setIndex] = useState(0); // use for updating the images
  const [ratting, setRatting] = useState(2);
  const [ACIN, setACIN] = useState([]);
  // const [expanded, setExpanded] = useState("panel1");

  // useParams search parameters
  const { SKU, title, category } = useParams();

  // state for data
  const [data, setData] = useState(null);
  const [review, setReview] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // for getting the product
  useEffect(() => {
    setData(null);
    setRelatedProducts([]);
    getData();
  }, [SKU, title, category]);

  async function getData(filters) {
    try {
      const productDetails = await getProductDetails(SKU);

      console.log(productDetails);

      // main product
      setData(productDetails.data.product);
      // CT section reviews
      setReview(productDetails.data.reviews);
      // for fetching the Variation
      setACIN(productDetails.data.product.ACIN);

      const related = await getRelatedProduct({
        product_title: title,
        category_name: category || productDetails.data.data.category_name,
      });

      setRelatedProducts(related.data);
    } catch (err) {
      console.log(err);
      dispatch(
        setAlert({
          variant: "error",
          message: "Something went wrong !!!",
          open: true,
        })
      );
    }
  }

  const responsive = {
    midDesktop: {
      breakpoint: { max: 3000, min: 1900 },
      items: 7,
    },
    minDesktop: {
      breakpoint: { max: 1900, min: 1000 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 800, min: 500 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 400, min: 0 },
      items: 1,
    },
  };

  // function for adding the item into the wishlist
  async function addToWish(item) {
    // server side
    if (state.auth.isAuth) {
      const response = await addWshList({
        CID: state.auth.CID,
        product_id: item.SKU,
        quantity: 1,
      });

      if (response) {
        // for client side
        dispatch(
          addToList({
            CID: state.auth.CID || "Not Logged In",
            product_id: item.SKU,
            quantity: 1,
          })
        );
        return dispatch(
          setAlert({
            variant: "success",
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
      dispatch(
        addToList({
          CID: state.auth.CID || "Not Logged In",
          product_id: item.SKU,
          quantity: 1,
        })
      );
      return dispatch(
        setAlert({
          variant: "success",
          message: "Item added to the wishlist !!!",
          open: true,
        })
      );
    }
  }

  // removeItemFromCart
  async function removeFromWishlist(item) {
    // server side
    if (state.auth.isAuth) {
      await removeWshList({
        CID: state.auth.CID,
        product_id: item.SKU,
      })
        .then((response) => {
          // for client side
          dispatch(removeFromList(item.SKU));

          return dispatch(
            setAlert({
              variant: "warning",
              message: response.data.message,
              open: true,
            })
          );
        })
        .catch(() => {
          return dispatch(
            setAlert({
              variant: "error",
              message: "Something Went Wrong !!!",
              open: true,
            })
          );
        });
    } else {
      // for client side
      dispatch(removeFromList(item.SKU));

      return dispatch(
        setAlert({
          variant: "warning",
          message: "Item removed from wishlist !!!",
          open: true,
        })
      );
    }
  }

  // function for adding the product to cart
  const addToCart = async () => {
    // server side
    if (state.auth.isAuth) {
      await addCartItem({
        CID: state.auth.CID,
        product_id: data.SKU,
        quantity: data.qty || 1,
      })
        .then((response) => {
          // for client side
          dispatch(removeItem(data.SKU));

          dispatch(
            addItem({
              product_id: data.SKU,
              quantity: data.qty || 1,
              CID: state.auth.CID,
            })
          );

          return dispatch(
            setAlert({
              variant: "success",
              message: response.data.message,
              open: true,
            })
          );
        })
        .catch(() => {
          return dispatch(
            setAlert({
              variant: "error",
              message: "Something Went Wrong !!!",
              open: true,
            })
          );
        });
    } else {
      // for client side
      dispatch(removeItem(data.SKU));

      dispatch(
        addItem({
          product_id: data.SKU,
          quantity: data.qty || 1,
          CID: "Not Logged In",
        })
      );

      return dispatch(
        setAlert({
          variant: "success",
          message: "Item added to the cart !!!",
          open: true,
        })
      );
    }
  };

  const [showSticky, setShowSticky] = useState(false);

  useMemo(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [window.scrollY]);

  function handleScroll() {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll >= 350 && winScroll < 1200) setShowSticky(true);
    else setShowSticky(false);
  }

  return (
    <>
      {/* helmet tag  */}
      <Helmet>
        <title>{`Product || ${title}`}</title>
        <meta
          name="description"
          content="This page contains product details. And all the information about the particular product"
        />
      </Helmet>
      {/* helmet tag ends  */}
      {data ? (
        <>
          {/* main section  */}
          <Grid container className="mainSec">
            {/* Image sec */}
            <Grid item className="imageSec" xs={12} md={6}>
              <Grid container>
                <Grid
                  item
                  xs={8}
                  sx={{
                    margin: "auto",
                  }}
                >
                  <img
                    className="showImage"
                    src={data.product_image[imageIndex] || defaultIMG}
                    alt="image2"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container className="preview" spacing={2}>
                    {data.product_image.length > 0 &&
                      data.product_image.map((item, index) => {
                        return (
                          <Grid
                            item
                            xs={2}
                            key={index}
                            onClick={() => {
                              setIndex(index);
                            }}
                          >
                            <img
                              src={item}
                              className="showImage"
                              alt="images"
                            />
                          </Grid>
                        );
                      })}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* Image sec ends */}
            {/* details sec  */}
            <Grid item xs={12} className="contentSec" md={6}>
              <Grid container>
                {/* Top Bar things like price and rating in it  */}
                <Grid item xs={12}>
                  {/* // link  */}
                  <Breadcrumbs className="bradCrumbs" aria-label="breadcrumb">
                    <Link color="primary" to="/">
                      Home
                    </Link>
                    <Link color="primary" to="/collection">
                      Collection
                    </Link>
                    {/* <Link color="primary" to="/product">
                      Product
                    </Link> */}
                    {data.category_name && (
                      <Typography color="text.primary">
                        {data.category_name}
                      </Typography>
                    )}
                    {data.sub_category_name !== "None" &&
                      data.sub_category_name && (
                        <Typography color="text.primary">
                          {data.sub_category_name}
                        </Typography>
                      )}
                  </Breadcrumbs>
                  {/* product title */}
                  <Typography sx={{ fontWeight: 350 }} variant="h4">
                    {data.product_title}
                  </Typography>
                  {/* SKU */}
                  <Typography variant="h5">{data.SKU}</Typography>
                  {/* ratting  */}
                  <Box className="ratting">
                    <Rating
                      readOnly
                      name="simple-controlled"
                      value={ratting}
                      onChange={(event, newValue) => {
                        setRatting(newValue);
                      }}
                    />
                    {/* // wishlist */}
                    {/* <Box className="wishlist">
                      <FavoriteBorderIcon />
                      <Typography variant="h6">Add To Wishlist</Typography>
                    </Box> */}
                  </Box>
                  {/* Price */}
                  <Box className="priceSec">
                    {data.discount_limit !== 0 &&
                      data.categories.discount_limit !== 0 && (
                        <Typography variant="h6">
                          <strike>
                            {data.selling_price
                              ? data.selling_price.toLocaleString("us-Rs", {
                                  style: "currency",
                                  currency: "INR",
                                })
                              : (0).toLocaleString("us-Rs", {
                                  style: "currency",
                                  currency: "INR",
                                })}
                          </strike>
                        </Typography>
                      )}
                    <Typography variant="h5" sx={{ fontWeight: "bolder" }}>
                      <Price item={data} />
                    </Typography>
                    {/* <Typography sx={{ color: "#FD0606" }} variant="h6"> */}
                    {/* discount */}
                    {/* {data.discount_limit > 0 && `${data.discount_limit}% Off`} */}
                    {/* </Typography> */}
                  </Box>
                </Grid>
                {/* More Details */}
                <Grid className="pd" item xs={12}>
                  {/* Specifications */}
                  <Typography sx={{ fontWeight: 400 }} variant="h6">
                    Specifications
                  </Typography>
                  <Divider />
                  <Stack sx={{ paddingTop: "2%" }}>
                    <Typography variant="body1">
                      Size (Inch)
                      <Typography sx={{ float: "right" }} variant="body1">
                        {data.length_main} L x {data.height} H x {data.breadth}{" "}
                        B
                      </Typography>
                    </Typography>
                    <Typography variant="body1">
                      Material
                      <Typography sx={{ float: "right" }} variant="body1">
                        {data.primary_material.join()}
                      </Typography>
                    </Typography>
                    <Typography variant="body1">
                      Polish
                      <Typography sx={{ float: "right" }} variant="body1">
                        {data.polish.join()}
                      </Typography>
                    </Typography>
                    <Typography variant="body1">
                      Quantity
                      <Typography sx={{ float: "right" }} variant="body1">
                        {data.quantity} {data.unit}
                      </Typography>
                    </Typography>
                    <Typography variant="body1">
                      Ship By
                      <Typography sx={{ float: "right" }} variant="body1">
                        {data.manufacturing_time + data.polish_time} Days
                      </Typography>
                    </Typography>
                    {/* <Typography variant="body1">
                      Manufacturing Time<Typography sx={{ float: "right" }} variant="body1">{data.manufacturing_time}</Typography>
                    </Typography>
                    <Typography variant="body1">
                      Polish Time<Typography sx={{ float: "right" }} variant="body1">{data.polish_time}</Typography>
                    </Typography> */}
                    {/* <Typography variant="body1">
                      Range<Typography sx={{ float: "right" }} variant="body1">{data.range}</Typography>
                    </Typography> */}
                  </Stack>
                  {/* Specifications */}
                  {/* About This Item  */}
                  {data.selling_points.length > 0 && data.selling_points && (
                    <>
                      <Typography mt={1} sx={{ fontWeight: 400 }} variant="h6">
                        About This Item
                      </Typography>
                      <Divider />
                      <Stack sx={{ paddingTop: "2%", paddingLeft: "1%" }}>
                        {data.selling_points.map((point, index) => (
                          <Typography
                            component={"li"}
                            sx={{ fontWeight: 400 }}
                            key={index}
                            variant="body2"
                          >
                            {point}
                          </Typography>
                        ))}
                      </Stack>
                    </>
                  )}
                  {/* Reason To buy Ends */}

                  {/* Polish */}
                  {/* <Typography sx={{ mt: 2, fontWeight: 400 }} variant="h6">
                    Polish
                  </Typography>
                  <Divider />
                  <TextField
                    sx={{ mt: 2 }}
                    size="small"
                    fullWidth
                    // required
                    id="outlined-select"
                    select
                    name="category_name"
                    label="Polish"
                    // value={changeData.category_name || ''}
                    multiple
                    // onChange={handleProductFelids}
                    helperText="Please select your polish preference."
                  >
                    {(data.polish && typeof (data.polish) === 'Array') && data.polish.map(
                      (option) =>
                        <MenuItem
                          key={option}
                          value={option}
                        >
                          {option}
                        </MenuItem>
                    )}
                    <MenuItem key={"none"} value="None">
                      {"None"}
                    </MenuItem>
                  </TextField> */}
                  {/* Variants  */}
                  <Variant ACIN={ACIN} SKU={SKU} />
                  {/* Variants ends  */}

                  {/* <Typography sx={{ fontWeight: 400, mt: 1 }} variant="h6">
                    Price Details
                  </Typography>
                  <Divider />
                  <Stack sx={{ paddingTop: "2%" }}>
                    <Typography variant="body1">
                      Selling Price
                      <Typography sx={{ float: "right" }} variant="body1">{data.selling_price ? (data.selling_price).toLocaleString('us-Rs', { style: 'currency', currency: 'INR' }) : 0}</Typography>
                    </Typography>
                    <Typography variant="body1">
                      Showroom Price<Typography sx={{ float: "right" }} variant="body1">{data.showroom_price ? (data.showroom_price).toLocaleString('us-Rs', { style: 'currency', currency: 'INR' }) : 0}</Typography>
                    </Typography>
                    <Typography variant="body1">
                      Discount <Typography sx={{ float: "right" }} variant="body1">{data.discount_limit}%</Typography>
                    </Typography>
                    <Typography variant="body1">
                      Tax <Typography sx={{ float: "right" }} variant="body1">{data.tax_rate}%</Typography>
                    </Typography>
                    <Typography variant="body1">
                      MRP <Typography sx={{ float: "right" }} variant="body1">{(data.selling_price && data.discount_limit) && ((data.selling_price) - (data.selling_price / 100 * data.discount_limit)).toLocaleString('us-Rs', { style: 'currency', currency: 'INR' })}</Typography>
                    </Typography>
                  </Stack> */}
                  {/* <Typography sx={{ fontWeight: 400, mt: 1 }} variant="h6">
                    Dimension Details
                  </Typography>
                  <Divider />
                  <Stack sx={{ paddingTop: "2%" }}>
                    <Typography variant="body1">
                      Dimensions (Inch)
                      <Typography sx={{ float: "right" }} variant="body1">{data.length_main} L x {data.height} H x {data.breadth} B</Typography>
                    </Typography>
                    <Typography variant="body1">
                      Package Length (Inch)<Typography sx={{ float: "right" }} variant="body1">{data.package_length}</Typography>
                    </Typography>
                    <Typography variant="body1">
                      Package Height (Inch)<Typography sx={{ float: "right" }} variant="body1">{data.package_height}</Typography>
                    </Typography>
                    <Typography variant="body1">
                      Package Breadth (Inch)<Typography sx={{ float: "right" }} variant="body1">{data.package_breadth}</Typography>
                    </Typography>
                  </Stack> */}
                  {/* // Buttons  */}
                  <Box className="cartButtons">
                    <TextField
                      size="small"
                      fullWidth
                      sx={{ width: "20%" }}
                      id="standard-multiline-static"
                      label="Quantity"
                      type="number"
                      variant="outlined"
                      value={data.qty || 1}
                      onChange={(e) =>
                        setData({
                          ...data,
                          qty: e.target.value > 0 ? e.target.value : 1,
                        })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">QTY</InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      fullWidth
                      size={"large"}
                      variant="outlined"
                      onClick={() => addToCart(data)}
                    >
                      Add To Cart
                    </Button>
                    <Button
                      fullWidth
                      size={"large"}
                      variant="contained"
                      onClick={() => {
                        addToCart(data);
                        window.location.href = "/cart";
                      }}
                    >
                      Buy Now
                    </Button>
                  </Box>
                  {/* // Buttons ends  */}

                  {/* Affiliate Vendors */}
                  {(data.amazon_url ||
                    data.amazon_url !== "" ||
                    data.flipkart_url ||
                    data.flipkart_url !== "" ||
                    data.jiomart_url ||
                    data.jiomart_url !== "") && (
                    <>
                      {" "}
                      <Typography sx={{ mt: 2, fontWeight: 400 }} variant="h6">
                        Also Shop From
                      </Typography>
                      <Divider />
                      <Stack className="shopFrom">
                        {(data.amazon_url || data.amazon_url !== "") && (
                          <A href={data.amazon_url} target="_blank" rel="add">
                            <img
                              className="vendorIcon"
                              src={amazon}
                              alt="amazon_icon"
                            />
                          </A>
                        )}
                        {(data.flipkart_url || data.flipkart_url !== "") && (
                          <A href={data.flipkart_url} target="_blank" rel="add">
                            {" "}
                            <img
                              className="vendorIcon"
                              src={flipkart}
                              alt="flipkart_icon"
                            />
                          </A>
                        )}
                        Please
                        {(data.jiomart_url || data.jiomart_url !== "") && (
                          <A href={data.jiomart_url} target="_blank" rel="add">
                            {" "}
                            <img
                              className="vendorIcon"
                              src={jioMart}
                              alt="jio_icon"
                            />
                          </A>
                        )}
                      </Stack>
                    </>
                  )}
                  {/* Affiliate Vendors Ends */}
                </Grid>
                {/* More Details ends */}
              </Grid>
            </Grid>
            {/* details sec ends */}
          </Grid>
          {/* main section Ends */}
        </>
      ) : (
        <Box sx={{ display: "block", margin: "auto", width: "max-content" }}>
          <CircularProgress />
        </Box>
      )}
      {/* More Information ends */}

      {/* Related Products */}

      <Grid container className="moreInfo">
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: 500 }} variant="h5">
            Related Products
          </Typography>
        </Grid>
        <Grid item xs={12} mt={1}>
          <Carousel
            dotListClass="custom-dot-list-style"
            keyBoardControl={true}
            autoPlaySpeed={1000}
            ssr={true}
            className="detailsCarousel"
            responsive={responsive}
          >
            {relatedProducts.map((article, index) => {
              return (
                article.SKU !== data.SKU && (
                  <Card
                    component={Link}
                    to={`/details/${article.SKU}/${article.product_title}/${article.category_name}`}
                    className="card"
                    key={index}
                    sx={{ boxShadow: 2 }}
                  >
                    <CardActionArea>
                      <CardMedia
                        className="cardMedia"
                        component="img"
                        height="200"
                        image={article.product_image[0] || defaultIMG}
                        alt="Product_image"
                      />
                      <CardContent>
                        <Typography
                          className="productTitle"
                          // sx={{ fontWeight: "bolder" }}
                          variant="h6"
                          component="div"
                        >
                          {article.product_title}
                        </Typography>
                        <Typography
                          sx={{ mt: 1 }}
                          className="productTitle"
                          variant="body2"
                          component="div"
                        >
                          {article.product_description}
                        </Typography>
                        {/* <Typography sx={{ mt: 1 }} variant="body1">
                        ({article.discount_limit}% OFF)
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        <del>
                          {article.selling_price
                            ? article.selling_price.toLocaleString("us-Rs", {
                                style: "currency",
                                currency: "INR",
                              })
                            : "0".toLocaleString("us-Rs", {
                                style: "currency",
                                currency: "INR",
                              })}
                        </del>
                      </Typography> */}
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold" }}
                          color="text.secondary"
                        >
                          {article.selling_price &&
                            (
                              article.selling_price -
                              (article.selling_price / 100) *
                                article.discount_limit
                            ).toLocaleString("us-Rs", {
                              style: "currency",
                              currency: "INR",
                            })}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                )
              );
            })}
          </Carousel>
        </Grid>
      </Grid>

      {/* Related Products Ends */}

      {/* Review Section */}
      <Review product_id={SKU} />
      {/* Review Section EnDs */}

      {/* Sticky Add to Cart */}
      {data && (
        <Box
          className="stickCart"
          sx={{
            bottom: showSticky ? "0% !important" : "-20% !important",
          }}
        >
          <Box sx={{ width: "50px" }}>
            <img
              style={{ width: "100%" }}
              alt={"product_image"}
              src={data.product_image[0] || defaultIMG}
            ></img>
          </Box>
          {/* <Typography variant="h6">{data.product_title}</Typography> */}
          <TextField
            size="small"
            sx={{ flexBasis: "1" }}
            id="standard-multiline-static"
            label="Quantity"
            type="number"
            variant="outlined"
            value={data.qty || 1}
            onChange={(e) =>
              setData({ ...data, qty: e.target.value > 0 ? e.target.value : 1 })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">QTY</InputAdornment>
              ),
            }}
          />
          <Button
            size={"small"}
            variant="contained"
            onClick={() => addToCart(data)}
          >
            Add To Cart
          </Button>
          {/* // WISHLIST */}
          {state.wishlist.items.filter((row) => {
            return row.product_id === data.SKU;
          }).length > 0 ? (
            <IconButton
              color="primary"
              onClick={() => removeFromWishlist(data)}
            >
              <FavoriteIcon sx={{ fontSize: 25 }} />
            </IconButton>
          ) : (
            <IconButton color="primary" onClick={() => addToWish(data)}>
              <FavoriteBorderOutlinedIcon sx={{ fontSize: 25 }} />
            </IconButton>
          )}
        </Box>
      )}
      {/* Sticky Add to Cart ends */}

      {/* Let Customer Speaks For Us */}
      {review && <CustomerTestimonials review={review} />}
      {/* Let Customer Speaks For Us ends */}
    </>
  );
}

function Price({ item }) {
  const [value, setValue] = useState(0);

  function setPrice() {
    if (item.categories.length > 0) {
      if (
        item.categories[0].discount_limit &&
        item.categories[0].discount_limit > 0 &&
        item.categories[0].discount_limit < item.discount_limit
      )
        // checking every possible value
        return setValue(
          item.selling_price -
            (item.selling_price / 100) * item.categories[0].discount_limit
        );
      else
        return setValue(
          item.selling_price - (item.selling_price / 100) * item.discount_limit
        );
    }
  }

  useEffect(() => {
    setPrice();
  }, [item]);

  return (
    <>
      {value.toLocaleString("us-Rs", {
        style: "currency",
        currency: "INR",
      })}
    </>
  );
}

function Variant({ ACIN, SKU }) {
  const [variant, setVariant] = useState({
    size: [],
    range: [],
    material: [],
    fabric: [],
    fitting: [],
    mattress: [],
  });

  useMemo(() => {
    getVariants();
  }, [ACIN]);

  async function getVariants() {
    try {
      const res = await fetchVariants(ACIN);

      // console.log(res.data);
      if (res.status === 200) setVariant({ ...res.data });
      // setVariant(null)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {variant.show && (
        <>
          <Typography sx={{ mt: 2, fontWeight: 400 }} variant="h6">
            Variants
          </Typography>
          <Divider />
          <Box className="variants" mt={2}>
            {variant.variants.length > 0 &&
              variant.variants.map((s, i) => (
                <Box
                  key={i}
                  component={Link}
                  to={`/details/${s.SKU}/${s.title}/${s.category}`}
                  className={SKU === s.SKU ? "size borderSize" : "size"}
                >
                  <img
                    src={s.product_image[0] || defaultIMG}
                    alt="variant_image"
                  />
                  <Typography
                    size={"small"}
                    // variant={SKU === s.SKU ? "contained" : "outlined"}
                    className={
                      SKU === s.SKU ? "variant_label bold" : "variant_label"
                    }
                    variant="caption"
                  >
                    {s.product_title}
                  </Typography>
                </Box>
              ))}
          </Box>
        </>
      )}
    </>
  );
}

function CustomerTestimonials({ review }) {
  const responsiveTC = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 800, min: 600 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 2,
    },
  };
  return (
    <Box className="mainSec">
      <Box className="CTcontainer">
        <Typography sx={{ fontWeight: 500 }} variant="h5">
          Let our customer speaks for us
        </Typography>
        <br />
        <Carousel keyBoardControl={true} ssr={true} responsive={responsiveTC}>
          {review.map((row, i) => (
            <Box
              key={i}
              className="reviewCard"
              component={Link}
              to={`/details/${row.product_id}/${row.product[0].product_title}/${row.product[0].category_name}`}
              p={1}
            >
              <Rating name="read-only" value={row.rating} readOnly />
              <Typography variant="h6">{row.review_title}</Typography>
              <Typography variant="body1">{row.review}</Typography>
              <Typography variant="body2">{row.reviewer_name}</Typography>
              <Box className="reviewProductImage">
                <img
                  src={row.product[0].product_image[0] || defaultIMG}
                  alt={i}
                />
              </Box>
              <Typography variant="body1">
                {row.product[0].product_title}
              </Typography>
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
}

// {
//   "_id": "641b1cebfdc09dc44268940c",
//   "product_id": "P-01071",
//   "rating": "3",
//   "review_title": "undefined",
//   "reviewer_name": "undefined",
//   "reviews": [
//       {
//           "_id": "63ed05b9fde75826ee917706",
//           "product_title": "(Set of 2) Classic Wave Style Chair",
//           "product_image": []
//       }
//   ]
// },

// function for variant section
//  function Variant({ACIN,SKU}) {

//   const [variant, setVariant] = useState({ size: [],
//     range: [],
//     material: [],
//     fabric: [],
//     fitting : [],
//     mattress : []});

//   useMemo(()=>{
//     getVariants()
//   },[ACIN])

//   async function getVariants (){
//     try {

//       let res = await fetchVariants(ACIN);

//       console.log(res.data)
//       if(res.status === 200)
//       setVariant({...res.data})
//       // setVariant(null)

//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <>
//      {variant.show &&
//      <>
//      <Typography sx={{ mt: 2, fontWeight: 400 }} variant="h6">
//         Variants
//       </Typography>
//       <Divider />
//       <Box className="Variants" mt={2}>
//         {/* // size   */}
//         {variant.size.length > 0 && (
//           <Typography variant="button">Dimension</Typography>
//         )}
//         {variant.size.length > 0 && (
//           <Box className="size">
//             {variant.size.map((s) => (
//               <Button
//                 component={Link}
//                 to={`/details/${s.SKU}/${s.title}/${s.category}`}
//                 size={"small"}
//                 variant={SKU === s.SKU ? "contained" : "outlined"}
//               >
//                 {s.size}
//               </Button>
//             ))}
//           </Box>
//         )}

//         {/* material  */}
//         {variant.material.length > 0 && (
//           <Typography variant="button">Material</Typography>
//         )}
//         {variant.material.length > 0 && (
//           <Box className="size materialBox">
//             {variant.material.map((s) => (
//               <Button
//                 component={Link}
//                 to={`/details/${s.SKU}/${s.title}/${s.category}`}
//                 size={"small"}
//                 variant={SKU === s.SKU ? "contained" : "outlined"}
//                 className="item"
//               >
//                 {s.material}
//               </Button>
//             ))}
//           </Box>
//         )}

//         {/* range
//         {variant.range.length > 0 && (
//           <Typography variant="button">Range</Typography>
//         )}
//         {variant.range.length > 0 && (
//           <Box className=" size rang">
//             {variant.range.map((s) => (
//               <Button
//                 component={Link}
//                 to={`/details/${s.SKU}/${s.title}/${s.category}`}
//                 size={"small"}
//                 variant={SKU === s.SKU ? "contained" : "outlined"}
//               >
//                 {s.range}
//               </Button>
//             ))}
//           </Box>
//         )} */}
//         {/* fabric */}
//         {variant.fabric.length > 0 && (
//           <Typography variant="button">Range</Typography>
//         )}
//         {variant.fabric.length > 0 && (
//           <Box className=" size rang">
//             {variant.fabric.map((s) => (
//               <Button
//                 component={Link}
//                 to={`/details/${s.SKU}/${s.title}/${s.category}`}
//                 size={"small"}
//                 variant={SKU === s.SKU ? "contained" : "outlined"}
//               >
//                 {s.fabric}
//               </Button>
//             ))}
//           </Box>
//         )}
//         {/* Fitting */}
//         {variant.fitting.length > 0 && (
//           <Typography variant="button">Fitting</Typography>
//         )}
//         {variant.fitting.length > 0 && (
//           <Box className=" size rang">
//             {variant.fitting.map((s) => (
//               <Button
//                 component={Link}
//                 to={`/details/${s.SKU}/${s.title}/${s.category}`}
//                 size={"small"}
//                 variant={SKU === s.SKU ? "contained" : "outlined"}
//               >
//                 {s.fitting}
//               </Button>
//             ))}
//           </Box>
//         )}
//         {/* mattress */}
//         {variant.fitting.length > 0 && (
//           <Typography variant="button">Mattress</Typography>
//         )}
//         {variant.mattress.length > 0 && (
//           <Box className=" size rang">
//             {variant.mattress.map((s) => (
//               <Button
//               component={Link}
//               to={`/details/${s.SKU}/${s.title}/${s.category}`}
//               size={"small"}
//               variant={SKU === s.SKU ? "contained" : "outlined"}
//               >
//                 {s.mattress}
//               </Button>
//             ))}
//           </Box>
//         )}
//       </Box>
//       </>
//       }
//     </>
//   );
// }

// {/* // ======================== Not is use for now */}
//         {/* More Information */}

//         {/* <Grid container className="moreInfo" >
//           <Grid item xs={12}>
//             <Typography sx={{ fontWeight: 500 }} variant="h5">
//               MORE INFORMATION
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Typography sx={{ fontWeight: 100, padding: "1% 0%" }} component='span' variant="body1">
//               Explore full product details here !!!
//             </Typography>
//           </Grid>

//           <Grid item xs={12}>
//             <Box sx={{ width: '100%' }}>
//               <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                 <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
//                   <Tab label="Specification" {...a11yProps(0)} />
//                   <Tab label="Image" {...a11yProps(1)} />
//                   <Tab label="Features" {...a11yProps(2)} />
//                   <Tab label="Miscellaneous" {...a11yProps(3)} />
//                   <Tab label="Inventory & Shipping" {...a11yProps(4)} />
//                   <Tab label="SEO" {...a11yProps(5)} />
//                   <Tab label="Extra Details" {...a11yProps(6)} />
//                 </Tabs>
//               </Box>
//               <TabPanel value={value} index={0}>
//                 <Stack sx={{ padding: "5%", paddingTop: '1%' }}>
//                   {specification.map((item) => {
//                     return <>
//                       <Typography variant="body1">
//                         {item}<Typography sx={{ float: "right" }} variant="body1">{data[item]}</Typography>
//                       </Typography>
//                       <Divider />
//                     </>
//                   })}
//                 </Stack>
//               </TabPanel>
//               <TabPanel value={value} index={1}>
//                 <Stack sx={{ padding: "5%", paddingTop: '1%' }}>
//                   {image.map((item) => {
//                     return <>
//                       <Typography variant="h6">
//                         {item.toUpperCase()}<img src={data[item]} sx={{ float: "right" }} />
//                       </Typography>
//                       <Divider sx={{ mb: 2 }} />
//                     </>
//                   })}
//                 </Stack>
//               </TabPanel>
//               <TabPanel value={value} index={2}>
//                 <Stack sx={{ padding: "5%", paddingTop: '1%' }}>
//                   {feature.map((item) => {
//                     return <>
//                       <Typography variant="body1">
//                         {item}<Typography sx={{ float: "right", color: data[item] ? 'green' : 'red' }}
//                           variant="body1">{data[item] ? 'true' : 'false'}</Typography>
//                       </Typography>
//                       <Divider />
//                     </>
//                   })}
//                 </Stack>
//               </TabPanel>
//               <TabPanel value={value} index={3}>
//                 <Stack sx={{ padding: "5%", paddingTop: '1%' }}>
//                   {miscellanous.map((item) => {
//                     return <>
//                       <Typography variant="body1">
//                         {item}<Typography sx={{ float: "right" }}
//                           variant="body1">{data[item]}</Typography>
//                       </Typography>
//                       <Divider />
//                     </>
//                   })}
//                 </Stack>
//               </TabPanel>
//               <TabPanel value={value} index={4}>
//                 <Stack sx={{ padding: "5%", paddingTop: '1%' }}>
//                   {inventory.map((item) => {
//                     return <>
//                       <Typography variant="body1">
//                         {item}<Typography sx={{ float: "right" }}
//                           variant="body1">{data[item]}</Typography>
//                       </Typography>
//                       <Divider />
//                     </>
//                   })}
//                 </Stack>
//               </TabPanel>
//               <TabPanel value={value} index={5}>
//                 <Stack sx={{ padding: "5%", paddingTop: '1%' }}>
//                   {seo.map((item) => {
//                     return <>
//                       <Typography variant="body1">
//                         {item}<Typography sx={{ float: "right" }}
//                           variant="body1">{data[item]}</Typography>
//                       </Typography>
//                       <Divider />
//                     </>
//                   })}
//                 </Stack>
//               </TabPanel>
//               <TabPanel value={value} index={6}>
//                 <Stack sx={{ padding: "5%", paddingTop: '1%' }}>
//                   {extra.map((item) => {
//                     return <>
//                       <Typography variant="body1">
//                         {item}<Typography sx={{ float: "right" }}
//                           variant="body1">{data[item]}</Typography>
//                       </Typography>
//                       <Divider />
//                     </>
//                   })}
//                 </Stack>
//               </TabPanel>
//             </Box>
//           </Grid>

//         </Grid> */}

// const specification = [
//   'product_title',
//   'category_name',
//   'sub_category_name',
//   'primary_material',
//   'length_main',
//   'breadth',
//   'height',
//   'weight',
//   'polish_name',
//   'assembly_required',
//   'assembly_part',
//   'selling_price',
//   'showroom_price',
//   'discount_limit',
//   'show_on_mobile',
//   'range',
// ]

// const image = [
//   'featured_image',
//   'mannequin_image',
//   'specification_image',
// ]

// const feature = [
//   "rotating_seats",
//   "eatable_oil_polish",
//   "no_chemical",
//   "weaving",
//   "knife",
//   "not_suitable_for_Micro_Dish",
//   "tilt_top",
//   "inside_compartments",
//   "stackable",
//   "ceramic_drawers",
//   "ceramic_tiles",
// ]

// const miscellanous = [
//   "weight_capacity",
//   "joints",
//   "drawer",
//   "drawer_count",
//   "back_style",
// ]

// const inventory = [
//   'warehouse',
//   'bangalore_stock',
//   'jodhpur_stock',
//   'selling_points',
//   'polish_time',
//   'manufacturing_time',
//   'returnDays',
//   'COD',
//   'returnable',
//   'package_length',
//   'package_height',
//   'package_breadth',
//   'quantity',
//   'unit',
// ]

// const seo = [
//   'product_description',
//   'seo_title',
//   'seo_description',
//   'seo_keyword',
// ]

// const extra = [
//   'hinge_name',
//   'knob_name',
//   'textile_name',
//   'textile_type',
//   'door_name',
//   'fitting_name',
//   'top_size',
//   'dial_size',
//   'seating_size_width',
//   'seating_size_depth',
//   'seating_size_height',
//   'fabric',
//   'fabric_name',
//   'mirror',
//   'mirror_length',
//   'mirror_width',
//   'silver',
//   'silver_weight',
//   'wheel',
//   'trolley',
//   'trolley_material',
//   'tax_rate',
//   'legs'
// ]
