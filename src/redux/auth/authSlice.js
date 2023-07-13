import { createSlice } from '@reduxjs/toolkit';

import {
  getUserThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
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
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = '';
      })
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isRefresher = false;
      })
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = '';
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isRefresher = false;
      })
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = '';
        state.isRefresher = true;
      })
      .addCase(getUserThunk.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isAuth = true;
        state.isLoading = false;
        state.isRefresher = false;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.isRefresher = false;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.isError = '';
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = initialState.user;
        state.isAuth = false;
        state.isLoading = false;
        state.isRefresher = false;
        state.token = '';
      })
      .addCase(logoutThunk.rejected, () => initialState);
  },
});


export const authReducer = authSlice.reducer;
