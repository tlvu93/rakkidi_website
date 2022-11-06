import * as React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';

import '@shared/styles/globals.css';
import { wrapper } from 'store';
import Head from 'next/head';
import AppLayout from '@layouts/app-layout';

interface MyAppProps extends AppProps {}

const MyApp: React.FC<MyAppProps> = (pageProps) => {
  const { Component, ...rest } = pageProps;

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
      <Provider store={store}>
        <AppLayout>
          <Component {...props} />
        </AppLayout>
      </Provider>
    </>
  );
};

export default MyApp;
