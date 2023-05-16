/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { Helmet } from "react-helmet";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import Aos from "aos";
import "aos/dist/aos.css";
// import Footer from './Utility/Footer'
import { getBlogHome } from "../../service/service";

// css
import "../../asset/css/blog.css";

// images
// import banner from "../../asset/images/Blog/blog_banner.jpg";
import defaultIMG from "../../asset/images/defaultProduct.svg";

export default function Blog({ history }) {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    Aos.init({ duration: 1000 });
    fetchData();
  }, []);

  async function fetchData() {
    const data = await getBlogHome();
    if (data) setCardData(data.data);
  }
  // function for rendering the cards
  function CardGenerator({ card }) {
    return (
      <Grid item data-aos="fade-up" sx={12} md={3}>
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
        <Box className="cardContainerHome">
          {cardData.length > 0 &&
            cardData.map((card, index) => (
              <CardGenerator key={index} card={card} />
            ))}
        </Box>
      </Box>

      {/* Ends Card Section */}
    </>
  );
}
