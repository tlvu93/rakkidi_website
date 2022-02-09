import { Container, createTheme, ThemeProvider } from '@mui/material';
import { ReactChild, ReactFragment, ReactPortal, useState } from 'react';
import Paper from '@mui/material/Paper';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#2A3142',
      main: '#2A3142',
      dark: '#2A3142',
      contrastText: '#fff'
    },
    secondary: {
      light: '#DBC75A',
      main: '#DBC75A',
      dark: '#DBC75A',
      contrastText: '#000'
    },
    // background: {
    //   paper: '#2A3142'
    // },
    text: {
      primary: '#fff'
    }
  }
});

const drawerWidth = 240;
const headerHeight = 64;

const AppLayout = (props: {
  children: ReactChild | ReactFragment | ReactPortal | null | undefined;
}) => {
  const [drawerIsOpen, openDrawer] = useState(false);

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
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header toggleDrawer={toggleDrawer} />
        <div style={{ display: 'flex', height: '100%' }}>
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
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default AppLayout;
