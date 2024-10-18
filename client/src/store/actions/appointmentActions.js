import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppointmentAxios } from "../../constants/axiosInstances";

export const createAppointment = createAsyncThunk(
  "appointment/create",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const { data } = await AppointmentAxios.post(
        "/add-appointment",
        appointmentData,
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const listAppointments = createAsyncThunk(
  "listappointment",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AppointmentAxios.get("/list-appointment", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
