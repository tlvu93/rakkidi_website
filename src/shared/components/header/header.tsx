import { ToggleDrawer } from '@shared/interfaces/ui';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import { AppBar, Divider, IconButton, Toolbar } from '@mui/material';
import DrawerLogo from './drawer-logo';

interface HeaderProps {
  toggleDrawer: ToggleDrawer;
  toggleColorMode: () => void;
}

const Header = ({ toggleDrawer, toggleColorMode }: HeaderProps) => {
  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          bgcolor: 'primary.dark'
        }}
      >
        <DrawerLogo toggleDrawer={toggleDrawer} />
        <Divider orientation="vertical" flexItem sx={{ flexGrow: 1 }} />

        <IconButton
          sx={{ ml: 1 }}
          color="inherit"
          onClick={() => toggleColorMode()}
        >
          <Brightness4Icon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
