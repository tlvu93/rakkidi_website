import { ToggleDrawer } from '@shared/interfaces/ui';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { useMediaQuery, useTheme } from '@mui/material';
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
    <div
      style={{
        flexGrow: 1,
        padding: `${theme.spacing(4)} ${theme.spacing(8)}`,
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
    </div>
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
