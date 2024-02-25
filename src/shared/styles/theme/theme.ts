import { createTheme, ThemeOptions } from '@mui/material/styles';
import React, { useMemo, useState, createContext, useEffect } from 'react';
import { Roboto } from 'next/font/google';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif']
});

type ThemeModes = 'light' | 'dark';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const colors = {
  primaryDark: '#00081c',
  primaryNormal: '#2A3142',
  primaryLight: '#535A6D',
  // primaryLight: '#F7F6F5',
  secondaryLight: '#FFFA8A',
  secondaryNormal: '#DBC75A',
  secondaryDark: 'A7972A',

  white: '#ffffff',

  lightGray: '#c2c4c7',
  darkBlack: '#00081c',
  backgroundDefault: '#FEFEFE',
  backgroundPaperLight: '#ECECEC'
};

const getTheme = (mode: ThemeModes) => {
  const isLight = mode === 'light';

  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        contrastText: isLight ? colors.white : colors.white,
        light: isLight ? colors.white : colors.backgroundPaperLight,
        main: isLight ? colors.primaryNormal : colors.primaryNormal,
        dark: isLight ? colors.lightGray : colors.primaryDark
      },
      secondary: {
        main: colors.secondaryNormal
      },
      background: {
        default: isLight ? colors.backgroundDefault : colors.primaryNormal,
        paper: isLight ? colors.backgroundPaperLight : colors.primaryNormal
      },
      text: {
        primary: isLight ? colors.primaryDark : colors.white
      }
    }
    // components: {
    //   MuiIconButton: {
    //     styleOverrides: {
    //       sizeMedium: {
    //         color: colors.primaryDark
    //       }
    //     }
    //   },
    //   MuiOutlinedInput: {
    //     styleOverrides: {
    //       root: {
    //         color: colors.primaryDark
    //       }
    //     }
    //   },
    //   MuiInputLabel: {
    //     styleOverrides: {
    //       root: {
    //         color: colors.primaryDark
    //       }
    //     }
    //   }
    // }
  };

  return createTheme(themeOptions);
};

const useCustomTheme = () => {
  // Initialize the mode state without accessing localStorage directly
  const [mode, setMode] = useState<ThemeModes>('dark');

  // Effect to set the initial theme mode from localStorage when in the browser
  useEffect(() => {
    const storedThemeMode =
      typeof window !== 'undefined' ? localStorage.getItem('themeMode') : null;
    if (storedThemeMode) {
      setMode(storedThemeMode as ThemeModes);
    }
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          if (typeof window !== 'undefined') {
            localStorage.setItem('themeMode', newMode); // Save the new mode to localStorage
          }
          return newMode;
        });
      }
    }),
    []
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  return { colorMode, theme };
};

export default useCustomTheme;
