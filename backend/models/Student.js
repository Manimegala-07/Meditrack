const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  regno: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true },
  gender: { type: String, required: true },
  mobile: { type: String, required: true },
}, { collection: 'students' });  // <-- ADD THIS

module.exports = mongoose.model('Student', studentSchema);
