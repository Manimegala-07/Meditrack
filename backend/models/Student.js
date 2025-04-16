const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, unique: true },
  name: String,
  phone: String,
  department: String,
  age: Number,
  gender: String,
  address: String,

  viewed: { type: Boolean, default: false },
  viewedAt: { type: Date }
  
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
