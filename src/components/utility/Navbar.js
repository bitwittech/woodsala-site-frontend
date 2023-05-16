/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useState, useMemo, useEffect } from "react";
import {
  Menu,
  MenuItem,
  Grid,
  Typography,
  IconButton,
  TextField,
  Autocomplete,
  Link,
  Box,
  Drawer,
  ListItemIcon,
  Badge,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
} from "@mui/material";

// import { Link as Jump } from "react-router-dom";

// icon
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FacebookOutlinedIcon from "../../asset/images/navbar/facebook.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReorderIcon from "@mui/icons-material/Reorder";
import TwitterIcon from "../../asset/images/navbar/twitter.png";
import InstagramIcon from "../../asset/images/navbar/instagram.png";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CancelIcon from "@mui/icons-material/Cancel";
// import MenuOpenTwoToneIcon from "@mui/icons-material/MenuOpenTwoTone";
// import CloseIcon from "@mui/icons-material/Close";
// import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
// import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
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
// import PersistData from "./PersistData";

// css
import "../../asset/css/navbar.css";

// // store
// import { Store } from '../../store/Context'
// import { LogBox, Auth, Notify } from '../../store/Types'

// services
import {
  addWshList,
  getSearchList,
  getWishList,
  addCartItem,
  getCartItem,
} from "../../service/service";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Action
import {
  setAlert,
  setAuth,
  setLoginModal,
  setCart,
  setList,
} from "../../Redux/action/action";

