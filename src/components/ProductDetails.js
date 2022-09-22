import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Carousel from "react-multi-carousel";
import { useLocation } from "react-router-dom";
// demo images
import living from ".././asset/images/home/sofa_SBR.png";
import wfh from ".././asset/images/home/table_SBR.png";
import bedroom from ".././asset/images/home/bedroom_SBR.png";
import dining from ".././asset/images/home/dining_SBR.png";
import bed from ".././asset/images/home/bed_SBF.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// css
import "../asset/css/productDetails.css";

// mui
import {
  Grid,
  Button,
  Typography,
  Rating,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Stack,
  Tabs,
  Tab,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,


} from "@mui/material";

// APis function 
import { getProductDetails, addCartItem } from '../service/service'

// global state 
import {Store} from '../store/Context'
import {AddCartItem,Notify} from '../store/Types'


export default function ProductDetails() {

  // store 
  const {state,dispatch} = Store();

  // state
  const [imageIndex, setIndex] = useState(0); // use for updating the images
  const [ratting, setRatting] = useState(2);
  const [expanded, setExpanded] = useState("panel1");
  const [value, setValue] = useState(0);

  // get query parameter for product 😀 
  const search = useLocation().search;
  const SKU = new URLSearchParams(search).get('SKU');

  // state for data 
  const [data, setData] = useState(null)

  // for getting the product 
  useEffect(() => {
    getProductDetails(SKU)
      .then((response) => {
          setData(response.data)
      })
      .catch((err)=>{
        console.log(err)
      })

  }, []);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const sizeCart = [
    {
      name: "King Size",
      price: 44000,
    },
    {
      name: "Queen Size",
      price: 35000,
    },
    {
      name: "Kid Size",
      price: 20000,
    },
  ];


  let customer = [
    {
      image: living,
      review: "Great Product with minimal design.",
      name: "Yashwant Sahu",
    },
    {
      image: wfh,
      review: "Great Product with minimal design.",
      name: "Nilesh Prajapati",
    },
    {
      image: bedroom,
      review: "Great Product with minimal design.",
      name: "Rahul Raj",
    },
    {
      image: bed,
      review: "Great Product with minimal design.",
      name: "Yashwant Sahu",
    }
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 600 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  // function for adding the product to cart 
    const addToCart = async (item) => {
      let flag = false;
      const modifiedData = state.AddCartItem.items.map((set)=>{

        if(item.SKU === set.product_id) 
        {
          flag = true;
          return {
            CID : state.Auth.CID || 'Not Logged In',
            product_id : set.product_id,
            quantity : data.quantity
          }
        }
        else return set
    
      })

      if (flag === false) modifiedData.push({
            CID : state.Auth.CID || 'Not Logged In',
            product_id : item.SKU,
            quantity : data.quantity || 1
      })

      // server side 
      if (state.Auth.isAuth) {
        await addCartItem({
          CID: state.Auth.CID,
          product_id: item.SKU,
          quantity: data.quantity || 1,
        })
          .then((response) => {
            // for client side 
            dispatch(
              {
                type: AddCartItem,
                payload: {
                  items: [...modifiedData]}
              }
            )
            return dispatch({
              type: Notify,
              payload: {
                variant: 'success',
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
              items: [...modifiedData]}
          }
        )
        return dispatch({
          type: Notify,
          payload: {
            variant: 'success',
            message: 'Item added to the cart !!!',
            open: true
          }
        })
  
      }
    }


  return (
    <>
      <title>Product</title>
      {data && <>
      {/* main section  */}
      <Grid container className="mainSec">
        {/* Image sec */}
        <Grid item className="imageSec" xs={12} md={6}>
          <Grid container>
            <Grid item xs={12} sx = {{
              maxWidth : '400px' ,
              maxHeight : '450px'
            }}>
              <img
                className="showImage"
                src={data.product_image[imageIndex]}
                alt="image2"
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container className="preview" spacing={2}>
                {data.product_image.map((item, index) => {
                  return (
                    <Grid
                      item
                      xs={3}
                      key={index}
                      onClick={() => {
                        setIndex(index);
                      }}
                    >
                      <img src={item} className="showImage" alt="images" />
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
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: 350 }} variant="h4">
                {/* product title */}
                {data.product_title}
              </Typography>
              <Typography sx={{ color: "#FD0606" }} variant="h6">
                By Casa Craft
              </Typography>
              <Box className="ratting">
                <Rating
                  name="simple-controlled"
                  value={ratting}
                  onChange={(event, newValue) => {
                    setRatting(newValue);
                  }}
                />
                <Box className="wishlist">
                  <FavoriteBorderIcon />
                  <Typography variant="body2">Add To Wishlist</Typography>
                </Box>
              </Box>
              <Box className="priceSec">
                <Typography variant="h6">
                  {/* Price */}
                  Rs.{data.selling_price}
                </Typography>
                <Typography variant="body1">
                  {/* MRP */}
                  MRP : <del>{data.MRP}</del>
                </Typography>
                <Typography sx={{ color: "#FD0606" }} variant="h6">
                  {/* discount */}
                  {data.discount_limit}% Off
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className="coupon">
                <Typography sx={{ color: "#ad0000" }} variant="body2">
                  To get this price,
                  <span>
                    {" "}
                    USE CODE : <b>MOM</b>
                  </span>
                </Typography>
                <Typography variant="button">Offer Extended</Typography>
                <br></br>
                <Divider />
                <Typography variant="caption">
                  Shopping For First Time?
                </Typography>
                <Divider />
              </Box>
            </Grid>
            <Grid className="offers" item xs={12}>
              <Box>
                <Typography
                  sx={{ color: "#FD0606", fontWeight: 400 }}
                  variant="body2"
                >
                  Special Offers
                </Typography>
              </Box>

              <Box className="accordion">
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    className="summary"
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                    expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}
                  >
                    <Typography sx={{ fontWeight: 400 }} variant="body1">
                      Holi Offer
                      <Typography variant="caption">
                        {" "}
                        Apply Code HOLI30
                      </Typography>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                      blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  expanded={expanded === "panel2"}
                  onChange={handleChange("panel2")}
                >
                  <AccordionSummary
                    className="summary"
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                    expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}
                  >
                    <Typography sx={{ fontWeight: 400 }} variant="body1">
                      Diwali Offer
                      <Typography variant="caption">
                        {" "}
                        Apply Code DIW30
                      </Typography>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                      blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Typography sx={{ fontWeight: 400 }} variant="body2">
                  Size
                </Typography>
              </Box>
              <Box className="sizeOption">
                {sizeCart.map((item, index) => {
                  return (
                    <Box className="sizeBox">
                      <Typography sx={{ fontWeight: 400 }}>
                        {item.name}
                      </Typography>
                      <Divider />
                      <Typography> Rs.{item.price}</Typography>
                    </Box>
                  );
                })}
              </Box>
              <Box className="cartButtons">
                <TextField
                  size="small"
                  sx={{ marginTop: "2%", width: "50%" }}
                  id="standard-multiline-static"
                  label="Quantity"
                  type="number"
                  variant="outlined"
                  value = {data.quantity || 1}
                  onChange = {(e)=>setData({...data, quantity : e.target.value})}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">QTY</InputAdornment>
                    ),
                  }}
                />
                <Button variant="outlined" onClick = {()=>addToCart(data)} small="true">
                  Add To Cart
                </Button>
                <Button variant="contained" small="true">
                  Buy Now
                </Button>
              </Box>
            </Grid>
            <Grid className="pd" item xs={12}>
              <Typography sx={{ fontWeight: 400 }} variant="body2">
                Product Details
              </Typography>
              <Divider />
              <Stack sx={{ paddingTop: "2%" }}>
                <Typography variant="caption">
                  SKU
                  <Typography sx={{ float: "right" }} variant="caption">WSBED046WF9996</Typography>
                </Typography>
                <Typography variant="caption">
                  Storage
                  <Typography sx={{ float: "right" }} variant="caption">With storage</Typography>
                </Typography>
                <Typography variant="caption">
                  Material
                  <Typography sx={{ float: "right" }} variant="caption">Sheesham wood</Typography>
                </Typography>
                <Typography variant="caption">
                  Size
                  <Typography sx={{ float: "right" }} variant="caption">King size</Typography>
                </Typography>
                <Typography variant="caption">
                  Dimensions (Inch)
                  <Typography sx={{ float: "right" }} variant="caption">88 L x 75 W x 33 H</Typography>
                </Typography>
                <Typography variant="caption">
                  Mattress<Typography sx={{ float: "right" }} variant="caption">78 L x 72 W</Typography>
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        {/* details sec ends */}
      </Grid>
      {/* main section Ends */}

      {/* More Information */}

      <Grid container className="moreInfo" >
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: 500 }} variant="h4">
            MORE INFORMATION
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: 100, padding: "2% 0%" }} variant="h5">
            Walked Bed With Storage in Light Grey Color - CasaCraft By Right Furniture
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
                <Tab label="Overview" {...a11yProps(0)} />
                <Tab label="Additional Info" {...a11yProps(1)} />
                <Tab label="Merchant Details" {...a11yProps(2)} />
                <Tab label="Warranty" {...a11yProps(3)} />
                <Tab label="Terms & Conditions" {...a11yProps(4)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </Box>
        </Grid>

      </Grid>

      {/* More Information ends */}

      {/* Related Products */}

      <Grid container className="moreInfo">
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: 500 }} variant="h4">
            Related Products
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Carousel
            dotListClass="custom-dot-list-style"
            keyBoardControl={true}
            autoPlaySpeed={1000}
            ssr={true}
            className="detailsCarsole"
            responsive={responsive}
          >
            {customer.map((article, index) => {
              return (
                <Card className="card" key={index} sx={{ maxWidth: 300, boxShadow: 3 }}>
                  <CardActionArea>
                    <CardMedia
                      className="cardMedia"
                      component="img"
                      height="250"
                      image={article.image}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {article.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {article.review}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </Carousel>

        </Grid>
      </Grid>

      {/* Related Products Ends */}
      </>}
    </>
  );
}
