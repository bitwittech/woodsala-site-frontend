import React, { useEffect, useState } from "react";
import "../../asset/css/profile.css";
import { Grid, Button, TextField, Typography, CircularProgress, Box, IconButton } from "@mui/material";
//icon
import SaveIcon from "@mui/icons-material/Save";
// image
import avatar from "../../asset/images/profile/avatar.svg";
import EditIcon from '@mui/icons-material/Edit';
//services
import { getCustomer, updateCustomer } from "../../service/service";
// Store
// import { Store } from "../../store/Context";
// // types 
// import { Auth, Notify } from "../../store/Types";

// Redux 
import {useDispatch,useSelector} from 'react-redux'

// action
import {setAlert,setAuth} from '../../Redux/action/action'

const UserInfo = () => {
    // context
    // const {
    //     state,
    //     dispatch,
    // } = Store();

    const state = useSelector(state=>state)
    const dispatch = useDispatch()

    // state for value 
    const [formVal, SetFormVal] = useState({
        email: "",
        CID: "",
        username: "",
        city: "",
        state: "",
        shipping: "",
    });

    // state for controls over the page 
    // controller state 
    const [controller, setController] = useState({
        visible: false,
        loading: false,
        preview: undefined,
    });


    useEffect(() => {
        if (state.auth.isAuth) {
            getCustomer(state.auth.CID)
            .then((response) => {
                // (response)
                SetFormVal({ ...formVal, ...response.data });
            })
            .catch((err) => {
                // (err);
            });
        }

    }, [state.auth.isAuth]);

    // handleUpdated values
    const handleVal = async (e) => {
        // (e.target.name)
        if (e.target.name !== 'profile_image') {
            SetFormVal({
                ...formVal, [e.target.name]: e.target.value
            })
        }
        else {
            setController({
                ...controller, preview: URL.createObjectURL(e.target.files[0])
            })
            SetFormVal({
                ...formVal, profile_image: e.target.files[0]
            })
        }
    }

    // handleSubmit 
    const handleSubmit = async (e) => {

        e.preventDefault()

        setController({
            ...controller,
            loading: true
        })

        const FD = new FormData();

        FD.append("CID", formVal.CID);
        FD.append("username", formVal.username);
        FD.append("mobile", formVal.mobile);
        FD.append("email", formVal.email);
        FD.append("city", formVal.city);
        FD.append("state", formVal.state);
        FD.append("shipping", formVal.shipping);
        FD.append("profile_image", formVal.profile_image);

        const res = updateCustomer(FD);

        res
            .then((response) => {
                // (response)

                dispatch(setAlert( {
                        open: true,
                        message: 'Changes Saved !!!',
                        variant: 'success',
                }))

                dispatch(setAuth({
                    isAuth: false,
                    username: formVal.username,
                    email: formVal.email,
                    CID: formVal.CID,
                    token: state.auth.token
                }))

                setController({
                    ...controller,
                    loading: false,
                    preview: undefined
                })




            })
            .catch((err) => {
                // (err)
                dispatch(setAlert(
                    {
                        open: true,
                        variant: 'error',
                        message: 'Something Went Wrong !!!',
                }))

                setController({
                    ...controller,
                    loading: false
                })
            })
    }

    return (
        <form method="post" onSubmit={handleSubmit} class="form" enctype="multipart/form-data">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid className="profileName" spacing={4} container>
                        <Grid sx={{
                            backgroundPosition: 'center',
                            background: `url(${controller.preview || formVal.profile_image || avatar})`,
                            backgroundSize: '100% 100%',
                            backgroundRepeat: 'no-repeat',
                        }} item md={3} className="profilePicBox">
                            <IconButton size="large" className='editButton' color="primary" aria-label="upload picture" component="label">
                                <input hidden name='profile_image' onChange={handleVal} accept="image/*" type="file" />
                                <EditIcon fontSize="inherit" />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h2">{formVal.username}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container className="profileForm" spacing={4}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                size="small"
                                fullWidth
                                disabled
                                variant="outlined"
                                name="CID"
                                value={formVal.CID}
                                type="text"
                                label="CID"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                size="small"
                                fullWidth
                                variant="outlined"
                                name="username"
                                value={formVal.username || ''}
                                onChange={handleVal}
                                type="text"
                                label="UserName"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                size="small"
                                fullWidth
                                disabled
                                variant="outlined"
                                name="email"
                                onChange={handleVal}
                                value={formVal.email || ''}
                                type="email"
                                label="Email"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                size="small"
                                fullWidth
                                disabled
                                variant="outlined"
                                name="mobile"
                                onChange={handleVal}
                                value={formVal.mobile || ''}
                                type="number"
                                label="Mobile Number"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                size="small"
                                onChange={handleVal}
                                fullWidth
                                variant="outlined"
                                name="city"
                                value={formVal.city || ''}
                                type="text"
                                label="City"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                size="small"
                                fullWidth
                                onChange={handleVal}
                                variant="outlined"
                                name="state"
                                value={formVal.state || ''}
                                type="text"
                                label="State"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={handleVal}
                                name="shipping"
                                value={formVal.shipping || ''}
                                type="text"
                                label="Shipping Address"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <center>
                                <Button size="large" startIcon={<SaveIcon />}
                                    type='submit' disabled={controller.loading} variant='contained'>{controller.loading ? <CircularProgress size={'2rem'} /> : 'Save Changes'} </Button>
                            </center>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

export default UserInfo;
