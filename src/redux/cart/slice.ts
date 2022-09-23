import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { calcTotalCount } from "../../utils/calcTotalCount";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getCartItemsFromLS } from "../../utils/getCartItemsFromLS";
import { CartItemType, CartSliceState } from "./types";

const { items, totalPrice, totalCount } = getCartItemsFromLS();

const initialState: CartSliceState = {
  items,
  totalPrice,
  totalCount,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addItem(state, action) {
    //   state.items.push(action.payload);

    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price + sum;
    //   }, 0);
    // },

    addItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);

      state.totalCount = calcTotalCount(state.items);
    },
    decreaseItemsCount(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
        state.totalCount = state.totalCount - 1;
        state.totalPrice = state.totalPrice - findItem.price;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      // MUST BE FIXED
    },
    removeAllItems(state) {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, decreaseItemsCount, removeItem, removeAllItems } =
  cartSlice.actions;

export default cartSlice.reducer;
