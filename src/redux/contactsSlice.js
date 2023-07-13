import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOperations';

const initialState = {
    contacts: [],
    filter: '',
    isLoading: false,
    isError: null,
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        getFilter(state, action) {
            state.filter = action.payload;
        },
        logOutContacts(state) {
            state.contacts = [];
            state.filter = '';
            state.isLoading = false;
            state.isError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contacts = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            .addCase(addContact.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contacts.push(action.payload);
            })
            .addCase(addContact.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
            .addCase(deleteContact.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contacts = state.contacts.filter(
                    (contact) => contact.id !== action.payload.id
                );
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            });
    },
});

export const { getFilter, logOutContacts } =
    contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
