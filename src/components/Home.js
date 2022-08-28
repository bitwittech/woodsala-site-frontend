import React from "react";
import Slider from "react-animated-slider";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// css
import "react-animated-slider/build/horizontal.css";
import "../asset/css/home.css";
// MUI
import {
  Button,
  Grid,
  Typography,
  CardContent,
  CardMedia,
  Card,
  CardActionArea,
  CardActions,
} from "@mui/material";
// Images
import living from ".././asset/images/home/sofa_SBR.png";
import wfh from ".././asset/images/home/table_SBR.png";
import bedroom from ".././asset/images/home/bedroom_SBR.png";
import dining from ".././asset/images/home/dining_SBR.png";
import bed from ".././asset/images/home/bed_SBF.png";
import cabinet from ".././asset/images/home/cabinet_SBF.png";
import chire from ".././asset/images/home/chire_SBF.png";
import drawerChest from ".././asset/images/home/drawerChest_SBF.png";
import dressingTable from ".././asset/images/home/dressingTable_SBF.png";
import fruitCabinet from ".././asset/images/home/fruitCabinet_SBF.png";
import room from ".././asset/images/home/room_SBF.png";
import sofa from ".././asset/images/home/sofa_SBF.png";
import swing from ".././asset/images/home/swing_SBF.png";
import table from ".././asset/images/home/table_SBF.png";
import dining2 from ".././asset/images/home/dining_SBF.png";
import perfaction from ".././asset/images/home/perfaction_SER.png";
import woodFurniture from ".././asset/images/home/woodFurniture_SER.png";
import quality from ".././asset/images/home/qualityTraditional_SER.png";
import delivery from ".././asset/images/home/delivery_SER.png";
import bajot from ".././asset/images/home/bajot_TC.png";
import stool from ".././asset/images/home/stool_TC.png";
import mirror from ".././asset/images/home/mirror_TC.png";
import wallCabinet from ".././asset/images/home/wallCabinet_TC.png";
import banner from ".././asset/images/home/banner1_BS.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import post1 from ".././asset/images/home/insta.png";
import post2 from ".././asset/images/home/insta2.png";
import FJ1 from ".././asset/images/home/FJ_1.png";
import FJ2 from ".././asset/images/home/FJ_2.png";
import FJ3 from ".././asset/images/home/FJ_3.png";

