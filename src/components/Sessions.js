import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography } from '@mui/material';

const Sessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Replace with your data fetching logic
    setSessions([
      { id: 1, name: 'Session 1', date: '2024-01-01', status: 'Completed' },
      { id: 2, name: 'Session 2', date: '2024-01-02', status: 'In Progress' },
    ]);
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>Sessions</Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={sessions} columns={columns} pageSize={5} />
      </div>
    </Container>
  );
};

export default Sessions;
