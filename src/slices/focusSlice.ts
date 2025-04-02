import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UUID } from 'crypto';


export interface Focus {
    id: string;
    type: string;
    duration: string;
    name: string;
    category: string;
    created_at: Date;
    created_by: UUID;
}

export interface FocusAction {
    id: string;
    focus: string;
    date: string;
    amount: number;
    created_by: string;
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