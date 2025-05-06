import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

// Import images stored inside the components/assets folder
import img1 from "../assets/Anna-University.jpeg";
import img2 from "../assets/Anna-University2.jpeg";
import img3 from "../assets/Anna-University3.jpeg";
import img4 from "../assets/Anna-University4.jpeg";

const Login = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const images = [img1, img2, img3, img4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      alert("Please enter valid credentials!");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Invalid email format!");
      return;
    }

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
        background: `url(${images[currentImageIndex]}) no-repeat center center fixed`,
        backgroundSize: "cover",
        position: "relative",
        
      }}
    >
      
        {/* Background image with smooth fade */}
  <Box
    key={currentImageIndex} // important for animation to trigger
    sx={{
      position: "absolute",
      height: "100%",
      width: "100%",
      background: `url(${images[currentImageIndex]}) no-repeat center center fixed`,
      backgroundSize: "cover",
      transition: "opacity 1s ease-in-out",
      opacity: 1,
      zIndex: -1,
    }}

  />
      {/* Left Arrow */}
      <IconButton
        onClick={handlePreviousImage}
        sx={{
          fontSize: "2rem",
          position: "absolute",
          top: "50%",
          left: "20px",
          transform: "translateY(-50%)",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          zIndex: 1000,
        }}
      >
        <ArrowBack />
      </IconButton>

      {/* Right Arrow */}
      <IconButton
        onClick={handleNextImage}
        sx={{
          fontSize: "2rem",
          position: "absolute",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          zIndex: 1000,
        }}
      >
        <ArrowForward />
      </IconButton>

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <Card
  sx={{
    p: 3,
    boxShadow: 5,
    textAlign: "center",
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.7)", // <-- Transparent white background
    backdropFilter: "blur",                 // <-- Adds a glassmorphism effect
  }}
>

          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}
          >
            Health Center Login
          </Typography>

          {/* Role Selection */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
            {["Admin", "Doctor", "Staff"].map((r) => (
              <Button
                key={r}
                variant={role === r ? "contained" : "outlined"}
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
              onClick={handleLogin}
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
