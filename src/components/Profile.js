import React from 'react';
import {
    Tabs,
    Tab,
    Typography,
    Box,
    Grid
} from '@mui/material';

// My components 
import UserInfo from './profileMenu/UserInfo';
import Address from './profileMenu/Address';
import Order from './profileMenu/Order';

//css 
import '../asset/css/profile.css'

const Profile = () => {

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>
            <title>Profile</title>

            {/* Banner */}
            <Grid container className="Banner">
                <Grid item xs={12}>
                    <Typography variant="h1">My Account</Typography>
                </Grid>
            </Grid>
            {/* Banner Ends */}
            {/* tab starts */}
            <Grid container sx={{ p: 1, pl: 5, pr: 5 }}>

                <Grid item xs={12} sx={
                    { p: 2 }
                }>

                </Grid>
                <Grid item xs={12} md={1.5}>
                    <Tabs
                        orientation={window.innerWidth > 800 ? 'vertical' : 'horizontal'}
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider', height : '100%' }}
                    >
                        <Tab className='profileTab' label="User Info" {...a11yProps(0)} />
                        <Tab className='profileTab' label="Your Address" {...a11yProps(1)} />
                        <Tab className='profileTab' label="Your Order" {...a11yProps(2)} />
                        <Tab className='profileTab' label="Account Settings" {...a11yProps(3)} />
                    </Tabs>

                </Grid>
                <Grid item xs={12} md={10.5}>
                    <TabPanel value={value} index={0}>
                        <UserInfo />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Address/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Order/>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Item Three
                    </TabPanel>

                </Grid>
            </Grid>
            {/* tab ends */}

        </>
    );
}

export default Profile;


