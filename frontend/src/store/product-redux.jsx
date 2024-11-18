import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    category: "all",
    sort: { sort: "", type: "" },
    minPrice: 0,
    maxPrice: null,
    query: "undefined",
  },
  reducers: {
    fetchProducts(state, action) {
      state.category = action.payload.category;
      state.products = action.payload.products;
      state.sort = action.payload.sort;
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
      state.query = action.payload.query;
    },
  },
});

export const productAction = productSlice.actions;
