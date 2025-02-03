import { configureStore } from "@reduxjs/toolkit";
import { addressSlice } from "./address-redux.jsx";
import { cartSlice } from "./cart-redux.jsx";
import { productSlice } from "./product-redux.jsx";
import { accountSlice } from "./account-redux.jsx";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    address: addressSlice.reducer,
    product: productSlice.reducer,
    account: accountSlice.reducer,
  },
});

export default store;
