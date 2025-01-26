import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Provider } from 'react-redux';

import useCustomTheme, { ColorModeContext } from '@shared/styles/theme/theme';
import { wrapper } from 'store';

import createEmotionCache from '../createEmotionCache';

import '@shared/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp: React.FC<MyAppProps> = (pageProps): React.ReactElement => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    ...rest
  } = pageProps;
  const { colorMode, theme } = useCustomTheme();
  const router = useRouter();

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
                <AnimatePresence mode="wait">
                  <Component {...props} key={router.pathname} />
                </AnimatePresence>
              </LocalizationProvider>
            </Provider>
          </ThemeProvider>
        </CacheProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default MyApp;
