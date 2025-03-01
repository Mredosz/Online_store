import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Product from "../models/interface/product";
import SortType from "../models/interface/sort-type";

interface ProductState {
  products: Product[];
  category: string;
  sort: SortType;
  minPrice: number;
  maxPrice: number | null;
  query: string;
}

const initialState: ProductState = {
  products: [],
  category: "all",
  sort: { sort: "", type: "" },
  minPrice: 0,
  maxPrice: null,
  query: "undefined",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProducts(state, action: PayloadAction<ProductState>) {
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
