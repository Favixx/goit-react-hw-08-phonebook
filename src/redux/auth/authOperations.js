import { createAsyncThunk } from '@reduxjs/toolkit';
import { privateApi, token } from './api';
import { toast } from 'react-toastify';

export const logIn = createAsyncThunk(
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

export const register = createAsyncThunk(
    'auth/register',
    async (body, { rejectWithValue }) => {
        try {
            const response = await privateApi.post('/users/signup', body);
            token.set(response.data.token);
            return response.data;
        } catch (error) {
            toast.error('The account with this email is already exists. OR Email or password is invalid, use valid data for registration.', {
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

export const refreshUser = createAsyncThunk(
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

export const logOut = createAsyncThunk(
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
