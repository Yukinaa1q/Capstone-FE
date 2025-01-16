import { createSlice } from "@reduxjs/toolkit";

const phaseSlice = createSlice({
  name: "phase",
  initialState: {
    phase: 2
  },
  reducers: {
    togglePhase: (state) => {
      state.phase = state.phase === 1 ? 2 : 1;
    }
  }
})

export default phaseSlice.reducer;
