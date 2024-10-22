import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { addToCart, getCart } from "../request/cart.js";

const initialState = { totalQuantity: 0, products: [] };

export const addToCartThunk = createAsyncThunk(
  "cart/add",
  async (product, { dispatch, getState }) => {
    dispatch(cartActions.addProduct(product));

    const products = getState().products;
    const totalQuantity = getState().totalQuantity;

    await addToCart({ products, totalQuantity });
  },
);

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      return await getCart();
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (e) {
      console.log(e);
    }
  };
};

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
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.products = action.payload.products;
    },
    deleteCart(state) {
      state.totalQuantity = 0;
      state.products = [];
    },
  },
});

const cartStore = configureStore({
  reducer: cartSlice.reducer,
});

export const cartActions = cartSlice.actions;
export default cartStore;
