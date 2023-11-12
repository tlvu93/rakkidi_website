import * as React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import createEmotionCache from '../createEmotionCache';

import '@shared/styles/globals.css';
import { wrapper } from 'store';
import Head from 'next/head';
import useCustomTheme, { ColorModeContext } from '@shared/styles/theme/theme';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp: React.FC<MyAppProps> = (pageProps) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    ...rest
  } = pageProps;
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
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <Component {...props} />
              </LocalizationProvider>
            </Provider>
          </ThemeProvider>
        </CacheProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default MyApp;
