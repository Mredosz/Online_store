import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteCart,
  deleteFromCart,
  getCart,
} from "../request/cart.js";
import Product from "../models/interface/product";
import CartProduct from "../models/interface/cart-product";
import { AppDispatch, RootState } from "./store-redux";

export const addToCartThunk = createAsyncThunk(
  "cart/add",
  async (product: CartProduct, { dispatch, getState }) => {
    dispatch(cartActions.addProduct(product));

    const state = getState() as RootState;
    const products = state.cart.products;
    await addToCart({ products });
  },
);

export const changeQuantityThunk = createAsyncThunk(
  "cart/changeQuantity",
  async (product: CartProduct, { dispatch, getState }) => {
    dispatch(cartActions.changeQuantity(product));

    const state = getState() as RootState;
    const products = state.cart.products;
    await addToCart({ products });
  },
);

export const deleteProductThunk = createAsyncThunk(
  "cart/deleteProduct",
  async (product: Product, { dispatch }) => {
    dispatch(cartActions.deleteProduct(product));

    await deleteFromCart(product._id);
  },
);

export const deleteCartThunk = createAsyncThunk(
  "cart/deleteCart",
  async (_, { dispatch }) => {
    dispatch(cartActions.deleteCart());

    await deleteCart();
  },
);

export const fetchCartData = () => {
  return async (dispatch: AppDispatch) => {
    const fetchData = async () => {
      return await getCart();
    };

    try {
      const cartData = (await fetchData()) || [];
      dispatch(cartActions.replaceCart(cartData));
    } catch (e) {
      console.log(e);
    }
  };
};

const calculateTotalQuantity = (products: CartProduct[]) =>
  products.map((product) => product.quantity).reduce((acc, el) => acc + el, 0);

interface CartState {
  totalQuantity: number;
  products: CartProduct[];
}

const initialState: CartState = { totalQuantity: 0, products: [] };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    changeQuantity(state, action: PayloadAction<CartProduct>) {
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
      state.totalQuantity = calculateTotalQuantity(state.products);
    },
    addProduct(state, action: PayloadAction<CartProduct>) {
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
      state.totalQuantity = calculateTotalQuantity(state.products);
    },
    deleteProduct(state, action: PayloadAction<Product>) {
      const product = action.payload;
      state.products = state.products.filter(
        (p) => p.product._id !== product._id,
      );
      state.totalQuantity = calculateTotalQuantity(state.products);
    },
    replaceCart(state, action: PayloadAction<CartState>) {
      state.products = action.payload.products || [];
      state.totalQuantity = calculateTotalQuantity(state.products);
    },
    deleteCart(state) {
      state.totalQuantity = 0;
      state.products = [];
    },
  },
});

export const cartActions = cartSlice.actions;
