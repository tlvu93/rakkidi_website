import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './containers/AppContainer/Header';
import { useState } from 'react';

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
    background: {
      paper: '#2A3142'
    },
    text: {
      primary: '#fff'
    }
  }
});

function App() {
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
        <Sidebar drawerIsOpen={drawerIsOpen} toggleDrawer={toggleDrawer} />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
