import { createSlice } from '@reduxjs/toolkit';
import { COUNTRIES, type Country } from '../../constants/countries';

type InitialState = {
  countries: Country[];
};

const initialState: InitialState = {
  countries: COUNTRIES,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

const { reducer } = countriesSlice;

export default reducer;
