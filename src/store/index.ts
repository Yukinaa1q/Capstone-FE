import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authenSlice";
import phaseReducer from "./phaseSlice";

const store = configureStore({
  reducer: {
    auths: authReducer,
    phases: phaseReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type
export type AppDispatch = typeof store.dispatch;
