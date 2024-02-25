import { ToggleDrawer } from '@shared/interfaces/ui';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { Box, useTheme, useMediaQuery } from '@mui/material';

import Header from '@shared/components/header/header';
import Sidebar from '@shared/components/sidebar/sidebar';
import { ColorModeContext } from '@shared/styles/theme/theme';
import { layoutDimension } from 'config/ui-config';
import { ToastContainer } from 'react-toastify';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = (props: AppLayoutProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xl'));
  const colorMode = useContext(ColorModeContext);

  const getInitialDrawerState = useCallback(
    () => !isSmallScreen,
    [isSmallScreen]
  );

  const [drawerOpen, setDrawerOpen] = useState(getInitialDrawerState);

  useEffect(() => {
    setDrawerOpen(getInitialDrawerState);
  }, [getInitialDrawerState]);

  const toggleDrawer: ToggleDrawer = () => (event) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(!drawerOpen);
  };

  const MainApp = (props: React.PropsWithChildren) => (
    <Box
      paddingX={4}
      paddingY={8}
      flexGrow={1}
      sx={{
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        // marginTop: `${layoutDimension.headerHeight}px`,
        ...(drawerOpen && {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
          }),
          marginLeft: `${layoutDimension.drawerWidth}px`
        })
      }}
    >
      {props.children}
    </Box>
  );

  return (
    <div>
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
        theme="dark"
      />
      <Header
        toggleDrawer={toggleDrawer}
        toggleColorMode={colorMode.toggleColorMode}
      />
      <Sidebar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      <MainApp>{props.children}</MainApp>
    </div>
  );
};

export default AppLayout;
