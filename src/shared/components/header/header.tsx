import { ToggleDrawer } from '@shared/interfaces/ui';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import { AppBar, Divider, IconButton, Toolbar } from '@mui/material';
import DrawerLogo from './drawer-logo';
import { layoutDimension } from 'config/ui-config';

interface HeaderProps {
  toggleDrawer: ToggleDrawer;
  toggleColorMode: () => void;
}

const Header = ({ toggleDrawer, toggleColorMode }: HeaderProps) => {
  return (
    <Toolbar
      sx={{
        bgcolor: 'primary.main',
        height: layoutDimension.headerHeight
      }}
    >
      <DrawerLogo toggleDrawer={toggleDrawer} />
      <Divider orientation="vertical" flexItem sx={{ flexGrow: 1 }} />

      <IconButton
        sx={{ ml: 1, color: 'primary.contrastText' }}
        color="inherit"
        onClick={() => toggleColorMode()}
      >
        <Brightness4Icon />
      </IconButton>
    </Toolbar>
  );
};

export default Header;
