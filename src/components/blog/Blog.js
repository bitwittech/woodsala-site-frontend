import React, {useEffect, useState} from "react";
import {  useParams } from "react-router-dom";

import {
  Grid,
  Typography,
  List,
  ListItem,
  Link,
  ListItemIcon,
  ListItemText,
  IconButton,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box
} from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import Footer from "../utility/Footer";
import Aos from 'aos';

import { Image } from 'mui-image'
//logo
import logo from "../../asset/images/Blog/logo.webp";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
//css
import "../../asset/css/blog.css";
import defaultIMG from "../../asset/images/defaultProduct.svg";

import {getBlog, getBlogHome} from '../../service/service'

// imports for TOC

import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import parameterize from 'parameterize';
import { Helmet } from "react-helmet";

export default function BlogContent({history}) {

  const [data,setData] = useState([])

  // useParams search parameters
  const { blog_id } = useParams();

  useEffect(()=>{
    Aos.init({duration : 1000})
  fetchData();
  },[blog_id])

  async function fetchData  (){

    const list = await getBlogHome();
    if(list) setCardData(list.data)

    const content = await getBlog(blog_id);
    if(content) setData(content.data)
  }


  const [cardData,setCardData] = useState([]);
  // function for rendering the cards
  function CardGenrator({card}) {
    return (
    <Grid item data-aos = 'fade-up' sx = {12} md = {3} >
      <Card  className = {'likeCard'} onClick = {()=> {  history(`/blog/${card.uuid}`)}}>
        <CardActionArea>
          <CardMedia
            component="img"
            className = 'cardMedia'
            image= {card.card_image || defaultIMG}
            alt={card.title}
          />
        </CardActionArea>
        <CardActions sx = {{flexDirection : 'column'}}>
          <CardContent>
            <Typography  gutterBottom variant="h6" >
              {card.title}
            </Typography>
            {/* <Typography component={'span'} variant="body2" color="text.secondary">
              {card.card_description}
              </Typography> */}
          </CardContent>
          <Button fullWidth  size="mideum" color="primary">
            Read More
          </Button>
        </CardActions>
      </Card>
      </Grid>
    );
  }

  const toc = [];

  const content = data && unified()
  .use(rehypeParse, {
    fragment: true,
  })
  .use(() => {
    return (tree) => {
      visit(tree, 'element', function (node) {
        if (node.tagName[0] === 'h' && parseInt(node.tagName[1]) <= 6 )
        {
          // console.log(node)
          const id = parameterize(node.children[0].value);
          node.properties.id = id;
          toc.push({id : `#${id}`,value : node.children[0].value})
          //console.log(toc)
        }
      });
      return;
    };
  })
  .use(rehypeStringify)
  .processSync(data.description)
  .toString();

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
          <Typography variant="h2">Read Somthing Beautiful</Typography>
        </Grid>
      </Grid>

      {/* Read Box */}

      <Grid container className="readBox">
        {/* Table OF COntent */}
        <Grid item xs={4} md={2} className="TOC">
          <Typography component={'span'} variant="h6" color="primary">
            Table Of Content
          </Typography>
          <List className = 'TOCList' color="black">
              {toc && toc.map((jump,index)=>{
                return <> <ListItem key = {index} component = {Link} href = {jump.id}> 
                  <ListItemIcon>
                    <ArrowRightOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={jump.value}/>
                </ListItem>
                </>
              })}
          </List>
        </Grid>
        {/* Table OF COntent Ends */}

        {/* Content Box */}
        {data && <Grid item xs={11.5} md={9.5} className="content">
            <Typography variant= 'h5' sx = {{textAlign : 'center'}}>{data.title}</Typography>
            <br></br>
            <img
            src = {data.card_image}
            alt = 'banner blog'
          />
            <br></br>

            <Grid item className = 'content' >{ReactHtmlParser(content)}</Grid>
            
        </Grid>}
        {/* Content Box Ends */}

      </Grid>
      {/* Ends Read Box */}


    {/* back to blog  */}
    <Box  sx = {{display : 'flex', justifyContent : 'center'}} mt= {2} >
      <Button  variant = 'contained' startIcon = {<KeyboardBackspaceSharpIcon/>} onClick = {()=>history('/blog')}> 
      Back To Blog </Button>
    </Box>
    {/* back to blog  */}
       
   {/* you may also like also  */}


      <Box className = 'youMyAlsoLike' >
          <Typography variant = {'h4'}>You May Also Like</Typography>
          <Box className = 'cardContainer'>
          {cardData.length > 0 && cardData.map((card,index)=><CardGenrator key = {index} card = {card}/>)}
          </Box>
      </Box>

   {/* you may also like also ands  */}

      
    </>
  );
}