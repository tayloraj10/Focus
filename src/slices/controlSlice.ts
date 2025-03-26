import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// Define the initial state
const initialState = {
    types: [] as any[],
    durations: [] as any[],
};

// Create the slice
const userSlice = createSlice({
    name: 'controls',
    initialState,
    reducers: {
        // Action to set the user
        setTypes: (state, action: PayloadAction<any[]>) => {
            state.types = action.payload;
        },
        setDurations: (state, action: PayloadAction<any[]>) => {
            state.durations = action.payload;
        },
        clearControls: (state) => {
            state.types = [];
            state.durations = [];
        },
    },
});

// Export actions
export const { setTypes, setDurations, clearControls } = userSlice.actions;

// Selector with type safety
export const selectControls = (state: {}) => state;

// Export the reducer
export default userSlice.reducer;