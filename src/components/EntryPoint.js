import React, { useContext, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { Box, Modal, Fade, Grid, TextField, Typography, Button, FormControl,
InputAdornment,
IconButton
 } from '@mui/material';

// image 
import sidePic from '../asset/images/logBox/sidePicLog.jpg'

// context 
import { LogBox } from '../App.js'

// css 
import '../asset/css/entrypoint.css'

// icon
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,

};

export default function EntryPoint() {

    // context
    const modelState = useContext(LogBox);

    // password visibility 
    const [visible,setVisible] = useState(false);

    const handleClose = () => modelState.setLog({
        open: false,
        type: undefined
    });

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modelState.logState.open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modelState.logState.open}>
                    <Box sx={style}>
                        {modelState.logState.type === 'signUp' &&
                            <Grid container >
                                {/* // form  */}
                                <Grid className = 'formBox' item xs={12} md={5} >
                                    <form className='form' action='' method='post'>
                                        <Typography sx = {{marginBottom : '5px'}} variant='h4'>
                                            Log-In
                                        </Typography>
                                        <Typography  variant='caption'>
                                            Log-In with data that you have entered during the registration.
                                        </Typography>

                                        <FormControl sx={{ mt: 2  }} variant="outlined">
                                            {/* <InputLabel htmlFor="outlined-adornment-password">email</InputLabel> */}
                                            <TextField
                                            fullWidth
                                                id="outlined-adornment-email"
                                                type='text'
                                                label="Email"
                                                size = {'small'}
                                            />
                                        </FormControl>
                                        <FormControl sx={{ mt: 2 , mb : 2 }} variant="outlined">
                                            <TextField
                                            fullWidth
                                                id="outlined-adornment-password"
                                                type={!visible ? 'text' : 'password'}
                                                size = {'small'}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">
                                                          <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={()=>{ setVisible(!visible)} }
                                                            edge="end"
                                                        >
                                                            {visible ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>,
                                                  }}
                                                
                                                label="Password"
                                            />
                                        </FormControl>
                                        <Button fullWidth variant='contained'>Log In</Button>
                                        <Typography sx = {{mt : 2 ,  textAlign : 'center' , width : '100%', display : 'block'}} color = 'primary'  variant='body'>
                                            Forgot Password ?
                                        </Typography>

                                    </form>
                                    <hr ></hr>
                                    <Button sx = {{m : 'auto', mt : 3, display : 'block'}} variant = 'outlined'>Sign Up</Button>

                                </Grid>
                                {/* // form end  */}

                                {/* Side pic */}
                                <Grid item xs={12} md={7} >
                                    <img className = 'posterImage' alt = 'logPic' src = {sidePic}/>
                                </Grid>
                                {/* end Side pic */}
                            </Grid>
                        }
                        {/* {modelState.logState.type === 'signUp' &&
                            <h1>Sign Up</h1> } */}
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
