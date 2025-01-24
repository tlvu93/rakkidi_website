import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Order } from '@shared/interfaces/contract-calculator';
import { AppState } from 'store';

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
