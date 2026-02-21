import { configureStore } from "@reduxjs/toolkit";
import toastSlice from "./toastSlice";
import authSlice from "./authSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    toast: toastSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
