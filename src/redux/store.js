import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/authSlice';

const contactsPersistConfig = {
    key: 'contacts',
    storage,
    whitelist: []
};

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token'],
}

const persistedReducer = persistReducer(contactsPersistConfig, contactsReducer);
const authPersistedReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
    reducer: {
        contacts: persistedReducer,
        auth: authPersistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
