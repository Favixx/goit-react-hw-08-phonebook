import { createSlice } from '@reduxjs/toolkit';

import {
  refreshUser,
  logIn,
  logOut,
  register,
} from './authOperations';

const initialState = {
  user: {
    name: '',
    email: '',
  },
  token: '',
  isAuth: false,
  isRefresher: false,
  isLoading: false,
  isError: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = '';
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isRefresher = false;
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
        state.isError = '';
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isRefresher = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isLoading = true;
        state.isError = '';
        state.isRefresher = true;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isAuth = true;
        state.isLoading = false;
        state.isRefresher = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isRefresher = false;
      })
      .addCase(logOut.pending, (state) => {
        state.isError = '';
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = initialState.user;
        state.isAuth = false;
        state.isLoading = false;
        state.isRefresher = false;
        state.token = '';
      })
      .addCase(logOut.rejected, () => initialState);
  },
});


export const authReducer = authSlice.reducer;
