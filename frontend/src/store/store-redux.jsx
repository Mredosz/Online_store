import { configureStore } from "@reduxjs/toolkit";
import { addressSlice } from "./address-redux.jsx";
import { cartSlice } from "./cart-redux.jsx";

const store = configureStore({
  reducer: { cart: cartSlice.reducer, address: addressSlice.reducer },
});

export default store;
