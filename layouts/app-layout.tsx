import { createTheme, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import Footer from '@components/footer/footer';
import Header from '@components/header/header';
import Sidebar from '@components/sidebar/sidebar';
import { ToggleDrawer } from 'interfaces/ui';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const drawerWidth = 240;
const headerHeight = 64;

const AppLayout = (props: { children: React.ReactNode }) => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');

  const toggleDrawer: ToggleDrawer = () => (event) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    console.log(drawerOpen);
    setDrawerOpen(!drawerOpen);
  };
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            light: '#DBC75A',
            main: '#2A3142',
            dark: '#2A3142',
            contrastText: '#2A3142'
          }
        }
      }),
    [mode]
  );

  const MainApp = (props: React.PropsWithChildren) => (
    <div>
      <div
        style={{
          flexGrow: 1,
          padding: theme.spacing(3),
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
          }),
          marginTop: `${headerHeight}px`,
          ...(drawerOpen && {
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen
            }),
            marginLeft: `${drawerWidth}px`
          })
        }}
      >
        {props.children}
      </div>
    </div>
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <div>
          <Header toggleDrawer={toggleDrawer} />
          <Sidebar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
          <MainApp>{props.children}</MainApp>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AppLayout;
