import React, { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Tracks } from '../constants/tracks';
import { createTTClassification, getTTClassifications } from '../services/apiService';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import { SelectContext } from '../contexts/selectContext';

const TTClassifications = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [newClassification, setNewClassification] = useState({ name: '', track: '' });
  const { selected, setSelected } = useContext(SelectContext);

  useEffect(() => {
    getClassifications();
  }, []);

  const getClassifications = async () => {
    const response = await getTTClassifications();
    setRows(response.map((r, i) => {
      return {
        ...r,
        id: i
      }
    }))
  };

  const getTrackName = (params) => {
    const track = Tracks.find(t => t.ID === params)?.Track
    return track;
  }

  const columns = [
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleView(params.row)}
          >
            <VisibilityIcon />
          </IconButton>
        </>
      )
    },
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'className', headerName: 'Name', flex: 4 },
    { field: 'track', headerName: 'Track', flex: 2, valueGetter: getTrackName },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewClassification({ name: '', track: '' });
  };

  const handleSave = async () => {
    const response = await createTTClassification(newClassification.name, Tracks.find(t => t.Track === newClassification.track)?.ID);
    if (response) {
      const newId = rows.length ? Math.max(...rows.map(row => row.id)) + 1 : 1;
      setRows([...rows, { id: newId, ...newClassification }]);
    }
    handleClose();
  };

  const handleView = (row) => {
    setSelected({
      ...selected,
      ttClassification: row.name
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setNewClassification(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        style={{ marginBottom: 16 }}
      >
        Create New TT Classification
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false
            },
          },
        }}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create New TT Classification</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={newClassification.name}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="track-select-label">Track</InputLabel>
            <Select
              labelId="track-select-label"
              name="track"
              value={newClassification.track}
              onChange={handleChange}
              fullWidth
            >
              {Tracks.map((track) => (
                <MenuItem key={track.ID} value={track.Track}>
                  {track.Track}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TTClassifications;
