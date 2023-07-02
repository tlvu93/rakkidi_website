import { ToggleDrawer } from '@shared/interfaces/ui';
import React, { useContext, useState } from 'react';

import { Box, useTheme } from '@mui/material';
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
