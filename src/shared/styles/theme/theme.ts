import { ThemeOptions } from '@mui/material/styles';

const getTheme = (mode: 'light' | 'dark' = 'dark') =>
  ({
    components: {
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: '#fff'
          }
        }
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: '#2A3142',
            color: '#fff'
          }
        }
      }
    },
    palette: {
      mode,
      primary: {
        light: '#4593ac',
        main: '#177898',
        dark: '#2A3142'
      },
      secondary: {
        main: '#e53935'
      }
    }
  } as ThemeOptions);

export default getTheme;
