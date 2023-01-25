import { createAsyncThunk } from "@reduxjs/toolkit";

import { instance } from "../../middleware/axios";
import { PizzaItem } from "./types";

//    signal abortController to terminate the request when receiving new pizzas

export const fetchPizzas = createAsyncThunk<
  PizzaItem[],
  Record<string, string>
>("pizza/fetchPizzaStatus", async (params) => {
  const { page, category, sortBy, order, search } = params;
  const { data } = await instance.get<PizzaItem[]>(
    `/items?${page}&${category}&sortBy=${sortBy}&order=${order}${search}`
  );

  return data;
});
