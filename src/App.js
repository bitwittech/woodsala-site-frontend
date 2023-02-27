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
import "../src/asset/css/home.css";

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

// utility
const Navbar = lazy(() => import("./components/utility/Navbar"));
const Footer = lazy(() => import("./components/utility/Footer"));
const SnakBar = lazy(() => import("./components/utility/SnakBar"));
const NotFound = lazy(() => import("./components/utility/NotFound"));
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
  function Path() {
    const history = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return (
      <>
        {window.location.pathname !== "/verify" && <Navbar history={history} />}
        <Routes>
          {/* Not found  */}
          <Route path="*" element={<Home />} />

          {/* // main routes  */}
          <Route path="/" element={<Home history={history} />}></Route>
          <Route path="/verify" element={<Verify history={history} />}></Route>

          {/* // page routes  */}
          <Route path="/cart" element={<Cart history={history} />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/contact" element={<ContactUs />}></Route>
          <Route
            path="/collection"
            element={<Collection history={history} />}
          ></Route>
          <Route path="/home" element={<Home history={history} />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route
            path="/wishlist"
            element={<Wishlist history={history} />}
          ></Route>

          {/* for Product Page  */}
          <Route
            path="/details/:SKU/:title/:category"
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
          <Route path="/blog" element={<BlogHome history={history} />}></Route>
          <Route
            path="/blog/:blog_id"
            element={<Blog history={history} />}
          ></Route>
        </Routes>
        {window.location.pathname !== "/verify" && <Footer />}
      </>
    );
  }

  return (
    <>
      <Suspense fallback={<FallBack />}>
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
