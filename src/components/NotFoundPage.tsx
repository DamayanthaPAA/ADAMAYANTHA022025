import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, Typography, Paper } from "@mui/material";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { handleSubmit } = useForm();

  const onSubmit = () => {
    navigate("/"); // Redirect to home
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar Placeholder (Optional) */}
      <Box sx={{ width: 250, backgroundColor: "#f5f5f5" }} />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Paper sx={{ padding: 4, textAlign: "center", boxShadow: 3, borderRadius: 2, maxWidth: 500 }}>
          {/* 404 Error Graphic */}
          <Typography variant="h1" sx={{ fontSize: "5rem", fontWeight: "bold", color: "#1976d2" }}>
            404
          </Typography>

          {/* Line Chart Effect on 404 (Simulated) */}
          <Box sx={{ width: "100%", height: 5, background: "linear-gradient(to right, #1976d2, #64b5f6)" }} />

          {/* Error Message */}
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Page not found. Please try again later.
          </Typography>

          {/* "Go Home" Button */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Button type="submit" variant="contained" sx={{ marginTop: 3 }}>
              GO HOME
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
