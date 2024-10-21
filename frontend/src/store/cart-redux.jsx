import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { addToCart } from "../request/cart.js";

const initialState = { totalQuantity: 0, products: [] };

export const addToCartThunk = createAsyncThunk(
  "cart/add",
  async (product, { dispatch, getState }) => {
    dispatch(cartActions.addProduct(product));

    const products = getState().products;

    await addToCart(products);
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      const newProduct = action.payload;
      const existingProduct = state.products.find(
        ({ product }) => product._id === newProduct._id,
      );
      if (!existingProduct) {
        state.totalQuantity++;
        state.products.push({
          product: action.payload,
          quantity: 1,
        });
      } else {
        state.totalQuantity++;
        existingProduct.quantity++;
      }
    },
    decrementProduct(state) {
      state.totalQuantity--;
    },
    deleteProduct(state) {},
  },
});

const cartStore = configureStore({
  reducer: cartSlice.reducer,
});

export const cartActions = cartSlice.actions;
export default cartStore;
