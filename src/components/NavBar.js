import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="static" color="primary" sx={{ margin: 0, padding: 0 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          F1 League Telemetry
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/dashboard/sessions"><Typography variant="body2"><strong>Sessions</strong></Typography></Button>
          <Button color="inherit" component={Link} to="/dashboard/oor-sessions"><Typography variant="body2"><strong>OOR Sessions</strong></Typography></Button>
          <Button color="inherit" component={Link} to="/dashboard/live-telemetry"><Typography variant="body2"><strong>Live Telemetry</strong></Typography></Button>
          <Button color="inherit" component={Link} to="/dashboard/tt-classification"><Typography variant="body2"><strong>TT Classification</strong></Typography></Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;