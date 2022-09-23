import { createSlice } from "@reduxjs/toolkit";

import { fetchPizzas } from "./asyncActions";
import { PizzaSliceState, StatusEnum } from "./types";
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

export default pizzaSlice.reducer;
