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
} from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import Footer from "../utility/Footer";

import { Image } from 'mui-image'
//logo
import logo from "../../asset/images/Blog/logo.webp";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
//css
import "../../asset/css/blog.css";

import {getBlog} from '../../service/service'

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
    getBlog(blog_id)
    .then((data)=>{
      //console.log(data)
      setData(data.data)
    })
  },[])

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
        <title>{`Blog Content`}</title>
        <meta
          name="description"
          content="This page contains product details. And all the information about the particular product"
        />
      </Helmet>

      {/* // top bar */}

      <Grid container className="Banner">
        <Grid item xs={12}>
          <Typography variant="h1">Blog</Typography>
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
            <Typography component={'span'} variant= 'h4'>{data.title}</Typography>
            <br></br>
            <img
            src = {data.card_image}
            className  = 'banner-img'
            alt = 'banner blog'
          />
            <br></br>

            <Grid item className = 'content' >{ReactHtmlParser(content)}</Grid>
            
        </Grid>}
        {/* Content Box Ends */}
      </Grid>

      {/* Ends Read Box */}
      
    </>
  );
}