const ADD_ORDER = 'ORDER/ADD';

const REMOVE_ORDER = 'ORDER/REMOVE'

const CLEAR_ORDERS = 'ORDER/CLEAR';

const initialState = {
  orders: []
};

export default function orderStore(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.order]
      };
    case REMOVE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(order => order!== action.order)
      };
    case CLEAR_ORDERS:
      return {
        ...state,
        orders: []
      };
    default:
      return state;
  }
}

export function addOrder(order) {
  return {
    type: ADD_ORDER,
    order: order
  }
}

export function removeOrder(order) {
  console.log(order);
  return {
    type: REMOVE_ORDER,
    order: order
  }
}

export function clearOrders() {
  return {
    type: CLEAR_ORDERS,
  };
}
