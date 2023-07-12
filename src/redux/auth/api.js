import axios from 'axios';

export const privateApi = axios.create({
    baseURL: 'https://connections-api.herokuapp.com',
});

export const token = {
    set(value) {
        privateApi.defaults.headers.Authorization = value;
    },
    unSet(value) {
        privateApi.defaults.headers.Authorization = null;
    },
};  