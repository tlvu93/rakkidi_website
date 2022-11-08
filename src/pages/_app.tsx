import * as React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import '@shared/styles/globals.css';
import { wrapper } from 'store';
import Head from 'next/head';
import useCustomTheme, { ColorModeContext } from '@shared/styles/theme/theme';

interface MyAppProps extends AppProps {}

const MyApp: React.FC<MyAppProps> = (pageProps) => {
  const { Component, ...rest } = pageProps;
  const { colorMode, theme } = useCustomTheme();

  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <title>Rakkidi Website</title>
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            <Component {...props} />
          </Provider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default MyApp;
