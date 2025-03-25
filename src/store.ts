import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'; // Adjust the import path as necessary

const store = configureStore({
    reducer: {
        user: userReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;