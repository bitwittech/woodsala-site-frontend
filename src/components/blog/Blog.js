/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";

import {
  Grid,
  Typography,
  List,
  ListItem,
  Link,
  ListItemIcon,
  ListItemText,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import ReactHtmlParser from "react-html-parser";
// import Footer from "../utility/Footer";
import Aos from "aos";

// import { Image } from "mui-image";
// logo
// import logo from "../../asset/images/Blog/logo.webp";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
// css
import "../../asset/css/blog.css";
import defaultIMG from "../../asset/images/defaultProduct.svg";

import { getBlog, getBlogHome } from "../../service/service";

// imports for TOC

import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import parameterize from "parameterize";
import { Helmet } from "react-helmet";

export default function BlogContent({ history }) {
  const [data, setData] = useState({});

  // useParams search parameters
  const { blog_id } = useParams();

  const [content, setContent] = useState(null);
  const [toc, setToc] = useState([]);

  useEffect(() => {
    Aos.init({ duration: 900 });
    fetchData();
    setToc([]);
    setContent(null);
  }, [blog_id]);

  useEffect(() => {
    parseHTML();
  }, [data.description]);

  async function fetchData() {
    const list = await getBlogHome();
    if (list) setCardData(list.data);

    const content = await getBlog(blog_id);
    if (content) setData(content.data);
  }

  async function parseHTML() {
    let contentData = unified()
      .use(rehypeParse, {
        fragment: true,
      })
      .use(() => {
        return (tree) => {
          visit(tree, "element", function (node) {
            if (node.tagName[0] === "h" && parseInt(node.tagName[1]) <= 6) {
              // console.log(node.tagName, node.children[0].children[0].value);
              const id = parameterize(node.children[0].children[0].value);
              node.properties.id = id;
              return setToc((old) => [
                ...old,
                { id: `#${id}`, value: node.children[0].children[0].value },
              ]);
            }
          });
        };
      })
      .use(rehypeStringify)
      .processSync(data.description)
      .toString();
    contentData = ReactHtmlParser(contentData);
    setContent(contentData);
  }

  const [cardData, setCardData] = useState([]);
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
      <Helmet>
        <title>{data.title || `Blog Content`}</title>
        <meta
          name="description"
          content="This page contains product details. And all the information about the particular product"
        />
      </Helmet>

      {/* // top bar */}

      <Grid container className="Banner">
        <Grid item xs={12}>
          <Typography variant="h2">Read Something Beautiful</Typography>
        </Grid>
      </Grid>

      {/* Read Box */}
      {data ? (
        <Grid container className="readBox">
          {/* Table OF COntent */}
          <Grid item xs={4} md={2} className="TOC">
            <Typography component={"span"} variant="h6" color="primary">
              Table Of Content
            </Typography>
            <List className="TOCList" color="black">
              {toc &&
                toc.map((jump, index) => {
                  return (
                    <>
                      {" "}
                      <ListItem key={index} component={Link} href={jump.id}>
                        <ListItemIcon>
                          <ArrowRightOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={jump.value} />
                      </ListItem>
                    </>
                  );
                })}
            </List>
          </Grid>
          {/* Table OF COntent Ends */}

          {/* Content Box */}
          {data ? (
            <Grid item xs={11.5} md={9.5} className="content">
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                {data.title}
              </Typography>
              <Box className="contentBanner">
                {data.card_image && (
                  <img src={data.card_image} alt="banner blog" />
                )}
              </Box>
              <Grid item className="content">
                {content || ""}
              </Grid>
            </Grid>
          ) : (
            <CircularProgress />
          )}
          {/* Content Box Ends */}
        </Grid>
      ) : (
        <CircularProgress />
      )}

      {/* Ends Read Box */}

      {/* back to blog  */}
      <Box sx={{ display: "flex", justifyContent: "center" }} mt={2}>
        <Button
          variant="contained"
          startIcon={<KeyboardBackspaceSharpIcon />}
          onClick={() => history("/blog")}
        >
          Back To Blog{" "}
        </Button>
      </Box>
      {/* back to blog  */}

      {/* you may also like also  */}

      <Box className="youMyAlsoLike">
        <Typography variant={"h4"}>You May Also Like</Typography>
        <Box className="cardContainer">
          {cardData.length > 0 &&
            cardData.map((card, index) => (
              <CardGenerator key={index} card={card} />
            ))}
        </Box>
      </Box>

      {/* you may also like also ands  */}
    </>
  );
}
