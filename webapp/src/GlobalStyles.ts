import {createTheme} from '@mui/material/styles';
import {blue, green} from "@mui/material/colors";

export const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: 40,
      fontWeight: 500,
      fontFamily: "Roboto"
    },
    h2: {
      fontSize: 30,
      fontWeight: 400,
      fontFamily: "Roboto"
    },
    h3: {
      fontSize: 22,
      fontFamily: "Roboto",
      fontWeight: "bold"
    },
    h4: {
      fontSize: 20,
      fontFamily: "Roboto",
      fontWeight: "bold"
    },
    h5: {
      fontSize: 16,
      fontFamily: "Roboto"
    },
    h6: {
      fontSize: 14,
      fontFamily: "Roboto"
    },
    body1: {
      fontSize: 16,
      fontFamily: "Roboto"
    },
    body2: {
      fontSize: 12,
      fontFamily: "Roboto"
    },
    subtitle1: {
      fontSize: 24,
      fontFamily: "Roboto"
    }
  },
  palette: {
    primary: green,
    secondary: blue,
    text: {
      primary: '#343434',
      secondary: '#7B7B7B',
      disabled: '#B8B8B8',
    },
    error: { main: '#F44336' },
    success: { main: '#80D283' },
    action: {
      selected: '#E6E6E6'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        a {
          color: #DE545B
        }
      `
    }
  }
});
