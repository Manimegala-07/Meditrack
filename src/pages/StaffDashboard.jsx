import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, Typography, Box, List, ListItem, ListItemText, Divider, Button
} from '@mui/material';
import axios from 'axios';

const PharmacyPage = () => {
  const [medicineRequests, setMedicineRequests] = useState([]);

  const fetchMedicineRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/pharmacy/requests');
      // Filter out delivered requests from the list
      const filteredRequests = response.data.filter(request => request.status !== 'delivered');
      setMedicineRequests(filteredRequests);
    } catch (error) {
      console.error('Error fetching medicine requests:', error);
    }
  };

  const handleDelivered = async (requestId) => {
    try {
      // Update status to 'delivered' in the backend
      await axios.patch(`http://localhost:5000/api/pharmacy/requests/${requestId}`, {
        status: 'delivered',
      });

      // Update the status locally and update the UI
      setMedicineRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId
            ? { ...request, status: 'delivered' }
            : request
        )
      );

      // Remove the card after 10 seconds
      setTimeout(() => {
        setMedicineRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== requestId)
        );
      }, 10000);
    } catch (error) {
      console.error('Error updating medication status:', error);
    }
  };

  useEffect(() => {
    fetchMedicineRequests(); // Initial fetch
    const interval = setInterval(fetchMedicineRequests, 5000); // Re-fetch every 5 seconds

    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, []);

  return (
    <Box sx={{ p: 4, minHeight: '100vh', background: 'linear-gradient(145deg, #cce7f0, #ffebc5)' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="primary" align="center" sx={{ fontFamily: 'Poppins' }}>
        Pharmacy Panel
      </Typography>

      {/* Medications List */}
      {medicineRequests.length > 0 ? (
        medicineRequests.map((request) => (
          <Card key={request._id} sx={{ maxWidth: 900, mx: 'auto', mb: 4, borderRadius: 5, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Medications Sent by Doctor
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                <ListItem>
                  <ListItemText
                    primary={`Reg No: ${request.regno}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="textPrimary">
                          Medication: {Array.isArray(request.medications) ? request.medications.join(', ') : 'No medication listed'}
                        </Typography><br />
                        <Typography component="span" variant="body2" color="textSecondary">
                          Requested At: {new Date(request.timestamp).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                  {request.status === 'pending' && (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelivered(request._id)}
                      sx={{ ml: 2 }}
                    >
                      Delivered
                    </Button>
                  )}
                  {request.status === 'delivered' && (
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ ml: 2 }}
                      disabled
                    >
                      Delivered
                    </Button>
                  )}
                </ListItem>
              </List>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography color="textSecondary" align="center">
          No medications received yet.
        </Typography>
      )}
    </Box>
  );
};

export default PharmacyPage;



// import React, { useState, useEffect } from 'react';
// import {
//   Card, CardContent, Typography, Box, List, ListItem, ListItemText, Divider
// } from '@mui/material';
// import axios from 'axios';


// const PharmacyPage = () => {
//   const [medicineRequests, setMedicineRequests] = useState([]);
  
//   const fetchMedicineRequests = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/pharmacy/requests');
//       //console.log('Fetched Medicine Requests:', response.data);
//       setMedicineRequests(response.data);
//     } catch (error) {
//       console.error('Error fetching medicine requests:', error);
//     }
//   };

//   // Fetch data when component mounts and every 5 seconds
//   useEffect(() => {
   

//     fetchMedicineRequests(); // Initial fetch
//     const interval = setInterval(fetchMedicineRequests, 5000); // Re-fetch every 5 seconds

//     return () => clearInterval(interval); // Clean up the interval when the component unmounts
//   }, []);

//   return (
    
//     <Box sx={{ p: 4, minHeight: '100vh', background: 'linear-gradient(145deg, #cce7f0, #ffebc5)' }}>
//       <Typography variant="h4" fontWeight="bold" gutterBottom color="primary" align="center" sx={{ fontFamily: 'Poppins' }}>
//         Pharmacy Panel
//       </Typography>

//       {/* Medications List */}
//       <Card sx={{ maxWidth: 900, mx: 'auto', mb: 4, borderRadius: 5, boxShadow: 2 }}>
//         <CardContent>
//           <Typography variant="h6" color="primary" gutterBottom>
//             Medications Sent by Doctor
//           </Typography>
//           <Divider sx={{ mb: 2 }} />
//           <List>
//             {medicineRequests.length > 0 ? (
//               medicineRequests.map((request, index) => (
//                 <ListItem key={index}>
//                   <ListItemText
//                     primary={`Reg No: ${request.regno}`}
//                     secondary={
//                       <>
//                         <Typography component="span" variant="body2" color="textPrimary">
//                           Medication: {Array.isArray(request.medications) ? request.medications.join(', ') : 'No medication listed'}
//                         </Typography><br/>
//                         <Typography component="span" variant="body2" color="textSecondary">
//                           Requested At: {new Date(request.timestamp).toLocaleString()}
//                         </Typography>
//                       </>
//                     }
//                   />
//                 </ListItem>
//               ))
              
//             ) : (
//               <Typography color="textSecondary" align="center">
//                 No medications received yet.
//               </Typography>
//             )}
//           </List>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default PharmacyPage;
