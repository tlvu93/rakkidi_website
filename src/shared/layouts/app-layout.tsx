import { Box, useTheme, useMediaQuery } from '@mui/material';
import React, { useCallback, useContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import Header from '@shared/components/header/header';
import Sidebar from '@shared/components/sidebar/sidebar';
import { ColorModeContext } from '@shared/styles/theme/theme';
import { layoutDimension } from 'config/ui-config';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps): React.ReactElement => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xl'));
  const colorMode = useContext(ColorModeContext);

  const [drawerOpen, setDrawerOpen] = useState(!isSmallScreen);
  const [lastIsSmallScreen, setLastIsSmallScreen] = useState(isSmallScreen);

  // The drawer follows the breakpoint, but stays user-toggleable in between.
  // Adjusting during render (rather than in an effect) avoids rendering one
  // frame with the stale value - see "Adjusting state when a prop changes" in
  // the React docs.
  if (lastIsSmallScreen !== isSmallScreen) {
    setLastIsSmallScreen(isSmallScreen);
    setDrawerOpen(!isSmallScreen);
  }

  const toggleDrawer = useCallback((): void => {
    setDrawerOpen((prev) => !prev);
  }, []);

  const closeDrawer = useCallback((): void => {
    setDrawerOpen(false);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme.palette.mode}
      />
      <Header
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        toggleColorMode={colorMode.toggleColorMode}
      />
      <Sidebar
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        closeDrawer={closeDrawer}
      />
      {/* Previously this Box lived in a `MainApp` component declared inside
          the render body, which gave it a new component type on every render
          and therefore remounted the whole page subtree (losing all of its
          state) whenever the layout re-rendered. */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 4, md: 8 },
          transition: theme.transitions.create('margin', {
            easing: drawerOpen
              ? theme.transitions.easing.easeOut
              : theme.transitions.easing.sharp,
            duration: drawerOpen
              ? theme.transitions.duration.enteringScreen
              : theme.transitions.duration.leavingScreen
          }),
          marginLeft: drawerOpen ? `${layoutDimension.drawerWidth}px` : 0
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
