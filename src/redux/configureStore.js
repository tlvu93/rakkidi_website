import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history'
import createRootReducer from './modules/reducer'
// import DevTools from '../views/DevTools'

import thunk from 'redux-thunk';
export const history = createBrowserHistory()

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(thunk),
  // Required! Enable Redux DevTools with the monitors you chose
  // DevTools.instrument()
);

export default function configureStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/reactjs/redux/releases/tag/v3.1.0
  const store = createStore(createRootReducer(history), initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('./modules/reducer', () =>
      store.replaceReducer(
        require('./modules/reducer') /*.default if you use Babel 6+ */
      )
    );
  }

  return store;
}
