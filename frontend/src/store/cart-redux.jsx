import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  addToCart,
  deleteCart,
  deleteFromCart,
  getCart,
} from "../request/cart.js";

const initialState = { totalQuantity: 0, products: [] };

export const addToCartThunk = createAsyncThunk(
  "cart/add",
  async (product, { dispatch, getState }) => {
    dispatch(cartActions.addProduct(product));

    const products = getState().products;

    await addToCart({ products });
  },
);

export const changeQuantityThunk = createAsyncThunk(
  "cart/changeQuantity",
  async (product, { dispatch, getState }) => {
    dispatch(cartActions.changeQuantity(product));

    const products = getState().products;
    await addToCart({ products });
  },
);

export const deleteProductThunk = createAsyncThunk(
  "cart/deleteProduct",
  async (product, { dispatch }) => {
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
  return async (dispatch) => {
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
      state.totalQuantity = state.products
        .map((product) => product.quantity)
        .reduce((acc, el) => acc + el);
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
      state.totalQuantity = state.products
        .map((product) => product.quantity)
        .reduce((acc, el) => acc + el);
    },
    deleteProduct(state, action) {
      const product = action.payload;
      state.products = state.products.filter(
        (p) => p.product._id !== product._id,
      );
      state.totalQuantity = state.products
        .map((product) => product.quantity)
        .reduce((acc, el) => acc + el);
    },
    replaceCart(state, action) {
      state.products = action.payload.products || [];
      state.totalQuantity = state.products
        .map((product) => product.quantity)
        .reduce((acc, el) => acc + el, 0);
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
