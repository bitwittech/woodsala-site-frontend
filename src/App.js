import React,{useState} from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

// MUI
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// context
import { Auth, LogBox, Notify } from './context/context'

// utility 
import Navbar from "./components/utility/Navbar"
import Footer from "./components/utility/Footer"
import SnakBar from "./components/utility/SnakBar"


// components
import Home from "./components/Home";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import ProductDetails from "./components/ProductDetails";
import ContactUs from "./components/ContactUs";
import Categories from "./components/Categories";
import EntryPoint from "./components/EntryPoint"

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

  // context State
  const [cred,setCred] = useState({
    username : undefined,
    email : undefined,
    CID : undefined,
    token : undefined
  })
  const [logState, setLog] = useState({
    open : false,
    type : undefined,
  });
  const [Note,setNote] = useState({
    variant : null,
    open : false,
    message : null
  })

  function Path() {
    const history = useNavigate();

    return (
      <>
        <Navbar history={history} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/cart" element={<Cart history={history} />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/details" element={<ProductDetails />}></Route>
          <Route path="/contact" element={<ContactUs />}></Route>
          <Route path="/categories" element={<Categories />}></Route>
        </Routes>
        <Footer />
      </>
    );
  }

  return (
    <>
      <ThemeProvider theme={light}>
        <CssBaseline enableColorScheme>
          <Auth.Provider value = {{cred , setCred}} >
          <Notify.Provider value = {{Note, setNote}}>
            <LogBox.Provider value={{ logState, setLog }} >
              <BrowserRouter>
                <Path />
              </BrowserRouter>
              <EntryPoint/>
              <SnakBar/>
            </LogBox.Provider>
          </Notify.Provider>
          </Auth.Provider>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;

// exporting the contexts
export { LogBox, Auth, Notify }