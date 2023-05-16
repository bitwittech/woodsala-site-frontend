/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Typography, Box, Grid } from "@mui/material";

// My components
import { Helmet } from "react-helmet";

// images
import profile from "../../asset/images/profile/profile.svg";
import address from "../../asset/images/profile/address.svg";
import contact from "../../asset/images/profile/contact.svg";
import order from "../../asset/images/profile/order.svg";
import wishlist from "../../asset/images/profile/wishlist.svg";
import logout from "../../asset/images/profile/logout.svg";

// css
import "../../asset/css/profile.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, setAuth } from "../../Redux/action/action";

const Profile = ({ history }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const tabs = [
    {
      description: "All order details and order information.",
      link: "/order",
      image: order,
      title: "Your Orders",
    },
    {
      description: "Your account information stays here.",
      link: "/account",
      image: profile,
      title: "Your Account",
    },
    {
      description: "Address details",
      link: "/address",
      image: address,
      title: "Your Address",
    },
    {
      description: "In case you want to report something.",
      link: "/contact",
      image: contact,
      title: "Contact Us",
    },
    {
      description: "Lets order something from wishlist.",
      link: "/wishlist",
      image: wishlist,
      title: "Wishlist",
    },
  ];

  // check the person logged in
  useEffect(() => {
    console.log(auth.isAuth);
    if (auth.isAuth === false) {
      window.location.href = "/";
    }
  }, []);

  function handleLogOut() {
    localStorage.clear();
    history("/");
    dispatch(
      setAlert({
        variant: "success",
        message: "Logging Out !!!",
        open: true,
      })
    );
    dispatch(
      setAuth({
        isAuth: false,
        CID: undefined,
        email: undefined,
        username: undefined,
        token: undefined,
      })
    );
  }

  return (
    <>
      {/* helmet tag  */}
      <Helmet>
        <title>Profile</title>
        <meta
          name="description"
          content="Customer details and order sections"
        />
      </Helmet>
      {/* helmet tag ends  */}
      {/* Banner */}
      <Grid container className="Banner">
        <Grid item xs={12}>
          <Typography variant="h1">My Account</Typography>
        </Grid>
      </Grid>
      {/* Banner ends */}

      <Box className="tileContainer">
        {tabs.map((row, index) => (
          <Box key={index} className="items" component={Link} to={row.link}>
            <img src={row.image} alt="images" />
            <Box>
              <Typography variant="h5">{row.title}</Typography>
              <Typography variant="caption">{row.description}</Typography>
            </Box>
          </Box>
        ))}
        <Box
          className="items"
          onClick={handleLogOut}
          sx={{ cursor: "pointer" }}
        >
          <img src={logout} alt="images" />
          <Box>
            <Typography variant="h5">Logout</Typography>
            <Typography variant="caption">Please comeback soon.</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
