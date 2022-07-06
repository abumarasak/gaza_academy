import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import contactReducer from "../features/contact/contactSlice";
import verifiedReducer from "../features/verified/verifiedSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer,
    verivied: verifiedReducer,
  },
});
