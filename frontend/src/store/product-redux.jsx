import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../request/products.js";

export const fetchProductData = createAsyncThunk("data/fetchData", async () => {
  return await getAllProducts();
});

export const productSlice = createSlice({
  name: "product",
  initialState: {
    allProducts: [],
    filterProducts: [],
    isLoading: false,
    error: null,
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
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.filterProducts = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const productAction = productSlice.actions;
