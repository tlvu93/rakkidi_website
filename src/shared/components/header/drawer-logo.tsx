import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton } from '@mui/material';

import { ToggleDrawer } from '@shared/interfaces/ui';
import { SIDEBAR_ID } from 'config/ui-config';

import LogoHome from '../logo-home/logo-home';

type Props = {
  toggleDrawer: ToggleDrawer;
  drawerOpen: boolean;
};

const DrawerLogo = ({
  toggleDrawer,
  drawerOpen
}: Props): React.ReactElement => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.2rem',
        color: 'primary.contrastText'
      }}
    >
      <IconButton
        color="inherit"
        aria-label={
          drawerOpen ? 'Close navigation menu' : 'Open navigation menu'
        }
        aria-expanded={drawerOpen}
        aria-controls={SIDEBAR_ID}
        onClick={toggleDrawer}
        edge="start"
      >
        <MenuIcon />
      </IconButton>
      <LogoHome />
    </Box>
  );
};

export default DrawerLogo;
