import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { userLoginAction } from "../actions/userAction";

const initialState = {
  token: null,
  id: null,
  username: null,
  email: null,
  role: null,
  isAuthenticated: false,
  error: null,
  loading: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearAuthData(state) {
      state.token = null;
      state.role = null;
      state.id = null;
      state.username = null;
      state.email = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PURGE, () => {
        return initialState;
      })
      .addCase(userLoginAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.token = action.payload.userData.token;
          state.role = action.payload.userData.role;
          state.id = action.payload.userData.id;
          state.username = action.payload.userData.username;
          state.email = action.payload.userData.email;
          state.isAuthenticated = true;
          state.error = null
          state.loading = false
        }
      })
      .addCase(userLoginAction.rejected, (state, action) => {
        state.error = action.payload || "Login failed";
      })
  },
});

export const { setAuthData, clearAuthData, setError, setLoading } = authSlice.actions;
export default authSlice.reducer;