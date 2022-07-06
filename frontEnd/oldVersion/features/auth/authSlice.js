import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
// Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/signup",
  async (user, thunkApi) => {
    try {
      return await authService.register(user);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.msg) ||
        err.message ||
        err.toString();
      return thunkApi.rejectWithValue({ message });
    }
  }
);
// login user
export const login = createAsyncThunk("auth/login", async (user, thunkApi) => {
  try {
    return await authService.login(user);
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.msg) ||
      err.message ||
      err.toString();
    return thunkApi.rejectWithValue({ message });
  }
});

// logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// get single user
export const getSingleUser = createAsyncThunk(
  "auth/getSingleUser",
  async (userId, thunkApi) => {
    try {
      return await authService.getSingleUser(userId);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.msg) ||
        err.message ||
        err.toString();
      return thunkApi.rejectWithValue({ message });
    }
  }
);

// update user
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (user, thunkApi) => {
    try {
      return await authService.updateUser(user);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.msg) ||
        err.message ||
        err.toString();
      return thunkApi.rejectWithValue({ message });
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (userId, thunkApi) => {
    try {
      return await authService.deleteUser(userId);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.msg) ||
        err.message ||
        err.toString();
      return thunkApi.rejectWithValue({ message });
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
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
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
        state.message = action.payload.msg;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = action.payload.msg;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.user = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
        state.message = action.payload.msg;
        state.user = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.user = null;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
        state.message = action.payload.msg;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.msg;
        state.user = null;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
