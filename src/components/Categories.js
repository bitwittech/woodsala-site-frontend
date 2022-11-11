import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import Carousel from "react-multi-carousel";
//mui
import {
  Grid,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  IconButton,
  Drawer,
  CircularProgress
} from "@mui/material";

//css
import "../asset/css/categories.css";
import "react-multi-carousel/lib/styles.css";

// icon
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//image
import living from ".././asset/images/home/sofa_SBR.png";
import wfh from ".././asset/images/home/table_SBR.png";
import bedroom from ".././asset/images/home/bedroom_SBR.png";
import dining from ".././asset/images/home/dining_SBR.png";
import defaultIMG from ".././asset/images/defaultProduct.svg";

// store 
import { Store } from '../store/Context'
// types 
import { AddCartItem, Notify } from "../store/Types";


// services 
import { getProducts, addCartItem, removeCartItem, getCartItem } from '../service/service'

export default function Categories(props) {

  // history
  const history = props.history;

  // filer params
  const search = useLocation().search;
  const filter = new URLSearchParams(search).get('filter') || undefined;

  // responsive oject for Slider
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };

  // store
  const { state, dispatch } = Store();



  // use Effect
  useEffect(() => {
    
    if (state.Auth.isAuth) {
      getCartItem(state.Auth.CID)
        .then((response) => {
          if (localStorage.getItem('cart') !== null)
            response.data.concat(JSON.parse(localStorage.getItem('cart')).items)

          // console.log(response.data)
          dispatch({
            type: AddCartItem,
            payload: { items: response.data }
          })
        })
    }

    fetchMoreData();

  }, [state.Auth.isAuth])

  const categories = [
    {
      image: living,
      name: "Living",
      price: 12000,
    },
    {
      image: wfh,
      name: "Work From Home",
      price: 15000,
    },
    {
      image: bedroom,
      name: "Bedroom",
      price: 20000,
    },
    {
      image: dining,
      name: "Dining",
      price: 12000,
    },
    {
      image: living,
      name: "Living",
      price: 12000,
    },
    {
      image: wfh,
      name: "Work From Home",
      price: 15000,
    },
    {
      image: bedroom,
      name: "Bedroom",
      price: 20000,
    },
    {
      image: dining,
      name: "Dining",
      price: 12000,
    },
    {
      image: living,
      name: "Living",
      price: 12000,
    },
    {
      image: wfh,
      name: "Work From Home",
      price: 15000,
    },
    {
      image: bedroom,
      name: "Bedroom",
      price: 20000,
    },
    {
      image: dining,
      name: "Dining",
      price: 12000,
    },
  ];



  // states
  const [items, setItems] = useState([])
  const [expanded, setExpanded] = useState("");

  // state of the everything
  const [meta, setMeta] = useState({
    hasMore: true,
    page: 1,
    filter : filter
  });


  // State
  const [filterShow, setFilter] = useState(false);

  // style 
  const styleScroller = {
    display: 'flex',
    justifyContent: "center",
    alignItem: 'center',
    minWidth: '100%',
    flexDirection: 'column',
    overflow: 'hidden !important',
    margin: 'auto'

  }

  // fetch more item
  const fetchMoreData = async () => {

    getProducts(meta)
      .then((data) => {
        if (data.data.length > 0) {
          setMeta({ ...meta, page: meta.page + 1 ,filter})
          return setItems([...new Set([...items.concat(data.data)])])
        }
        else {
          setMeta({ ...meta, page: 1, hasMore: false })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // handle accordions
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // addItemToCart 
  const addToCart = async (item) => {


    // server side 
    if (state.Auth.isAuth) {
      await addCartItem({
        CID: state.Auth.CID,
        product_id: item.SKU,
        quantity: 1,
      })
        .then((response) => {
          // for client side 
          dispatch(
            {
              type: AddCartItem,
              payload: {
                items: [...state.AddCartItem.items,
                {
                  CID: state.Auth.CID || 'Not Logged In',
                  product_id: item.SKU,
                  quantity: 1,
                }]
              }
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
            items: [...state.AddCartItem.items,
            {
              CID: state.Auth.CID || 'Not Logged In',
              product_id: item.SKU,
              quantity: 1,
            }]
          }
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

  return (
    <>
      <title>Categories</title>
{console.log(meta)}
      {/* Main Container */}
      <Grid container sx={{ padding: "1%" }}>
        {/* sub categories details  */}
        <Grid item xs={12} className="subInfo">
          <Typography align="center" variant="h3">
            Furniture
            <Typography variant="body1">
              Lorem ipsum dolor sit amet voluptatum minus! Odit incidunt quo
              tempora praesentium distinctio obcaecati corrupti eum pariatur
              neque consectetur.
            </Typography>
          </Typography>
        </Grid>

        {/* sub categories details ends */}

        {/* carousal for sub cat */}
        <Grid item xs={12} className="subCatContainer">
          <Carousel keyBoardControl={true} ssr={true} responsive={responsive}>
            {categories.map((item, index) => {
              return (
                <Box key={index} sx={{
                  padding: "10%",
                }} className="card ">
                  <img src={item.image} alt={index} />
                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: "400",
                      paddingTop: "2%",
                    }}
                    align="center"
                    variant="button"
                  >
                    {item.product_title}
                  </Typography>
                </Box>
              );
            })}
          </Carousel>
        </Grid>
        {/* carousal for sub cat ends */}

        {/* filter sec */}
        <Grid className="filters showFilters" sx={{ boxShadow: "1" }} item xs={12} md={2}>
          <Typography variant="h5" sx={{ padding: "2%" }}>
            {" "}
            Filters
          </Typography>
          <Divider></Divider>
          <br></br>
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
                  Price
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box className="accordion">
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
                  Size
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box className="accordion">
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                className="summary"
                aria-controls="panel1d-content"
                id="panel1d-header"
                expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}
              >
                <Typography sx={{ fontWeight: 400 }} variant="body1">
                  Delivery Time
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box className="accordion">
            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                className="summary"
                aria-controls="panel1d-content"
                id="panel1d-header"
                expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}
              >
                <Typography sx={{ fontWeight: 400 }} variant="body1">
                  Material
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>
        {/* filter sec ends */}

        {/* Hamburger for Filter */}
        <Grid className="hamFilterPanel" item xs={12}>
          <IconButton
            sx={{ justifyContent: "center" }}
            color="primary"
            onClick={() => {
              setFilter(true);
            }}
          >
            <FilterListOutlinedIcon sx={{ fontSize: 25 }} />
          </IconButton>
          <Drawer
            anchor={"top"}
            open={filterShow}
            onClose={() => {
              setFilter(false);
            }}
          >
            <IconButton
              sx={{ justifyContent: "center" }}
              color="primary"
              onClick={() => {
                setFilter(false);
              }}
            >
              <ExpandLessOutlinedIcon sx={{ fontSize: 25 }} />
            </IconButton>

            <Grid
              className="filters"
              sx={{ boxShadow: "1" }}
              item
              xs={12}
            >
              <Typography variant="h5" sx={{ padding: "2%" }}>
                {" "}
                Filters
              </Typography>
              <Divider></Divider>
              <br></br>
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
                      Price
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
              <Box className="accordion">
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
                      Size
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
              <Box className="accordion">
                <Accordion
                  expanded={expanded === "panel3"}
                  onChange={handleChange("panel3")}
                >
                  <AccordionSummary
                    className="summary"
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                    expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}
                  >
                    <Typography sx={{ fontWeight: 400 }} variant="body1">
                      Delivery Time
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
              <Box className="accordion">
                <Accordion
                  expanded={expanded === "panel4"}
                  onChange={handleChange("panel4")}
                >
                  <AccordionSummary
                    className="summary"
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                    expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}
                  >
                    <Typography sx={{ fontWeight: 400 }} variant="body1">
                      Material
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
          </Drawer>
        </Grid>
        {/* Hamburger for Filter ends */}

        {/* product container */}
        <Grid className="productContainer" item xs={12} md={10}>
          {/* {console.log(state.AddCartItem)} */}

          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={meta.hasMore}
            style={styleScroller}
            loader={<center style={{ padding: '10px' }}><CircularProgress /></center>}
          >
            <Grid container className='innerProductWrap' >
              {items.map((item, index) => {
                return (
                  <Grid
                    item
                    key={index}
                    className="productCard"
                    xs={window.innerWidth <= '600' ? 10 : 5.8}
                    sx={{ boxShadow: 2, maxHeight: '100%', mb : 3 }}
                    md={3.87}

                  >
                    <Grid container>
                      <Grid item xs={12}
                        onClick={() => history(`/details?SKU=${item.SKU}`)}

                      >
                        <img src={item.featured_image || item.product_image[0] || defaultIMG} alt="product_Images" />
                      </Grid>
                      <Grid item xs={9}>
                        <Box className="productInfo">
                          <Typography variant="h5" >{item.product_title}</Typography>
                          <Typography variant="body2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est harum natus error facilis similique officiis ea nisi architecto explicabo tenetur Aspernatur?
                          </Typography>
                          <Typography variant="h5">{item.discount_limit}% Off</Typography>
                          <Typography variant="h6"><s>Rs.{item.MRP}</s></Typography>
                          <Typography variant="h5">Rs.{item.selling_price}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={3}>
                        <Box className="buttonAction">
                          {
                            state.AddCartItem.items.filter((row) => { return row.product_id === item.SKU }).length > 0 ?
                              <IconButton onClick={() => removeItemFromCart(item)}><ShoppingCartIcon /></IconButton> :
                              <IconButton onClick={() => addToCart(item)}>
                                <AddShoppingCartOutlinedIcon ></AddShoppingCartOutlinedIcon>
                              </IconButton>
                          }

                          <IconButton>
                            <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </InfiniteScroll>

        </Grid>
      </Grid>
      {/* Main Container Ends */}
    </>
  );
}
