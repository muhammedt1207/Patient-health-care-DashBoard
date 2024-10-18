import toast from "react-hot-toast";
import { createSlice } from "@reduxjs/toolkit";
import { createAppointment, listAppointments } from "../actions/appointmentActions";

const initialState = {
  loading: false,
  err: false,
  role: "",
  user: null,
  message: "",
  status: "",
};

const appointmentReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAppointment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.data;
        state.message = payload.message;
      })
      .addCase(createAppointment.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload.message;
        state.user = null;
      })
      .addCase(listAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(listAppointments.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.data;
        state.message = payload.message;
      })
      .addCase(listAppointments.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload.message;
        state.user = null;
      })
      
  },
});

export default appointmentReducer.reducer;
export const { resetMessage } = appointmentReducer.actions;
