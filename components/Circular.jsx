import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Circular = () => {
  return (
    <Box sx={{ display: "flex", margin: 1, padding: 2 }}>
      <CircularProgress />
    </Box>
  );
};

export default Circular;
