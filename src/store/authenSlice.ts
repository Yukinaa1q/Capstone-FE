import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AuthState {
  role: "admin" | "student" | "parent" | "tutor" | "academic" | "support";
}

// Define the initial state using that type
const initialState: AuthState = {
  role: "tutor",
}

export const authSlice = createSlice({
  name: 'authen',
  initialState,
  reducers: {
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default authSlice.reducer