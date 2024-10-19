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
  secondaryLight: '#FFFA8A',
  secondaryNormal: '#DBC75A',
  secondaryDark: '#A7972A',

  white: '#ffffff',

  lightGray: '#c2c4c7',
  darkBlack: '#00081c',
  backgroundDefault: '#FEFEFE',
  backgroundPaperLight: '#ECECEC',
  // New colors for better contrast
  darkModeBackground: '#111827',
  darkModePaper: '#1f2937',
  darkModeText: '#E0E0E0'
};

const getTheme = (mode: ThemeModes) => {
  const isLight = mode === 'light';

  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        light: colors.primaryLight,
        main: colors.primaryNormal,
        dark: colors.primaryDark,
        contrastText: colors.white
      },
      secondary: {
        main: colors.secondaryNormal,
        light: colors.secondaryLight,
        dark: colors.secondaryDark
      },
      background: {
        default: isLight ? colors.backgroundDefault : colors.darkModeBackground,
        paper: isLight ? colors.backgroundPaperLight : colors.darkModePaper
      },
      text: {
        primary: isLight ? colors.primaryDark : colors.darkModeText,
        secondary: isLight ? colors.primaryLight : colors.lightGray
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none'
          },
          outlined: {
            borderColor: isLight ? colors.primaryNormal : colors.darkModeText,
            color: isLight ? colors.primaryNormal : colors.darkModeText,
            '&:hover': {
              borderColor: isLight ? colors.primaryDark : colors.white,
              color: isLight ? colors.primaryDark : colors.white
            }
          },
          contained: {
            backgroundColor: isLight
              ? colors.primaryNormal
              : colors.secondaryNormal,
            color: isLight ? colors.white : colors.darkBlack,
            '&:hover': {
              backgroundColor: isLight
                ? colors.primaryDark
                : colors.secondaryDark
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            border: `2px solid ${isLight ? colors.lightGray : colors.primaryLight}`
          }
        }
      }
    }
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
