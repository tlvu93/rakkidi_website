import { SidebarLink, ToggleDrawer } from '@shared/interfaces/ui';
import { useRouter } from 'next/router';

import CalculateIcon from '@mui/icons-material/Calculate';
import DirtyLensOutlinedIcon from '@mui/icons-material/DirtyLensOutlined';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
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
import { Save, StayPrimaryLandscape } from '@mui/icons-material';
import { layoutDimension } from 'config/ui-config';
import SaveAsIcon from '@mui/icons-material/SaveAs';

const iconMap = {
  HomeIcon: <HomeIcon />,
  DashboardIcon: <DashboardIcon />,
  MenuIcon: <MenuIcon />,
  DirtyLensOutlinedIcon: <DirtyLensOutlinedIcon />,
  CalculateIcon: <CalculateIcon />,
  ReceiptIcon: <ReceiptIcon />,
  MapIcon: <MapIcon />,
  WMDScraperIcon: <SaveAsIcon />
};

const sidebarLinks: SidebarLink[] = [
  { name: 'Dashboard', route: '/dashboard', icon: iconMap.DashboardIcon },
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
  },
  {
    name: 'WMD - Scraper',
    route: '/wmd-scraper',
    icon: iconMap.WMDScraperIcon
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
        width: layoutDimension.drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: layoutDimension.drawerWidth,
          boxSizing: 'border-box',
          border: 'none',
          bgcolor: 'primary.main'
        },
        color: 'background.default'
      }}
      variant="persistent"
      anchor="left"
      open={drawerOpen}
      onClose={toggleDrawer(true)}
      onKeyDown={toggleDrawer(false)}
    >
      <Divider />
      <Toolbar
        sx={{
          bgcolor: 'primary.main',
          height: layoutDimension.headerHeight
        }}
      >
        <DrawerLogo toggleDrawer={toggleDrawer} />
      </Toolbar>
      {sidebarLinks.map((sidebarlink) => (
        <List key={sidebarlink.name}>
          <ListItem
            button
            key={sidebarlink.name}
            onClick={() => router.push(sidebarlink.route)}
            sx={{
              color: 'primary.contrastText'
            }}
          >
            <ListItemIcon sx={{ color: 'primary.contrastText' }}>
              {sidebarlink.icon}
            </ListItemIcon>
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
