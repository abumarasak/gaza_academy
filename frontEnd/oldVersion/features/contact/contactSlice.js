import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contactService";
const initialState = {
  contacts: [],
  contact: {},
  isError: false,
  isSuccess: false,
  isLoading: false,

  message: "",
};

// contact us
export const contact = createAsyncThunk(
  "contact/contact",
  async (contactData, thunkApi) => {
    try {
      return await contactService.contact(contactData);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.msg) ||
        err.message ||
        err.toString();
      return thunkApi.rejectWithValue({ message });
    }
  }
);

// get all messages
export const getAllMessages = createAsyncThunk(
  "contact/getAllMessages",
  async (thunkApi) => {
    try {
      return await contactService.getAllMessages();
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.msg) ||
        err.message ||
        err.toString();
      return thunkApi.rejectWithValue({ message });
    }
  }
);

// Get single message
export const getSingleMessage = createAsyncThunk(
  "contact/getSingleMessage",
  async (messageId, thunkApi) => {
    try {
      return await contactService.getSingleMessage(messageId);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.msg) ||
        err.message ||
        err.toString();
      return thunkApi.rejectWithValue({ message });
    }
  }
);

// Delete All Messages
export const deleteAllMessages = createAsyncThunk(
  "contact/deleteAllMessages",
  async (thunkApi) => {
    try {
      return await contactService.deleteAllMessages();
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.msg) ||
        err.message ||
        err.toString();
      return thunkApi.rejectWithValue({ message });
    }
  }
);
// Delete single message
export const deleteSingleMessage = createAsyncThunk(
  "contact/deleteSingleMessage",
  async (messageId, thunkApi) => {
    try {
      return await contactService.deleteSingleMessage(messageId);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.msg) ||
        err.message ||
        err.toString();
      return thunkApi.rejectWithValue({ message });
    }
  }
);
export const contactSlice = createSlice({
  name: "contact",
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
      .addCase(contact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(contact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.msg;
      })
      .addCase(contact.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.msg;
      })
      .addCase(getAllMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = action.payload;
        state.message = action.payload.msg;
      })
      .addCase(getAllMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.msg;
      })
      .addCase(getSingleMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contact = action.payload.data;
        state.message = action.payload.msg;
      })

      .addCase(getSingleMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.msg;
      })
      .addCase(deleteAllMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = [];
        state.isSuccess = true;
        state.message = action.payload.msg;
      })
      .addCase(deleteAllMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.msg;
      })
      .addCase(deleteSingleMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSingleMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contact = {};
        state.message = action.payload.msg;
      })
      .addCase(deleteSingleMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.msg;
      });
  },
});
export const { reset } = contactSlice.actions;
export default contactSlice.reducer;
