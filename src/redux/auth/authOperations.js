import { createAsyncThunk } from '@reduxjs/toolkit';
import { privateApi, token } from './api';
import { authSlice } from './authSlice';
import { toast } from 'react-toastify';

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (body, { rejectWithValue }) => {
        try {
            const response = await privateApi.post('/users/login', body);
            token.set(response.data.token);
            return response.data;
        } catch (error) {
            toast.error('Email or password is incorrect', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
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
    async (_, { rejectWithValue, getState }) => {
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
