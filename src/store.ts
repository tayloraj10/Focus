import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'; // Adjust the import path as necessary
import controlReducer from './slices/controlSlice'; // Adjust the import path as necessary
import focusReducer from './slices/focusSlice'; // Adjust the import path as necessary

const store = configureStore({
    reducer: {
        user: userReducer,
        controls: controlReducer,
        focus: focusReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;