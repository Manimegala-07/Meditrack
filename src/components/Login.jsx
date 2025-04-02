import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import navigation

const Login = () => {
  const [role, setRole] = useState("Admin"); // Default role
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Navigation hook

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter valid credentials!");
      return;
    }

    // Navigate based on role
    if (role === "Admin") navigate("/admin-dashboard");
    else if (role === "Doctor") navigate("/doctor-dashboard");
    else if (role === "Staff") navigate("/staff-dashboard");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #6e8efb, #a777e3)",
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ p: 3, boxShadow: 5, textAlign: "center", borderRadius: 3 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "bold",
              letterSpacing: 1,
            }}
          >
            Health Center Login
          </Typography>

          {/* Role Selection Buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
            {["Admin", "Doctor", "Staff"].map((r) => (
              <Button
                key={r}
                variant={role === r ? "contained" : "outlined"}
                color="primary"
                onClick={() => setRole(r)}
                sx={{ borderRadius: 2, fontWeight: "bold" }}
              >
                {r}
              </Button>
            ))}
          </Box>

          {/* Login Form */}
          <CardContent>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, borderRadius: 2, fontWeight: "bold" }}
              onClick={handleLogin} // Redirect on login
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
