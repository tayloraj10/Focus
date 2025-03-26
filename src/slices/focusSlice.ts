import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UUID } from 'crypto';


interface Focus {
    id: UUID;
    type: string;
    duration: string;
    name: string;
    category: string;
}

interface FocusAction {
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
const userSlice = createSlice({
    name: 'focus',
    initialState,
    reducers: {
        // Action to set the user
        setFocuses: (state, action: PayloadAction<[]>) => {
            state.focuses = action.payload;
        },
        setFocusActions: (state, action: PayloadAction<[]>) => {
            state.focusActions = action.payload;
        },
        clearData: (state) => {
            state.focuses = [];
            state.focusActions = [];
        },
    },
});

// Export actions
export const { setFocuses, setFocusActions, clearData } = userSlice.actions;

// Selector with type safety
export const selectControls = (state: {}) => state;

// Export the reducer
export default userSlice.reducer;