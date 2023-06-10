import { ToggleDrawer } from '@shared/interfaces/ui';
import React, { useContext, useState } from 'react';

import { useTheme } from '@mui/material';
import Header from '@shared/components/header/header';
import Sidebar from '@shared/components/sidebar/sidebar';
import { ColorModeContext } from '@shared/styles/theme/theme';
import { layoutDimension } from 'config/ui-config';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = (props: AppLayoutProps) => {
  const colorMode = useContext(ColorModeContext);

  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(true);

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
