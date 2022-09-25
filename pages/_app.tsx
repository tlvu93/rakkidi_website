import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AppLayout from 'layouts/app-layout';
import { Provider } from 'react-redux';
import { wrapper } from 'app/store';

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <AppLayout>
        <Component {...props} />
      </AppLayout>
    </Provider>
  );
}

export default MyApp;
