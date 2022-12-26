import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
// import Carousel from "react-multi-carousel";
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
  CircularProgress,
  Slider,
  FormControl,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@mui/material";

//css
import "../asset/css/product.css";
import "react-multi-carousel/lib/styles.css";

import { LazyLoadImage } from 'react-lazy-load-image-component';
// icon
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//image
// import living from ".././asset/images/home/sofa_SBR.png";
// import wfh from ".././asset/images/home/table_SBR.png";
// import bedroom from ".././asset/images/home/bedroom_SBR.png";
// import dining from ".././asset/images/home/dining_SBR.png";
import defaultIMG from ".././asset/images/defaultProduct.svg";

// Action 
import { setAlert, addItem, removeItem, setCart } from '../Redux/action/action'

// Redux 
import { useDispatch, useSelector } from 'react-redux'


// services 
import { getProducts, addCartItem, removeCartItem, getCartItem, getMartialList } from '../service/service'

export default function Categories(props) {

  const [Materials, setMaterials] = useState([])

  // State
  const state = useSelector(state => state);

  // Dispatch
  const dispatch = useDispatch();

  // history
  const history = props.history;

  // filter params
  const filter = useParams();

  // extra filter
  const [extraFilter, setExtraFilter] = useState({
    apply: false,
    material: []

  })

  // // responsive oject for Slider
  // const responsive = {
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 3,
  //   },
  //   tablet: {
  //     breakpoint: { max: 800, min: 600 },
  //     items: 2,
  //   },
  //   mobile: {
  //     breakpoint: { max: 600, min: 0 },
  //     items: 1,
  //   },
  // };

  // store
  // const { state, dispatch } = Store();

  // states
  const [items, setItems] = useState([])
  const [expanded, setExpanded] = useState("");

  // state of the everything
  const [meta, setMeta] = useState({
    hasMore: true,
    page: 1,
    filter: filter,
  });

  // State
  const [filterShow, setFilter] = useState(false);

  // // style 
  // const styleScroller = {
  //   display: 'flex',
  //   justifyContent: "center",
  //   alignItem: 'center',
  //   minWidth: '100%',
  //   flexDirection: 'column',
  //   overflow: 'hidden !important',
  //   margin: 'auto'

  // }


  // use Effect
  useMemo(() => {

    if (state.auth.isAuth) {
      if (state.cart.items.length > 0) {
        Promise.all(state.cart.items.map(async row => await addCartItem({
          CID: state.auth.CID,
          product_id: row.product_id,
          quantity: row.quantity,
        })))
          .then(() => {
            getCartItem(state.auth.CID)
              .then((response) => {
                if (response.data.length > 0)
                  dispatch(setCart({ items: response.data }))
              })
          })
      }
      else {
        getCartItem(state.auth.CID)
          .then((response) => {
            if (response.data.length > 0)
              dispatch(setCart({ items: response.data }))
          })
      }
    }

    getMartialList()
      .then((row) => {
        setMaterials(row.data.map((item) => {
          return item.primaryMaterial_name
        }))
      })

  }, [state.auth.isAuth])

  // const categories = [
  //   {
  //     image: living,
  //     name: "Living",
  //     price: 12000,
  //   },
  //   {
  //     image: wfh,
  //     name: "Work From Home",
  //     price: 15000,
  //   },
  //   {
  //     image: bedroom,
  //     name: "Bedroom",
  //     price: 20000,
  //   },
  //   {
  //     image: dining,
  //     name: "Dining",
  //     price: 12000,
  //   },
  //   {
  //     image: living,
  //     name: "Living",
  //     price: 12000,
  //   },
  //   {
  //     image: wfh,
  //     name: "Work From Home",
  //     price: 15000,
  //   },
  //   {
  //     image: bedroom,
  //     name: "Bedroom",
  //     price: 20000,
  //   },
  //   {
  //     image: dining,
  //     name: "Dining",
  //     price: 12000,
  //   },
  //   {
  //     image: living,
  //     name: "Living",
  //     price: 12000,
  //   },
  //   {
  //     image: wfh,
  //     name: "Work From Home",
  //     price: 15000,
  //   },
  //   {
  //     image: bedroom,
  //     name: "Bedroom",
  //     price: 20000,
  //   },
  //   {
  //     image: dining,
  //     name: "Dining",
  //     price: 12000,
  //   },
  // ];


  // fetch more item

  const fetchMoreData = async () => {

    // (meta)
    // (filter)
    if (filter !== meta.filter || extraFilter.apply) setItems([])

    getProducts({ page: filter === meta.filter && extraFilter.apply === false ? meta.page : 1, filter: filter, extraFilter: JSON.stringify(extraFilter) })
      .then((data) => {
        if (data.data.length > 0) {
          setMeta({ ...meta, hasMore: true, page: meta.page + 1, filter })
          if (filter !== meta.filter || extraFilter.apply) {
            setItems(data.data)
            setExtraFilter(old => ({ ...old, apply: false }))
            setMeta({ ...meta, hasMore: true, page: 2, filter })
          }
          else
            return setItems([...new Set([...items.concat(data.data)])])
        }
        else {
          setMeta({ ...meta, page: 1, hasMore: false, filter: '' })
          setExtraFilter(old => ({ ...old, apply: false }))
        }
      })
      .catch((err) => {
        // (err)
      })
  }

  useMemo(() => {
    return fetchMoreData()
  }, [filter, extraFilter.apply])

  // handle accordions
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // addItemToCart 
  const addToCart = async (item) => {


    // server side 
    if (state.auth.isAuth) {
      await addCartItem({
        CID: state.auth.CID,
        product_id: item.SKU,
        quantity: 1,
      })
        .then((response) => {
          // for client side 
          dispatch(
            addItem({
              CID: state.auth.CID || 'Not Logged In',
              product_id: item.SKU,
              quantity: 1,
            })
          )
          return dispatch(setAlert({
            variant: 'success',
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
      dispatch(
        addItem({
          CID: state.auth.CID || 'Not Logged In',
          product_id: item.SKU,
          quantity: 1,
        })
      )
      return dispatch(setAlert({
        variant: 'success',
        message: 'Item added to the cart !!!',
        open: true
      }))

    }
  }

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

  const handleMartialCheck = (e) => {
    if (e.target.checked)
      setExtraFilter((old) => ({ ...old, material: [...old.material, e.target.name] }))
    else
      setExtraFilter((old) => ({ ...old, material: old.material.filter(val => val !== e.target.name) }))
  }
  const filterResult = async () => {
    await setExtraFilter((old) => ({ ...old, apply: true }));
  }


  return (
    <>
      <title>Products</title>
      {/* {(meta)} */}
      {/* Main Container */}
      <Grid container sx={{ padding: "1%" }}>


        {/* Banner */}
        <Grid container className="Banner">
          <Grid item xs={12}>
            <Typography variant="h1">Products</Typography>
          </Grid>
        </Grid>
        {/* Banner Ends */}

        {/* sub categories details  */}
        {/* <Grid item xs={12} className="subInfo">
          <Typography align="center" variant="h3">
            Furniture
            <Typography variant="body1">
              Lorem ipsum dolor sit amet voluptatum minus! Odit incidunt quo
              tempora praesentium distinctio obcaecati corrupti eum pariatur
              neque consectetur.
            </Typography>
          </Typography>
        </Grid> */}

        {/* sub categories details ends */}

        {/* carousal for sub cat */}
        {/* <Grid item xs={12} className="subCatContainer">
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
        </Grid> */}
        {/* carousal for sub cat ends */}

        {/* filter sec */}
        <Grid className="filters showFilters" p={1} item xs={12} md={2}>
          <Box className='applyBtn' sx={{ padding: "3%" }}>
            <Typography variant="h5" >
              Filters
            </Typography>
            <Button onClick={filterResult} size='small' variant='outlined'>Apply</Button>
          </Box>
          <Divider></Divider>
          {/* Price fitler */}
          <Box className="accordion" >
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                className="summary"
                aria-controls="panel1d-content"
                id="panel1d-header"
                expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}
                p={0}
              >
                <Box className='applyBtn'>
                  <Checkbox size='small' disabled={extraFilter.price ? false : true} checked={extraFilter.price ? true : false} name='price' onChange={() => setExtraFilter(old => { delete old.price; return { ...old, apply: true } })} />
                  <Typography sx={{ fontWeight: 400 }} variant="body">
                    Price
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: '0px 25px !important' }} >
                <Slider
                  size='small'
                  getAriaLabel={() => 'Price range'}
                  value={extraFilter.price || [500, 5000]}
                  onChange={(e, value) => setExtraFilter(old => ({ ...old, price: value }))}
                  valueLabelDisplay="auto"
                  marks={[{ value: 500, label: 'Rs.500' }, { value: 10000, label: 'Rs.50K' }]}
                  max={10000}
                  min={500}
                // getAriaValueText={valuetext}
                />
              </AccordionDetails>
            </Accordion>
          </Box>
          {/* Length filter  */}
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
                <Box className='applyBtn'>
                  <Checkbox size='small' disabled={extraFilter.length ? false : true} checked={extraFilter.length ? true : false} name='price' onChange={() => setExtraFilter(old => { delete old.length; return { ...old, apply: true } })} />
                  <Typography sx={{ fontWeight: 400 }} variant="body">
                    Length
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: '0px 25px !important' }}>
                <Slider
                  size='small'
                  getAriaLabel={() => 'Length range'}
                  value={extraFilter.length || [10, 50]}
                  onChange={(e, value) => setExtraFilter(old => ({ ...old, length: value }))}
                  valueLabelDisplay="auto"
                  marks={[{ value: 0, label: '0 In' }, { value: 50, label: '50 In' }, { value: 100, label: '100 In' }]}
                  max={100}
                  min={0}
                // getAriaValueText={valuetext}
                />
              </AccordionDetails>
            </Accordion>
          </Box>
          {/* Breadth  filter */}
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
                <Box className='applyBtn'>
                  <Checkbox size='small' disabled={extraFilter.breadth ? false : true} checked={extraFilter.breadth ? true : false}
                    onChange={() => setExtraFilter(old => { delete old.breadth; return { ...old, apply: true } })} />
                  <Typography sx={{ fontWeight: 400 }} variant="body">
                    Breadth
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: '0px 25px !important' }}>
                <Slider
                  size='small'
                  getAriaLabel={() => 'Breadth range'}
                  value={extraFilter.breadth || [10, 50]}
                  onChange={(e, value) => setExtraFilter(old => ({ ...old, breadth: value }))}
                  valueLabelDisplay="auto"
                  marks={[{ value: 0, label: '0 In' }, { value: 50, label: '50 In' }, { value: 100, label: '100 In' }]}
                  max={100}
                  min={0}
                // getAriaValueText={valuetext}
                />
              </AccordionDetails>
            </Accordion>
          </Box>
          {/* // height filter */}
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
                <Box className='applyBtn'>
                  <Checkbox size='small' disabled={extraFilter.height ? false : true} checked={extraFilter.height ? true : false}
                    onChange={() => setExtraFilter(old => { delete old.height; return { ...old, apply: true } })} />
                  <Typography sx={{ fontWeight: 400 }} variant="body">
                    Height
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: '0px 25px !important' }}>

                <Slider
                  size='small'
                  getAriaLabel={() => 'Height range'}
                  value={extraFilter.height || [10, 50]}
                  onChange={(e, value) => setExtraFilter(old => ({ ...old, height: value }))}
                  valueLabelDisplay="auto"
                  marks={[{ value: 0, label: '0 In' }, { value: 50, label: '50 In' }, { value: 100, label: '100 In' }]}
                  max={100}
                  min={0}
                // getAriaValueText={valuetext}
                />
              </AccordionDetails>
            </Accordion>
          </Box>
          {/* // Delivery */}
          {/* <Box className="accordion">
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
              <AccordionDetails sx={{ padding: '0px 25px !important' }}>
                <Slider
                  size='small'
                  getAriaLabel={() => 'Length range'}
                  value={extraFilter.delivery}
                  onChange={(e, value) => setExtraFilter(old => ({ ...old, delivery: value }))}
                  valueLabelDisplay="auto"
                  marks={[{ value: 5, label: '5 day' }, { value: 50, label: '50 Day' }, { value: 100, label: '100 Day' }]}
                  max={100}
                  min={0}
                // getAriaValueText={valuetext}
                />
              </AccordionDetails>
            </Accordion>
          </Box> */}
          {/* Martials  */}
          <Box className="accordion">
            <Accordion
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
            >
              <AccordionSummary
                className="summary"
                aria-controls="panel1d-content"
                id="panel1d-header"
                expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}
              >
                <Box className='applyBtn'>
                  <Checkbox size='small' disabled={extraFilter.material.length > 0 ? false : true} checked={extraFilter.material.length > 0 ? true : false}
                    onChange={() => setExtraFilter(old => { return { ...old, material: [], apply: true } })} />
                  <Typography sx={{ fontWeight: 400 }} variant="body">
                    Material
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: '0px 20px !important' }}>
                <FormControl component="fieldset" variant="standard">
                  <FormGroup>
                    {Materials.map((row, index) => <FormControlLabel key={index}
                      control={
                        <Checkbox checked={extraFilter[row]} onChange={handleMartialCheck} name={row} />
                      }
                      label={row}
                    />)}
                  </FormGroup>
                </FormControl>
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
          {/* {(state.AddCartItem)} */}

          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={meta.hasMore}
            // style={styleScroller}
            loader={<center style={{ padding: '10px' }}><CircularProgress /></center>}
          >
            <Grid container
              className='innerProductWrap'
            >
              {items.map((item, index) => {
                return (
                  <Grid
                    item
                    key={index}
                    className="productCard"
                    xs={window.innerWidth <= '600' ? 10 : 5.8}
                    sx={{ boxShadow: 2, maxHeight: '100%', mb: 3 }}
                    md={2.9}
                  >
                    <Grid container >
                      {item.discount_limit > 0 && <Grid className="discount" item xs={12}>
                        <Box >
                          <Typography variant="body" sx={{ fontWeight: '400' }}>{item.discount_limit}% Off</Typography>
                        </Box>
                      </Grid>}
                      <Grid item xs={12}
                        onClick={() => history(`/details/${item.SKU}/${item.product_title}/${item.category_name}`)}
                      >
                        <LazyLoadImage src={item.featured_image || item.product_image[0] || defaultIMG}
                          PlaceholderSrc={defaultIMG}
                          effect="blur"
                          alt = {item.product_title}
                        />
                        {/* {() ? <img src={item.featured_image || item.product_image[0] || defaultIMG} alt="product_Images" /> : <CircularProgress/> } */}
                      </Grid>
                      <Grid item xs={8.8} 
                        onClick={() => history(`/details/${item.SKU}/${item.product_title}/${item.category_name}`)}
                        >
                        <Box className="productInfo">
                          <Typography variant="h5" sx={{ fontWeight: 'bolder' }} className='title'>{item.product_title}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={3.2}>
                        <Box className="buttonAction" sx={{ display: 'flex' }}>
                          {
                            state.cart.items.filter((row) => { return row.product_id === item.SKU }).length > 0 ?
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
                      <Grid 
                        onClick={() => history(`/details/${item.SKU}/${item.product_title}/${item.category_name}`)}
                        item xs={12}>
                        <Box className="productInfo">
                          <Typography sx={{ mt: 0.5, mb: 1 }} className='title' variant="body1">
                            {item.product_description}
                          </Typography>
                          <Typography color="text.secondary" sx={{ fontWeight: 'bolder' }} variant="h5"> {(item.selling_price - ((item.selling_price / 100) * item.discount_limit)).toLocaleString('us-Rs', { style: 'currency', currency: 'INR' })}</Typography>
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
