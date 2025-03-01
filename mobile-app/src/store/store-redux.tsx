import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cart-redux";
import { addressSlice } from "./address-redux";
import { productSlice } from "./product-redux";
import { accountSlice } from "./account-redux";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    address: addressSlice.reducer,
    product: productSlice.reducer,
    account: accountSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
