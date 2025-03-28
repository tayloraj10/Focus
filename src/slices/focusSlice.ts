import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UUID } from 'crypto';


export interface Focus {
    id: UUID;
    type: string;
    duration: string;
    name: string;
    category: string;
}

export interface FocusAction {
    id: UUID;
    focusID: UUID;
    createdAt: Date;
    amount: number;
}


// Define the initial state
const initialState = {
    focuses: [] as Focus[],
    focusActions: [] as FocusAction[],
};

// Create the slice
const focusSlice = createSlice({
    name: 'focus',
    initialState,
    reducers: {
        // Action to set the user
        setFocuses: (state, action: PayloadAction<any[]>) => {
            state.focuses = action.payload;
        },
        setFocusActions: (state, action: PayloadAction<any[]>) => {
            state.focusActions = action.payload;
        },
        clearData: (state) => {
            state.focuses = [];
            state.focusActions = [];
        },
    },
});

// Export actions
export const { setFocuses, setFocusActions, clearData } = focusSlice.actions;

// Selector with type safety
export const selectFocusData = (state: {}) => state;

// Export the reducer
export default focusSlice.reducer;