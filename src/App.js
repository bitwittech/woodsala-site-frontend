import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

// MUI
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// utility 
import Navbar from "./components/utility/Navbar"
import Footer from "./components/utility/Footer"

// components
import Home from "./components/Home";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import ProductDetails from "./components/ProductDetails";
import ContactUs from "./components/ContactUs";
import Categories from "./components/Categories";





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
        <Navbar history = {history} />
        <Routes>
          <Route  path="/"  element={<Home />}></Route>
          <Route  path="/home"  element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/cart" element={<Cart history = {history} />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/details" element={<ProductDetails />}></Route>
          <Route path="/contact" element={<ContactUs />}></Route>
          <Route path="/categories" element={<Categories/>}></Route>
        </Routes>
        <Footer/>
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
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
