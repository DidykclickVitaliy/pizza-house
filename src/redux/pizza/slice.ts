import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";
// #18: 🍕 React Pizza v2  signal abortController для обрыва запроса при получении новых пицц

// type FetchPizzasArgs = {
//   page: string;
//   category: string;
//   sortBy: string;
//   order: string;
//   search: string;
// };
// type FetchPizzasArgs = Record<string, string>;

// export const fetchPizzas = createAsyncThunk(
//   "pizza/fetchPizzaStatus",
//   async (params: Record<string, string>) => {
//     const { page, category, sortBy, order, search } = params;
//     const { data } = await axios.get(
//       `https://6304c03394b8c58fd7244553.mockapi.io/items?${page}&${category}&sortBy=${sortBy}&order=${order}${search}`
//     );
//     // if (data.length === 0) {
//     //   thunkAPI.rejectWithValue("Cannot get pizza");
//     // }

//     // return thunkAPI.fulfillWithValue(data);

//     // thunkAPI.getState()

//     return data as PizzaItem[];
//   }
// );

type PizzaItem = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
};

export enum Status {
  LOADIND = "loading",
  SUCCESS = "success",
  REJECTED = "rejected",
}

export interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADIND,
};

export const fetchPizzas = createAsyncThunk<
  PizzaItem[],
  Record<string, string>
>("pizza/fetchPizzaStatus", async (params) => {
  const { page, category, sortBy, order, search } = params;
  const { data } = await axios.get<PizzaItem[]>(
    `https://6304c03394b8c58fd7244553.mockapi.io/items?${page}&${category}&sortBy=${sortBy}&order=${order}${search}`
  );
  // if (data.length === 0) {
  //   thunkAPI.rejectWithValue("Cannot get pizza");
  // }

  // return thunkAPI.fulfillWithValue(data);

  // thunkAPI.getState()

  return data;
});

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADIND;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.REJECTED;
      state.items = [];
    });
  },

  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = "loading";
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = "success";
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.status = "rejected";
  //     state.items = [];
  //   },
  // },  JS
});

export const selectPizza = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;
