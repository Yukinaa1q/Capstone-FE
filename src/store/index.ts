import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authenSlice';
import courseReducer from './coursesSlice';


const store = configureStore({
  reducer: {
    auths: authReducer,
    courses: courseReducer
  },  
})

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type
export type AppDispatch = typeof store.dispatch