import toast from "react-hot-toast";
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, getUser, isExist, logout } from "../actions/authActions";

const initialState = {
  loading: false,
  err: false,
  role: "",
  user: null,
  message: "",
  status: "",
};

const authReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.data;
        state.message = payload.message;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload.message;
        state.user = null;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.user;
        state.message = payload.message;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload.message;
        toast.error(payload.message);
        state.user = null;
      })
      .addCase(isExist.pending, (state) => {
        state.loading = true;
      })
      .addCase(isExist.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.data;
        state.message = payload.message;
      })
      .addCase(isExist.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload?.message;
        state.user = null;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.data;
        state.message = payload.message;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload.message;
        toast.error(payload.message);
        state.user = null;
      });
  },
});

export default authReducer.reducer;
export const { resetMessage } = authReducer.actions;
