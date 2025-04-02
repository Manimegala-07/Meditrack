const express = require('express');
const xlsx = require('xlsx');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Read the Excel file once during server startup
const filePath = path.join(__dirname, 'data', 'data-s.xlsx');
const workbook = xlsx.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Importing the API routes
const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);

// Convert Excel data to JSON
const students = xlsx.utils.sheet_to_json(worksheet);

app.get('/', (req, res) => {
    res.send('Server is running smoothly!');
});

// API endpoint to search by roll number
app.get('/api/student/:rollno', (req, res) => {
    const rollno = req.params.rollno;
    const student = students.find((s) => s?.ROLLNO?.toString() === rollno);

    if (student) {
        res.json({ success: true, data: student });
    } else {
        res.status(404).json({ success: false, message: 'Student not found' });
    }
});

// API endpoint to get all students (for testing or listing)
app.get('/api/students', (req, res) => {
    res.json({ success: true, data: students });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
