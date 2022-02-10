import { Container, createTheme, ThemeProvider } from '@mui/material';
import React, { ReactChild, ReactFragment, ReactPortal, useState } from 'react';
import Paper from '@mui/material/Paper';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const drawerWidth = 240;
const headerHeight = 64;

const AppLayout = (props: {
  children: ReactChild | ReactFragment | ReactPortal | null | undefined;
}) => {
  const [drawerIsOpen, openDrawer] = useState(false);
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  const toggleDrawer: ToggleDrawer = (isOpen) => (event) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    openDrawer(isOpen);
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
            contrastText: '#FF0000'
          },
          secondary: {
            light: '#2A3142',
            main: '#DBC75A',
            dark: '#DBC75A',
            contrastText: '#000'
          }
          // background: {
          //   paper: '#2A3142'
          // },
          // text: {
          //   primary: '#fff'
          // }
        }
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Container>
          <Header
            toggleDrawer={toggleDrawer}
            toggleColorMode={colorMode.toggleColorMode}
          />
          <Container>
            <Sidebar drawerIsOpen={drawerIsOpen} toggleDrawer={toggleDrawer} />
            <Container
              sx={{
                height: ``,
                flexGrow: 1,
                padding: theme.spacing(3),
                transition: theme.transitions.create('margin', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen
                }),
                marginTop: `${headerHeight}px`,
                marginLeft: `-${drawerWidth}px`,
                ...(drawerIsOpen && {
                  transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen
                  }),
                  marginLeft: 0
                })
              }}
            >
              {props.children}
            </Container>
          </Container>
          <Footer />
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AppLayout;
