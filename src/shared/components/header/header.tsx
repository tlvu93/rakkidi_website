import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Divider, IconButton, Toolbar, Tooltip, useTheme } from '@mui/material';

import { ToggleDrawer } from '@shared/interfaces/ui';
import { layoutDimension } from 'config/ui-config';

import DrawerLogo from './drawer-logo';

interface HeaderProps {
  drawerOpen: boolean;
  toggleDrawer: ToggleDrawer;
  toggleColorMode: () => void;
}

const Header = ({
  drawerOpen,
  toggleDrawer,
  toggleColorMode
}: HeaderProps): React.ReactElement => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const colorModeLabel = isDark
    ? 'Switch to light mode'
    : 'Switch to dark mode';

  return (
    <Toolbar
      component="header"
      sx={{
        bgcolor: 'primary.main',
        height: layoutDimension.headerHeight
      }}
    >
      <DrawerLogo toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
      <Divider orientation="vertical" flexItem sx={{ flexGrow: 1 }} />

      <Tooltip title={colorModeLabel}>
        <IconButton
          sx={{ ml: 1, color: 'primary.contrastText' }}
          color="inherit"
          aria-label={colorModeLabel}
          onClick={toggleColorMode}
        >
          {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default Header;
