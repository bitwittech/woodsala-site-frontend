/* eslint-disable camelcase */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
// SEO
import { Helmet } from "react-helmet";
import { Box, Button, Grid, Rating, Typography } from "@mui/material";
import { getBanner } from "../../service/service";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import bannerPic from "../../asset/images/home/banner1_BS.png";
// css
import "../../asset/css/newHome.css";
import "react-multi-carousel/lib/styles.css";

// image
import box from "../../asset/images/home/Box.jpg";
import bed from "../../asset/images/home/bed_SBF.png";
import cabinet from "../../asset/images/home/cabinet_SBF.png";
import drawerChest from "../../asset/images/home/drawerChest_SBF.png";
import dressingTable from "../../asset/images/home/dressingTable_SBF.png";
import fruitCabinet from "../../asset/images/home/fruitCabinet_SBF.png";
import sofa from "../../asset/images/home/sofa_SBF.png";
import swing from "../../asset/images/home/swing_SBF.png";
import Carousel from "react-multi-carousel";

const Home = (props) => {
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    fetchBanner();
  }, []);

  async function fetchBanner() {
    const res = await getBanner();
    if (res.status === 200) {
      // console.log(res);
      setBanner([...res.data.data]);
    }
  }

  const categories = [
    { label: "Dressing Table", image: dressingTable, link: "Table" },
    { label: "Cabinet", image: cabinet, link: "Cabinet" },
    { label: "Box", image: box, link: "Box" },
    {
      label: "Fruit & Vegetable Cabinet",
      image: fruitCabinet,
      link: "FruitCabinet",
    },
    { label: "Sofa", image: sofa, link: "Sofa" },
    { label: "Drawer's Cabinet", image: drawerChest, link: "Drawer" },
    { label: "Bed", image: bed, link: "Bed" },
    { label: "Swing (Jhula)", image: swing, link: "Jhula" },
    { label: "Swing (Jhula)", image: swing, link: "Jhula" },
    { label: "Swing (Jhula)", image: swing, link: "Jhula" },
  ];
  const common = [
    { label: "Dressing Table", image: dressingTable, link: "Table" },
    { label: "Cabinet", image: cabinet, link: "Cabinet" },

    {
      label: "Fruit & Vegetable Cabinet",
      image: fruitCabinet,
      link: "FruitCabinet",
    },
    { label: "Sofa", image: sofa, link: "Sofa" },
    { label: "Drawer's Cabinet", image: drawerChest, link: "Drawer" },
    { label: "Bed", image: bed, link: "Bed" },
    { label: "Swing (Jhula)", image: swing, link: "Jhula" },
    { label: "Swing (Jhula)", image: swing, link: "Jhula" },
    { label: "Swing (Jhula)", image: swing, link: "Jhula" },
  ];
  const HR = [
    {
      label: "Dressing Table",
      image: dressingTable,
      link: "Table",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque odit ad nihil eveniet natus numquam accusantium pariatur nemo totam neque ab eum est obcaecati nam, tempore rem tenetur quo ratione!",
    },
    {
      label: "Cabinet",
      image: cabinet,
      link: "Cabinet",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque odit ad nihil eveniet natus numquam accusantium pariatur nemo totam neque ab eum est obcaecati nam, tempore rem tenetur quo ratione!",
    },
    {
      label: "Fruit & Vegetable Cabinet",
      image: fruitCabinet,
      link: "FruitCabinet",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque odit ad nihil eveniet natus numquam accusantium pariatur nemo totam neque ab eum est obcaecati nam, tempore rem tenetur quo ratione!",
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque odit ad nihil eveniet natus numquam accusantium pariatur nemo totam neque ab eum est obcaecati nam, tempore rem tenetur quo ratione!",
      label: "Sofa",
      image: sofa,
      link: "Sofa",
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque odit ad nihil eveniet natus numquam accusantium pariatur nemo totam neque ab eum est obcaecati nam, tempore rem tenetur quo ratione!",
      label: "Drawer's Cabinet",
      image: drawerChest,
      link: "Drawer",
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque odit ad nihil eveniet natus numquam accusantium pariatur nemo totam neque ab eum est obcaecati nam, tempore rem tenetur quo ratione!",
      label: "Bed",
      image: bed,
      link: "Bed",
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque odit ad nihil eveniet natus numquam accusantium pariatur nemo totam neque ab eum est obcaecati nam, tempore rem tenetur quo ratione!",
      label: "Swing (Jhula)",
      image: swing,
      link: "Jhula",
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque odit ad nihil eveniet natus numquam accusantium pariatur nemo totam neque ab eum est obcaecati nam, tempore rem tenetur quo ratione!",
      label: "Swing (Jhula)",
      image: swing,
      link: "Jhula",
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque odit ad nihil eveniet natus numquam accusantium pariatur nemo totam neque ab eum est obcaecati nam, tempore rem tenetur quo ratione!",
      label: "Swing (Jhula)",
      image: swing,
      link: "Jhula",
    },
  ];
  const PP = [
    { label: "Dressing Table", image: dressingTable, link: "Table", rating: 4 },
    { label: "Cabinet", image: cabinet, link: "Cabinet", rating: 3 },
    { label: "Box", image: box, link: "Box", rating: 4 },
    {
      label: "Fruit & Vegetable Cabinet",
      image: fruitCabinet,
      link: "FruitCabinet",
      rating: 2,
    },
    { label: "Sofa", image: sofa, link: "Sofa", rating: 5 },
    {
      label: "Drawer's Cabinet",
      image: drawerChest,
      link: "Drawer",
      rating: 3.5,
    },
    { label: "Bed", image: bed, link: "Bed", rating: 2.5 },
    { label: "Swing (Jhula)", image: swing, link: "Jhula", rating: 1.5 },
    { label: "Swing (Jhula)", image: swing, link: "Jhula", rating: 3 },
    { label: "Swing (Jhula)", image: swing, link: "Jhula", rating: 5 },
  ];

  const customer = [
    {
      name: "Rajesh Kant",
      rating: 5,
      label: "Dressing Table",
      image: dressingTable,
      link: "Table",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque odit ad nihil eveniet natus numquam accusantium pariatur nemo totam neque ab eum est obcaecati nam, tempore rem tenetur quo ratione!",
    },
    {
      name: "Ravi Sahu",
      rating: 3,
      label: "Cabinet",
      image: cabinet,
      link: "Cabinet",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque odit ad nihil eveniet natus numquam accusantium pariatur nemo totam neque ab eum est obcaecati nam, tempore rem tenetur quo ratione!",
    },
    {
      name: "Vijay Kant",
      rating: 5,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque odit ad nihil eveniet natus numquam accusantium pariatur nemo totam neque ab eum est obcaecati nam, tempore rem tenetur quo ratione!",
      label: "Sofa",
      image: sofa,
      link: "Sofa",
    },
    {
      name: "Rahul Sharma",
      rating: 4.5,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque odit ad nihil eveniet natus numquam accusantium pariatur nemo totam neque ab eum est obcaecati nam, tempore rem tenetur quo ratione!",
      label: "Drawer's Cabinet",
      image: drawerChest,
      link: "Drawer",
    },
    {
      name: "Raju Kant",
      rating: 5,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque odit ad nihil eveniet natus numquam accusantium pariatur nemo totam neque ab eum est obcaecati nam, tempore rem tenetur quo ratione!",
      label: "Bed",
      image: bed,
      link: "Bed",
    },
    {
      name: "Harsh Sen",
      rating: 4,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque odit ad nihil eveniet natus numquam accusantium pariatur nemo totam neque ab eum est obcaecati nam, tempore rem tenetur quo ratione!",
      label: "Swing (Jhula)",
      image: swing,
      link: "Jhula",
    },
    {
      name: "Lalit Kant",
      rating: 5,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque odit ad nihil eveniet natus numquam accusantium pariatur nemo totam neque ab eum est obcaecati nam, tempore rem tenetur quo ratione!",
      label: "Swing (Jhula)",
      image: swing,
      link: "Jhula",
    },
    {
      name: "Sonuh Verma",
      rating: 3,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque odit ad nihil eveniet natus numquam accusantium pariatur nemo totam neque ab eum est obcaecati nam, tempore rem tenetur quo ratione!",
      label: "Swing (Jhula)",
      image: swing,
      link: "Jhula",
    },
  ];

  return (
    <Box p={1}>
      {/* helmet tag  */}
      <Helmet>
        <title>Online Furniture Store | Buy Wooden Furniture Online</title>
        <meta
          name="description"
          content="Woodsala is an online furniture store that provides customized furniture solutions for all your need. Buy premium quality wooden furniture at a reasonable price."
        />
        <meta
          name="keywords"
          content="furniture,wooden furniture,online furniture,which furniture store is the cheapest,search furniture,table,bajot,gift,chair"
        />
      </Helmet>
      {/* helmet tag ends  */}
      {/* Banner and Top section */}
      <Box className="topSectionWrapper">
        {/* Carousel */}
        <Box className="sliderWrapper">
          {banner.length > 0 ? (
            banner.length > 0 && (
              <Grid container className="slider">
                <Grid item xs={12}>
                  <Slider autoplay={5000} infinite={true} className="center">
                    {banner.map((article, index) => (
                      <Grid
                        container
                        key={index}
                        className="sliderBanner"
                        style={{
                          backgroundImage: `url('${article.web_banner}')`,
                          backgroundSize: "100% 100%",
                          backgroundRepeat: "no-repeat",
                        }}
                      >
                        <Grid item xs={12} md={12} className="banner-text">
                          <Typography className="text-1">
                            One-of-a-king
                          </Typography>
                          <Typography className="text-2">
                            FURNITURE SHOP!
                          </Typography>
                          <Typography className="text-3">
                            We bet you can't find an identical piece, <br></br>{" "}
                            any where in the world
                          </Typography>
                          <Button
                            onClick={() => {
                              props.history("/collection");
                            }}
                            sx={{ margin: "5px" }}
                            small={"true"}
                            variant="outlined"
                          >
                            Shop Now
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                  </Slider>
                </Grid>
              </Grid>
            )
          ) : (
            <Grid container className="banner">
              <Grid item xs={6} md={12} className="banner-text">
                <Typography className="text-1">One-of-a-king</Typography>
                <Typography className="text-2">FURNITURE SHOP!</Typography>
                <Typography className="text-3">
                  We bet you can't find an identical piece, <br></br> any where
                  in the world
                </Typography>
                <Button
                  onClick={() => {
                    props.history("/product");
                  }}
                  sx={{ margin: "5px" }}
                  small={"true"}
                  variant="outlined"
                >
                  Shop Now
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
        {/* Carousel ends */}
        {/* Side Images */}
        <Box className="imageWrapper">
          <img src={bannerPic} alt={"Banner"} />
          <img src={bannerPic} alt={"Banner"} />
        </Box>
        {/* Side Images */}
      </Box>
      {/* Banner and Top section ends */}

      {/* Categories  */}
      <Box className="categoriesContainer">
        <Typography className="headingNew" variant="h3">
          Shop By Categories
        </Typography>
        {categories.map((row, index) => (
          <Box key={index} className="catCardHome">
            <img
              src={row.image}
              alt={index}
              onClick={() => props.history(`/product/${row.link}`)}
            />
            <Typography sx={{ fontWeight: 500 }} variant="h6">
              {row.label}
            </Typography>
          </Box>
        ))}
      </Box>
      {/* Categories ends */}

      {/* Newly arrived */}
      <Box className="newlyArrivedWrapper">
        <Slides
          title={"Newly Arrived"}
          items={common}
          history={props.history}
        />
      </Box>
      {/* Newly arrived end */}
      {/* Bestseller */}
      <Box className="newlyArrivedWrapper">
        <Slides title={"Bestseller"} items={common} history={props.history} />
      </Box>
      {/* Bestseller end */}
      {/* Beautifully Handcrafted */}
      <Box className="newlyArrivedWrapper">
        <Slides
          title={"Beautifully Handcrafted"}
          items={common}
          history={props.history}
        />
      </Box>
      {/* Beautifully Handcrafted end */}
      {/* Highly Recommended  */}
      <Box className="newlyArrivedWrapper">
        <Slides
          title={"Highly Recommended "}
          items={HR}
          history={props.history}
        />
      </Box>
      {/* Highly Recommended end */}
      {/* Popular Product  */}
      <Box className="newlyArrivedWrapper">
        <Slides title={"Popular Product "} items={PP} history={props.history} />
      </Box>
      {/* Popular Product end */}
      {/* CustomerSlides  */}
      <Box className="newlyArrivedWrapper">
        <CustomerSlides title={"Listing To Our Customer"} items={customer} />
      </Box>
      {/* CustomerSlides end */}
    </Box>
  );
};

function Slides({ title, items, history }) {
  const responsive_TC = {
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
    <Box className="slidesWrapper">
      <Typography className="headingNew" variant="h3">
        {title}
      </Typography>
      <Carousel keyBoardControl={true} ssr={true} responsive={responsive_TC}>
        {items.map((data, i) => {
          return (
            <Box key={i} className="cardHome">
              <img src={data.image} alt={i} />
              {data.text && (
                <Typography variant="body1">{data.text}</Typography>
              )}
              {data.rating && (
                <Rating name="read-only" value={data.rating} readOnly />
              )}
              <Button
                onClick={() => history(`/product/${data.link}`)}
                variant="outlined"
              >
                Buy Now
              </Button>
            </Box>
          );
        })}
      </Carousel>
    </Box>
  );
}
function CustomerSlides({ title, items }) {
  const responsive_TC = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
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
  return (
    <Box className="slidesWrapper">
      <Typography className="headingNew" variant="h3">
        {title}
      </Typography>
      <Carousel keyBoardControl={true} ssr={true} responsive={responsive_TC}>
        {items.map((data, i) => {
          return (
            <Box key={i} className="cusCard">
              <img src={data.image} alt={i} />
              {data.name && <Typography variant="h6">{data.name}</Typography>}
              {data.rating && (
                <Rating name="read-only" value={data.rating} readOnly />
              )}
              {data.text && (
                <Typography variant="body1">{data.text}</Typography>
              )}
              {/* <Button variant='outlined'>Buy Now</Button> */}
            </Box>
          );
        })}
      </Carousel>
    </Box>
  );
}

export default Home;
