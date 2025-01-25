import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Divider, IconButton, Toolbar } from '@mui/material';

import { ToggleDrawer } from '@shared/interfaces/ui';
import { layoutDimension } from 'config/ui-config';

import DrawerLogo from './drawer-logo';

interface HeaderProps {
  toggleDrawer: ToggleDrawer;
  toggleColorMode: () => void;
}

const Header = ({
  toggleDrawer,
  toggleColorMode
}: HeaderProps): React.ReactElement => {
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
