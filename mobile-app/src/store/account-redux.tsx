import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Account from "../models/interface/account";

const initialState: Account = {
  isLogged: true,
  isAdmin: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login(state, action: PayloadAction<Account>) {
      state.isLogged = action.payload.isLogged;
      state.isAdmin = action.payload.isAdmin === "admin";

      // localStorage.setItem("is_logged_in", state.isLogged);
      // localStorage.setItem("is_admin", state.isAdmin);
    },
    logout(state) {
      state.isLogged = false;
      state.isAdmin = false;

      // localStorage.removeItem("is_logged_in");
      // localStorage.removeItem("is_admin");
    },
  },
});

export const accountAction = accountSlice.actions;
