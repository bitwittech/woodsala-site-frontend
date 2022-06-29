import React from "react";

//mui
import { Grid, Box, Typography, Button } from "@mui/material";

//css
import "../asset/css/categories.css";

//image
import living from ".././asset/images/home/sofa_SBR.png";
import wfh from ".././asset/images/home/table_SBR.png";
import bedroom from ".././asset/images/home/bedroom_SBR.png";
import dining from ".././asset/images/home/dining_SBR.png";
import group from ".././asset/images/category/group.png";
export default function Categories() {
  const imageArr = [
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

  return (
    <>
      <title>Categories</title>
      {/* Filter section  */}
      <Grid container className="filter">
        <Grid item xs={12}>
          <img src={group} className="image" alt="group" />
        </Grid>
      </Grid>
      {/* Filter section  ENDs*/}

      {/* Item Section */}

      <Grid container spacing={3} className="itemSec">
        {imageArr.map((item, index) => {
          return (
            <Grid item xs={12} md={3}>
              <Box className="custom">
                <img src={item.image} alt="images" className="image" />
                <Box className = 'cardAction'>
                <Typography variant = {"h6"}>
                  {item.name}
                  <Typography>Rs.{item.price}</Typography>
                </Typography>
                <Button small>Shop Now</Button>
                </Box>
                
              </Box>
            </Grid>
          );
        })}
      </Grid>
      {/* Item Section Ends */}
    </>
  );
}
