import React, { useState } from 'react';
import {
  TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box, Typography, MenuItem, Card,
  CardContent, Divider, Autocomplete, Chip
} from '@mui/material';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';

const DoctorPage = () => {
  const [searchType, setSearchType] = useState('regno');
  const [searchValue, setSearchValue] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [history, setHistory] = useState([]);
  const [newEntry, setNewEntry] = useState({
    problem: '',
    medication: [],
    description: ''
  });
  

  const dummyMedicines = ['Paracetamol', 'Ibuprofen', 'Amoxicillin', 'Cetirizine', 'Metformin', 'Azithromycin'];

  const handleSearch = async () => {
    try {
      // Make an API call to fetch student details and history
      //const response = await axios.get('/api/student', { params: { searchType, searchValue } });
      const response = await axios.get(`http://localhost:5000/api/student/${searchType}/${searchValue}`);
      setStudentDetails(response.data.studentDetails);
      setHistory(response.data.history);
    } catch (err) {
      console.error(err);
    }
  };

//   const handleAddEntry = async () => {
//     try {
//       // Simulate adding new entry (you can handle API request here)
//       setHistory([...history, { ...newEntry, timestamp: new Date().toISOString() }]);
//       setNewEntry({ problem: '', medication: [], description: '' });
//     } catch (err) {
//       console.error(err);
//     }
//   };
const handleAddEntry = async () => {
    try {
      // Send data to the backend
      const response = await axios.post(`http://localhost:5000/api/student/${studentDetails.regno}/history`, newEntry);
      console.log("New history entry added:", response.data);
      
      // Update history state locally
      setHistory([...history, response.data]);
      
      // Reset new entry form
      setNewEntry({ problem: '', medication: [], description: '' });
    } catch (err) {
      console.error("Error adding history entry:", err);
    }
  };
  

  // const handleSendToPharmacy = () => {
  //   console.log('Sending meds to pharmacy:', newEntry.medication);
  //   // send data to pharmacy page logic
  // };


  const handleSendToPharmacy = async () => {
    const medications = newEntry.medication; // This is the medication the doctor selects
    const regno = studentDetails.regno; // Student registration number
    const timestamp = new Date().toISOString(); // Current timestamp
  
    const requestData = {
      regno,
      medications,
      timestamp,
    };
  
    try {
      const response = await axios.post('http://localhost:5000/api/pharmacy/requests', requestData);
      console.log("Request sent to pharmacy:", response.data);
      // Optionally, show a success message or update UI state here
    } catch (error) {
      console.error("Error sending medication to pharmacy:", error);
      // Optionally, show an error message
    }
  };
  
  return (
    <Box sx={{
      p: 4,
      minHeight: '100vh',
      background: 'linear-gradient(145deg, #cce7f0, #ffebc5)',  // Gradient background
    }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="primary" align="center" sx={{ fontFamily: 'Poppins' }}>
        MediTrack Doctor Panel
      </Typography>

      {/* 🔍 Search Section */}
      <Card sx={{
        mb: 4,
        borderRadius: 5,
        p: 2,
        background: 'rgba(255,255,255,0.8)', // Light background with subtle opacity
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        maxWidth: 900,
        mx: 'auto'
      }}>
        <CardContent>
          <Typography variant="h6" color="secondary" gutterBottom fontFamily="Poppins">
            Search Student Record
          </Typography>

          <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
            <TextField
              select
              label="Search By"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              size="small"
            >
              <MenuItem value="regno">Register No</MenuItem>
              <MenuItem value="mobile">Mobile No</MenuItem>
            </TextField>

            <TextField
              label={searchType === 'regno' ? 'Register Number' : 'Mobile Number'}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              size="small"
              sx={{ flexGrow: 1, minWidth: 240 }}
            />

            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                height: 40,
                backgroundColor: '#00796b', // Deep green for buttons
                '&:hover': { backgroundColor: '#004d40' }
              }}
            >
              Search
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* 📄 Student Details */}
      {studentDetails && (
        <Card sx={{
          mb: 4,
          p: 3,
          background: 'rgba(255, 255, 255, 0.85)',
          borderRadius: 5,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          maxWidth: 900,
          mx: 'auto'
        }}>
          <Typography variant="h6" color="primary" gutterBottom fontFamily="Poppins">
            Student Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box display="flex" gap={3} flexWrap="wrap">
            {[{ label: 'Reg No', value: studentDetails.regno },
              { label: 'Name', value: studentDetails.name },
              { label: 'Year', value: studentDetails.year },
              { label: 'Gender', value: studentDetails.gender },
              { label: 'Mobile', value: studentDetails.mobile }
            ].map((item, index) => (
              <Box key={index} sx={{
                p: 2,
                borderRadius: 3,
                backgroundColor: 'rgba(255,255,255,0.9)',  // Subtle white boxes
                boxShadow: 2,
                minWidth: 150,
                textAlign: 'center',
              }}>
                <Typography fontWeight="bold" fontSize={14}>{item.label}</Typography>
                <Typography>{item.value}</Typography>
              </Box>
            ))}
          </Box>
        </Card>
      )}

      {/* 📋 Medical History Table */}
      {history.length > 0 && (
        <Card sx={{
          mb: 4,
          borderRadius: 5,
          backgroundColor: '#ffffffdd',  // Light background with soft opacity
          maxWidth: 900,
          mx: 'auto',
          boxShadow: 2
        }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary" fontFamily="Poppins">
              Medical History
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
              <Table size="small">
                <TableHead sx={{ backgroundColor: '#00796b' }}>
                  <TableRow>
                    <TableCell ><b>Date</b></TableCell>
                    <TableCell><b>Problem</b></TableCell>
                    <TableCell><b>Medication</b></TableCell>
                    <TableCell><b>Description</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.map((entry, idx) => (
                    <TableRow
                      key={idx}
                      sx={{ backgroundColor: idx % 2 === 0 ? '#f1f8e9' : '#ffffff' }} // Soft alternating row colors
                    >
                      <TableCell>{new Date(entry.timestamp).toLocaleDateString()}</TableCell>
                      <TableCell>{entry.problem}</TableCell>
                      <TableCell>{entry.medication?.join(', ')}</TableCell>
                      <TableCell>{entry.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* ➕ Add New Diagnosis */}
      <Card sx={{
        borderRadius: 5,
        boxShadow: 3,
        background: 'rgba(255,255,255,0.8)',
        maxWidth: 900,
        mx: 'auto'
      }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="secondary" fontFamily="Poppins">
            Add New Diagnosis
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Problem"
              value={newEntry.problem}
              onChange={(e) => setNewEntry({ ...newEntry, problem: e.target.value })}
              fullWidth
              variant="outlined"
            />

     <Box display="flex" gap={2} alignItems="center">
                   <Autocomplete
                     multiple
                     freeSolo
                     options={dummyMedicines}
                     value={newEntry.medication}
                     onChange={(e, value) => setNewEntry({ ...newEntry, medication: value })}
                     renderTags={(value, getTagProps) =>
                       value.map((option, index) => (
                         <Chip label={option} {...getTagProps({ index })} />
                       ))
                     }
                     renderInput={(params) => (
                       <TextField {...params} label="Medications" placeholder="Type to search" fullWidth />
                     )}
                     sx={{ flexGrow: 1 }}
                   />
              <Button
                variant="outlined"
                color="secondary"
                endIcon={<SendIcon />}
                onClick={handleSendToPharmacy}
                sx={{ width: 'fit-content' }}
              >
                Send to Pharmacy
              </Button>
            </Box>

            <TextField
              label="Description"
              multiline
              rows={3}
              value={newEntry.description}
              onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
              fullWidth
              variant="outlined"
            />

            <Button
              variant="contained"
              onClick={handleAddEntry}
              sx={{
                backgroundColor: '#00796b', // Deep green for "Add Entry"
                '&:hover': { backgroundColor: '#004d40' }
              }}
            >
              Add Entry
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DoctorPage;
