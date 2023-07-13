import { createAsyncThunk } from '@reduxjs/toolkit';
import { privateApi } from './auth/api';

export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async (_, thunkApi) => {
        try {
            const { data } = await privateApi.get('/contacts');
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const addContact = createAsyncThunk(
    'contacts/addContact',
    async (contact, thunkApi) => {
        try {
            const { data } = await privateApi.post('/contacts', contact);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (id, thunkApi) => {
        try {
            const { data } = await privateApi.delete(`/contacts/${id}`);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);
