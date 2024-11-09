import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: "",
  street: "",
  postalCode: "",
  homeNumber: "",
  phoneNumber: "",
  deliveryType: "courier",
  paymentMethod: "transfer",
  cardNumber: "",
  cardExpiration: "",
  cvv: "",
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    add(state, action) {
      Object.assign(state, action.payload);
    },
  },
});

export const addressAction = addressSlice.actions;
