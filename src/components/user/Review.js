import React, { useState, useMemo, useEffect } from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
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
  TextareaAutosize,
  TextField,
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import "../../asset/css/review.css";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import CancelIcon from "@mui/icons-material/Cancel";
import avatar from "../../asset/images/profile/avatar.svg";
// APIS import
import {
  // addReply,
  addReview,
  listReview,
  verifyReview,
} from "../../service/service";
import SendIcon from "@mui/icons-material/Send";
// state
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../Redux/action/action";

// third party component
import ImageUploader from "../utility/ImageUploader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "content-fit",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  outline: "none",
};

function Review(props) {
  const [reviews, setReviews] = useState([]);

  const [reviewState, setReviewState] = useState({
    open: false,
    refresh: 0,
  });

  useMemo(() => {
    listReview(props.product_id).then((data) => {
      setReviews([...data.data]);
    });
  }, [reviewState.refresh, props.product_id]);

  return (
    <Grid container className="moreInfo">
      {/* // review Model */}
      <ReviewBox
        reviewState={reviewState}
        setReviewState={setReviewState}
        product_id={props.product_id}
      />
      <Grid item xs={12}>
        <Typography sx={{ fontWeight: 500 }} variant="h5">
          Customer Reviews
        </Typography>
      </Grid>
      <Grid item xs={12} className="reviewContainer">
        <Grid container sx={{ gap: "20px" }}>
          {reviews.length > 0 ? (
            reviews.map((row) => {
              return (
                <Grid item xs={12}>
                  <Grid container className="review">
                    <Grid xs={12} className="cusDetails">
                      <img
                        src={
                          row.customer.length > 0
                            ? row.customer[0].profile_image
                            : avatar
                        }
                        alt="profile"
                      />
                      <Typography className="review_name" variant="h5">
                        {row.customer.length > 0
                          ? row.reviewer_name
                          : "Anonymous User"}
                      </Typography>
                      <Box>
                        <Typography variant="button">
                          Posted On {row.date.split("T")[0]}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid xs={12} pt={1}>
                      <Rating
                        value={row.rating}
                        precision={0.5}
                        readOnly
                        size="large"
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                    </Grid>
                    <Grid xs={12}>
                      <Typography variant="h5">
                        {row.review_title || "Review Question"}
                      </Typography>
                    </Grid>
                    <Grid xs={12}>
                      <Typography variant=""></Typography>
                      {/* <Conversation
                        customer={row.review}
                        admin={row.admin_reply}
                      /> */}
                      <Box className={"reply"}>
                        <Typography variant="body1">{row.review}</Typography>
                        {/* <Typography className variant="caption">
                          Posted On : {chat.time}
                        </Typography> */}
                      </Box>
                      {
                        row.admin_reply.length > 0 && row.admin_reply.map(row=> row.message &&
                      <Box className={"reply"}>
                        <Typography variant="body1">{row.message}</Typography>
                        <Typography className variant="caption">
                          Posted On : {row.time}
                        </Typography>
                      </Box>
                          
                          ) 
                      }
                    </Grid>
                    {row.review_images.length > 0 && (
                      <Grid mt={1} item xs={12}>
                        <Typography variant="h5">Review Images</Typography>
                        <Grid container className="reviewedImagesContainer">
                          {row.review_images.map((image, index) => (
                            <Grid className={"reviewedImages"} item xs={2.5}>
                              <img src={image} alt={`review Images ${index}`} />
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    )}
                    {row.review_videos.length > 0 && (
                      <Grid mt={1} item xs={12}>
                        <Typography variant="h5">Review Videos</Typography>
                        <Grid container className="reviewedImagesContainer">
                          {row.review_videos.map((image, index) => (
                            <Grid className={"reviewedImages"} item xs={2.5}>
                              <video
                                src={image}
                                width="100"
                                height="100"
                                controls="controls"
                                autoplay="true"
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    )}
                    {/* <Grid xs={12}>
                      <ReplyBox
                        ID={row._id}
                        setReviews={setReviews}
                        reviews={reviews}
                      />
                    </Grid> */}
                  </Grid>
                </Grid>
              );
            })
          ) : (
            <Typography variant="h6">
              Be first to write a review for it...
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid item sx={{ padding: "1%" }} xs={12}>
        <Button
          startIcon={<RateReviewIcon />}
          size="large"
          onClick={() => setReviewState((open) => ({ open: true }))}
          variant="contained"
        >
          Write Review
        </Button>
      </Grid>
    </Grid>
  );
}

// Child Model Box For Review
function ReviewBox({ reviewState, setReviewState, product_id }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  const [hover, setHover] = React.useState(-1);

  const [reviewData, setReviewData] = useState({
    isLoading: false,
    data: {
      CID: auth.CID || "Not Logged In",
      rating: 4,
      review: null,
      product_id: product_id,
      review_title: "",
      yourTube_url: "",
      reviewer_name: "",
      reviewer_email: "",
      review_images: [],
    },
    button: "verify",
  });

  function handleValue(e) {
    setReviewData((old) => ({
      ...old,
      data: { ...old.data, [e.target.name]: e.target.value },
    }));
  }

  // for label the ratting
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setReviewData((old) => ({ ...old, isLoading: true }));

    console.log(reviewData);

    const FD = new FormData();

    FD.append("CID", reviewData.data.CID);
    FD.append("rating", reviewData.data.rating);
    FD.append("review", reviewData.data.review);
    FD.append("product_id", reviewData.data.product_id);
    FD.append("review_title", reviewData.data.review_title);
    FD.append("yourTube_url", reviewData.data.yourTube_url);
    FD.append("reviewer_name", reviewData.data.reviewer_name);
    FD.append("reviewer_email", reviewData.data.reviewer_email);
    FD.append("admin_review", "");

    if (reviewData.data.review_images.length > 0)
      reviewData.data.review_images.map((file) =>
        FD.append("review_images", file)
      );
    else
      reviewData.data.review_images.map((file) =>
        FD.append("review_images", [])
      );

    // if (parseInt(reviewData.data.otp) !== reviewData.check) {
    //   setReviewData((old) => ({ ...old, isLoading: false }));
    //   return dispatch(
    //     setAlert({
    //       open: true,
    //       message: "Sorry Incorrect Otp?",
    //       variant: "error",
    //     })
    //   );
    // }

    const response = await addReview(FD);
    // const response = await verifyReview(FD);

    if (response) {
      setReviewState((old) => ({
        open: false,
        refresh: old.refresh + 1,
      }));

      dispatch(
        setAlert({
          open: true,
          variant: "success",
          message: response.data.message,
        })
      );
      handleClose();
    } else {
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        })
      );
      setReviewData((old) => ({ ...old, isLoading: false }));
    }
  }

  async function verifyEmail(e) {
    e.preventDefault();

    setReviewData((old) => ({ ...old, isLoading: true }));
    const FD = new FormData();
    FD.append("reviewer_name", reviewData.data.reviewer_name);
    FD.append("reviewer_email", reviewData.data.reviewer_email);

    const response = await verifyReview(FD);

    if (response) {
      setReviewData((old) => ({
        ...old,
        isLoading: false,
        button: "emailSent",
        check: response.data.otp,
      }));

      dispatch(
        setAlert({
          open: true,
          variant: "success",
          message: response.data.message,
        })
      );
      // handleClose();
    } else {
      dispatch(
        setAlert({
          open: true,
          variant: "error",
          message: "Something Went Wrong !!!",
        })
      );
      setReviewData((old) => ({ ...old, isLoading: false }));
    }
  }

  function handleClose() {
    setReviewData({
      isLoading: false,
      data: {
        CID: auth.CID || "Not Logged In",
        rating: 4,
        review: null,
        product_id: product_id,
        review_title: "",
        yourTube_url: "",
        reviewer_name: "",
        reviewer_email: "",
        review_images: [],
      },
      button: "verify",
    });
    setReviewState((old) => ({ ...old, open: false }));
  }

  function changeEmailAddress() {
    setReviewData((old) => ({ ...old, button: "verify", check: 0 }));
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={reviewState.open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={reviewState.open}>
        <Box sx={style}>
          <Grid
            container
            component={"form"}
            sx={{ gap: "5px", justifyContent: "center" }}
            method="post"
            onSubmit={
              reviewData.button === "verify" ? verifyEmail : handleSubmit
            }
          >
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItem: "center",
              }}
            >
              <Typography
                sx={{ fontWeight: "400" }}
                component={"span"}
                variant="h5"
              >
                Add a review for
              </Typography>
              <IconButton size={"large"} color="primary" onClick={handleClose}>
                <CancelIcon />
              </IconButton>
            </Grid>

            {/* product image */}
            <Grid item xs={12} sx={{ padding: "1%" }} md={5.8}>
              <Typography variant="h5">Image Section</Typography>
              <br></br>
              <ImageUploader state={reviewData} setData={setReviewData} />
            </Grid>
            {/* More Details */}
            <Grid item xs={12} md={5.8} sx={{ padding: "1%" }}>
              {/* // ratting  */}
              <Grid item xs={12} sx={{ padding: "1%" }}>
                <Typography sx={{ fontWeight: "400" }} variant="body1">
                  1) How would rate this product?
                </Typography>
                <Box className="rating">
                  <Rating
                    name="hover-feedback"
                    value={reviewData.data.rating || 4}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      setReviewData((old) => ({
                        ...old,
                        data: { ...old.data, rating: newValue },
                      }));
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  {reviewData.data.rating !== null && (
                    <Box sx={{ ml: 2 }}>
                      {labels[hover !== -1 ? hover : reviewData.data.rating]}
                    </Box>
                  )}
                </Box>
              </Grid>

              {/* review title */}
              <Grid xs={12} item>
                <Typography sx={{ fontWeight: "400" }} variant="body1">
                  2) Please enter the review title.
                </Typography>
                <TextField
                  sx={{ p: 1 }}
                  fullWidth
                  type="text"
                  size="small"
                  variant="outlined"
                  value={reviewData.data.review_title}
                  name="review_title"
                  onChange={handleValue}
                />
              </Grid>

              {/* You Tube URL*/}
              <Grid xs={12} item>
                <Typography sx={{ fontWeight: "400" }} variant="body1">
                  3) Any you tube review URLs?
                </Typography>
                <TextField
                  sx={{ p: 1 }}
                  fullWidth
                  type="text"
                  size="small"
                  variant="outlined"
                  value={reviewData.data.yourTube_url}
                  name="yourTube_url"
                  onChange={handleValue}
                />
              </Grid>

              {/* review */}
              <Grid xs={12} item>
                <Typography sx={{ fontWeight: "400" }} variant="body1">
                  4) Write your review below.
                </Typography>
                <Box p={1}>
                  <TextareaAutosize
                    minRows={5}
                    maxRows={5}
                    required
                    name="review"
                    onChange={handleValue}
                    className="customTextArea"
                    placeholder="Write something beautiful..."
                  />
                </Box>
              </Grid>

              {/* Name */}
              <Grid xs={12} item>
                <Typography sx={{ fontWeight: "400" }} variant="body1">
                  5) Name you like to show on review (ex : Rahul)?
                </Typography>
                <TextField
                  sx={{ p: 1 }}
                  fullWidth
                  type="text"
                  size="small"
                  variant="outlined"
                  value={reviewData.data.reviewer_name}
                  name="reviewer_name"
                  onChange={handleValue}
                />
              </Grid>

              {/* Email */}
              <Grid xs={12} item>
                {reviewData.button === "emailSent" ? (
                  <>
                    <Typography sx={{ fontWeight: "400" }} variant="body1">
                      6) Please enter the OTP for verification.
                    </Typography>
                    <TextField
                      sx={{ p: 1 }}
                      fullWidth
                      required
                      type="number"
                      size="small"
                      variant="outlined"
                      value={reviewData.data.otp}
                      name="otp"
                      onChange={handleValue}
                    />
                    <Typography
                      component={Button}
                      variant="caption"
                      onClick={changeEmailAddress}
                    >
                      Want to edit email Address?
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography sx={{ fontWeight: "400" }} variant="body1">
                      6) Enter your email address please.
                    </Typography>
                    <TextField
                      sx={{ p: 1 }}
                      fullWidth
                      required
                      type="email"
                      size="small"
                      variant="outlined"
                      value={reviewData.data.reviewer_email}
                      name="reviewer_email"
                      onChange={handleValue}
                    />
                  </>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} p={1}>
              <Button
                disabled={reviewData.isLoading}
                type="submit"
                startIcon={
                  reviewData.isLoading ? (
                    <CircularProgress size={15} />
                  ) : (
                    <TurnedInIcon />
                  )
                }
                sx={{ float: "right" }}
                variant="outlined"
              >
                {reviewData.button === "verify" ? "Verify" : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
}

