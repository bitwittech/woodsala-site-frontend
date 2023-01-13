import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import {Link} from 'react-router-dom'
import '../../asset/css/categories.css'
import { Helmet } from "react-helmet";

// images 
import bajot  from '../../asset/images/home/bajot_TC.png'
import bed from "../../asset/images/home/bed_SBF.png";
import cabinet from "../../asset/images/home/cabinet_SBF.png";
import chair from "../../asset/images/home/chire_SBF.png";
import drawerChest from "../../asset/images/home/drawerChest_SBF.png";
import dressingTable from "../../asset/images/home/dressingTable_SBF.png";
import fruitCabinet from "../../asset/images/home/fruitCabinet_SBF.png";
import sofa from "../../asset/images/home/sofa_SBF.png";
import swing from "../../asset/images/home/swing_SBF.png";
import table from "../../asset/images/home/table_SBF.png";
import box from "../../asset/images/home/Box.jpg";
import clock from "../../asset/images/category/clock.jpg";
import candle from "../../asset/images/category/candle.jpg";
import coster from "../../asset/images/category/coster.jpg";
import animalFigure from "../../asset/images/category/animalFigure.jpg";
import wall from "../../asset/images/category/wallDecor.jpg";

const Catagories = () => {


      const items = [
        {label : "Animal Figure" ,image :animalFigure, link : 'FruitCabinet' },
          {label : "Box" ,image : box , link : 'Box'},
          {label : "Bojot" ,image :bajot, link : 'FruitCabinet' },
          {label : "Bed" ,image :bed , link : 'Bed'},
          {label : "Cabinet" ,image :cabinet, link : 'Cabinet' } ,
          {label : "Clock" ,image :clock, link : 'FruitCabinet' },
          {label : "Chair" ,image :chair, link : 'Chair' } ,
          {label : "Candle Holder" ,image :candle, link : 'FruitCabinet' },
          {label : "Coster" ,image :coster, link : 'FruitCabinet' },
          {label : "Dressing Table" ,image : dressingTable, link : 'Table'},
        {label : "Drawer's Cabinet" ,image :drawerChest, link : 'Drawer' },
        {label : "Fruit & Vegetable Cabinet" ,image :fruitCabinet, link : 'FruitCabinet' },
        {label : "Sofa" ,image : sofa , link : 'Sofa'},
        {label : "Swing (Jhula)" ,image :swing, link : 'Jhula' },
        {label : "Table" ,image : table, link : 'Table'},
        {label : "Wall Decors" ,image :wall, link : 'FruitCabinet' },
      ]

     
    

    return (<>
     {/* helmet tag  */}
     <Helmet>
    <title>Categories</title>
    <meta name="description" content="This page contains list of vaiouse type stuff provided by Woodsala." />
    <meta name="keywords" content="category,wooden furniture category,online furniture category,which furniture store is the cheapest,search furniture category" />
    </Helmet>
    {/* helmet tag ends  */}
        <title>Categories</title>
        {/* {(meta)} */}
        {/* Main Container */}
        <Grid container sx={{ padding: "1%",gap : '50px' }}>
            {/* Banner */}
            <Grid item xs = {12}>
            <Grid container className="Banner">
                <Grid item xs={12}>
                    <Typography variant="h1">Categories</Typography>
                </Grid>
            </Grid>
            </Grid>
            {/* Banner Ends */}

            <Grid item className ='outerWrapper' xs = {12} >
                <Grid container className = 'cardWrapper'>
                {items.map((row)=>{
                    return <>
                    <Grid to = {`/product/${row.link}`} component = {Link} item className = 'catCard'  xs = {5.8} md = {2.85}>
                        <img src={row.image} alt="" />
                        <Typography className = 'cardTitle' variant = 'h5'>{row.label}</Typography>
                    </Grid>
                    </>
                })}
                </Grid>
            </Grid>


        </Grid>
    </>);
}

export default Catagories;
