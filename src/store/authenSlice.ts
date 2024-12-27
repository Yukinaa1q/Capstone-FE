import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from './index'

// Define a type for the slice state
interface AuthState {
  role: "admin" | "student" | "parent" | "tutor" | "academic" | "support";
}

// Define the initial state using that type
const initialState: AuthState = {
  role: "student",
}

export const authSlice = createSlice({
  name: 'authen',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default authSlice.reducer