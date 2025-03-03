import { Role } from '@/interfaces/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface AuthState {
  role: Role | null;
  userId: string;
  userCode: string;
  name: string;
}

// Define the initial state using that type
const initialState: AuthState = {
  role: null,
  userId: "",
  userCode: "",
  name: "",
}

export const authSlice = createSlice({
  name: 'authen',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthState>) {
      state.role = action.payload.role;
      state.userId = action.payload.userId;
      state.userCode = action.payload.userCode;
      state.name = action.payload.name;
    }
  },
})

export const { setUser } = authSlice.actions
export default authSlice.reducer