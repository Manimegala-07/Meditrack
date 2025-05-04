import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PharmacyPage from "./pages/StaffDashboard";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import ReactDOM from "react-dom/client";

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/staff-dashboard" element={<PharmacyPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;

// Main Entry Point
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
