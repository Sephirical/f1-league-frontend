import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Change this to your primary color
    },
    secondary: {
      main: '#dc004e', // Change this to your secondary color
    },
  },
  typography: {
    h1: {
      fontSize: '2.2rem',
    },
    h2: {
      fontSize: '1.8rem',
    },
    h3: {
      fontSize: '1.5rem',
    },
    // Add more typography customizations as needed
  },
  // You can customize other components here
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         borderRadius: '8px', // Example customization
  //       },
  //     },
  //   },
  // },
});

export default theme;
