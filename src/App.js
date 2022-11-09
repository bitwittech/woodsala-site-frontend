import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

// MUI
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// utility 
import Navbar from "./components/utility/Navbar"
import Footer from "./components/utility/Footer"
import SnakBar from "./components/utility/SnakBar"

// context
// import {Store} from './store/Context'
// import {Auth} from './store/Types'

// components
import Home from "./components/Home";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import ProductDetails from "./components/ProductDetails";
import ContactUs from "./components/ContactUs";
import Categories from "./components/Categories";
import EntryPoint from "./components/EntryPoint";
import Profile from "./components/Profile";
import Verify from "./components/Verify";


// global theme
const light = createTheme({
  palette: {
    primary: {
      main: "#91441f",
    },
    secondary: {
      main: "#fbfbfb",
    },
  },
  typography: {
    fontFamily: "Work+Sans",
    fontWeightLight: 100,
    fontWeightRegular: 300,
    fontWeightMedium: 300,
    fontWeightBold: 400,
  },

});

function App() {



  function Path() {
    const history = useNavigate();

    return (
      <>
        {window.location.pathname !== '/verify' && <Navbar history={history} />}
        <Routes>
          <Route path="/" element={<Home history={history}/>}></Route>
          <Route path="/home" element={<Home history={history} />}></Route>
          <Route path="/cart" element={<Cart history={history} />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/details" element={<ProductDetails />}></Route>
          <Route path="/contact" element={<ContactUs />}></Route>
          <Route path="/categories" element={<Categories history={history} />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/verify" element={<Verify history = {history}/>}></Route>
        </Routes>
        {window.location.pathname !== '/verify' && <Footer />}
      </>
    );
  }

  return (
    <>
      <ThemeProvider theme={light}>
        <CssBaseline enableColorScheme>
          <BrowserRouter>
            <Path />
          </BrowserRouter>
          <EntryPoint />
          <SnakBar />
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
