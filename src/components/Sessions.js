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

const Sessions = ({ setCurrentSession }) => {
  const [sessions, setSessions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("success");

  const fetchSessions = async () => {
    console.log('hi');
    const response = await fetch("https://web-api.racenet.com/api/F124Stats/leaderboard/06?platform=3&pageNumber=1&mode=00&weather=D&pageSize=20&playerFocus=false&type=0&version=1&isCrossPlay=true", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-GB,en;q=0.9",
        "authorization": "Bearer eyJraWQiOiIwZWE3MmVlYy0zM2Q2LTQ4OTktODFhZC02OTMzMDRhM2UzYmUiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJhY2NvdW50cy5lYS5jb20iLCJqdGkiOiJTa0V4T2pJdU1Eb3hMakE2WTJFd09UVXpZbUl0TkRoaFlTMDBObUZpTFdJeVl6VXRNVE5oTkdZNFpHUmtPR1ptIiwiYXpwIjoiUkFDRU5FVF8xX0pTX1dFQl9BUFAiLCJpYXQiOjE3MTg0NTY5MzcsImV4cCI6MTcxODQ3MTMzNywidmVyIjoxLCJuZXh1cyI6eyJyc3ZkIjp7ImVmcGx0eSI6IjEzIn0sImNsaSI6IlJBQ0VORVRfMV9KU19XRUJfQVBQIiwicHJkIjoiZWJiZTIwOTEtZTkxZi03ZmZkLTI3ZjEtYTc3ZDJkM2RhOTI1Iiwic2NvIjoib2ZmbGluZSBzZWN1cml0eS50d29mYWN0b3IgZHAuY2xpZW50LmRlZmF1bHQgc2lnbmluIGRwLmNvbW1lcmNlLmNsaWVudC5kZWZhdWx0IGRwLmlkZW50aXR5LmNsaWVudC5kZWZhdWx0IGRwLnByb2dyZXNzaW9uLmNsaWVudC5kZWZhdWx0IGRwLmZpcnN0cGFydHljb21tZXJjZS5jbGllbnQuZGVmYXVsdCIsInBpZCI6IjEwMTE0NzUzMTE3OTAiLCJwdHkiOiJOVUNMRVVTIiwidWlkIjoiMTAxMTQ3NTMxMTc5MCIsImR2aWQiOiJkOTI3NmJiZC1iNmViLTRmNjAtYjFlYi01ZWZjMmRkZGRmZTYiLCJwbHR5cCI6IldFQiIsInBuaWQiOiJFQSIsImRwaWQiOiJXRUIiLCJzdHBzIjoiT0ZGIiwidWRnIjpmYWxzZSwiY250eSI6IjEiLCJhdXNyYyI6IlJBQ0VORVRfMV9KU19XRUJfQVBQIiwiaXBnZW8iOnsiaXAiOiIxMjAuMjMuKi4qIiwiY3R5IjoiQVUiLCJyZWciOiJOZXcgU291dGggV2FsZXMiLCJjaXQiOiJTeWRuZXkiLCJpc3AiOiJWb2RhZm9uZSBBdXN0cmFsaWEiLCJsYXQiOiItMzMuODcxNSIsImxndCI6IjE1MS4yMDA2IiwidHoiOiIxMCJ9LCJ1aWYiOnsidWRnIjpmYWxzZSwiY3R5IjoiQVUiLCJsYW4iOiJlbiIsInN0YSI6IkFDVElWRSIsImFubyI6ZmFsc2UsImFnZSI6MjYsImFncCI6IkFEVUxUIn0sInBzaWYiOlt7ImlkIjoxMDA1NjgyNTExNzkwLCJucyI6ImNlbV9lYV9pZCIsImRpcyI6IlNlcGhpcmljYWxzIiwibmljIjoiU2VwaGlyaWNhbHMifV0sImVuYyI6IjByelhoNXRNRjIxUThFMUJnUHZWS1BOUlZaeHRtYjMraE1BMTZLK0xidk5pdHFDd2RhUm0zV2ZONGpwemh1UVlhNkZVRE5OajNvc3ZManQ2NlUyU1JGSEh5UVJicEdQRWZ1ZWk3a3k0ODlpZ2h3WjlLclE3dm9pcXEvaGlBM1Z3ekVpakNZRkF0M3kvNXZGZFFKemttbzZ1c244aDlweFRHdUN5a2Jra1R3Z0V5dmplbzhJanhSalI2SHlPOFdmMHBZeWNnZElNd2oyMy9pRWZsSUFnbUJBNE5WYW9SNFlOM3FHUlBLZld6RGF6VjVBSzRPdmJ0Z09Dek45eW5zL3Y1RUFJSXhjUzFRaTdpVWROYUxSOUdrcUkrOWdjdXp2RU1LeWFQYVZ6Qy9pb2xMQ2ozVWNoZXlja2tlZ0pvd0cySExTNGZXNG1Ca3JVQzljQkMzZENqYm9oclM1bmRBcHVDK2pUZkpQRmVNRmRJZGVCOFNublByQ2I3eWJZWW9McEdCd0RrRUZQdzhnWTh1Ti9JbVpXRVJUS2dpVkl5S3k4dkVUNWJ5UkU0ZkZvWk9MemFQQ3FBSUYwMmFpZm56Ylp0Wk5XOTFlakxsalRDcG1UeFZNUlBKeGlmWjNBMkgzT25hdHRTWHZqenp0cXd1SmU0eGIxeWJiOWprUGdPc1VYYlZZTVlnSDZ5eHRkYlRDRVE2WDJ4UmFpQWtid2ozSWttK1hGek5RM2pSM0dDTTJjK0lQaG1kYVFmWDhXU1Q0aEF0YXRVeFU1dU4vdEkxbmFrS29wTFVacXpPaHFTK0FLQ3hCRWpKUnk4U2ozcmI2YWxjU3A5Y0RocXJ0dzRzQy9CakZQZ0VQdStBRHhqQ2xaSVQwdVl3UHBhZWNhb0dBdFFzdm0xQTNzQ2l2bUlIWVlyOU9vQk15MzQ5SHlYMWhNMTlWK3V0NDJWOXdndUU1N0ZNUDMwY08wdnpHcWEvWHp2VUtVWU5nNFJSaEdhVHFoSjRrdUI4SUtadnRHMnNiQnl0WGZwNXZMd01IZkZYNnhsZlB1RzBRZGlrK0ZxbGp6bFBRcWtyWml2STJ1eERqY2RoYWpPbGp2UFhSLzRnSFYxS1dHdSt3QUNlNWFXVjFWZHZYNHhFajFTZTltYUxGMWRpUkxnY0dORm9Hbk5EakVRcE9sbmUrSm8vUkNHZlBLUklIV2p6ZkQvY3dzV0pYVkJoVHBab0EvRHB4KzFaY0kwanR3UGlOMlRxMjBQUkVVUVRPNmJ4M2R5OTZwbkJpSXNCMDZPU01kTE1zam11YjB5SXBwZERGcjcxcU44NjZicWVUOEZPQkFoVTg9In19.gn8FLOQnLT33YeRG2yykKswwVcPnmgeXpHJ05i1AQlMI3sbuZk1o-PZBsp9O81rNDuSwoAVf8i-ElFuoSnKOoykYT-CiGkfpqzu5ug8ppHvdalzJWnqdFliaKkjV6KJkT_jlfyYB4EVHEfGUuC040mFo8kWI7PBkbTOwl5yypfL48--hwSNOc3MaMoQrDC3vBHJWbaKIB3PMbZb49-8eWtnOAFhJIGo2v_kvub_b7xMYwZa61FtB3pKzdt_y4CtMu5m8cOtIXsUCCcOByvHbAy-Xu0UR4XPSKjwuJvpXH0gxCLpMR9AV3wqa1s6BPZN8I66Knmh5JG0yDAO36qRhxg",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "cookie": "_gid=GA1.2.1650814896.1718454335; _hjSession_2492024=eyJpZCI6IjkzNWNkZDdjLTcwYjktNGE2YS04Mzk2LWI5MTE1NWMyZWE3YiIsImMiOjE3MTg0NTQzOTQ1NDYsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjoxLCJzcCI6MH0=; TAsessionID=f406f8fa-4b88-4c6f-8826-bff90b9b3239|NEW; notice_behavior=implied,us; notice_location=au; RACENET-REFRESH-TOKEN=eyJraWQiOiJlYWE0NTJjZS03YzQ5LTRlNjUtYjE5MC1mY2ZkN2IwMDI5NGUiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJhY2NvdW50cy5lYS5jb20iLCJqdGkiOiJTbEl4T2pJdU1Eb3hMakE2TldVd05URTJOR1F0WlRZM05TMDBOMkUyTFRrMk56QXROR1l5T1RVNVlUTXdNV05pIiwiYXpwIjoiUkFDRU5FVF8xX0pTX1dFQl9BUFAiLCJpYXQiOjE3MTg0NTY5MzcsImV4cCI6MTcxODU0MzMzNywidmVyIjoxLCJuZXh1cyI6eyJ1aWQiOiIxMDExNDc1MzExNzkwIiwiZW5jIjoiZnU4YksydEFEWFdxUW9CSWw2VTlNekNXblYzTUtrTUk5TnhqZ2dGNGZEUTFjNXNFQ05Hem5FcHlDS0RMcmFNU0NNbEViRk1rUTFqT1VJOUFqYVhmSEpuTmd5VVJlRmF2SWk3My9qVkx3ZUZoeVYxRkZJa3FpbG9HSEY1SlpTZllFRzlRQXc0enMrbStWKzlQZ2JmQUhpazFvZlhUSllURUNrSVVXb1FkN2RhblM1SDZneXdhTzlENUN5YzBIaGpHbStKaUdXR3R2V1hWVVJtQlBlQmdaTmZ4U0hFUzkzeW5KdlpCNTFzajYzZ2xqeThPeWw4b3o5R243MS9FTm51Ymt0SFJIZ3VTelNVZHVjbVh6QkxGS2JkenlVZ3dnMkN3ZzRlbVNqZVVqOFlJeVVSc1V5UkRXTTVRajBDTnBkOGNtYzJESlJGNFZxOGlMdmYrTlV2QjRWZjhTM2hIN0tQSUx0emNqbjRHenhvQytyb1U2UzE2aURieElsNVN5b29ITGlDR2p4UFFLZmZXaUdKZHo5ZXlYWTZUbkNZV3BHNk1GcU1jc0xoU01VVDUyOC9yQ2VLc3Y5SXJDUlFBRk5KOTU5ZTErRm9zbVlxbllrR1dMN2l4N1NuSjl2NHYxRnk3OThsdEc0NDdzekVaTmlLaFprd2V2amdrRUhvcG5Va3BtOTdGVzJwSnQvd1d6NTFGNWlKR2pGMUhTVll4Zjh3a2IvNTA2WnRCL0RRN01aMUVSOHFneFliUDhzTTFWWTJ5SGpQTWtiUmROMERhRTdqMkRyekdHYXpTRjRIeW4yaTc1OGFHSzh2N3h1ZEJRbjFlK1BVay9lNG54T0RkenNtMjlpcVZpZUQ0ZWdtMVR5YjNrTndNQnQxeElhTGlSUVNqcjVGTm1XT3Yvcm5hK1Q2Q0lVSVBTSzUzRmNXblRGb0NQU09qVFFYeVJkNzAwSDM4RUVCbUc2OXN2akEyaVhuRjJnSjY4ZHg3czZ6cVFkTWNQcjNhN09lT2hKK1NEVk9yZHc4SVFwc0pKeWlFRkYzVmNwN3dYWHZDQ0VMb2F6TUx3NHY5VVpCc2JJeUVEL1JYTy9Rdjk2M1BZT2dsd0hWTGZabDlEWjloZ0MwSVBWRmEyUGovcW4zdTFvWEdGZzlublVaandSOUlBTEhtcmdMSElCNjFQRmhzaUNKeitGNkdCM1JmRUw0OTlBRmU2dlpHRU91a2hBTzNxbjd6R3JLbmlQTzJhWWpob3lPenVpTFZrUjRPQ2lyVWVoZVNwRVVJVU90ellZUUpHQ245REsySS9mZjNMcGNrcndaRWR0b01EQndGUFFZK3c2c3dFaHBBN3k0Y3NnMGYzQ3RUYW5lVFh4cUVCMVMxWGhIdU43S253Z3AvalR4c1pGRTJjcmNGaWI3UUlMT08yR2UxL2Yvc2ZqRHNTZ1M2MU13S0ZaQXJSM2Q5UUVnaTVZYUhtRGpjekdsNjdkUE80ODNBRXpPSyt6NVIxUm0rNkNlaWpaSVVOS0EwTlRpbWhyTmhHd0YxUCtrUzdmTWZDY1M1VDJNKzlnb3hFWUJaTmVGNUVITHhuc2FCQW9nQ0xxendvQmVhWlhkanorWXRGTHJUNGJZanZYSlBsTmZKNFdtVTlrZ0JGU0xuTGFkYUVGMlJLeUphQVRET3MvNUlFWmdmNzNjTHE3TWFVbWtGTUlOWEZFcjV6S1RNK0pWeUVqWUh4aGdsNWR1UmdNNEhBNHhrTnowZnhudHl1OUhQUDJOdjc4Y2NIWktSb045bmxJS1JuMTVVNTVOZmlUTkVTaWx3N3pGMk1CL3A4RXlIY1h0azhVd09reVVFY0NITlpuaExRRS9yUW1KNnJBRlFJSW1xN3lrQzBxWmNySC85NytPY0pxNzlnY055dm85bFB3NXptamtKZnRmV0ZPTFd1U0c5U1I5bWhIT05FUEVKaFEvKzFGRmhEaW4zenMwa3h6V1ltbFRXOGlyTjhaUUVMY1gxbjRMaE1CSm5iTktZbElTcWREYzQwZVBhRFA5NVlYdU1hUjZSQzR1cTdJZXRNWnJDRkxuV0htbjNtNXhkdXFuNGZDcG9zSkNJMzFYS0o0WnNkSDdVeFJDNHJtVll6LzRUVXV2OUwrU0lGYkJBaHJWMEVBUDNBckNtVXlNeU9Mdi9BVEtMbkVXWTZEbG1vOHpFZDhCak15bS9Qdm1YaWluck1XZXJJT3BwZEo0eTBUSkh5dWdMQ0gwRkpnPT0ifX0.Z_C9db6yY4FuZkVbiI_9wie7AJOv7tunjzIcocBhqofqzOGShI3EQO04jDyjGiDYQ1fTAYrHIVfMktLIXH3-Sp99FvKhw7lmEBpEti2L6iUxypDUVUAHu6uXLjRPVJoOR2D0xq1o2F1l_N6WmeUmHC_AjhlkSrxYygCBvcf1jVErOppfWNlDFLgPwqIvmtXs7ft0l1ev8puuzPhngd0S8bf9_fvrtwQYa9Ht73W378AyT7c5IrFdXivIHdGgqVCnZq9WyJTHongCMNwFKrdqbMZLSP5begYfZnbKq3pmi9gCmBuVicZ9X_sozeuhIIOYLUfx5XJpFOUuNxcKN4FGQw; _ga=GA1.2.345832612.1718454335; _hjSessionUser_2492024=eyJpZCI6ImQ1NTk1MDAyLTRiODgtNTllYi04YjZhLTY3MjU4MjJjM2QzMSIsImNyZWF0ZWQiOjE3MTg0NTQzOTQ1NDYsImV4aXN0aW5nIjp0cnVlfQ==; _gat_UA-29812607-2=1; _ga_VEGXVNQ9M9=GS1.1.1718456934.2.1.1718457283.0.0.0",
        "Referer": "https://racenet.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
    });
    console.log(await response.json());
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
    setCurrentSession(row);
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

export default Sessions;