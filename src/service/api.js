import axios from 'axios';
const API = axios.create({
    baseURL: 'https://64abd8989edb4181202ea92b.mockapi.io/contacts'
})

export const fetchContacts = async () => {
    try {
        const response = await API.get(`/contacts`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch contacts.');
    }
};

export const addContact = async (contact) => {
    try {
        const response = await API.post(`/contacts`, contact);
        return response.data;
    } catch (error) {
        throw new Error('Failed to add contact.');
    }
};

export const deleteContact = async (contactId) => {
    try {
        await API.delete(`/contacts/${contactId}`);
        return contactId;
    } catch (error) {
        throw new Error('Failed to delete contact.');
    }
};