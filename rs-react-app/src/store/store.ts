import { configureStore } from '@reduxjs/toolkit';
import submissionList from './form/formSlice';
import countries from './countries/countriesSlice';

export const store = configureStore({
  reducer: { submissionList, countries },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
