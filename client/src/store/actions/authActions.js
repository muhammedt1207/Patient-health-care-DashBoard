import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthAxios } from "../../constants/axiosInstances";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await AuthAxios.post("/login", userData, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AuthAxios.get("/get-user");
      console.log("🚀 ~ data:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      console.log("herererererer");
      const { data } = await AuthAxios.get("/logout");
      console.log("🚀 ~ async ~ data:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const isExist = createAsyncThunk(
  "user/isExist",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AuthAxios.get("/is-exist");
      // console.log("🚀 ~ data:", data)

      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
