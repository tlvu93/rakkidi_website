import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import logo from '../../logo_rakkidi_vert.svg';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import LogoHome from '../LogoHome/LogoHome';
const drawerWidth = 240;

interface SidebarInterface {
  drawerIsOpen: boolean;
  toggleDrawer: ToggleDrawer;
}

const Sidebar = ({ drawerIsOpen, toggleDrawer }: SidebarInterface) => {
  const theme = useTheme();

  let navigate = useNavigate();

  const routeChange = () => {
    console.log('Test');
    let path = `/`;
    navigate(path);
  };
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
        <LogoHome routeChange={routeChange} />
      </Toolbar>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
