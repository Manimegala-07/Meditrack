import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" component="div">
                    MediTrack - Health Center
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
