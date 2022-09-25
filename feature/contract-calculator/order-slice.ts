import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'app/store';
import { Order } from 'interfaces/contract-calculator';

export interface OrderState {
  list: Order[];
}

const initialState: OrderState = {
  list: []
};

export const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.list.push(action.payload);
    },
    removeOrder: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((order) => order.id !== action.payload);
    },
    clearOrder: (state) => {
      state.list = [];
    }
  }
});

export const { addOrder, removeOrder, clearOrder } = orderSlice.actions;

export const selectOrders = (state: AppState) => state.order.list;

export default orderSlice.reducer;
