import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';
import { SelectProvider } from './contexts/selectContext';

ReactDOM.render(
  <SelectProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </SelectProvider>,
  document.getElementById('root')
);
