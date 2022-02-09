import { AppBar, IconButton, Toolbar } from '@mui/material';
import './Header.scss';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

import logo from '../../logo_rakkidi_vert.svg';

const Header = ({ toggleDrawer }: { toggleDrawer: (open: boolean) => any }) => {
  let navigate = useNavigate();
  const routeChange = () => {
    console.log('Test');
    let path = `/`;
    navigate(path);
  };
  return (
    <AppBar position="fixed" sx={{ backgroundImage: 'none' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
          onKeyDown={toggleDrawer(false)}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={routeChange}
          edge="start"
        >
          <img src={logo} className="App-logo" alt="logo" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
