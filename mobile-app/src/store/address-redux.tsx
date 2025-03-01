import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Address from "../models/interface/address";
import { DeliveryType } from "../models/enum/delivery-type";
import { PaymentMethod } from "../models/enum/payment-method";

const initialState: Address = {
  city: "",
  street: "",
  postalCode: "",
  homeNumber: "",
  phoneNumber: "",
  deliveryType: DeliveryType.COURIER,
  paymentMethod: PaymentMethod.TRANSFER,
  cardNumber: "",
  cardExpiration: "",
  cvv: "",
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    add(state, action: PayloadAction<Address>) {
      Object.assign(state, action.payload);
    },
  },
});

export const addressAction = addressSlice.actions;
