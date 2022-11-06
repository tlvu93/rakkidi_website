import { SidebarLink, ToggleDrawer } from '@shared/interfaces/ui';
import { useRouter } from 'next/router';

import CalculateIcon from '@mui/icons-material/Calculate';
import DirtyLensOutlinedIcon from '@mui/icons-material/DirtyLensOutlined';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import MenuIcon from '@mui/icons-material/Menu';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Footer from '@shared/components/footer/footer';
import DrawerLogo from '../header/drawer-logo';

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

interface SidebarProps {
  drawerOpen: boolean;
  toggleDrawer: ToggleDrawer;
}

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
        <DrawerLogo toggleDrawer={toggleDrawer} />
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
      <Footer />
    </Drawer>
  );
};

export default Sidebar;
