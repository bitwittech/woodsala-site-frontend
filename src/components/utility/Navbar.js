import React, { useState, useContext } from "react";
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
  Link,
  Drawer,
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
import MenuOpenTwoToneIcon from "@mui/icons-material/MenuOpenTwoTone";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
// image
import logo from "../../asset/images/logo.webp";
import home from "../../asset/images/hamburger/home.png";
import furniture from "../../asset/images/hamburger/furniture.png";
import all from "../../asset/images/hamburger/all.png";
import gift from "../../asset/images/hamburger/giffting.jpg";
import tranding from "../../asset/images/hamburger/traditional.jpg";
import useful from "../../asset/images/hamburger/useful.jpg";
import company from "../../asset/images/hamburger/company.png";
import kitchen from "../../asset/images/hamburger/kitchen.png";
import exclusive from "../../asset/images/hamburger/exclusive.png";

// css
import "../../asset/css/navbar.css";

// store  
import { Store } from '../../store/Context'
import { LogBox } from '../../store/Types'

export default function Navbar(props) {
  const [Ham, setHam] = useState(false);

  const { state, dispatch } = Store();

  const navBarComponent = ["/", "/checkout"];

  const handleChange = (e, newVal) => {
    props.history(newVal);
  };

  const handleLog = () => {
    state.Auth.isAuth ?
      props.history('/profile') :
      dispatch(
        {
          type: LogBox,
          payload: {
            open: true,
            type: 'logIn'
          }
        }
      )

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
                    <Tab
                      wrapped
                      label="Home"
                      icon={<img alt='home' src={home} />}
                      iconPosition="start"
                      component={Link}
                      value={navBarComponent[0]}
                      to={navBarComponent[0]}
                    />
                    <Tab
                      wrapped
                      label="Furniture"
                      component={Link}
                      icon={<img alt='home' src={furniture} />}
                      iconPosition="start"
                      value={navBarComponent[1]}
                      to={navBarComponent[1]}
                    />
                    <Tab
                      wrapped
                      label="Kitchen Items"
                      icon={<img alt='home' src={kitchen} />}
                      iconPosition="start"
                      component={Link}
                      value={navBarComponent[1]}
                      to={navBarComponent[1]}
                    />
                    <Tab
                      wrapped
                      label="Gifting"
                      icon={<img alt='home' src={gift} />}
                      iconPosition="start"
                      component={Link}
                      value={navBarComponent[1]}
                      to={navBarComponent[1]}
                    />
                    <Tab
                      wrapped
                      icon={<img alt='home' src={exclusive} />}
                      iconPosition="start"
                      label="Exclusive"
                      component={Link}
                      value={navBarComponent[1]}
                      to={navBarComponent[1]}
                    />
                    <Tab
                      wrapped
                      label="Useful Products"
                      icon={<img alt='home' src={useful} />}
                      iconPosition="start"
                      component={Link}
                      value={navBarComponent[1]}
                      to={navBarComponent[1]}
                    />
                    <Tab
                      wrapped
                      icon={<img alt='home' src={tranding} />}
                      iconPosition="start"
                      label="Traditional"
                      component={Link}
                      value={navBarComponent[1]}
                      to={navBarComponent[1]}
                    />
                    <Tab
                      wrapped
                      icon={<img alt='logo' src={company} />}
                      iconPosition="start"
                      label="Company"
                      component={Link}
                      value={navBarComponent[1]}
                      to={navBarComponent[1]}
                    />
                    <Tab
                      wrapped
                      label="Browse All"
                      icon={<img alt='logo' src={all} />}
                      iconPosition="start"
                      component={Link}
                      value={navBarComponent[1]}
                      to={navBarComponent[1]}
                    />
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
              <IconButton color="primary">
                <PersonOutlineOutlinedIcon onClick={handleLog} />
              </IconButton>
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
            <Tab
              wrapped
              label="Home"
              component={Link}
              value={navBarComponent[0]}
              to={navBarComponent[0]}
            />
            <Tab
              wrapped
              label="Furniture"
              component={Link}
              value={navBarComponent[1]}
              to={navBarComponent[1]}
            />
            <Tab
              wrapped
              label="Kitchen Items"
              component={Link}
              value={navBarComponent[1]}
              to={navBarComponent[1]}
            />
            <Tab
              wrapped
              label="Gifting"
              component={Link}
              value={navBarComponent[1]}
              to={navBarComponent[1]}
            />
            <Tab
              wrapped
              label="Exclusive"
              component={Link}
              value={navBarComponent[1]}
              to={navBarComponent[1]}
            />
            <Tab
              wrapped
              label="Useful Products"
              component={Link}
              value={navBarComponent[1]}
              to={navBarComponent[1]}
            />
            <Tab
              wrapped
              label="Traditional"
              component={Link}
              value={navBarComponent[1]}
              to={navBarComponent[1]}
            />
            <Tab
              wrapped
              label="Company"
              component={Link}
              value={navBarComponent[1]}
              to={navBarComponent[1]}
            />
            <Tab
              wrapped
              label="Browse All"
              component={Link}
              value={navBarComponent[1]}
              to={navBarComponent[1]}
            />
          </Tabs>
        </Grid>
        {/* ends main-2 link container */}


      </Grid>
    </>
  );
}
