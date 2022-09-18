import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: "",
  sort: { name: "popularity (DESC)", sortProperty: "rating" },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setFilters(state, action) {
      // if (Object.keys(action.payload).length) {
      //   state.sort = action.payload.sort;
      //   state.categoryId = Number(action.payload.categoryId);
      //   state.currentPage = Number(action.payload.currentPage);
      // } else {
      //   state.categoryId = 0;
      //   state.currentPage =1;
      //  state.sort = { name: "popularity (DESC)", sortProperty: "rating" },
      // }
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const selectFilter = (state) => state.filter;

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setSearchValue,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
