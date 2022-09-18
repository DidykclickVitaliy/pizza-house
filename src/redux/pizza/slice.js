import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// #18: 🍕 React Pizza v2  signal abortController для обрыва запроса при получении новых пицц

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzaStatus",
  async (params, thunkAPI) => {
    const { page, category, sortBy, order, search } = params;
    const { data } = await axios.get(
      `https://6304c03394b8c58fd7244553.mockapi.io/items?${page}&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    // if (data.length === 0) {
    //   thunkAPI.rejectWithValue("Cannot get pizza");
    // }

    // return thunkAPI.fulfillWithValue(data);

    // thunkAPI.getState()
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  //   extraReducers: (builder) => {
  //     builder.addCase(fetchPizzas.fulfilled, (state, action) => {
  //       state.items = action.payload;
  //     });
  //   }, TYPE SCRIPT

  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "rejected";
      state.items = [];
    },
  },
});

export const selectPizza = (state) => state.pizza;

export default pizzaSlice.reducer;
