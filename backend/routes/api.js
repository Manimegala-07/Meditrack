const express = require('express');
const router = express.Router();
const xlsx = require('xlsx');
const path = require('path');

// Read the Excel file once during server startup
const filePath = path.join(__dirname, '../data', 'data-s.xlsx');
const workbook = xlsx.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert Excel data to JSON
const students = xlsx.utils.sheet_to_json(worksheet);

// Root Route - Just to check server status
router.get('/', (req, res) => {
    res.send('API is running...');
});

// Get All Students
router.get('/students', (req, res) => {
    res.json({ success: true, data: students });
});

// Search Student by Roll No
router.get('/student/:rollno', (req, res) => {
    const rollno = req.params.rollno;
    const student = students.find((s) => s?.ROLLNO?.toString() === rollno);

    if (student) {
        res.json({ success: true, data: student });
    } else {
        res.status(404).json({ success: false, message: 'Student not found' });
    }
});

module.exports = router;
