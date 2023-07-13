import { createAsyncThunk } from '@reduxjs/toolkit';
import { privateApi, token } from './api';
import { authSlice } from './authSlice';

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (body, { rejectWithValue, dispatch }) => {
        try {
            const response = await privateApi.post('/users/login', body);
            token.set(response.data.token);
            dispatch(authSlice.actions.setToken(response.data.token));
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const registerThunk = createAsyncThunk(
    'auth/register',
    async (body, { rejectWithValue, dispatch }) => {
        try {
            const response = await privateApi.post('/users/signup', body);
            token.set(response.data.token);
            dispatch(authSlice.actions.setToken(response.data.token));
            return response.data;
        } catch (error) {
            return rejectWithValue();
        }
    }
);

export const getUserThunk = createAsyncThunk(
    'auth/getUser',
    async (_, { rejectWithValue, dispatch, getState }) => {
        try {
            const state = getState();
            const tokenValue = state.auth.token;
            if (!tokenValue) {
                return rejectWithValue();
            }
            token.set(tokenValue);
            const response = await privateApi.get('/users/current');
            return response.data;
        } catch (error) {
            token.unSet();
            return rejectWithValue();
        }
    }
);

export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await privateApi.post('/users/logout');
            token.unSet();
            dispatch(authSlice.actions.setToken(''));
            return response.data;
        } catch (error) {
            return rejectWithValue();
        }
    }
);
