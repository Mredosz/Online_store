import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { filterProducts, getAllProducts } from "../request/products.js";

export const fetchProductData = createAsyncThunk("data/fetchData", async () => {
  return await getAllProducts();
});

export const productSlice = createSlice({
  name: "product",
  initialState: {
    allProducts: [],
    filterProducts: [],
  },
  reducers: {
    filtrateCategory(state, action) {
      const category = action.payload;
      if (category !== "all") {
        state.filterProducts = state.allProducts.filter(
          (p) => p.category.name === category,
        );
      } else {
        state.filterProducts = state.allProducts;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductData.fulfilled, (state, action) => {
      state.allProducts = action.payload;
      state.filterProducts = action.payload;
    });
  },
});

export const productAction = productSlice.actions;