export default function Navbar(props) {
  // store
  // const { state, dispatch } = Store();

  // redux dispatch
  const dispatch = useDispatch();
  // state
  const { auth, cart, wishlist } = useSelector((state) => state);

  // stats for ham burgher icon
  const [Ham, setHam] = useState(false);
  const [anchor, setAnchorEl] = useState(null);
  const [show, setShow] = useState({
    furniture: false,
    kitchen: false,
    exclusive: false,
    gifting: false,
  });

  // state for search
  const [search, setSearch] = useState({
    searchList: [],
    searchParams: undefined,
  });

  // use Effect
  useMemo(() => {
    if (auth.isAuth) {
      if (wishlist.items.length > 0) {
        Promise.all(
          wishlist.items.map(
            async (row) =>
              await addWshList({
                CID: auth.CID,
                product_id: row.product_id,
                quantity: row.quantity,
              })
          )
        ).then(() => {
          getWishList(auth.CID).then((response) => {
            if (response.data.length > 0)
              dispatch(setList({ items: response.data }));
          });
        });
      } else {
        getWishList(auth.CID).then((response) => {
          if (response.data.length > 0)
            dispatch(setList({ items: response.data }));
        });
      }

      // for cart
      if (cart.items.length > 0) {
        Promise.all(
          cart.items.map(
            async (row) =>
              await addCartItem({
                CID: auth.CID,
                product_id: row.product_id,
                quantity: row.quantity,
              })
          )
        ).then(() => {
          getCartItem(auth.CID).then((response) => {
            if (response.data.length > 0)
              dispatch(setCart({ items: response.data }));
          });
        });
      } else {
        getCartItem(auth.CID).then((response) => {
          if (response.data.length > 0)
            dispatch(setCart({ items: response.data }));
        });
      }
    }
  }, [auth.isAuth]);

  const handleProfileIconClick = (event) => {
    auth.isAuth
      ? props.history("/profile")
      : dispatch(
          setLoginModal({
            open: true,
            type: "logIn",
          })
        );
  };

  // close menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // for profile view
  const handleLog = () => {
    auth.isAuth && props.history("/profile");

    return handleMenuClose();
  };

  // for logout
  const handleLogOut = async () => {
    localStorage.clear();

    dispatch(
      setAlert({
        variant: "success",
        message: "Logging Out !!!",
        open: true,
      })
    );

    await dispatch(
      setAuth({
        isAuth: false,
        CID: undefined,
        email: undefined,
        username: undefined,
        token: undefined,
      })
    );
    await dispatch(setCart({ items: [] }));

    handleMenuClose();

    return (window.location.href = "/");
  };

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

  // load new searchList
  const handleSearch = async (e) => {
    const delayDebounceFn = setTimeout(() => {
      getSearchList(e.target.value)
        .then((res) => {
          // (res.data)
          setSearch({
            searchParams: e.target.value,
            searchList: res.data || [],
          });
        })
        .catch((err) => {
          setSearch({
            searchParams: undefined,
            searchList: [],
          })("error for Navbar", err);
        });
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  };

  // firing search
  const fireSearchQuery = (e) => {
    if (e.key === "Enter") {
      return props.history(`/product/${e.target.value}/${e.target.value}`);
    }

    //  return props.history
  };
  //  all link
  const linkObject = {
    furniture: [
      { link: "/product/Bedroom Set", label: "Bedroom Set" },
      { link: "/product/Bed", label: "Bed" },
      { link: "/product/Cabinet", label: "Cabinet" },
      { link: "/product/Chair", label: "Chair" },
      { link: "/product/Dining Set", label: "Dining Set" },
      { link: "/product/Drawer's Chest", label: "Drawer's Chest" },
      { link: "/product/Dressing Table", label: "Dressing Table" },
      { link: "/product/Fruits & Vegetable", label: "Fruits & Vegetable" },
      { link: "/product/Table", label: "Table" },
      { link: "/product/Sofa", label: "Sofa" },
      { link: "/product/Swing", label: "Swing (Jhula)" },
    ],
    kitchen: [
      { link: "/product/Bowl", label: "Bowl" },
      { link: "/product/Coaster", label: "Coaster" },
      { link: "/product/Chopping Board", label: "Chopping Board" },
      { link: "/product/Glass", label: "Glass" },
      { link: "/product/Grinder", label: "Grinder" },
      { link: "/product/Rolling Pin", label: "Rolling Pin" },
      { link: "/product/Tray", label: "Tray" },
      { link: "/product/Spatula", label: "Spatula" },
    ],
    gifting: [
      { link: "/product/Animal Figurine", label: "Animal Figure" },
      { link: "/product/Clock", label: "Clock" },
      { link: "/product/Candle Holder", label: "Candle Holder" },
      { link: "/productCollectibles", label: "Collectibles" },
      { link: "/product/Wall Decor", label: "Wall Decor" },
      { link: "/product/Desk Organizer", label: "Desk Organizer" },
      { link: "/product/Desk Hook & Holder", label: "Hook & Holder" },
      { link: "/product/Rack", label: "Rack" },
      { link: "/product/Mirror", label: "Mirror" },
    ],
    exclusive: [
      { link: "/product/Bajot", label: "Bajot" },
      { link: "/product/Mirror", label: "Mirror" },
      { link: "/product/Silver Furniture", label: "Silver Furniture" },
      { link: "/product/Stool", label: "Wooden Stool" },
      { link: "/product/Box", label: "Box (Sanduk)" },
    ],
    useful: [
      { link: "/product/Stool", label: "Stool" },
      { link: "/product/Rack", label: "Rack" },
    ],
    traditional: [
      { link: "/product/Temple", label: "Temple" },
      { link: "/product/Traditional Decor", label: "Traditional Decor" },
    ],
    company: [{ link: "/product", label: "ex" }],
  };

  // show and hide of dropdown
  function handleDropdown(tab) {
    return setShow((old) => ({ ...old, [tab]: !old[tab] }));
  }
  // generate label link under dropdown
  function generate(tab = undefined) {
    return (
      <ListItem disablePadding className="listItem">
        {tab &&
          linkObject[tab].map((row, index) => (
            <ListItemButton
              key={index}
              fullWidth
              component={Link}
              to={row.link}
            >
              {" "}
              <ListItemText primary={row.label} />
            </ListItemButton>
          ))}
      </ListItem>
    );
  }

  return (
    <>
      {/* // this component controls the dat persistance */}
      {/* <PersistData /> */}
      <Grid container className="nav">
        {/* Black Top bar */}
        <Grid item xs={12} className="topBox">
          <Grid container>
            <Grid item xs={12} md={3} className="center">
              <Typography variant="button">
                +91-8587918978, 9509658944 (WhatsApp)
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} />
            <Grid item xs={12} md={3} className="center icons">
              <IconButton
                target="_blank"
                href="https://www.facebook.com/onlinewoodsala"
                component={Link}
                color="secondary"
                size="small"
              >
                <img src={FacebookOutlinedIcon} alt="" />
              </IconButton>
              <IconButton
                target="_blank"
                component={Link}
                href="https://twitter.com/onlinewoodsala"
                color="secondary"
                size="small"
              >
                <img src={TwitterIcon} alt="" />
              </IconButton>
              <IconButton
                target="_blank"
                color="secondary"
                component={Link}
                href="https://www.instagram.com/woodsala/"
                size="small"
              >
                <img src={InstagramIcon} alt="" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        {/* Ends Black Top bar */}

        {/* Brown Middle bar  */}
        <Grid item xs={12} className="secondBar">
          <Box>
            <Typography
              onClick={() => {
                props.history("/blog");
              }}
              variant="body1"
            >
              Blog Post &nbsp;&nbsp;
            </Typography>
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

        {/* main-1 search bar Tab */}
        <Grid item xs={12}>
          <Grid container spacing={1} className="main-1">
            {/* logo */}
            <Grid item xs={2} className="logo">
              <img
                src={logo}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  props.history("/");
                }}
                alt="logo.png"
              ></img>
            </Grid>

            {/* button  */}
            <Grid item xs={10} sx={{ gap: "10px" }} className="mobile">
              <IconButton color="primary" onClick={handleProfileIconClick}>
                <PersonOutlineOutlinedIcon />
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
                  <Badge badgeContent={cart.items.length} color="primary">
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                )}
              </IconButton>
              {/* <IconButton
                onClick={() => {
                  props.history("/wishlist");
                }}
                color="primary"
              >
                {window.location.pathname === "/wishlist" ? (
                  <FavoriteIcon />
                ) : (
                  <Badge badgeContent={wishlist.items.length} color="primary">
                    <FavoriteBorderOutlinedIcon />
                  </Badge>
                )}
              </IconButton> */}

              <IconButton
                onClick={() => {
                  setHam(true);
                }}
                color="primary"
              >
                <ReorderIcon sx={{ fontSize: 25 }} />
              </IconButton>
            </Grid>

            {/* bar  */}
            <Grid item xs={10} md={4} className="searchBar">
              <Autocomplete
                freeSolo
                size="small"
                fullWidth
                noOptionsText={"Search..."}
                autoHighlight
                onKeyPress={fireSearchQuery}
                clearOnEscape
                id="combo-box-demo"
                options={search.searchList.map((row) => {
                  return row.product_title;
                })}
                // sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    onKeyUpCapture={handleSearch}
                    // value = {search.searchParams || ''}
                    // onChange = {}
                    {...params}
                    label="Search"
                  />
                )}
              />
              {/* <TextField
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
              /> */}
            </Grid>
            {/* button above 800px */}
            <Grid item xs={12} md={6} sx={{ gap: "10px" }} className="right">
              <Button
                color="primary"
                startIcon={<PersonOutlineOutlinedIcon />}
                onClick={handleProfileIconClick}
              >
                Account
              </Button>
              <MenuBox></MenuBox>

              <Button
                startIcon={
                  window.location.pathname === "/cart" ? (
                    <ShoppingCartIcon />
                  ) : (
                    <Badge badgeContent={cart.items.length} color="primary">
                      <ShoppingCartOutlinedIcon />
                    </Badge>
                  )
                }
                color="primary"
                onClick={() => {
                  props.history("/cart");
                }}
              >
                Cart
              </Button>
              <Button
                onClick={() => {
                  props.history("/wishlist");
                }}
                color="primary"
                startIcon={
                  window.location.pathname === "/wishlist" ? (
                    <FavoriteIcon />
                  ) : (
                    <Badge badgeContent={wishlist.items.length} color="primary">
                      <FavoriteBorderOutlinedIcon />
                    </Badge>
                  )
                }
              >
                Wishlist
              </Button>
            </Grid>
            {/* <Grid item xs={12}>
            </Grid> */}
          </Grid>
        </Grid>

        {/* ends main-1 search bar Tab */}

        {/* main-2 link container */}
        {/* <Grid item xs={12} className="main-2">
          <Tabs
          scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable auto tabs example"
            variant="scrollable"
            onChange={handleChange}
            value={
            navBarComponent.includes(window.location.pathname.replace('%20',' ').replace('%22',' ')) && window.location.pathname.replace('%20',' ').replace('%22',' ') 
            }
            color="primary"
          >

    {navBarLabel.map((tab,index)=><Tab
    key = {index}
              wrapped
              label={tab}
              component={Link}
              value={navBarComponent[index]}
              to={navBarComponent[index]}
            />)}
            
          </Tabs>
        </Grid> */}
        {/* ends main-2 link container */}
        <Grid item xs={10} className="main-2">
          <Grid container className="dropdown-wrapper">
            <Grid item>
              <Button onClick={() => props.history("/")} className="btn">
                Home
              </Button>
            </Grid>
            <Grid item>
              <Box
                onMouseOver={() => handleDropdown("furniture")}
                onMouseOut={() => handleDropdown("furniture")}
              >
                <Button className="btn">Furniture</Button>
                <List
                  sx={{ display: show.furniture ? "block" : "none" }}
                  dense={true}
                  className="listBox"
                >
                  {generate("furniture")}
                </List>
              </Box>
            </Grid>
            <Grid item>
              <Box
                onMouseOver={() => handleDropdown("kitchen")}
                onMouseOut={() => handleDropdown("kitchen")}
              >
                <Button className="btn">Kitchen Item's</Button>
                <List
                  sx={{ display: show.kitchen ? "block" : "none" }}
                  dense={true}
                  className="listBox"
                >
                  {generate("kitchen")}
                </List>
              </Box>
            </Grid>
            <Grid item>
              <Box
                onMouseOver={() => handleDropdown("gifting")}
                onMouseOut={() => handleDropdown("gifting")}
              >
                <Button className="btn">Gifting</Button>
                <List
                  sx={{ display: show.gifting ? "block" : "none" }}
                  dense={true}
                  className="listBox"
                >
                  {generate("gifting")}
                </List>
              </Box>
            </Grid>
            <Grid item>
              <Box
                onMouseOver={() => handleDropdown("exclusive")}
                onMouseOut={() => handleDropdown("exclusive")}
              >
                <Button className="btn">Exclusive</Button>
                <List
                  sx={{ display: show.exclusive ? "block" : "none" }}
                  dense={true}
                  className="listBox"
                >
                  {generate("exclusive")}
                </List>
              </Box>
            </Grid>
            <Grid item>
              <Box
                onMouseOver={() => handleDropdown("useful")}
                onMouseOut={() => handleDropdown("useful")}
              >
                <Button className="btn">Useful Products</Button>
                <List
                  sx={{ display: show.useful ? "block" : "none" }}
                  dense={true}
                  className="listBox"
                >
                  {generate("useful")}
                </List>
              </Box>
            </Grid>
            <Grid item>
              <Box
                onMouseOver={() => handleDropdown("traditional")}
                onMouseOut={() => handleDropdown("traditional")}
              >
                <Button className="btn">Traditional</Button>
                <List
                  sx={{ display: show.traditional ? "block" : "none" }}
                  dense={true}
                  className="listBox"
                >
                  {generate("traditional")}
                </List>
              </Box>
            </Grid>
            <Grid item>
              <Box
                onMouseOver={() => handleDropdown("company")}
                onMouseOut={() => handleDropdown("company")}
              >
                <Button className="btn">Company</Button>
                <List
                  sx={{ display: show.company ? "block" : "none" }}
                  dense={true}
                  className="listBox"
                >
                  {generate("company")}
                </List>
              </Box>
            </Grid>
            <Grid item>
              <Button
                onClick={() => props.history("/collection")}
                className="btn"
              >
                Browse All
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <HamBurgerMenu
        setHam={setHam}
        Ham={Ham}
        history={props.history}
        linkObject={linkObject}
      />
    </>
  );
}

