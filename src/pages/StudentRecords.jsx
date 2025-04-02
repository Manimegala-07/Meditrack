import React from "react";
import { Container, Typography } from "@mui/material";

const StudentRecords = () => {
  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Student Records
      </Typography>
      <Typography variant="body1" align="center">
        View and update student medical history.
      </Typography>
    </Container>
  );
};

export default StudentRecords;
