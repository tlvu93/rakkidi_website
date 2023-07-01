import { createTheme, ThemeOptions } from '@mui/material/styles';
import React from 'react';
import { Roboto } from 'next/font/google';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif']
});

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {}
});

const themeLight: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      contrastText: '#2A3142',
      light: '#ffffff',
      main: '#F7F6F5',
      dark: '#c2c4c7'
    },
    secondary: {
      main: '#DBC75A'
    },
    background: {
      default: '#FEFEFE'
    }
  }
};

const themeDark: ThemeOptions = {
  palette: {
    mode: 'dark',

    primary: {
      contrastText: '#F7F6F5',
      light: '#535a6d',
      main: '#2A3142',
      dark: '#00081c'
    },

    secondary: {
      main: '#DBC75A'
    },
    background: {
      default: '#F7F6F5',
      paper: '#ECECEC'
    },
    text: {
      primary: '#2A3142'
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: '#2A3142'
          },
          '& .MuiOutlinedInput-root': {
            '& > fieldset': {
              borderColor: '#2A3142'
            }
          }
        }
      }
    }
  }
};

const useCustomTheme = () => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    []
  );

  const theme = React.useMemo(
    () => createTheme(mode === 'light' ? themeLight : themeDark),
    [mode]
  );

  return { colorMode, theme };
};

export default useCustomTheme;
