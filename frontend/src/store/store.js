import { configureStore } from "@reduxjs/toolkit";
import toastSlice from "./toastSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    toast: toastSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
