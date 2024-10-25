import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { addToCart, deleteFromCart, getCart } from "../request/cart.js";

const initialState = { totalQuantity: 0, products: [] };

export const addToCartThunk = createAsyncThunk(
  "cart/add",
  async (product, { dispatch, getState }) => {
    dispatch(cartActions.addProduct(product));

    const products = getState().products;
    // const totalQuantity = getState().totalQuantity;

    await addToCart({ products, totalQuantity: 0 });
  },
);

export const changeQuantityThunk = createAsyncThunk(
  "cart/changeQuantity",
  async (product, { dispatch, getState }) => {
    dispatch(cartActions.changeQuantity(product));

    const products = getState().products;
    // const totalQuantity = getState().totalQuantity;
    await addToCart({ products, totalQuantity: 0 });
  },
);

export const deleteProductThunk = createAsyncThunk(
  "cart/deleteProduct",
  async (product, { dispatch }) => {
    dispatch(cartActions.deleteProduct(product));

    await deleteFromCart(product._id);
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
    changeQuantity(state, action) {
      const newProduct = action.payload.product;
      const quantity = action.payload.quantity;
      const existingProduct = state.products.find(
        ({ product }) => product._id === newProduct._id,
      );
      if (!existingProduct) {
        state.products.push({
          product: newProduct,
          quantity: Math.min(quantity, newProduct.availableQuantity),
        });
      } else if (quantity >= newProduct.availableQuantity) {
        existingProduct.quantity = newProduct.availableQuantity;
        console.log(quantity);
      } else {
        existingProduct.quantity = quantity;
      }
    },
    addProduct(state, action) {
      const newProduct = action.payload.product;
      const quantity = action.payload.quantity;
      const existingProduct = state.products.find(
        ({ product }) => product._id === newProduct._id,
      );
      if (!existingProduct) {
        state.products.push({
          product: newProduct,
          quantity: quantity,
        });
      } else if (
        existingProduct.quantity + quantity >=
        newProduct.availableQuantity
      ) {
        existingProduct.quantity = newProduct.availableQuantity;
        console.log(quantity);
      } else {
        existingProduct.quantity += quantity;
      }
    },
    decrementProduct(state) {
      state.totalQuantity--;
    },
    deleteProduct(state, action) {
      const product = action.payload;
      state.products = state.products.filter(
        (p) => p.product._id !== product._id,
      );
    },
    replaceCart(state, action) {
      state.totalQuantity = 0;
      state.products = action.payload.products || [];
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
