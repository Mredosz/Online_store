import { configureStore } from "@reduxjs/toolkit";
import { addressSlice } from "./address-redux.jsx";
import { cartSlice } from "./cart-redux.jsx";
import { productSlice } from "./product-redux.jsx";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    address: addressSlice.reducer,
    product: productSlice.reducer,
  },
});

export default store;
