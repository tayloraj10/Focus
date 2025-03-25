import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the user state
interface UserState {
  user: User | null;
}

// Define the shape of the user object (customize fields as per your requirements)
interface User {
  uid: string | null;
  displayName: string | null;
  email: string | null;
}

// Define the initial state
const initialState: UserState = {
  user: null,
};

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set the user
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    // Action to clear the user
    clearUser: (state) => {
      state.user = null;
    },
  },
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Selector with type safety
export const selectUser = (state: { user: UserState }) => state.user.user;

// Export the reducer
export default userSlice.reducer;