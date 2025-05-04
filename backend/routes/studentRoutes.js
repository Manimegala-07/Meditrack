const express = require('express');
const Student = require('../models/Student');
const History = require('../models/History');
const Medicine = require('../models/medicine'); // <- This is the correct model
const router = express.Router();

// Fetch student by regno or mobile and get their history
router.get('/api/student/:searchType/:searchValue', async (req, res) => {
  try {
    const { searchType, searchValue } = req.params;
    const query = searchType === 'regno' ? { regno: searchValue } : { mobile: searchValue };

    const student = await Student.findOne(query);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const history = await History.find({ regno: student.regno });

    res.json({ studentDetails: student, history });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new history entry for a student
router.post('/api/student/:regno/history', async (req, res) => {
  try {
    const { regno } = req.params;
    const { problem, medication, description } = req.body;

    const student = await Student.findOne({ regno });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const newHistory = new History({
      regno,
      problem,
      medication,
      description,
      timestamp: new Date()
    });

    await newHistory.save();

    res.status(201).json(newHistory);
  } catch (error) {
    console.error('Error adding history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// API to handle sending medication to pharmacy
router.post('/api/pharmacy/requests', async (req, res) => {
  const { regno, medications } = req.body;
  console.log("medicines : ", medications);

  try {
    const newRequest = new Medicine({
      regno,
      medications,
      timestamp: new Date()
    });

    console.log("medicines : ", newRequest);
    
    await newRequest.save();
    res.status(200).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error saving medication request', error });
  }
});

// API to get all medication requests for the pharmacy
router.get('/api/pharmacy/requests', async (req, res) => {
  try {
    const requests = await Medicine.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medication requests', error });
  }
});

// API to update medication status
router.patch('/api/pharmacy/requests/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedRequest = await Medicine.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error updating medication status', error });
  }
});



module.exports = router;

//----------------------------------------------------------------------------------------------

// // POST request to send medications to pharmacy
// router.post('/api/pharmacy/requests', (req, res) => {
//   const { regno, medications } = req.body;
  
//   // Handle saving medications to the pharmacy (you can save this to the DB or further processing)
//   // Example: Save to a database or trigger a service
//   console.log(`Sending medications for student ${regno}:`, medications);

//   // Respond with a success message
//   res.json({ message: 'Medications sent to pharmacy successfully' });
// });
// let medicationsList = []; 

// // Endpoint to send medications to the pharmacy
// router.post('/medications', (req, res) => {
//   const { medications } = req.body;

//   // Validate the input
//   if (!Array.isArray(medications)) {
//     return res.status(400).json({ message: "Invalid data format." });
//   }

//   // Save the medications to the list (this could be a database in a real app)
//   medicationsList.push(...medications);

//   // Respond with success
//   res.status(200).json({ message: "Medications sent to pharmacy successfully!" });
// });

// // Endpoint for the pharmacy to fetch medications
// router.get('/medications', (req, res) => {
//   res.status(200).json({ medications: medicationsList });
// });



