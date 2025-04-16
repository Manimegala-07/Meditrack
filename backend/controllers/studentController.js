const Student = require('../models/Student');

// Search by query (name, rollNo, etc.)
const searchStudents = async (req, res) => {
  const { query } = req.query;
  const regex = new RegExp(query, 'i'); // case-insensitive search

  try {
    const students = await Student.find({
      $or: [
        { name: regex },
        { rollNo: regex },
        { phone: regex },
        { department: regex }
      ]
    });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search students' });
  }
};

module.exports = { searchStudents };
