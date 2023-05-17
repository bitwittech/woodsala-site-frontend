/* eslint-disable react/prop-types */
import React, { useEffect, useReducer } from "react";
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { Helmet } from "react-helmet";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
// import Aos from "aos";
// import "aos/dist/aos.css";
// import Footer from './Utility/Footer'
import { getBlogHome } from "../../service/service";

// css
import "../../asset/css/blog.css";

// images
// import banner from "../../asset/images/Blog/blog_banner.jpg";
import defaultIMG from "../../asset/images/defaultProduct.svg";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Blog({ history }) {
  const initialState = {
    items: [],
    hasMore: true,
    numberOfItems: 0,
    pageNumber: 1,
    itemsLen: 0,
  };

  const [localState, setState] = useReducer(reducer, initialState);

  useEffect(() => {
    // Aos.init({ duration: 1000 });
    fetchData();
  }, []);

  async function fetchData() {
    const res = await getBlogHome({ pageNumber: localState.pageNumber });
    if (res.status === 200) {
      if (res.data.length > 0) {
        console.log("dataLength>>>", localState.itemsLen);
        setState({
          type: "Set_Items",
          payload: {
            items: [...localState.items.concat(res.data)],
            pageNumber: localState.pageNumber + 1,
            itemsLen: localState.itemsLen + res.data.length,
            // hasMore: false,
          },
        });
      } else {
        setState({
          type: "Set_LoadMore",
          payload: {
            hasMore: false,
            pageNumber: localState.pageNumber + 1,
            itemsLen: localState.itemsLen + res.data.length,
          },
        });
      }
    }
  }

  return (
    <>
      {/* Title  */}
      {/* helmet tag  */}
      <Helmet>
        <title>{`Blog`}</title>
        <meta
          name="description"
          content="This page contains product details. And all the information about the particular product"
        />
      </Helmet>
      {/* helmet tag ends  */}

      {/* Top container  */}
      {/* Banner */}
      <Grid container className="Banner">
        <Grid item xs={12}>
          <Typography variant="h1">Blog</Typography>
        </Grid>
      </Grid>
      {/* Banner Ends */}
      {/* Ends Top container  */}

      {/* Card Section */}

      <Box className="youMyAlsoLike">
        <InfiniteScroll
          dataLength={localState.items.length}
          next={fetchData}
          hasMore={localState.hasMore}
          // style={styleStroller}
          loader={
            <Box sx={{ width: "100%" }}>
              <center>
                <CircularProgress />
              </center>
            </Box>
          }
        >
          <Box className="cardContainerHome">
            {localState.items.map((card, index) => (
              <CardGenerator history={history} key={index} card={card} />
            ))}
          </Box>
        </InfiniteScroll>
      </Box>

      {/* Ends Card Section */}
    </>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "Set_Items":
      console.log(action);
      return (state = { ...state, ...action.payload });
    case "Set_LoadMore":
      return (state = { ...state, ...action.payload });
    default:
      return state;
  }
}

// function for rendering the cards
function CardGenerator({ card, history }) {
  return (
    <Grid item sx={12} md={3}>
      <Card
        className={"likeCard"}
        onClick={() => {
          history(`/blog/${card.uuid}`);
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            className="cardMedia"
            image={card.card_image || defaultIMG}
            alt={card.title}
          />
        </CardActionArea>
        <CardActions sx={{ flexDirection: "column" }}>
          <CardContent className="cardText">
            <Typography gutterBottom variant="h5">
              {card.title}
            </Typography>
            {/* <Typography component={'span'} variant="body2" color="text.secondary">
            {card.card_description}
            </Typography> */}
          </CardContent>
          <Button
            startIcon={<ChromeReaderModeIcon />}
            fullWidth
            color="primary"
          >
            Read More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
