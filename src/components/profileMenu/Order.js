import React from 'react';
import {Grid,Button,Typography,Box} from '@mui/material'
import '../../asset/css/order.css'
const Order = () => {
    return (
        <>
        <Grid container className = 'orderWrapper'>
            <Grid item xs = {12}>
                <Typography variant = 'h5'>Your Order</Typography>
            </Grid>
            
            {/* Filter BOx */}
            <Grid item xs = {12} >Filter Box</Grid>
            {/* Filter BOx ends */}

            {/* list Container */}
            <Grid item xs = {12}>
                <Grid container className = 'orderContainer'>
                    <Grid item xs = {12} className = 'topSec'>
                        <Box>
                            <Typography variant='button' >Order Placed</Typography>
                            <br></br>
                            <Typography variant='button' >20 oct 3233</Typography>
                        </Box>
                        <Box>
                            <Typography variant='button' >Total</Typography>
                            <br></br>
                            <Typography variant='button' >Rs. 3233</Typography>
                        </Box>
                        <Box>
                            <Typography variant='button' >Ship To</Typography>
                            <br></br>
                            <Typography variant='button' >Yashwant Sahu</Typography>
                        </Box>
                        <Box>
                            <Typography variant='button' >Order Id</Typography>
                            <br></br>
                            <Typography variant='button' >O-101003</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            {/* list Container ends */}
        </Grid>
        </>
    );
}

export default Order;
