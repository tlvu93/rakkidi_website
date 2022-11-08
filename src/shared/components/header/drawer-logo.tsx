import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton } from '@mui/material';
import { ToggleDrawer } from '@shared/interfaces/ui';
import LogoHome from '../logo-home/logo-home';

type Props = {
  toggleDrawer: ToggleDrawer;
};

const DrawerLogo = ({ toggleDrawer }: Props) => {
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
        aria-label="open drawer"
        onClick={toggleDrawer(false)}
        edge="start"
      >
        <MenuIcon />
      </IconButton>
      <LogoHome />
    </Box>
  );
};

export default DrawerLogo;
