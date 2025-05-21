import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    hasNewMessage: false,
  },
  reducers: {
    setHasNewMessage: (
      state,
      action: PayloadAction<{ hasNewMessage: boolean }>
    ) => {
      state.hasNewMessage = action.payload.hasNewMessage;
    },
  },
});

export default notificationSlice.reducer;
export const { setHasNewMessage } = notificationSlice.actions;
