import { createSlice } from "@reduxjs/toolkit";

const phaseSlice = createSlice({
  name: "phase",
  initialState: {
    phase: 1
  },
  reducers: {
    togglePhase: (state) => {
      state.phase = state.phase === 1 ? 2 : 1;
    }
  }
})

export default phaseSlice.reducer;

