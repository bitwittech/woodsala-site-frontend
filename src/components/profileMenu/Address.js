/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "../../asset/css/profile.css";
import {
  Grid,
  Button,
  TextField,
  Typography,
  // CircularProgress,
  Box,
  IconButton,
  Backdrop,
  Modal,
  FormLabel,
  TextareaAutosize,
  MenuItem,
  Fade,
  Stack,
} from "@mui/material";

// icon
// import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
// image
// import avatar from "../../asset/images/profile/avatar.svg";
// import EditIcon from '@mui/icons-material/Edit';
// services
import { getCustomerAddress, updateCustomer } from "../../service/service";
// Store
// import { Store } from "../../store/Context";
// types
// import { Auth, Notify } from "../../store/Types";
// REdux
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../../Redux/action/action";
import { Helmet } from "react-helmet";

const Address = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  // satat for saved array data
  const [addressArray, setAddressArray] = useState([]);
  // state controls
  const [controller, setController] = useState({
    openModal: false,
  });

  // for fetching the user Addresses
  useEffect(() => {
    if (state.auth.isAuth) {
      getCustomerAddress(state.auth.CID)
        .then((response) => {
          // (response)
          setAddressArray(response.data.address);
        })
        .catch(() => {
          // (err);
        });
    }
  }, [state.auth.isAuth]);

  // delete customer
  const deleteCustomer = (index) => {
    const data = addressArray;
    data.splice(index, 1);
    // // (data)
    // return 0;
    const FD = new FormData();
    FD.append("address", JSON.stringify([...data]));
    FD.append("CID", state.auth.CID);

    const req = updateCustomer(FD);

    req
      .then((res) => {
        if (res.status === 200) {
          setAddressArray([...data]);
          setController({ ...controller, openModal: false });

          dispatch(
            setAlert({
              open: true,
              variant: "warning",
              message: "Address Removed",
            })
          );
        } else {
          dispatch(
            setAlert({
              open: true,
              variant: "error",
              message: res.data.message || "Something Went Wrong !!!",
            })
          );
        }
      })
      .catch(() => {
        // (err)
        dispatch(
          setAlert({
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          })
        );
      });
  };

  return (
    <>
      {/* helmet tag  */}
      <Helmet>
        <title>Address</title>
        <meta
          name="description"
          content="Customer details and order sections"
        />
      </Helmet>
      {/* helmet tag ends  */}
      {/* Banner */}
      <Grid container className="Banner">
        <Grid item xs={12}>
          <Typography variant="h1">Address</Typography>
        </Grid>
      </Grid>
      {/* Banner ends */}
      <AddAddressModal
        controller={controller}
        addressArray={addressArray}
        setAddressArray={setAddressArray}
        setController={setController}
      />
      <Box className="addressContainer">
        <Box
          onClick={() => {
            setController({ ...controller, openModal: true });
          }}
          component={"iconButton"}
          className="addAddress"
          xs={2.7}
        >
          <IconButton color="primary" size="large">
            <AddIcon />
          </IconButton>
          <Typography variant="h5">Add Address</Typography>
        </Box>
        {addressArray &&
          addressArray.map((row, index) => {
            return (
              <Box key={index} className="addressTile" item xs={2.7}>
                <Stack sx={{ overflow: "hidden", minHeight: "85%" }}>
                  <Typography variant="h5">{row.customer_name}</Typography>
                  <Typography variant="body1">{row.address}</Typography>
                  <Typography variant="button">
                    {row.city}&nbsp;{row.pincode}
                  </Typography>
                  <Typography variant="body2">{row.mobile}</Typography>
                  <Typography variant="button">{row.type}</Typography>
                </Stack>
                <Box>
                  <Button
                    onClick={() => {
                      setController({ openModal: true, index });
                    }}
                    size="small"
                    variant="outlined"
                  >
                    Edit
                  </Button>
                  <Box
                    component={"span"}
                    sx={{ ml: 1, mr: 1, border: "1px solid brown" }}
                  ></Box>
                  <Button
                    onClick={() => {
                      deleteCustomer(index);
                    }}
                    size="small"
                    variant="outlined"
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            );
          })}
      </Box>
    </>
  );
};

