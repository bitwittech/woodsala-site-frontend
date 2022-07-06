import React, { useState } from "react";
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
} from "@mui/material";

//css
import "../asset/css/categories.css";
import "react-multi-carousel/lib/styles.css";

//image
import living from ".././asset/images/home/sofa_SBR.png";
import wfh from ".././asset/images/home/table_SBR.png";
import bedroom from ".././asset/images/home/bedroom_SBR.png";
import dining from ".././asset/images/home/dining_SBR.png";

// icon
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";

export default function Categories() {
  const items = [
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

  const [expanded, setExpanded] = useState("");

  // State
  const [filterShow, setFilter] = useState(false);

  // handle accordians
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <title>Categories</title>

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
            {items.map((item, index) => {
              return (
                <Box key={index} className="card">
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
                    {item.name}
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
          <Grid container className = 'innerProductWrap' sx={{ gap: "15px" }}>
            {items.map((item, index) => {
              return (
                <Grid
                  item
                  key = {index}
                  className="productCard"
                  xs={window.innerWidth <= '600' ? 10 : 5.8}
                  sx={{ boxShadow: 2 }}
                  md={3.87}
                >
                  <Box>
                    <img src={item.image} alt="product_Images" />
                    <Grid container>
                      <Grid item xs={9}>
                        <Box className="productInfo">
                          <Typography variant="h5">{item.name}</Typography>
                          <Typography variant="body2">
                            Lorem ipsum dolor sit amet.
                          </Typography>
                          <Typography variant="h6">Rs.{item.price}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={3}>
                        <Box className="buttonAction">
                          <IconButton>
                            <AddShoppingCartOutlinedIcon></AddShoppingCartOutlinedIcon>
                          </IconButton>
                          <IconButton>
                            <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      {/* Main Container Ends */}
    </>
  );
}
