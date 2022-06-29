import React from "react";
import {
  AppBar,
  Grid,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Box,
  Link
} from "@mui/material";

// icon
import FacebookOutlinedIcon from "../../asset/images/navbar/facebook.png";
import TwitterIcon from"../../asset/images/navbar/twitter.png";
import InstagramIcon from "../../asset/images/navbar/instagram.png";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// image
import logo from "../../asset/images/logo.webp";

// css
import "../../asset/css/navbar.css";

export default function Navbar(props) {

    const navBarComponent = ['/','/login']

    const handleChange = (e,newVal)=>{
      props.history(newVal)
    }

  return (
    <>
      <Grid container className="nav">
        {/* Black Top bar */}
        <Grid item xs={12} className="topBox">
          <Grid container>
            <Grid item xs={12} md={3} className="center">
              <Typography variant="caption">
                +91-9509658944, +91-8587918978
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} />
            <Grid item xs={12} md={3} className="center icons">
              <IconButton color="secondary" size="small">
                <img src={FacebookOutlinedIcon} alt="" />
                
              </IconButton>
              <IconButton color="secondary" size="small">
                <img src={TwitterIcon} alt="" />
                
              </IconButton>
              <IconButton color="secondary" size="small">
                <img src={InstagramIcon} alt="" />
                
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        {/* Ends Black Top bar */}

        {/* Brown Middle bar  */}
        <Grid item xs={12} className="secondBar">
          <Box>
          <Typography variant="body1">Blog Post &nbsp;&nbsp;</Typography>
          <Typography variant="body1">Review At Google &nbsp;&nbsp;</Typography>
          <Typography variant="body1">Videos &nbsp;&nbsp;</Typography>
          <Typography variant="body1">Website Review &nbsp;&nbsp;</Typography>
          <Typography  onClick = {()=>{props.history("/contact")}} variant="body1">Contact Us</Typography>
          </Box>
          <Typography variant="body2">T&C Apply</Typography>
        </Grid>
        {/* ends  Brown Middle bar  */}

        {/* main-1 Tab */}
        <Grid item xs={12}>
          <Grid container spacing={1} className="main-1">
            <Grid item xs={12} md={3} className="center">
              <img src={logo} alt="logo.png"></img>
            </Grid>
            <Grid item xs={10} md={6} className="center searchBar">
              <TextField
                id="input-with-icon-textfield"
                size="small"
                variant="outlined"
                fullWidth
                label="Search you happiness..."
                type="search"
                name="search"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {" "}
                      <IconButton color="primary" size="small">
                        <SearchOutlinedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3} className="center">
              <IconButton color="primary" >
                <PersonOutlineOutlinedIcon />
              </IconButton>
              <IconButton color="primary" >
                <FavoriteBorderOutlinedIcon />
              </IconButton>
              <IconButton color="primary" onClick = {()=>{props.history('/cart')}} >
                {window.location.pathname === '/cart' ? <ShoppingCartIcon/>  : <ShoppingCartOutlinedIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        {/* ends main-1 Tab */}

        {/* main-2 link container */}
        <Grid item xs={12} className = 'main-2'>
           <Tabs scrollButtons allowScrollButtonsMobile aria-label="scrollable auto tabs example"  variant="scrollable" onChange = {handleChange} value = {navBarComponent.includes(window.location.pathname) && window.location.pathname } color = 'primary'>
           <Tab label = 'Home'   component = {Link} value =  {navBarComponent[0]} to = {navBarComponent[0]} /> 
           <Tab label = 'Furniture' component = {Link} value =  {navBarComponent[1]} to = {navBarComponent[1]} /> 
           <Tab label = 'Kitchen Items' component = {Link} value =  {navBarComponent[1]} to = {navBarComponent[1]} /> 
           <Tab label = 'Gifting' component = {Link} value =  {navBarComponent[1]} to = {navBarComponent[1]} /> 
           <Tab label = 'Exclusive' component = {Link} value =  {navBarComponent[1]} to = {navBarComponent[1]} /> 
           <Tab label = 'Useful Products' component = {Link} value =  {navBarComponent[1]} to = {navBarComponent[1]} /> 
           <Tab label = 'Traditional' component = {Link} value =  {navBarComponent[1]} to = {navBarComponent[1]} /> 
           <Tab label = 'Company' component = {Link} value =  {navBarComponent[1]} to = {navBarComponent[1]} /> 
           <Tab label = 'Browse All' component = {Link} value =  {navBarComponent[1]} to = {navBarComponent[1]} /> 
           </Tabs>
        </Grid>
        {/* ends main-2 link container */}

      </Grid>
    </>
  );
}
