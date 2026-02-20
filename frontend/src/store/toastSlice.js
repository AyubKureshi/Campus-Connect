import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "", 
  isVisible: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action) => {
      const { message, type = "success" } = action.payload || {};
      state.message = message || "";
      state.type = type;
      state.isVisible = true;
    },
    clearToast: (state) => {
      state.message = "";
      state.type = "";
      state.isVisible = false;
    },
  },
});

export const toastAction = toastSlice.actions;

export default toastSlice;
