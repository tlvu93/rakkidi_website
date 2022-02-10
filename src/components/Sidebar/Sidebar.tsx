import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import LogoHome from '../LogoHome/LogoHome';
import HomeIcon from '@mui/icons-material/Home';
import DirtyLensOutlinedIcon from '@mui/icons-material/DirtyLensOutlined';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CalculateIcon from '@mui/icons-material/Calculate';
import MapIcon from '@mui/icons-material/Map';

const drawerWidth = 240;

interface SidebarInterface {
  drawerIsOpen: boolean;
  toggleDrawer: ToggleDrawer;
}

const Sidebar = ({ drawerIsOpen, toggleDrawer }: SidebarInterface) => {
  let navigate = useNavigate();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box'
        }
      }}
      variant="persistent"
      anchor="left"
      open={drawerIsOpen}
      onClose={toggleDrawer(true)}
      onKeyDown={toggleDrawer(false)}
    >
      <Divider />
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(false)}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <LogoHome />
      </Toolbar>
      <List>
        <ListItem button key={'Home'} onClick={() => navigate('/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItem>
        <ListItem
          button
          key={'Site Plan'}
          onClick={() => navigate('/siteplan')}
        >
          <ListItemIcon>
            <MapIcon />
          </ListItemIcon>
          <ListItemText primary={'Site Plan'} />
        </ListItem>
        <ListItem
          button
          key={'Sticker Maker'}
          onClick={() => navigate('/stickermaker')}
        >
          <ListItemIcon>
            <DirtyLensOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={'Sticker Maker'} />
        </ListItem>

        <ListItem
          button
          key={'Contract Calculator'}
          onClick={() => navigate('/contractcalculator')}
        >
          <ListItemIcon>
            <CalculateIcon />
          </ListItemIcon>
          <ListItemText primary={'Contract Calculator'} />
        </ListItem>
        <ListItem
          button
          key={'Invoice Extractor'}
          onClick={() => navigate('/invoiceextractor')}
        >
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary={'Invoice Extractor'} />
        </ListItem>
      </List>
      <Divider />
      <List></List>
    </Drawer>
  );
};

export default Sidebar;
