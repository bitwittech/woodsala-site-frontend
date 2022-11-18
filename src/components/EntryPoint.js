import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import {
    Box,
    Modal,
    Fade,
    Grid,
    TextField,
    Typography,
    Button,
    FormControl,
    InputAdornment,
    IconButton,
    CircularProgress

} from '@mui/material';

// image 
import sidePic from '../asset/images/logBox/sidePicLog.jpg'

// css 
import '../asset/css/entrypoint.css'

// Store
import { Store } from '../store/Context';
import { LogBox, Notify, Auth } from '../store/Types';


// icon
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// services 
import { sendVerificationLink, login } from '../service/service.js'


export default function EntryPoint() {
    // context
    const { state, dispatch } = Store();



    // controller state 
    const [controller, setController] = useState({
        visible: false,
        loading: false
    });

    // data state
    const [data, setData] = useState({
        username: '',
        mobile: '',
        email: '',
        password: '',
        repassword: ''
    })

    // error state
    const [error, setError] = useState({
        username: false,
        mobile: false,
        email: false,
        password: false,
        repassword: false
    })

    const handleClose = () => {

        dispatch({
            type: LogBox,
            payload: {
                open: false,
                type: undefined
            }
        })

        setData({
            username: '',
            mobile: '',
            email: '',
            password: '',
            repassword: ''
        })

    };

    // validation
    const handleValue = (e) => {

        // (e.target.name)

        const phoneCheck = new RegExp(/^\d{10}$/);
        const passwordCheck = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);

        switch (e.target.name) {
            case 'mobile':
                if (phoneCheck.test(e.target.value)) {
                    setData({ ...data, [e.target.name]: e.target.value })
                    setError({ ...error, [e.target.name]: false });
                }
                else setError({ ...error, [e.target.name]: true });
                break;
            case 'password':
                if (passwordCheck.test(e.target.value)) {
                    setData({ ...data, [e.target.name]: e.target.value })
                    setError({ ...error, [e.target.name]: false });
                }
                else setError({ ...error, [e.target.name]: true });
                break;
            case 'repassword':
                if (e.target.value === data.password) {
                    setData({ ...data, [e.target.name]: e.target.value })
                    setError({ ...error, [e.target.name]: false });
                }
                else setError({ ...error, [e.target.name]: true });
                break;
            default:
                setData({ ...data, [e.target.name]: e.target.value })
        }


    }

    // for register 
    const handleSubmit = (e) => {
        e.preventDefault();

        let submit = true;
        // verify the error
        Object.values(error).map(value => {
            if (value === true) submit = false;
            return 0;
        })
        if (!submit) return 0;

        let response = sendVerificationLink(data);

        setController({
            ...controller,
            loading: true
        })

        response
            .then((data) => {
                // (data)
                setController({
                    ...controller,
                    loading: false
                })
                dispatch({
                    type: Notify, payload: {
                        open: true,
                        message: data.data.message,
                        variant: 'success',
                    }
                })
                handleClose();
            })
            .catch((err) => {
                // (err)
                setController({
                    ...controller,
                    loading: false
                })
                dispatch({
                    type: Notify, payload: {
                        open: true,
                        message: data.data.message,
                        variant: 'error',
                    }
                })

            })

    }

    // for login
    const handleLogIn = (e) => {
        e.preventDefault();

        const response = login(data)

        setController({
            ...controller,
            loading: true
        })

        response
            .then((data) => {
                // (data)
                if (data.status === 200) {
                    setController({
                        ...controller,
                        loading: false
                    })

                    dispatch({
                        type: Notify, payload: {
                            open: true,
                            message: data.data.message,
                            variant: 'success',
                        }
                    })
                    dispatch({
                        type: Auth,
                        payload: {
                            isAuth: true,
                            username: data.data.name,
                            email: data.data.email,
                            CID: data.data.CID,
                            token: data.data.token
                        }
                    })
                    // storing the data in localStorage for persistance
                    localStorage.setItem('payload',JSON.stringify(
                        {
                            isAuth: true,
                            username: data.data.name,
                            email: data.data.email,
                            CID: data.data.CID,
                            token: data.data.token
                        }
                    ))
                    // storing the token in localStorage for persistance
                    localStorage.setItem('token',data.data.token)
                    handleClose();
                }
                else {
                    setController({
                        ...controller,
                        loading: false
                    })
                    dispatch({
                        type: Notify, payload: {
                            open: true,
                            message: data.data.message,
                            variant: 'error',
                        }
                    })
                }
            })
            .catch((err) => {
                // (err)
                setController({
                    ...controller,
                    loading: false
                })
                dispatch({
                    type: Notify, payload: {
                        open: true,
                        message: data.data.message,
                        variant: 'error',
                    }
                })

            })
    }


    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={state.LogBox.open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={state.LogBox.open}>
                    <Box className='box' sx={{ boxShadow: 24 }}>
                        {state.LogBox.type === 'logIn' &&
                            <Grid container className='login' >
                                {/* // form  */}
                                <Grid className='formBox' item xs={12} md={5} >
                                    <form onSubmit={handleLogIn} className='form' action='' method='post'>
                                        <Typography sx={{ marginBottom: '5px' }} variant='h4'>
                                            Log-In
                                        </Typography>
                                        <Typography variant='caption'>
                                            Log-In with data that you have entered during the registration.
                                        </Typography>

                                        <FormControl sx={{ mt: 2 }} variant="outlined">
                                            {/* <InputLabel htmlFor="outlined-adornment-password">email</InputLabel> */}
                                            <TextField
                                                fullWidth
                                                required
                                                name='email'
                                                onChange={handleValue}
                                                id="outlined-adornment-email"
                                                type='email'
                                                label="Email"
                                                size={'small'}
                                            />
                                        </FormControl>
                                        {/* {(state.Auth)} */}
                                        <FormControl sx={{ mt: 2, mb: 2 }} variant="outlined">
                                            <TextField
                                                fullWidth
                                                required
                                                name='password'
                                                id="outlined-adornment-password"
                                                type={controller.visible ? 'text' : 'password'}
                                                size={'small'}
                                                onChange={handleValue}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => { setController({ ...controller, visible: !controller.visible }) }}
                                                            edge="end"
                                                        >
                                                            {!controller.visible ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>,
                                                }}

                                                label="Password"
                                            />
                                        </FormControl>
                                        <Button fullWidth type='submit' disabled={controller.loading} variant='contained'>{controller.loading ? <CircularProgress size={'2rem'} /> : 'Log In'} </Button>
                                        <Typography sx={{ mt: 2, mb: 2, textAlign: 'center', width: '100%', display: 'block' }} color='primary' variant='body'>
                                            Forgot Password ?
                                        </Typography>

                                    </form>
                                    <hr ></hr>
                                    <Button sx={{ m: 'auto', mt: 3, display: 'block' }}
                                        onClick={() => {
                                            dispatch({
                                                type: LogBox,
                                                payload: {
                                                    open: true,
                                                    type: 'signUp'
                                                }
                                            })
                                        }}
                                        variant='outlined'>Sign Up</Button>

                                </Grid>
                                {/* // form end  */}

                                {/* Side pic */}
                                <Grid item className='sidePic' xs={12} md={7} >
                                    <img className='posterImage' alt='logPic' src={sidePic} />
                                </Grid>
                                {/* end Side pic */}
                            </Grid>
                        }
                        {state.LogBox.type === 'signUp' &&
                            <Grid container >

                                {/* Side pic */}
                                <Grid item className='sidePic' xs={12} md={7} >
                                    <img className='posterImage' alt='logPic' src={sidePic} />
                                </Grid>
                                {/* end Side pic */}

                                {/* // form  */}
                                <Grid className='formBox' item xs={12} md={5} >
                                    <form className='form' onSubmit={handleSubmit} action='' method='post'>
                                        <Typography sx={{ marginBottom: '5px' }} variant='h4'>
                                            Sing-Up
                                        </Typography>
                                        <Typography variant='caption'>
                                            Hey, don't worry, your details are in safe hands.
                                        </Typography>

                                        <FormControl sx={{ mt: 2 }} variant="outlined">
                                            <TextField
                                                fullWidth
                                                id="outlined-adornment-email"
                                                type='text'
                                                label="Username"
                                                required
                                                size={'small'}
                                                name='username'
                                                onChange={handleValue}
                                            />
                                        </FormControl>
                                        <FormControl sx={{ mt: 2 }} variant="outlined">
                                            <TextField
                                                fullWidth
                                                required
                                                error={error.mobile}
                                                id="outlined-adornment-email"
                                                type='number'
                                                onChange={handleValue}
                                                helperText={error.password ? '10 digit number would be accepted !!!' : ''}
                                                name='mobile'
                                                label="Contact Number"
                                                size={'small'}
                                            />
                                        </FormControl>
                                        <FormControl sx={{ mt: 2 }} variant="outlined">
                                            <TextField
                                                fullWidth
                                                error={error.email}
                                                id="outlined-adornment-email"
                                                type='email'
                                                required
                                                label="Email"
                                                onChange={handleValue}
                                                name="email"
                                                size={'small'}
                                            />
                                        </FormControl>

                                        <FormControl sx={{ mt: 2, }} variant="outlined">
                                            <TextField
                                                fullWidth
                                                error={error.password}
                                                required
                                                onChange={handleValue}
                                                id="outlined-adornment-password"
                                                type={controller.visible ? 'text' : 'password'}
                                                size={'small'}
                                                helperText={error.password ? 'Minimum eight characters, at least one letter, one number and one special character.' : 'Please choose a strong password !!!'}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => { setController({ ...controller, visible: !controller.visible }) }}
                                                            edge="end"
                                                        >
                                                            {!controller.visible ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>,
                                                }}
                                                name='password'
                                                label="Password"
                                            />
                                        </FormControl>
                                        <FormControl sx={{ mt: 2, mb: 2 }} variant="outlined">
                                            <TextField
                                                fullWidth
                                                error={error.repassword}
                                                onChange={handleValue}
                                                id="outlined-adornment-password"
                                                type={'password'}
                                                size={'small'}
                                                // InputProps={{
                                                //     endAdornment: <InputAdornment position="end">
                                                //           <IconButton
                                                //             aria-label="toggle password visibility"
                                                //             onClick={()=>{ setController(!controller.visible)} }
                                                //             edge="end"
                                                //         >
                                                //             {controller.visible ? <VisibilityOff /> : <Visibility />}
                                                //         </IconButton>
                                                //     </InputAdornment>,
                                                //   }}
                                                name='repassword'
                                                label="Retype Password"
                                            />
                                        </FormControl>
                                        <Button fullWidth type='submit' disabled={controller.loading} variant='contained'>{controller.loading ? <CircularProgress size={'2rem'} /> : 'Sign Up'} </Button>

                                    </form>
                                    <hr ></hr>
                                    <Button sx={{ m: 'auto', mt: 2, display: 'block' }}
                                        onClick={() => {
                                            dispatch({
                                                type: LogBox,
                                                payload: {
                                                    open: true,
                                                    type: 'logIn'
                                                }
                                            })
                                        }}
                                        variant='outlined'>Log In</Button>
                                </Grid>
                                {/* // form end  */}

                            </Grid>

                        }
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