// Address form
function AddAddressModal({
  controller,
  addressArray,
  setAddressArray,
  setController,
}) {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    if (controller.index !== undefined) {
      // (addressArray[controller.index])
      setData({
        ...addressArray[controller.index],
      });
    }
  }, []);

  // style for modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };

  // handleChange
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // add Address
  const handleAddress = (e) => {
    e.preventDefault();
    // // (data);

    const newAddress = [...addressArray, data];

    if (controller.index !== undefined) {
      newAddress.splice(controller.index, 1);
    }
    // (newAddress)

    const FD = new FormData();

    FD.append("address", JSON.stringify(newAddress));
    FD.append("CID", state.auth.CID);

    const req = updateCustomer(FD);

    req
      .then((res) => {
        if (res.status === 200) {
          setAddressArray([...newAddress]);
          setController({ ...controller, openModal: false, index: undefined });

          dispatch(
            setAlert({
              open: true,
              variant: "success",
              message: "Address Appended !!!",
            })
          );
        } else {
          dispatch(
            setAlert({
              open: true,
              variant: "error",
              message: res.data.message || "Something Went Wrong !!!",
            })
          );
        }
      })
      .catch(() => {
        // (err)
        dispatch(
          setAlert({
            open: true,
            variant: "error",
            message: "Something Went Wrong !!!",
          })
        );
      });
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={controller.openModal}
      onClose={() => {
        setController({ ...controller, openModal: !controller.openModal });
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={controller.openModal}>
        <Box sx={style}>
          <Typography sx={{ pb: 1 }} variant="h6">
            Address
          </Typography>
          <form
            className="form"
            id="myForm"
            onSubmit={handleAddress}
            encType="multipart/form-data"
            method="post"
          >
            <TextField
              sx={{ mb: 1 }}
              size="small"
              fullWidth
              // required
              id="outlined-select"
              name="customer_name"
              label="Name"
              value={data.customer_name || ""}
              onChange={handleChange}
              type="text"
            />
            <TextField
              sx={{ mb: 1 }}
              size="small"
              fullWidth
              // required
              id="outlined-select"
              name="mobile"
              label="Mobile"
              type="number"
              value={data.mobile || ""}
              onChange={handleChange}
            />
            <TextField
              sx={{ mb: 1 }}
              size="small"
              fullWidth
              // required
              id="outlined-select"
              name="pincode"
              label="Pin Code"
              type="number"
              value={data.pincode || ""}
              onChange={handleChange}
            />

            <TextField
              sx={{ mb: 1 }}
              size="small"
              fullWidth
              // required
              id="outlined-select"
              name="city"
              label="City"
              value={data.city || ""}
              onChange={handleChange}
              type="text"
            />

            <TextField
              sx={{ mb: 1 }}
              size="small"
              fullWidth
              // required
              id="outlined-select"
              name="state"
              label="State"
              type="text"
              value={data.state || ""}
              onChange={handleChange}
            />

            <FormLabel id="demo-radio-buttons-group-label">Address</FormLabel>
            <br></br>
            <TextareaAutosize
              fullWidth
              maxRows={5}
              minRows={5}
              id="outlined-select"
              name="address"
              style={{ width: "100%" }}
              type="text"
              value={data.address || ""}
              onChange={handleChange}
              placeholder="Please enter your address"
            />
            <br></br>

            <FormLabel id="demo-radio-buttons-group-label">
              Address Type
            </FormLabel>

            <TextField
              sx={{ mb: 1 }}
              size="small"
              fullWidth
              id="outlined-select"
              select
              name="type"
              displayEmpty
              value={data.type || ""}
              multiple
              onChange={handleChange}
              helperText="Please select your address type"
            >
              <MenuItem key={"home"} value={"home"}>
                Home
              </MenuItem>
              <MenuItem key={"office"} value={"office"}>
                Office
              </MenuItem>
              <MenuItem key={"none"} value={"none"}>
                None
              </MenuItem>
            </TextField>

            <Button color="primary" fullWidth type="submit" variant="contained">
              Add Address
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}

export default Address;