function HamBurgerMenu({ Ham, setHam, history, linkObject }) {
  const [renderList, setList] = useState({ open: false, list: [] });
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

  useEffect(() => {
    setHam(false);
  }, [window.location.pathname]);

  const navBarLabel = [
    "Home",
    "Furniture",
    "Kitchen Items",
    "Gifting",
    "Exclusive",
    "Useful Products",
    "Traditional",
    "Company",
    "Browse All",
  ];

  const handleClick = (tab) => {
    // console.log(linkObject[tab.toLowerCase()]);
    if (tab === "Kitchen Items") {
      setList({
        open: !renderList.open,
        list: linkObject.kitchen,
        label: tab,
      });
    } else if (tab === "Home") {
      history("/");
    } else if (tab === "Browse All") {
      history("/collection");
    } else if (tab === "Useful Products") {
      setList({
        open: !renderList.open,
        list: linkObject.useful,
        label: tab,
      });
    } else {
      setList({
        open: !renderList.open,
        list: linkObject[tab.toLowerCase()],
        label: tab,
      });
    }
  };

  return (
    <>
      <Drawer
        className="hamburgerPanel"
        anchor={"right"}
        open={Ham}
        onClose={() => {
          setHam(false);
        }}
      >
        <IconButton
          p={1}
          color="primary"
          onClick={() => {
            setHam(false);
          }}
        >
          <CancelIcon />
        </IconButton>
        <List>
          {navBarLabel.map((text, index) => (
            <>
              <ListItem
                key={text}
                disablePadding
                onClick={() => {
                  handleClick(text);
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <img alt="home" src={navBarImage[index]} />
                  </ListItemIcon>
                  <ListItemText sx={{ fontSize: "1.5rem" }} primary={text} />
                  {text !== "Home" && text !== "Browse All" ? (
                    renderList.open ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : (
                    ""
                  )}
                </ListItemButton>
              </ListItem>
              {(text !== "Home" || text !== "Browse All") && (
                <Collapse
                  in={renderList.open && renderList.label === text}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {renderList.list.map((row, index) => (
                      <ListItemButton
                        component={Link}
                        to={row.link}
                        key={index}
                        sx={{ pl: 4 }}
                      >
                        <ListItemText primary={row.label} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </>
          ))}
        </List>
      </Drawer>
    </>
  );
}
