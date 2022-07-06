import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import verifiedService from "./verifiedService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const verified = createAsyncThunk(
  "verified/verified",
  async (userData, thunkApi) => {
    try {
      return await verifiedService.verified(userData);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.msg) ||
        err.message ||
        err.toString();
      return thunkApi.rejectWithValue({ message });
    }
  }
);
export const verifiedSlice = createSlice({
  name: "verified",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verified.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(verified.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.msg;
      })
      .addCase(verified.rejected, (state, action) => {
        state.message = action.payload.msg;
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = verifiedSlice.actions;
export default verifiedSlice.reducer;
