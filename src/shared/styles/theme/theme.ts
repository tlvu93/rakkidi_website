import { createTheme, ThemeOptions } from '@mui/material/styles';
import React from 'react';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {}
});

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
  }
};

export default useCustomTheme;
