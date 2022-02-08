import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ toggleDrawer }: { toggleDrawer: (open: boolean) => any }) => {
  return (
    <AppBar position="fixed" sx={{ backgroundImage: 'none' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Rakkidi.de
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
