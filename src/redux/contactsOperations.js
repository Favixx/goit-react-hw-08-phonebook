import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://64abd8989edb4181202ea92b.mockapi.io/';

export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async (_, thunkApi) => {
        try {
            const { data } = await axios.get('/contacts');
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
            const { data } = await axios.post('/contacts', contact);
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
            const { data } = await axios.delete(`/contacts/${id}`);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);
