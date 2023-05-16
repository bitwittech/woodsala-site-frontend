/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import React, { Component } from "react";
import { Helmet } from "react-helmet";

class ErrorBound extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          {" "}
          <Helmet>
            <title>Error</title>
            <meta
              name="description"
              content="This page contains error message !!!"
            />
          </Helmet>
          <Box
            p={2}
            mt={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1>{this.props.fallback} &#128549;</h1>
            <h4>"We will fix it soon don't worry !!!"</h4>
          </Box>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBound;
