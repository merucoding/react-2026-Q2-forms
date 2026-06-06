import { configureStore } from '@reduxjs/toolkit';
import submissionList from './form/formSlice';

export const store = configureStore({
  reducer: { submissionList },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
