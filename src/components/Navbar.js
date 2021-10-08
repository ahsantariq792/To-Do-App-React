import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import "../App.css";

export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="navbar">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div" className="navbartext">
            To Do APP
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
