import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

const Dashboard = () => {
  return (
    <Container sx={{ padding: 0, margin: 0, mt: 2 }}>
      <Outlet />
    </Container>
  );
};

export default Dashboard;
