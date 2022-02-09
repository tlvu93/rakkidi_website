import './App.scss';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import Header from './components/Header/Header';
import { Link } from 'react-router-dom';

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
      <div className="App" onKeyDown={toggleDrawer(false)}>
        <Header toggleDrawer={toggleDrawer} />
        <Sidebar drawerIsOpen={drawerIsOpen} toggleDrawer={toggleDrawer} />
        <Footer />
      </div>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem'
        }}
      >
        <Link to="/invoices">Invoices</Link> |{' '}
        <Link to="/expenses">Expenses</Link>
      </nav>
    </ThemeProvider>
  );
}

export default App;
