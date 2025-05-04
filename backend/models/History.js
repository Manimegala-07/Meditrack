const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  regno: { type: String, required: true },  // Link to the student's regno
  problem: String,
  medication: [String],
  description: String,
  timestamp: { type: Date, default: Date.now }, // You can add timestamp to track when the entry was made
});

const History = mongoose.model('History', historySchema, 'histories');
module.exports = History;
