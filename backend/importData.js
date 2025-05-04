const mongoose = require('mongoose');
const XLSX = require('xlsx');
const fs = require('fs');
const Student = require('./models/Student');
const History = require('./models/History');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/meditrack', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("MongoDB connected");

  // Read Excel file
  const workbook = XLSX.readFile('data/data-s.xlsx');
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const studentData = XLSX.utils.sheet_to_json(sheet);

  // Write JSON file for backup
  fs.writeFileSync('students.json', JSON.stringify(studentData, null, 2));
  console.log("JSON file created: students.json");

  // Insert new students and their history
  for (const student of studentData) {
    const existingStudent = await Student.findOne({ regno: student.regno });
    if (!existingStudent) {
      const newStudent = new Student(student);
      await newStudent.save();

      // Assuming history data is available in the Excel sheet
      const studentHistory = student.history || [];
      for (const entry of studentHistory) {
        const newHistory = new History({
          regno: student.regno,
          ...entry,
        });
        await newHistory.save();
      }
    }
  }

  console.log("New students and their history added");
  mongoose.connection.close();
}).catch((err) => {
  console.error("MongoDB connection failed", err);
});
