import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'contacts',
    storage,
    whitelist: ['contacts']
};

const persistedReducer = persistReducer(persistConfig, contactsReducer);
const persistedFilterReducer = persistReducer(persistConfig, filterReducer);

export const store = configureStore({
    reducer: {
        contacts: persistedReducer,
        filter: persistedFilterReducer,
    },
});
export const persistor = persistStore(store);