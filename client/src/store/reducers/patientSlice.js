import { createSlice } from "@reduxjs/toolkit";
import { createPatient, listPatient } from "../actions/patientActions";

const initialState = {
  loading: false,
  err: false,
  role: "",
  user: null,
  message: "",
  status: "",
};

const patientReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPatient.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPatient.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.data;
        state.message = payload.message;
      })
      .addCase(createPatient.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload.message;
        state.user = null;
      })
      .addCase(listPatient.pending, (state) => {
        state.loading = true;
      })
      .addCase(listPatient.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.err = false;
        state.user = payload.data;
        state.message = payload.message;
      })
      .addCase(listPatient.rejected, (state, { payload }) => {
        state.loading = false;
        state.err = payload.message;
        state.user = null;
      });
  },
});

export default patientReducer.reducer;
export const { resetMessage } = patientReducer.actions;
