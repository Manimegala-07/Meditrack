import React, { useState } from 'react';
import {
    Box, Typography, TextField, Select, MenuItem, IconButton, InputAdornment,
    Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Card, CardContent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import '../styles/admin-css.css'; 

const doctorData = [
    { id: 1, name: 'Dr. A. Sharma', specialization: 'Cardiologist', contact: '9876543210' },
    { id: 2, name: 'Dr. B. Gupta', specialization: 'Dermatologist', contact: '9876543211' },
    { id: 3, name: 'Dr. C. Kumar', specialization: 'Orthopedic', contact: '9876543212' },
];

const AdminDashboard = () => {
    const [filter, setFilter] = useState('rollno');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTab, setSelectedTab] = useState('search');

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Sidebar */}
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', bgcolor: '#424242', color: 'white' } }}
            >
                <Typography variant="h6" align="center" sx={{ py: 2, bgcolor: '#2c387e', color: 'white' }}>
                    Admin Dashboard
                </Typography>
                <Divider />
                <List>
                    <ListItem button onClick={() => handleTabChange('search')}>
                        <ListItemIcon sx={{ color: 'white' }}>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Search Records" />
                    </ListItem>
                    <ListItem button onClick={() => handleTabChange('doctors')}>
                        <ListItemIcon sx={{ color: 'white' }}>
                            <LocalHospitalIcon />
                        </ListItemIcon>
                        <ListItemText primary="Doctor Details" />
                    </ListItem>
                </List>
            </Drawer>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {selectedTab === 'search' && (
                    <>
                        <Typography variant="h4" gutterBottom>
                            Search Student Records
                        </Typography>
                        {/* Search Bar */}
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder={`Search by ${filter}`}
                                value={searchQuery}
                                onChange={handleSearchChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Select
                                value={filter}
                                onChange={handleFilterChange}
                                variant="outlined"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <FilterListIcon />
                                    </InputAdornment>
                                }
                            >
                                <MenuItem value="rollno">Roll No</MenuItem>
                                <MenuItem value="dept">Department</MenuItem>
                                <MenuItem value="mobileno">Mobile No</MenuItem>
                            </Select>
                        </Box>

                        {/* Search Results */}
                        <Typography variant="body1" color="text.secondary">
                            Showing results for "{searchQuery}" in "{filter}"
                        </Typography>
                    </>
                )}

                {selectedTab === 'doctors' && (
                    <>
                        <Typography variant="h4" gutterBottom>
                            Doctor Details
                        </Typography>
                        <Box sx={{ display: 'grid', gap: 2 }}>
                            {doctorData.map((doctor) => (
                                <Card key={doctor.id} sx={{ bgcolor: '#e0f7fa', borderRadius: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6">{doctor.name}</Typography>
                                        <Typography variant="body2">Specialization: {doctor.specialization}</Typography>
                                        <Typography variant="body2">Contact: {doctor.contact}</Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default AdminDashboard;
