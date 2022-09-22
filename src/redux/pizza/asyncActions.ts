import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { PizzaItem } from "./types";

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

// Pizza block button to component
