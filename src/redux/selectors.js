import { createSelector } from '@reduxjs/toolkit';

export const contactsSelector = state => state.contacts.contacts;
export const filterSelector = state => state.contacts.filter;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectVisibleForm = state => state.contacts.visibleForm;

export const selectFilterSearch = createSelector(
    [contactsSelector, filterSelector],
    (contacts, filter) => {
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
        );
    }
);