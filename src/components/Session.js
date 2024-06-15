import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, Container, Snackbar, Typography } from '@mui/material';
import { getSessions, setSessionName } from '../services/apiService';
import { Tracks } from '../constants/tracks';
import { Gamemodes } from '../constants/gamemodes';
import { Sessiontypes } from '../constants/sessiontypes';
import { Rulesets } from '../constants/rulesets';
import { Formulas } from '../constants/formulas';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const Session = () => {
  const [sessions, setSessions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("success");
  const fetchSessions = async () => {
    console.log('hi');
    const response = await fetch("https://web-api.racenet.com/api/identity/auth", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-GB,en;q=0.9",
        "content-type": "application/json",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "cookie": "TAsessionID=2a524758-43b7-4c6f-bffd-7a7026021bfe|NEW; _gid=GA1.2.1650814896.1718454335; _gat_UA-29812607-2=1; notice_behavior=implied,us; notice_location=au; _ga=GA1.2.345832612.1718454335; _ga_VEGXVNQ9M9=GS1.1.1718454334.1.1.1718454390.0.0.0",
        "Referer": "https://racenet.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": "{\"authCode\":\"QUOhAA4uZocl4mS8j00f5T0y0gFaB_egjAPGFqa4\",\"clientId\":\"RACENET_1_JS_WEB_APP\",\"grantType\":\"authorization_code\",\"codeVerifier\":\"\",\"redirectUri\":\"https://racenet.com/oauthCallback\",\"refreshToken\":\"\"}",
      "method": "POST"
    });
    console.log(response);
    setSessions(await getSessions());
  }
  const processRowUpdate = async (newRow, oldRow) => {
    const updatedRow = { ...oldRow, ...newRow };
    setSessions((prevSessions) =>
      prevSessions.map((row) => (row.sessionId === updatedRow.sessionId ? updatedRow : row))
    );

    // Make API call to save changes
    try {
      setSessionName(updatedRow.sessionId, updatedRow.name);
      setSnackMessage(`Successfully updated the name for session ${updatedRow.sessionId}.`);
      setSnackSeverity('success');
      setSnackOpen(true);
    } catch (error) {
      setSnackMessage(error);
      setSnackSeverity('error');
      setSnackOpen(true);
      console.error('Error saving data', error);
    }

    return updatedRow;
  };

  const handleProcessRowUpdateError = (error) => {
    console.error('Error processing row update:', error);
  };

  const handleView = (row) => {
    console.log('View:', row);
  }

  const handleDelete = () => {
    console.log('Delete:', selectedRow?.sessionId);
  }

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackOpen(false);
    setSnackMessage("");
  }

  useEffect(() => {
    // Replace with your data fetching logic
    fetchSessions();
  }, []);

  const columns = [
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 2,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleView(params.row)}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => handleDeleteClick(params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      )
    },
    { field: 'sessionId', headerName: 'Session ID', flex: 4 },
    { field: 'name', headerName: 'Name', flex: 4, editable: true },
    { field: 'trackId', headerName: 'Track', flex: 2, valueGetter: (value) => Tracks.find(t => t.ID === value)?.Track || ""},
    { field: 'gameMode', headerName: 'Game Mode', flex: 2, valueGetter: (value) => Gamemodes.find(g => g.ID === value)?.Name || "" },
    { field: 'sessionType', headerName: 'Session Type', flex: 2, valueGetter: (value) => Sessiontypes.find(s => s.ID === value)?.Name || "" },
    { field: 'ruleSet', headerName: 'Rule Set', flex: 2, valueGetter: (value) => Rulesets.find(r => r.ID === value)?.Name || "" },
    { field: 'formula', headerName: 'Formula', flex: 2, valueGetter: (value) => Formulas.find(f => f.ID === value)?.Name || "" },
    { field: 'isOor', headerName: 'Is OOR?', flex: 2, type: 'boolean' }
  ];

  return (
    <Container>
      <Snackbar 
        open={snackOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackSeverity}
          variant='filled'
        >
          {snackMessage}
        </Alert>
      </Snackbar>
      <Typography variant="h4" component="h2" gutterBottom>Sessions</Typography>
      <div style={{ height: '100%', width: '90vw' }}>
        <DataGrid 
          rows={sessions} 
          columns={columns} 
          pageSize={100} 
          getRowId={(row) => row.sessionId}
          processRowUpdate={processRowUpdate}
          disableRowSelectionOnClick
          onProcessRowUpdateError={handleProcessRowUpdateError}
        />
      </div>
    </Container>
  );
};

export default Session;