import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';
import LogoHome from '@components/logo-home/logo-home';
import HomeIcon from '@mui/icons-material/Home';
import DirtyLensOutlinedIcon from '@mui/icons-material/DirtyLensOutlined';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CalculateIcon from '@mui/icons-material/Calculate';
import MapIcon from '@mui/icons-material/Map';
import { SidebarLink, SidebarProps } from 'interfaces/ui';

const drawerWidth = 240;

const iconMap = {
  HomeIcon: <HomeIcon />,
  MenuIcon: <MenuIcon />,
  DirtyLensOutlinedIcon: <DirtyLensOutlinedIcon />,
  CalculateIcon: <CalculateIcon />,
  ReceiptIcon: <ReceiptIcon />,
  MapIcon: <MapIcon />
};

const sidebarLinks: SidebarLink[] = [
  { name: 'Home', route: '/', icon: iconMap.HomeIcon },
  {
    name: 'Site Plan',
    route: '/siteplan',
    icon: iconMap.MapIcon
  },
  {
    name: 'Sticker Maker',
    route: '/sticker-maker',
    icon: iconMap.DirtyLensOutlinedIcon
  },
  {
    name: 'Contract Calculator',
    route: '/contract-calculator',
    icon: iconMap.CalculateIcon
  },
  {
    name: 'Invoice Extractor',
    route: '/invoice-extractor',
    icon: iconMap.ReceiptIcon
  }
];

const Sidebar = ({ drawerOpen, toggleDrawer }: SidebarProps) => {
  let router = useRouter();

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
      open={drawerOpen}
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
      {sidebarLinks.map((sidebarlink) => (
        <List key={sidebarlink.name}>
          <ListItem
            button
            key={sidebarlink.name}
            onClick={() => router.push(sidebarlink.route)}
          >
            <ListItemIcon>{sidebarlink.icon}</ListItemIcon>
            <ListItemText primary={sidebarlink.name} />
          </ListItem>
        </List>
      ))}

      <Divider />
      <List></List>
    </Drawer>
  );
};

export default Sidebar;
