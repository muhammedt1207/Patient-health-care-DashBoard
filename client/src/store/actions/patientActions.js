import { createAsyncThunk } from "@reduxjs/toolkit";
import { PatientAxios } from "../../constants/axiosInstances";

export const createPatient = createAsyncThunk(
  "Patient/create",
  async (PatientData, { rejectWithValue }) => {
    try {
      const { data } = await PatientAxios.post("/create-patient", PatientData, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const listPatient = createAsyncThunk(
  "list-patient",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await PatientAxios.get("/list-patients", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
