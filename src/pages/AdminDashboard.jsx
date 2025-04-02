import React, { useState } from 'react';
import {
    Box, Typography, TextField, Select, MenuItem, InputAdornment,
    Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Checkbox,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import '../styles/admin-css.css';
import { getStudentByRollNo } from '../services/api';

const doctorData = [
    { id: 1, name: 'Dr. A. Sharma', specialization: 'Cardiologist', contact: '9876543210' },
    { id: 2, name: 'Dr. B. Gupta', specialization: 'Dermatologist', contact: '9876543211' },
    { id: 3, name: 'Dr. C. Kumar', specialization: 'Orthopedic', contact: '9876543212' },
];

const AdminDashboard = () => {
    const [filter, setFilter] = useState('rollno');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTab, setSelectedTab] = useState('search');
    const [student, setStudent] = useState(null);
    const [message, setMessage] = useState('');

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const handleSearch = async () => {
        try {
            const result = await getStudentByRollNo(searchQuery);
            if (result.success) {
                setStudent(result.data);
                setMessage('');
            } else {
                setStudent(null);
                setMessage('No student found');
            }
        } catch (error) {
            console.error('Search error:', error);
            setMessage('Error occurred while fetching data');
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
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

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {selectedTab === 'search' && (
                    <>
                        <Typography variant="h4" gutterBottom>Search Student Records</Typography>
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
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <Select
                                value={filter}
                                onChange={handleFilterChange}
                                variant="outlined"
                            >
                                <MenuItem value="rollno">Roll No</MenuItem>
                                <MenuItem value="dept">Department</MenuItem>
                                <MenuItem value="mobileno">Mobile No</MenuItem>
                            </Select>
                        </Box>

                        {message && <Typography color="error">{message}</Typography>}
                        {student && (
                            <TableContainer component={Paper} sx={{ mt: 2 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Roll No</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Year and Dept</TableCell>
                                            <TableCell>Mobile</TableCell>
                                            <TableCell>Mark as Visited</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{student.ROLLNO}</TableCell>
                                            <TableCell>{student.NAME}</TableCell>
                                            <TableCell>{`${student.YEAR} - ${student.DEPT}`}</TableCell>
                                            <TableCell>{student.MOBILE}</TableCell>
                                            <TableCell><Checkbox /></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </>
                )}

                {selectedTab === 'doctors' && (
                    <>
                        <Typography variant="h4" gutterBottom>Doctor Details</Typography>
                        {doctorData.map((doctor) => (
                            <Box key={doctor.id} sx={{ bgcolor: '#e0f7fa', p: 2, borderRadius: 2, mb: 1 }}>
                                <Typography variant="h6">{doctor.name}</Typography>
                                <Typography>Specialization: {doctor.specialization}</Typography>
                                <Typography>Contact: {doctor.contact}</Typography>
                            </Box>
                        ))}
                    </>
                )}
            </Box>
        </Box>
    );
};

export default AdminDashboard;
