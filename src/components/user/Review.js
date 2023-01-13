import React, { useState, useEffect } from 'react';
import RateReviewIcon from '@mui/icons-material/RateReview';
import {
    Typography,
    Grid,
    Button,
    Backdrop,
    Box,
    Modal,
    Fade,
    Rating,
    CircularProgress,
    TextareaAutosize
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import '../../asset/css/review.css'
import TurnedInIcon from '@mui/icons-material/TurnedIn';

import avatar from '../../asset/images/profile/avatar.svg'
// APIS import 
import { addReview, listReview } from '../../service/service'

// state
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from '../../Redux/action/action'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    outline: 'none'
};


const Review = (props) => {

    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);

    const [reviews, setReviews] = useState([])

    const [reviewState, setReviewState] = useState({
        open: false,
        refresh: 0,
    })

    useEffect(() => {
        listReview(props.product_id)
            .then((data) => {
                setReviews([...data.data])
            })
    }, [reviewState.refresh,props.product_id])




    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

    function ReviewBox() {

        const [hover, setHover] = React.useState(-1);
        const [reviewData, setReviewData] = useState({
            isLoading: false,
            data: {
                CID: auth.CID || 'Not Logged In',
                rating: 4,
                review: null,
                product_id: props.product_id
            }
        })

        function getLabelText(value) {
            return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
        }

        async function handleSubmit(e) {
            e.preventDefault();
            setReviewData(old => ({ ...old, isLoading: true }))
            console.log(reviewData.data)

            const FD = new FormData();

            FD.append('CID', reviewData.data.CID)
            FD.append('rating', reviewData.data.rating)
            FD.append('review', reviewData.data.review)
            FD.append('product_id', reviewData.data.product_id)

            const res = addReview(FD)

            res
                .then((response) => {
                        setReviewState(old => ({
                            open: false,
                            refresh: old.refresh + 1
                        }))

                        dispatch(setAlert({
                            open: true,
                            variant: 'success',
                            message: response.data.message
                        }))

                })
                .catch((err) => {
                    dispatch(setAlert({
                        open: true,
                        variant: 'error',
                        message: 'Something Went Wrong !!!'
                    }))
                })


        }

        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={reviewState.open}
                onClose={() => setReviewState(old => ({ ...old, open: false }))}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={reviewState.open}>
                    <Box sx={style}>
                        <Grid container component={'form'} method='post' onSubmit={handleSubmit}>
                            <Grid item xs={12} >
                                <Typography sx={{ fontWeight: '400' }} variant='h5'>
                                    Add a review for
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ padding: '1%', mt: '3%' }}>
                                <Typography sx={{ fontWeight: '400' }} variant='body1'>
                                    1) How would rate this product?
                                </Typography>
                                <Box className='rating'>
                                    <Rating
                                        name="hover-feedback"
                                        value={reviewData.data.rating || 4}
                                        precision={0.5}
                                        getLabelText={getLabelText}
                                        onChange={(event, newValue) => {
                                            setReviewData(old => ({ ...old, data: { ...old.data, rating: newValue } }))
                                        }}
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                        }}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                    {reviewData.data.rating !== null && (
                                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : reviewData.data.rating]}</Box>
                                    )}
                                </Box>
                            </Grid>
                            <Grid xs={12} item>
                                <Typography sx={{ fontWeight: '400' }} variant='body1'>
                                    2) Write your review below.
                                </Typography>
                                <Box p={1}>
                                    <TextareaAutosize
                                        minRows={5}
                                        maxRows={5}
                                        required
                                        // minLength={50}
                                        onChange={(e) => setReviewData(old => ({ ...old, data: { ...old.data, review: e.target.value } }))}
                                        className='customTextArea'
                                        placeholder="Write something beautiful..."
                                    />
                                </Box>

                            </Grid>
                            <Grid item xs={12} p={1}>
                                <Button disabled={reviewData.isLoading} type='submit' startIcon={reviewData.isLoading ? <CircularProgress size={15} /> : <TurnedInIcon />} sx={{ float: 'right' }} variant='outlined'>Submit</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        )
    }

    return (
        <Grid container className="moreInfo">
            <ReviewBox />
            <Grid item xs={12}>
                <Typography sx={{ fontWeight: 500 }} variant="h4">
                    Customer Reviews
                </Typography>
            </Grid>
            <Grid item xs={12} className='reviewContainer'>
                <Grid container sx = {{gap : '20px'}}>
                {reviews.length > 0 ? reviews.map((row) => {
                    return <Grid item xs = {12}>
                        <Grid container className='review'>
                        <Grid xs={12} className='cusDetails'>
                            <img src={row.customer.length > 0 ? row.customer[0].profile_image  : avatar} alt='profile' />
                            <Typography variant='h5'>{row.customer.length > 0 ? row.customer[0].username : 'Anonymous User'}</Typography>
                        </Grid>
                        <Grid xs={12} pt={1}>
                            <Rating
                                value={row.rating}
                                precision={0.5}
                                readOnly
                                size='large'
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                        </Grid>
                        <Grid xs={12}><Typography variant='button'>Posted On {row.date.split('T')[0]}</Typography></Grid>
                        <Grid xs={12}><Typography variant='h6'><q>{row.review}</q></Typography></Grid>
                    </Grid>
                    </Grid>
                }) :
                    <Typography variant='h6'>
                        Be first to write a review for it...
                    </Typography>
                }
                </Grid>
            </Grid>
            <Grid item sx={{ padding: '1%' }} xs={12}>
                <Button startIcon={<RateReviewIcon />} size='large' onClick={() => setReviewState(open => ({ open: true }))} variant='contained'>Write Review</Button>
            </Grid>
        </Grid>
    );
}

export default Review;
