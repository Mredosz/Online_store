import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: localStorage.getItem("is_logged_in") === "true",
  isAdmin: localStorage.getItem("is_admin") === "true",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login(state, action) {
      state.isLogged = action.payload.isLogged;
      state.isAdmin = action.payload.isAdmin === "admin";

      localStorage.setItem("is_logged_in", state.isLogged);
      localStorage.setItem("is_admin", state.isAdmin);
    },
    logout(state) {
      state.isLogged = false;
      state.isAdmin = false;

      localStorage.removeItem("is_logged_in");
      localStorage.removeItem("is_admin");
    },
  },
});

export const accountAction = accountSlice.actions;
