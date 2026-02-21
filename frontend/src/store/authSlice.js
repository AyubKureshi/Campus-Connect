import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("userToken") || null,
  user: JSON.parse(localStorage.getItem("user") || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;

      localStorage.setItem("userToken", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;

      localStorage.removeItem("userToken");
      localStorage.removeItem("user");
    },
    setAuthUser: (state, action) => {
      state.user = action.payload || null;

      if (state.user) {
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase("user/updateCurrentUser/fulfilled", (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    });
  },
});

export const authAction = authSlice.actions;

export default authSlice;
