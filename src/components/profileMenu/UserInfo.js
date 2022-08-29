import React from 'react';
import '../../asset/css/profile.css'
import {
    Grid,
    Box,
    Button,
    TextField,
    Typography
} from '@mui/material';
//icon 
import SaveIcon from '@mui/icons-material/Save';
// image
import avatar from '../../asset/images/profile/avatar.svg'

const UserInfo = () => {
    return (
        <form method='post' class='form' enctype='multipart/form-data'>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid className='profileName' spacing={2} container >
                        <Grid className='profilePic' item xs={12} md = {6}>
                            <img src={avatar} alt='ProfilePic'></img>
                        </Grid>
                        <Grid item xs={12} md = {6}>
                            <Typography variant='h2'>Yashwant Sahu</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container className='profileForm' spacing={4} >
                        <Grid item xs={12} md={6} ><TextField size='small' fullWidth variant='outlined' name='' type='text' label='CID' /></Grid>
                        <Grid item xs={12} md={6} ><TextField size='small' fullWidth variant='outlined' name='' type='text' label='UserName' /></Grid>
                        <Grid item xs={12} md={6} ><TextField size='small' fullWidth variant='outlined' name='' type='email' label='Email' /></Grid>
                        <Grid item xs={12} md={6} ><TextField size='small' fullWidth variant='outlined' name='' type='number' label='Mobile Number' /></Grid>
                        <Grid item xs={12} md={6} ><TextField size='small' fullWidth variant='outlined' name='' type='text' label='City' /></Grid>
                        <Grid item xs={12} md={6} ><TextField size='small' fullWidth variant='outlined' name='' type='text' label='State' /></Grid>
                        <Grid item xs={12}  ><TextField fullWidth variant='outlined' size='small' name='' value='' type='text' label='Shipping Address' /></Grid>
                        <Grid item xs={12} ><center><Button startIcon={<SaveIcon />} size="large" variant='contained'>Save Changes</Button></center></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
}

export default UserInfo;
