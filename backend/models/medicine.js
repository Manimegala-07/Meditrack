const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  regno: { type: String, required: true },  // Link to the student's regno
  medications: [String],
  status: { type: String, default: 'pending' }, // Default status
  timestamp: { type: Date, default: Date.now }, // You can add timestamp to track when the entry was made
});

module.exports = mongoose.model('Medicine', medicineSchema);