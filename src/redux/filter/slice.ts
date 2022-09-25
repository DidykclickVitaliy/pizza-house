import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FilterSliceState, SortPropertiesEnum, SortType } from "./types";

const initialState: FilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: "",
  sort: {
    name: "popularity (DESC)",
    sortProperty: SortPropertiesEnum.RATING_DESC,
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.sort = action.payload.sort;
        state.categoryId = Number(action.payload.categoryId);
        state.currentPage = Number(action.payload.currentPage);
      } else {
        state.categoryId = 0;
        state.currentPage = 1;
        state.sort = {
          name: "popularity (DESC)",
          sortProperty: SortPropertiesEnum.RATING_DESC,
        };
      }
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setSearchValue,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
