import { AppBar, Divider, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoHome from '@components/logo-home/logo-home';
import { HeaderProps } from 'interfaces/ui';

const Header = ({ toggleDrawer }: HeaderProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundImage: 'none',
        backgroundColor: 'dark'
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <LogoHome />
        <Divider orientation="vertical" flexItem sx={{ flexGrow: 1 }} />

        <IconButton sx={{ ml: 1 }} color="inherit">
          <Brightness4Icon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
