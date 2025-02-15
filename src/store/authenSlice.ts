import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AuthState {
  role: "admin" | "student" | "parent" | "tutor" | "academic" | "support";
  userId: string;
  name: string;
}

// Define the initial state using that type
const initialState: AuthState = {
  role: "academic",
  userId: "",
  name: ""
}

export const authSlice = createSlice({
  name: 'authen',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthState>) {
      state.role = action.payload.role;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
    }
  },
})

export const { setUser } = authSlice.actions
export default authSlice.reducer