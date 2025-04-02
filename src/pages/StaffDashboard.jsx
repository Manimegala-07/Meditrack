import React from "react";
import { Container, Typography } from "@mui/material";

const StaffManagement = () => {
  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Staff Management
      </Typography>
      <Typography variant="body1" align="center">
        Manage doctors and receptionists.
      </Typography>
    </Container>
  );
};

export default StaffManagement;
