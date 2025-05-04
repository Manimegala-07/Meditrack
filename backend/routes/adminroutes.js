const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// 🔍 Search students by name, phone, rollNo, or department
router.get("/", async (req, res) => {
  try {
    const { name, phone, rollNo, department } = req.query;

    const filter = {};
    if (name) filter.name = new RegExp(name, 'i'); // case-insensitive search
    if (phone) filter.phone = phone;
    if (rollNo) filter.rollNo = rollNo;
    if (department) filter.department = department;

    const students = await Student.find(filter);
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Search failed", details: err.message });
  }
});

module.exports = router;