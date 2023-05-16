/* eslint-disable react/prop-types */
import React, { useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "../src/asset/css/home.css";
import config from "./config.json";
// Google Analytics
import GA from "react-ga4";

// MUI
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FallBack from "./components/utility/FallBack";

// context
// import {Store} from './store/Context'
// import {Auth} from './store/Types'

// components
// const Home = lazy(()=>import( "./components/home/Home"))
import Home from "./components/home/Home";

// error boundaries for handling error
import ErrorBound from "./components/utility/ErrorBound";
import ChatWindow from "./components/chat/ChatWindow";
import LockIn from "./components/lockinPage/LockIn";
import { useDispatch, useSelector } from "react-redux";
// socket
import Socket from "./socket/Socket";
// utility
const Navbar = lazy(() => import("./components/utility/Navbar"));
const Footer = lazy(() => import("./components/utility/Footer"));
const SnakeBar = lazy(() => import("./components/utility/SnakBar"));
const Thanks = lazy(() => import("./components/utility/Thanks"));
const Verify = lazy(() => import("./components/utility/Verify"));

// components
const Cart = lazy(() => import("./components/cart/Cart"));
const Wishlist = lazy(() => import("./components/cart/Wishlist"));
const Checkout = lazy(() => import("./components/cart/Checkout"));
const ProductDetails = lazy(() =>
  import("./components/product/ProductDetails")
);
const ContactUs = lazy(() => import("./components/aboutUs/ContactUs"));
const ProductList = lazy(() => import("./components/product/ProductList"));
const EntryPoint = lazy(() => import("./components/home/EntryPoint"));
const Profile = lazy(() => import("./components/user/Profile"));
const Collection = lazy(() => import("./components/product/Collection"));
const Blog = lazy(() => import("./components/blog/Blog"));
const BlogHome = lazy(() => import("./components/blog/BlogHome"));
const Address = lazy(() => import("./components/profileMenu/Address"));
const Order = lazy(() => import("./components/profileMenu/Order"));
const UserInfo = lazy(() => import("./components/profileMenu/UserInfo"));

// global theme
const light = createTheme({
  palette: {
    primary: {
      main: "#682D2D",
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
  // let's initialize the React GA
  GA.initialize(config.TRACKING_ID);

  // store
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    // Send preview with a custom path
    GA.send({
      hitType: "visit",
      page: window.location.pathname,
      title: "Hit Page",
    });
  }, [window.location.pathname]);

  // Socket SetUP
  Socket.Notifications(dispatch);

  useEffect(() => {
    makeConnection();
  }, [auth.isAuth, socket]);

  function makeConnection() {
    if (auth.isAuth && socket.id === null) {
      Socket.Connect(auth);
      Socket.Get_ID(dispatch);
    }
  }

  return (
    <>
      <Suspense fallback={<FallBack />}>
        <ThemeProvider theme={light}>
          <CssBaseline enableColorScheme>
            <ErrorBound fallback={"Sorry for the inconvenience !!! "}>
              <ChatWindow />
              <BrowserRouter>
                <Path auth={auth} />
              </BrowserRouter>
              <EntryPoint />
              <Thanks />
              <SnakeBar />
            </ErrorBound>
          </CssBaseline>
        </ThemeProvider>
      </Suspense>
    </>
  );
}

function Path({ auth }) {
  const history = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {window.location.pathname !== "/verify" && auth.masterToken && (
        <Navbar history={history} />
      )}
      <Routes>
        {/* // main routes  */}
        {!auth.masterToken && (
          <Route path="/" element={<LockIn history={history} />}></Route>
        )}

        {auth.masterToken && (
          <>
            <Route path="/" element={<Home history={history} />}></Route>
            <Route
              path="/verify"
              element={<Verify history={history} />}
            ></Route>

            {/* // page routes  */}
            <Route path="/cart" element={<Cart history={history} />}></Route>
            <Route
              path="/checkout"
              element={<Checkout history={history} />}
            ></Route>
            <Route
              path="/contact"
              element={<ContactUs history={history} />}
            ></Route>
            <Route
              path="/collection"
              element={<Collection history={history} />}
            ></Route>
            <Route path="/home" element={<Home history={history} />}></Route>
            <Route
              path="/profile"
              element={<Profile history={history} />}
            ></Route>
            <Route
              path="/account"
              element={<UserInfo history={history} />}
            ></Route>
            <Route
              path="/address"
              element={<Address history={history} />}
            ></Route>
            <Route path="/order" element={<Order history={history} />}></Route>
            <Route
              path="/wishlist"
              element={<Wishlist history={history} />}
            ></Route>

            {/* for Product Page  */}
            <Route
              path="/details/:SKU/:title/:category"
              element={<ProductDetails history={history} />}
            ></Route>
            <Route
              path="/details/:SKU/:title"
              element={<ProductDetails history={history} />}
            ></Route>

            {/* // filter and Product page route */}
            <Route
              path="/product/:category_name/:product_title/:selling_price"
              element={<ProductList history={history} />}
            ></Route>
            <Route
              path="/product/:category_name/:product_title"
              element={<ProductList history={history} />}
            ></Route>
            <Route
              path="/product/:category_name"
              element={<ProductList history={history} />}
            ></Route>
            <Route
              path="/product"
              element={<ProductList history={history} />}
            ></Route>

            {/* // blog routes */}
            <Route
              path="/blog"
              element={<BlogHome history={history} />}
            ></Route>
            <Route
              path="/blog/:blog_id"
              element={<Blog history={history} />}
            ></Route>

            {/* Not found  */}
            <Route path="*" element={<Home history={history} />} />
          </>
        )}
      </Routes>
      {window.location.pathname !== "/verify" && auth.masterToken && (
        <Footer history={history} />
      )}
    </>
  );
}

export default App;
