const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // If you're running the frontend on a different port
const studentRoutes = require('./routes/studentRoutes');  // Adjust the path
const adminRoutes = require("./routes/adminroutes");

const app = express();

// Middleware
app.use(cors());  // Allow CORS if frontend and backend are on different ports
app.use(express.json());  // Parse JSON bodies

// Use the route for student
 app.use(studentRoutes);

// Mount routes with different base paths
// app.use("/api/admin", adminRoutes);   // e.g., /api/admin?name=...
// app.use("/api/doctor", studentRoutes); // e.g., /api/doctor/getByRegNo/12345

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mediTrack', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
