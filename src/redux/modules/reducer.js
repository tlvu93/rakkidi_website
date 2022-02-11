import { combineReducers } from 'redux';
// import { connectRouter } from 'connected-react-router'

import orderStore from './orders'

const createRootReducer = (history) => combineReducers({
  // router: connectRouter(history),
  orderStore,
})
export default createRootReducer


