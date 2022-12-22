import React from 'react';
import {Box, CircularProgress, Typography} from '@mui/material'
const Fallback = () => {
    return (
        <Box className = 'fallback'>
            <Typography variant = 'h5'>Please Wait Loading....</Typography>
            <center><CircularProgress color= "primary"/></center>
        </Box>
    );
}

export default Fallback;
