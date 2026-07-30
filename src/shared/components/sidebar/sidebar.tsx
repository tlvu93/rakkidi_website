import CalculateIcon from '@mui/icons-material/Calculate';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirtyLensOutlinedIcon from '@mui/icons-material/DirtyLensOutlined';
import MapIcon from '@mui/icons-material/Map';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import Footer from '@shared/components/footer/footer';
import { SidebarLink, ToggleDrawer } from '@shared/interfaces/ui';
import { SIDEBAR_ID, layoutDimension } from 'config/ui-config';

import DrawerLogo from '../header/drawer-logo';

const sidebarLinks: SidebarLink[] = [
  { name: 'Dashboard', route: '/dashboard', icon: <DashboardIcon /> },
  { name: 'Site Plan', route: '/siteplan', icon: <MapIcon /> },
  {
    name: 'Sticker Maker',
    route: '/sticker-maker',
    icon: <DirtyLensOutlinedIcon />
  },
  {
    name: 'Contract Calculator',
    route: '/contract-calculator',
    icon: <CalculateIcon />
  },
  { name: 'PDF Extractor', route: '/pdf-extractor', icon: <ReceiptIcon /> },
  { name: 'WMD - Scraper', route: '/wmd-scraper', icon: <SaveAsIcon /> }
];

interface SidebarProps {
  drawerOpen: boolean;
  toggleDrawer: ToggleDrawer;
  closeDrawer: () => void;
}

const Sidebar = ({
  drawerOpen,
  toggleDrawer,
  closeDrawer
}: SidebarProps): React.ReactElement => {
  const router = useRouter();

  return (
    <Drawer
      id={SIDEBAR_ID}
      sx={{
        width: layoutDimension.drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: layoutDimension.drawerWidth,
          boxSizing: 'border-box',
          border: 'none',
          borderRadius: 0,
          bgcolor: 'primary.main'
        },
        color: 'background.default'
      }}
      variant="persistent"
      anchor="left"
      open={drawerOpen}
      onClose={closeDrawer}
    >
      <Divider />
      <Toolbar
        sx={{
          bgcolor: 'primary.main',
          height: layoutDimension.headerHeight
        }}
      >
        <DrawerLogo toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
      </Toolbar>
      {/* One <nav> around one <ul>: previously every link was its own <List>,
          which told screen readers there were six one-item lists. */}
      <Box
        component="nav"
        aria-label="Main navigation"
        sx={{ flexGrow: 1, overflowY: 'auto' }}
      >
        <List>
          {sidebarLinks.map((sidebarLink) => {
            const isActive = router.pathname === sidebarLink.route;

            return (
              <ListItem disablePadding key={sidebarLink.route}>
                <ListItemButton
                  component={NextLink}
                  href={sidebarLink.route}
                  selected={isActive}
                  aria-current={isActive ? 'page' : undefined}
                  sx={{
                    color: 'primary.contrastText',
                    '&:focus-visible': {
                      outline: '2px solid',
                      outlineColor: 'primary.contrastText',
                      outlineOffset: -2
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'primary.contrastText' }}>
                    {sidebarLink.icon}
                  </ListItemIcon>
                  <ListItemText primary={sidebarLink.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider />
      <Footer />
    </Drawer>
  );
};

export default Sidebar;
