const mongoose = require('mongoose');
const XLSX = require('xlsx');
const fs = require('fs');
const Student = require('./models/Student');
require('dotenv').config();

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("✅ MongoDB connected");

    // 2. Read Excel file
    const workbook = XLSX.readFile('data/data-s.xlsx');
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const studentData = XLSX.utils.sheet_to_json(sheet);

    // 3. Write JSON file (for backup/debugging)
    fs.writeFileSync('students.json', JSON.stringify(studentData, null, 2));
    console.log("📁 JSON file created: students.json");

    // 4. Insert only new students
    const promises = studentData.map(async (student) => {
      const existing = await Student.findOne({ rollNo: student.rollNo });
      if (!existing) {
        return Student.create(student);
      }
    });

    await Promise.all(promises);
    console.log("✅ New students added (duplicates skipped)");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed", err);
  });
