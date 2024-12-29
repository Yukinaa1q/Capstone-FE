import { createSlice } from "@reduxjs/toolkit";

const initialState: {phase: number} = { phase: 1 };

const phaseSlice = createSlice({
  name: "phase",
  initialState,
  reducers: {
    togglePhase(state) {
      state.phase = state.phase === 1 ? 2 : 1;
    }
  }
})

export const { togglePhase } = phaseSlice.actions
export default phaseSlice.reducer