export default Review;

// commented

// getting current data
// function getTime() {
//   const currentDate = new Date();
//   const date =
//     currentDate.getDate() +
//     "/" +
//     (currentDate.getMonth() + 1) +
//     "/" +
//     currentDate.getFullYear() +
//     " @ " +
//     currentDate.getHours() +
//     ":" +
//     currentDate.getMinutes() +
//     ":" +
//     currentDate.getSeconds();

//   return date;
// }

// function Conversation({ customer, admin }) {
//   return (
//     <Box className="conversationBox">
//       {[...customer, ...admin]
//         .sort((a, b) => a.time - b.time)
//         .map((chat, index) => (
//           <Box key={index} className={"reply"}>
//             <Typography variant="body1">{chat.message}</Typography>
//             <Typography className variant="caption">
//               Posted On : {chat.time}
//             </Typography>
//           </Box>
//         ))}
//     </Box>
//   );
// }

// // reply box
// function ReplyBox({ ID, setReviews, reviews }) {
//   async function handleSubmit(e) {
//     e.preventDefault();
//     const FD = new FormData();
//     FD.append(
//       "reply",
//       JSON.stringify([{ message: e.target.reply.value, time: getTime(), date : new Date() }])
//     );
//     FD.append("_id", ID);
//     console.log("i am in ");
//     let res = await addReply(FD);

//     if (res.status === 200) {
//       console.log(reviews);
//       setReviews(
//         reviews.map((row) => {
//           if (row._id === ID) {
//             row.review = [
//               ...row.review,
//               { message: e.target.reply.value, time: getTime() },
//             ];
//           }
//           return row;
//         })
//       );
//     }

//     console.log(res);
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       action=""
//       method="post"
//       className={"replyBox"}
//     >
//       <TextField
//         size="small"
//         fullWidth
//         name="reply"
//         variant="outlined"
//         label={"Reply..."}
//         type="text"
//       />
//       <Button
//         size="small"
//         variant="outlined"
//         type="submit"
//         endIcon={<SendIcon />}
//       >
//         Send
//       </Button>
//     </form>
//   );
// }
