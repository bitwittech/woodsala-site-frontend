import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  Grid,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Box,
  Link,
  Drawer,
  ListItemIcon
} from "@mui/material";

// icon
import FacebookOutlinedIcon from "../../asset/images/navbar/facebook.png";
import TwitterIcon from "../../asset/images/navbar/twitter.png";
import InstagramIcon from "../../asset/images/navbar/instagram.png";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// import MenuOpenTwoToneIcon from "@mui/icons-material/MenuOpenTwoTone";
// import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
// image
import logo from "../../asset/images/logo.webp";
import home from "../../asset/images/hamburger/home.png";
import furniture from "../../asset/images/hamburger/furniture.png";
import all from "../../asset/images/hamburger/all.png";
import gift from "../../asset/images/hamburger/giffting.jpg";
import trading from "../../asset/images/hamburger/traditional.jpg";
import useful from "../../asset/images/hamburger/useful.jpg";
import company from "../../asset/images/hamburger/company.png";
import kitchen from "../../asset/images/hamburger/kitchen.png";
import exclusive from "../../asset/images/hamburger/exclusive.png";

// persistData
import PersistData from "./PersistData";

// css
import "../../asset/css/navbar.css";

// store  
import { Store } from '../../store/Context'
import { LogBox, Auth, Notify } from '../../store/Types'

export default function Navbar(props) {
// store 
  const { state, dispatch } = Store();

  // stats for ham burgher icon 
  const [Ham, setHam] = useState(false);

  const [anchor, setAnchorEl] = useState(null);


  
  const handleProfileIconClick = (event) => {
   state.Auth.isAuth? setAnchorEl(event.currentTarget) : dispatch(
    {
      type: LogBox,
      payload: {
        open: true,
        type: 'logIn'
      }
    }
  ) ;
  };

  // close menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navBarComponent = ["/", 
  "/categories",
  "/categories",
  "/categories",
  "/categories",
  "/categories",
  "/categories",
  "/categories",
  "/categories",
  "/categories",
];
  const navBarImage = [
    home,
    furniture,
    kitchen,
    gift,
    exclusive,
    useful,
    trading,
    company,
    all,
  ];

  const navBarLabel = [
    'Home',
    'Furniture',
    'Kitchen Items',
    'Gifting',
    'Exclusive',
    'Useful Products',
    'Traditional',
    'Company',
    'Browse All',];

  // for nav route
  const handleChange = (e, newVal) => {
    props.history(newVal);

  };


  // for profile view
  const handleLog = () => {
    state.Auth.isAuth &&
      props.history('/profile') 
   

    return handleMenuClose();

  }

  // for logout 
  const handleLogOut = async () => {
    localStorage.clear();

    dispatch({
      type: Notify,
      payload: {
        variant: 'success',
        message: 'Logging Out !!!',
        open: true
      }
    })

    await dispatch({
      type: Auth,
      payload: {
        isAuth: false,
        CID: undefined,
        email: undefined,
        username: undefined,
        token: undefined
      }
    })

    handleMenuClose();

    return props.history('/')

  }

  // menu box 
  function MenuBox() {
    return (
      <Menu
        id={"menu"}
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleLog}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemIcon>Profile</ListItemIcon>
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemIcon>Logout</ListItemIcon>
        </MenuItem>
      </Menu>
    );
  }

  return (
    <>
      <PersistData />
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
            <Typography variant="body1">
              Review At Google &nbsp;&nbsp;
            </Typography>
            <Typography variant="body1">Videos &nbsp;&nbsp;</Typography>
            <Typography variant="body1">Website Review &nbsp;&nbsp;</Typography>
            <Typography
              onClick={() => {
                props.history("/contact");
              }}
              variant="body1"
            >
              Contact Us
            </Typography>
          </Box>
          <Typography variant="body2">T&C Apply</Typography>
        </Grid>
        {/* ends  Brown Middle bar  */}

        {/* hamburger active of 800px  */}
        <Grid item xs={12} className="hamburgerContainer">
          <Grid container>
            <Grid sx={{ justifyContent: 'center', display: 'flex' }} item xs={12} className="hamburgerButton">
              <IconButton onClick={() => {
                setHam(true);
              }} color="primary" size="large">
                < ExpandLessOutlinedIcon
                  sx={{ fontSize: 25 }}

                />
              </IconButton>
              <Drawer
                className="hamburgerPanel"
                anchor={"bottom"}
                open={Ham}
                onClose={() => {
                  setHam(false);
                }}
              >
                <IconButton
                  sx={{ justifyContent: "center" }}
                  color="primary"
                  onClick={() => {
                    setHam(false);
                  }}
                >
                  <ExpandMoreOutlinedIcon
                    sx={{ fontSize: 25 }}

                  />
                </IconButton>

                <Grid item xs={12} className='hamburgerPanel'>
                  <Tabs
                    orientation="vertical"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="auto tabs example"
                    onChange={handleChange}
                    value={
                      navBarComponent.includes(window.location.pathname) &&
                      window.location.pathname
                    }
                    color="primary"
                    
                  >
                    {
                      navBarLabel.map((tag,index)=><Tab
                      wrapped
                      label={tag}
                      icon={<img alt='home' src={navBarImage[index]} />}
                      iconPosition="start"
                      component={Link}
                      value={navBarComponent[index]}
                      to={navBarComponent[index]}
                      onClick = {()=>{setHam(false)}}
                    />)
                    }
                   
                  </Tabs>
                </Grid>
              </Drawer>
            </Grid>
          </Grid>
        </Grid>
        {/* hamburger ends */}


        {/* main-1 Tab */}
        <Grid item xs={12}>
          <Grid container spacing={1} className="main-1">
            <Grid item xs={12} md={3} className="center">
              <img src={logo} style = {{cursor : 'pointer'}} onClick= {()=>{props.history('/')}} alt="logo.png"></img>
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
              <IconButton color="primary" onClick={handleProfileIconClick }>
                <PersonOutlineOutlinedIcon />
              </IconButton>
              <MenuBox></MenuBox>
              <IconButton color="primary">
                <FavoriteBorderOutlinedIcon />
              </IconButton>
              <IconButton
                color="primary"
                onClick={() => {
                  props.history("/cart");
                }}
              >
                {window.location.pathname === "/cart" ? (
                  <ShoppingCartIcon />
                ) : (
                  <ShoppingCartOutlinedIcon />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        {/* ends main-1 Tab */}

        {/* main-2 link container */}
        <Grid item xs={12} className="main-2">
          <Tabs
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable auto tabs example"
            variant="scrollable"
            onChange={handleChange}
            value={
              navBarComponent.includes(window.location.pathname) &&
              window.location.pathname
            }
            color="primary"
          >

    {navBarLabel.map((tab,index)=><Tab
              wrapped
              label={tab}
              component={Link}
              value={navBarComponent[index]}
              to={navBarComponent[index]}
            />)}
            
          </Tabs>
        </Grid>
        {/* ends main-2 link container */}


      </Grid>
    </>
  );
}
