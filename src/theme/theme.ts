import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Define our custom color types
interface CustomColorOptions {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

// Extend the Material-UI theme types
declare module '@mui/material/styles' {
  interface Palette {
    tertiary: CustomColorOptions;
    accent: CustomColorOptions;
  }

  interface PaletteOptions {
    tertiary?: CustomColorOptions;
    accent?: CustomColorOptions;
  }
}

const baseTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2B5876',
      light: '#4E7693',
      dark: '#1D3B4F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4E4376',
      light: '#6B5F94',
      dark: '#352E52',
      contrastText: '#FFFFFF',
    },
    tertiary: {
      main: '#FF6B6B',
      light: '#FF8E8E',
      dark: '#FF4848',
      contrastText: '#FFFFFF',
    },
    accent: {
      main: '#FFD93D',
      light: '#FFE27F',
      dark: '#FFC000',
      contrastText: '#000000',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#5D7285',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '2.75rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #2B5876 0%, #4E4376 100%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 24px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '24px',
          paddingRight: '24px',
        },
      },
    },
  },
});

const theme = responsiveFontSizes(baseTheme);

export default theme; 