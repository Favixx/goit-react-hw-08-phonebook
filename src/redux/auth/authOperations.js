import { createAsyncThunk } from '@reduxjs/toolkit';
import { privateApi, token } from './api';
import { selectToken } from './authSelector';

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (body, { rejectWithValue }) => {
        try {
            const response = await privateApi.post('/users/login', body);
            token.set(response.data.token);
            return response.data;
        } catch (error) {
            return rejectWithValue();
        }
    }
);
export const registerThunk = createAsyncThunk(
    'auth/register',
    async (body, { rejectWithValue }) => {
        try {
            const response = await privateApi.post('/users/signup', body);
            token.set(response.data.token);

            return response.data;
        } catch (error) {
            return rejectWithValue();
        }
    }
);

export const getUserThunk = createAsyncThunk(
    'auth/getUser',
    async (_, { rejectWithValue, getState }) => {
        try {
            const tokenValue = selectToken(getState());
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
    async (_, { rejectWithValue }) => {
        try {
            const response = await privateApi.post('/users/logout');
            token.unSet();
            return response.data;
        } catch (error) {
            return rejectWithValue();
        }
    }
);