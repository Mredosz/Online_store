import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Account from "../models/interface/account";
import { UserRole } from "../models/enum/user-role";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState: Account = {
  isLogged: true,
  isAdmin: false,
  role: UserRole.USER,
  token: "",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login(state, action: PayloadAction<Account>) {
      state.isLogged = action.payload.isLogged;
      state.isAdmin = action.payload.role === UserRole.ADMIN;

      // await AsyncStorage.setItem("is_logged_in", state.isLogged.toString());
      // await AsyncStorage.setItem("is_admin", state.isAdmin.toString());
    },
    logout(state) {
      state.isLogged = false;
      state.isAdmin = false;

      // AsyncStorage.removeItem("is_logged_in");
      // AsyncStorage.removeItem("is_admin");
      // AsyncStorage.removeItem("token");
    },
  },
});

export const accountAction = accountSlice.actions;
