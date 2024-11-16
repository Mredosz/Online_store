import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    category: null,
    sort: { sort: "", type: "" },
  },
  reducers: {
    filtrateCategory(state, action) {
      state.category = action.payload.category;
      state.products = action.payload.products;
    },
    fetchProducts(state, action) {
      state.category = action.payload.category;
      state.products = action.payload.products;
      state.sort = action.payload.sort;
    },
    sortProduct(state, action) {
      state.products = action.payload;
    },
  },
});

export const productAction = productSlice.actions;

export class fetchProductData {}