export default function Home() {
  let instaPost = [
    post1,
    table,
    bajot,
    delivery,
    post2,
    post1,
    table,
    bajot,
    delivery,
    post2,
  ];

  let items = [
    {
      name: "Bajot",
      image: { bajot },
    },
    {
      name: "Stool",
      image: { stool },
    },
    {
      name: "Mirror",
      image: { mirror },
    },
    {
      name: "Cabinet",
      image: { wallCabinet },
    },
    {
      name: "Bajot",
      image: { bajot },
    },
    {
      name: "Stool",
      image: { stool },
    },
    {
      name: "Mirror",
      image: { mirror },
    },
    {
      name: "Cabinet",
      image: { wallCabinet },
    },
  ];

  let content = [banner];

  let customer = [
    {
      image: bajot,
      review: "Great Product with minimal design.",
      name: "Yashwant Sahu",
    },
    {
      image: sofa,
      review: "Great Product with minimal design.",
      name: "Nilesh Prajapati",
    },
    {
      image: table,
      review: "Great Product with minimal design.",
      name: "Rahul Raj",
    },
    {
      image: bajot,
      review: "Great Product with minimal design.",
      name: "Yashwant Sahu",
    },
    {
      image: sofa,
      review: "Great Product with minimal design.",
      name: "Nilesh Prajapati",
    },
    {
      image: table,
      review: "Great Product with minimal design.",
      name: "Rahul Raj",
    },
    {
      image: bajot,
      review: "Great Product with minimal design.",
      name: "Yashwant Sahu",
    },
    {
      image: sofa,
      review: "Great Product with minimal design.",
      name: "Nilesh Prajapati",
    },
    {
      image: table,
      review: "Great Product with minimal design.",
      name: "Rahul Raj",
    },
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

  const responsive_Insta = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
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
    <>
      <title>Home</title>

      {/* Banner  */}

      <Grid container className="banner">
        <Grid item xs={6} md={12} className="banner-text">
          <Typography className="text-1">One-of-a-king</Typography>
          <Typography className="text-2">FURNITURE SHOP!</Typography>
          <Typography className="text-3">
            We bet you can't find an identical piece, <br></br> any where in the
            world
          </Typography>
          <Button sx={{ margin: "5px" }} small={"true"} variant="outlined">
            Shop Now
          </Button>
        </Grid>
      </Grid>

      {/* Ends Banner  */}



      {/* Shop by room  */}

      <Grid container className="SBR">
        <Grid item xs={12}>
          <Typography className="heading2" variant="h4">
            Shop By Room
          </Typography>
        </Grid>
        <Grid item xs={10} className=" center-SBR" md={2.7}>
          <img className="image" src={living} alt="living" />
          <Typography className="sub-heading" variant="h5">
            Living Room
          </Typography>
        </Grid>
        <Grid item xs={10} className=" center-SBR" md={2.7}>
          <img className="image" src={wfh} alt="WFH" />
          <Typography className="sub-heading" variant="h5">
            Work From Home
          </Typography>
        </Grid>
        <Grid item xs={10} className=" center-SBR" md={2.7}>
          <img className="image" src={bedroom} alt="bedroom" />
          <Typography className="sub-heading" variant="h5">
            Bedroom
          </Typography>
        </Grid>
        <Grid item xs={10} className=" center-SBR" md={2.7}>
          <img className="image" src={dining} alt="bedroom" />
          <Typography className="sub-heading" variant="h5">
            Dining And Bar
          </Typography>
        </Grid>
      </Grid>

      {/* Shop by room Ends */}

      {/* Shop by Furniture */}

      <Grid container className="SBF">
        <Grid item xs={12}>
          <Typography className="heading underline" variant="h4">
            Shop By Furniture
          </Typography>
        </Grid>
        <Grid item xs={12} className="image center-SBR" md={3.5}>
          <img className="image" src={dressingTable} alt="living" />
          <Typography className="sub-heading" variant="h5">
            Dressing Table
          </Typography>
        </Grid>
        <Grid item xs={12} className="image center-SBR" md={3.5}>
          <img className="image" src={cabinet} alt="WFH" />
          <Typography className="sub-heading" variant="h5">
            Cabinet
          </Typography>
        </Grid>
        <Grid item xs={12} className="image center-SBR" md={3.5}>
          <img className="image" src={dining2} alt="bedroom" />
          <Typography className="sub-heading" variant="h5">
            Dining Set
          </Typography>
        </Grid>
        <Grid item xs={12} className="image center-SBR" md={3.5}>
          <img className="image" src={fruitCabinet} alt="bedroom" />
          <Typography className="sub-heading" variant="h5">
            Fruit & Vegetable Cabinet
          </Typography>
        </Grid>
        <Grid item xs={12} className="image center-SBR" md={3.5}>
          <img className="image" src={sofa} alt="bedroom" />
          <Typography className="sub-heading" variant="h5">
            Sofa
          </Typography>
        </Grid>
        <Grid item xs={12} className="image center-SBR" md={3.5}>
          <img className="image" src={drawerChest} alt="bedroom" />
          <Typography className="sub-heading" variant="h5">
            Drawer's Cabinet
          </Typography>
        </Grid>
        <Grid item xs={12} className="image center-SBR" md={3.5}>
          <img className="image" src={bed} alt="bedroom" />
          <Typography className="sub-heading" variant="h5">
            Bed
          </Typography>
        </Grid>
        <Grid item xs={12} className="image center-SBR" md={3.5}>
          <img className="image" src={swing} alt="bedroom" />
          <Typography className="sub-heading" variant="h5">
            Swing (Jhula)
          </Typography>
        </Grid>
        <Grid item xs={12} className="image center-SBR" md={3.5}>
          <Grid container className="SBF">
            <Grid item xs={12} md={5} className="image center-SBR">
              <img src={table} alt="bedroom" />
              <Typography className="sub-heading" variant="h6">
                Table
              </Typography>
            </Grid>
            <Grid item xs={12} md={5} className="image center-SBR">
              <img src={chire} alt="bedroom" />
              <Typography className="sub-heading" variant="h6">
                Chair
              </Typography>
            </Grid>
            <Grid item xs={12} className="image center-SBR">
              <img className="image" src={room} alt="bedroom" />
              <Typography className="sub-heading" variant="h6">
                Furniture Means Wood
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Shop by Furniture Ends */}

      {/* Service */}

      <Grid container className="service">
        <Grid item xs={12} sx={{ boxShadow: 1 }} className="text-col">
          <Typography variant="h6">
            We Ship International Also. Please Visit the Page for More Info
            <span className="link"> International Shipping </span>{" "}
            +91-9509658944, +91-8587918978
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container className="service-images">
            <Grid item xs={10} className="center-SBR" md={2.7}>
              <img className="image" src={perfaction} alt="living" />
              <Typography className="sub-heading" variant="h5">
                Perfection by Hand
                <Typography variant="h6">
                  Not only it takes years to learn, but Lots of efforts to
                  achieve the quality and precision.
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={10} className=" center-SBR" md={2.7}>
              <img className="image" src={delivery} alt="WFH" />
              <Typography className="sub-heading" variant="h5">
                Safe Delivery Promise
                <Typography variant="h6">
                  We have done countless test to achieve 98% Safe Delivery
                  without any damage.{" "}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={10} className=" center-SBR" md={2.7}>
              <img className="image" src={quality} alt="bedroom" />
              <Typography className="sub-heading" variant="h5">
                Quality Traditional
                <Typography variant="h6">
                  We Focus on improving on daily basis. Learning from Good & Bad
                  experience to enhance our offering and quality.
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={10} className=" center-SBR" md={2.7}>
              <img className="image" src={woodFurniture} alt="bedroom" />
              <Typography className="sub-heading" variant="h5">
                Furniture At A Price
                <Typography variant="h6">
                  In this competitive age, Getting a Piece of furniture at Great
                  price is easy and good quality.
                </Typography>
              </Typography>
            </Grid>

            {/* Trending Category */}
            <Grid item xs={12}>
              <Typography className="heading underline" variant="h4">
                Trending Categories
              </Typography>
            </Grid>
            <Grid item xs={12} className="TC">
              <Carousel
                keyBoardControl={true}
                ssr={true}
                responsive={responsive_TC}
              >
                {items.map((data, i) => {
                  return (
                    <Card key={i} className="card" sx={{ maxWidth: 300, boxShadow: 0 }}>
                      <CardActionArea>
                        <CardMedia
                          className="cardMedia"
                          component="img"
                          height={200}
                          image={Object.values(data.image)}
                          alt="green iguana"
                        />
                      </CardActionArea>
                      <CardActions className="center-TC">
                        <Typography sx={{ float: "start" }} className="sub-heading" variant="h6">
                          {data.name}
                        </Typography>
                        <Button
                          sx={{ float: "end" }}
                          size="small"
                          variant="outlined"
                        >
                          Shop Now
                        </Button>
                      </CardActions>
                    </Card>
                  );
                })}
              </Carousel>
            </Grid>
            {/* Trending Category Ends*/}
          </Grid>
        </Grid>
      </Grid>

      {/* Service  Ends */}

      {/* Video */}

      <Grid container id='video' className="video">
        <Grid
          item
          xs={12}
          className="video-text"
          variant="h4"
        >
          <Typography className="heading" variant="h4">
            Watch This Video
          </Typography>
        </Grid>
        <Grid item xs={12} className="center-Video">
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/OF2x1fx2rDE"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </Grid>
      </Grid>
      {/* Video ENDs */}

      {/* banner Slider */}
      <Grid container className="slider">
        <Grid item xs={12}>
          <Slider autoplay={3000} className="center">
            {content.map((article, index) => (
              <div
                key={index}
                className="sliderBanner"
                style={{
                  backgroundImage: `url('${article}')`,
                  backgroundSize: "100vw 100%",
                  backgroundRepeat: "no-repeat",
                  height: "30rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {index === 0 && (
                  <Grid container className="bannerText">
                    <Grid item xs={6} md={4}>
                      <Typography variant="h5" className="banner1Text1">
                        Warranty against manufacturing defects or damage during
                        transit
                      </Typography>
                      <Typography variant="h5" className="banner1Text2">
                        Transit Warranty
                      </Typography>
                      <Button
                        size="medium"
                        variant="outlined"
                        endIcon={<ArrowForwardIcon />}
                        sx={{ margin: "5px 0px" }}
                      >
                        Shop Now
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </div>
            ))}
          </Slider>
        </Grid>
      </Grid>
      {/* banner Slider EDNs */}

      {/* Let Customers Speak for us */}
      <Grid container className="customer">
        <Grid
          item
          xs={12}
          className=" video-text"
        >
          <Typography className="heading underline" variant="h4">
            Customers Testimonial
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Carousel
            dotListClass="custom-dot-list-style"
            keyBoardControl={true}
            autoPlaySpeed={1000}
            ssr={true}
            responsive={responsive}
          >
            {customer.map((article, index) => {
              return (
                <Card key={index} className="card" sx={{ maxWidth: 400, boxShadow: 3 }}>
                  <CardActionArea>
                    <CardMedia
                      className="cardMedia"
                      component="img"
                      height="150"
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

      {/* Let Customers Speak for us end */}
      <br></br>
      {/* Instagram Section  */}

      <Grid className="instaSection" container>
        <Grid item xs={12}>
          <Typography className="heading underline" variant="h4">
            Woodsala on Instagram
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Carousel
            dotListClass="custom-dot-list-style"
            keyBoardControl={true}
            autoPlaySpeed={1000}
            ssr={true}
            responsive={responsive_Insta}
          >
            {instaPost.map((article, index) => {
              return (
                <Card key={index} className="card" sx={{ maxWidth: 200 }}>
                  <CardActionArea>
                    <CardMedia
                      className="cardMedia"
                      component="img"
                      height={200}
                      image={article}
                      alt="green iguana"
                    />
                  </CardActionArea>
                </Card>
              );
            })}
          </Carousel>
          {/* <Grid sx = {{gap : "20px", padding : '0px 8px '}} container >
            {instaPost.map((post,index)=>{
              return <Grid item xs = {12} key = {index} md = {2}>
                <img src={post} className = 'image'  alt="instaPost" />
              </Grid>

            })} */}
          {/* </Grid> */}
        </Grid>
      </Grid>
      {/* Instagram Section Ends */}

      {/* From The Journal */}
      <Grid container className="journalSec">
        <Grid item xs={12}>
          <Typography className="heading underline" variant="h4">
            From the journal
          </Typography>
        </Grid>
        <Grid item xs={12} md={7} className="FJ-items">
          <img className="image" src={FJ3} alt="FJ_Image" />
          <Typography variant="caption">May, 28</Typography>
          <Typography variant="h5">
            A Complete Room-Wise Interior Furniture Design Guide
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container sx={{ gap: "15px" }}>
            <Grid item xs={12}>
              <img src={FJ2} className="image" alt="FJ_Image" />
              <Typography variant="caption">May, 28</Typography>
              <Typography variant="h5">
                Creative Ways to Design a Study Table for your Kids
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <img src={FJ1} className="image" alt="FJ_Image" />
              <Typography variant="caption">May, 28</Typography>
              <Typography variant="h5">
                The Ultimate Guide to Installing Wooden Kitchen Cabinets
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* From The Journal Ends */}

      {/* Enjoy the hassle-free experience of buying furniture online */}

      <Grid container className="thoughts">
        <Grid item xs={12}>
          <Typography variant="h4" className="heading underline">
            Enjoy the hassle-free experience of buying furniture online
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container sx={{ padding: "0% 2%", gap: "15px" }}>
            <Grid item xs={12}>
              <Typography variant="body1">
                Picking wooden furniture online was never this easy! Exquisitely
                carved wooden furniture is an intrinsic part of the Indian
                aesthetic and your home will be incomplete without it. They
                evoke childhood memories and link you to your roots and culture.
                Now you can pick from our outstanding catalogue of wooden
                furniture to truly enliven your living space. It is easy,
                reliable and trustworthy.{" "}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">
                WHY BUY YOUR WOODEN FURNITURE ONLINE?
              </Typography>
              <Typography variant="body1">
                With wooden furniture, what you see is what you get – every
                painstakingly handcrafted detail intact. All you need to do is
                to keep the dimensions you are looking for ready, so you can
                make the perfect choice. So, why spend your time tackling
                traffic, crowds and salespersons, when you can sit with your
                family in front of a laptop and pick out the right furniture for
                your house. With Pan-India delivery and free installation, we
                have made your shopping experience as seamless as possible. Our
                unmatched lifetime warranty symbolisms our trust in the quality
                we offer. And our thousands of happy customers over the past ten
                years will be happy to vouch for us.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">WHAT YOU CAN EXPECT FROM US</Typography>
              <Typography variant="body1">
                In one word – quality. Outstanding design, impeccable
                craftsmanship and absolutely professional service, if you want
                us to elaborate. Woodsala’s furniture is made from the most
                prized teak wood and solid wood. Genuine woods of the highest
                quality go into the hands of our expert craftsmen who turn each
                piece into a masterpiece.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">
                CHECK OUT OUR ENTIRE CATALOGUE – RIGHT NOW!
              </Typography>
              <Typography variant="body1">
                Browse through our extensive catalogue of beds, sofas, bedroom
                furniture, dining table sets, jewellery boxes, artistically
                carved mirrors, cabinets, tables and more. Explore wooden
                furniture by room or style for a customised space that adapts to
                your personal taste. If you are looking at setting up a home
                office, we have an outstanding array of work desks and chairs to
                choose from. Go through our well-crafted and ergonomic designs
                and find that perfect fit.V
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Enjoy the hassle-free experience of buying furniture online  ENDS*/}
    </>
  );
}
