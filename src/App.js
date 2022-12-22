import React, {useEffect, lazy,Suspense} from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import "../src/asset/css/home.css";

// MUI
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FallBack from "./components/utility/FallBack"

// utility 
const Navbar =  lazy(()=>import("./components/utility/Navbar"))
const Footer =  lazy(()=>import("./components/utility/Footer"))
const SnakBar =  lazy(()=>import("./components/utility/SnakBar"))
const NotFound =  lazy(()=>import("./components/utility/NotFound"))
const Thanks =  lazy(()=>import("./components/utility/Thanks"))


// context
// import {Store} from './store/Context'
// import {Auth} from './store/Types'

// components
const Home = lazy(()=>import( "./components/Home"))
const Cart = lazy(()=>import( "./components/Cart"))
const Checkout = lazy(()=>import( "./components/Checkout"))
const ProductDetails = lazy(()=>import( "./components/ProductDetails"))
const ContactUs = lazy(()=>import( "./components/ContactUs"))
const ProductList = lazy(()=>import( "./components/ProductList"))
const EntryPoint = lazy(()=>import( "./components/EntryPoint"))
const Profile = lazy(()=>import( "./components/Profile"))
const Verify = lazy(()=>import( "./components/Verify"))
const Catagories = lazy(()=>import( "./components/Catagories"))


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
    const { pathname } = useLocation();

    useEffect(()=>{
      window.scrollTo(0, 0);
    },[pathname])
    
    
    return (
      <>
        {window.location.pathname !== '/verify' && <Navbar history={history} />}
        <Routes>

          {/* Not found  */}
          <Route path="*" element={<NotFound/>}/>

          {/* // main routes  */}
          <Route path="/" element={<Home history={history}/>}></Route>
          <Route path="/verify" element={<Verify history = {history}/>}></Route>
          <Route path="/categories" element={<Catagories history = {history}/>}></Route>

          {/* // page routes  */}
          <Route path="/home" element={<Home history={history} />}></Route>
          <Route path="/cart" element={<Cart history={history} />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/details/:SKU/:title/:category" element={<ProductDetails history={history} />}></Route>
          <Route path="/contact" element={<ContactUs />}></Route>
          <Route path="/profile" element={<Profile />}></Route>

          {/* // filter and Product page route */}
          <Route path="/product/:category_name/:product_title/:selling_price" element={<ProductList history={history} />}></Route>
          <Route path="/product/:category_name/:product_title" element={<ProductList history={history} />}></Route>
          <Route path="/product/:category_name" element={<ProductList history={history} />}></Route>
          <Route path="/product" element={<ProductList history={history} />}></Route>
        </Routes>
        {window.location.pathname !== '/verify' && <Footer />}
      </>
    );
  }

  return (
    <>
    <Suspense fallback = {<FallBack/>}>
      <ThemeProvider theme={light}>
        <CssBaseline enableColorScheme>
          <BrowserRouter>
            <Path />
          </BrowserRouter>
          <EntryPoint />
          <Thanks />
          <SnakBar />
        </CssBaseline>
      </ThemeProvider>
    </Suspense>
    </>
  );
}

export default App;
