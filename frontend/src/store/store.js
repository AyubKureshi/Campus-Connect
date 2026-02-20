import { configureStore } from "@reduxjs/toolkit";
import toastSlice from "./toastSlice";

const store = configureStore({
  reducer: {
    toast: toastSlice.reducer, 
  }
});

export default store;
