import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config/config";

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`${BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch user profile",
      );
    }
  },
);

export const updateCurrentUser = createAsyncThunk(
  "user/updateCurrentUser",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.put(`${BASE_URL}/users/me`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update user profile",
      );
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    loading: false,
    updating: false,
    error: null,
  },
  reducers: {
    setProfileFromAuth(state, action) {
      state.profile = action.payload || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to load profile";
      })
      .addCase(updateCurrentUser.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        state.updating = false;
        state.profile = action.payload;
      })
      .addCase(updateCurrentUser.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload || "Unable to update profile";
      })
      .addCase("auth/logout", (state) => {
        state.profile = null;
        state.loading = false;
        state.updating = false;
        state.error = null;
      });
  },
});

export const userAction = userSlice.actions;
export default userSlice;
