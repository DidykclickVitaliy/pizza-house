import { createSlice } from "@reduxjs/toolkit";

import { fetchPizzas } from "./asyncActions";
import { PizzaSliceState, StatusEnum } from "./types";
//    signal abortController to terminate the request when receiving new pizzas

const initialState: PizzaSliceState = {
  items: [],
  status: StatusEnum.LOADIND,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = StatusEnum.LOADIND;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = StatusEnum.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = StatusEnum.REJECTED;
      state.items = [];
    });
  },
});

export default pizzaSlice.reducer;
