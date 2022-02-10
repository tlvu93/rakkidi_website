import {
  AppBar,
  Divider,
  IconButton,
  ThemeProvider,
  Toolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

import logo from '../../logo_rakkidi_vert.svg';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { createTheme, useTheme } from '@mui/system';
import LogoHome from '../LogoHome/LogoHome';

const Header = ({
  toggleDrawer,
  toggleColorMode
}: {
  toggleDrawer: (open: boolean) => any;
  toggleColorMode: any;
}) => {
  const theme = useTheme();

  let navigate = useNavigate();

  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };
  return (
    <AppBar
      enableColorOnDark={false}
      position="fixed"
      sx={{ backgroundImage: 'none' }}
    >
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
        <LogoHome routeChange={routeChange} />
        <Divider orientation="vertical" flexItem sx={{ flexGrow: 1 }} />

        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
