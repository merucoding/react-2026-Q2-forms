import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const selectCountriesState = (state: RootState) => state.countries;

export const selectCountries = createSelector(
  selectCountriesState,
  ({ countries }) => countries
);
