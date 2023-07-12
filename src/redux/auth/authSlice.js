import { createSlice } from '@reduxjs/toolkit';
import {
  getUserThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
} from './authOperations';

const initialState = {
  token: null,
  isLoading: false,
  isError: null,
  isAuth: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isLoading = false;
        state.token = payload.token;
        state.isAuth = true;
      })
      .addCase(loginThunk.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(registerThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isLoading = false;
        state.token = payload.token;
        state.isAuth = true;
      })
      .addCase(registerThunk.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getUserThunk.fulfilled, (state, { payload }) => {
        state.isAuth = true;
        state.user = payload;
      })
      .addCase(getUserThunk.rejected, () => initialState)
      .addCase(logoutThunk.fulfilled, () => initialState);
  },
});

export const authReducer = authSlice.reducer;