const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET students with optional search filters
router.get('/students', async (req, res) => {
    try {
      const { rollNo, phone, name, department } = req.query;
  
      let query = {};
  
      if (rollNo) query.rollNo = rollNo;
      if (phone) query.phone = phone;
      if (name) query.name = { $regex: name, $options: 'i' }; // case-insensitive search
      if (department) query.department = { $regex: department, $options: 'i' };
  
      console.log("🧪 Filter Query:", query); // 👈 Check what query is formed


      const students = await Student.find(query);
      res.json(students);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Mark student as viewed
router.put('/students/mark-viewed/:rollNo', async (req, res) => {
    try {
      const { rollNo } = req.params;
      const timestamp = new Date();
  
      const updatedStudent = await Student.findOneAndUpdate(
        { rollNo: rollNo },
        { viewed: true, viewedAt: timestamp },
        { new: true }
      );
  
      if (!updatedStudent) {
        return res.status(404).json({ success: false, message: 'Student not found' });
      }
  
      res.json({ success: true, data: updatedStudent });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });
  
module.exports = router;
