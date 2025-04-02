import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';

const Sidebar = () => {
    const menuItems = [
        { text: 'Admin Dashboard', icon: <DashboardIcon /> },
        { text: 'Doctor Dashboard', icon: <LocalHospitalIcon /> },
        { text: 'Staff Dashboard', icon: <PeopleIcon /> },
        { text: 'Student Records', icon: <AssignmentIcon /> },
    ];

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', bgcolor: '#424242', color: 'white' } }}
        >
            <Typography variant="h6" align="center" sx={{ py: 2, bgcolor: '#2c387e', color: 'white' }}>
                Dashboard
            </Typography>
            <Divider />
            <List>
                {menuItems.map((item, index) => (
                    <ListItem button key={index}>
                        <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
