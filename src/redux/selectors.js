import { createSelector } from "@reduxjs/toolkit";

export const contactsSelector = state => state.contacts.items;
export const filterSelector = state => state.filter.filter;

export const filterSearchSelector = createSelector(
    [contactsSelector, filterSelector],
    (contacts, filter) => {
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
        );
    })