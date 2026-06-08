import reducer from './countriesSlice';
import { COUNTRIES } from '../../constants/countries';

import { describe, it, expect } from 'vitest';

describe('countriesSlice', () => {
  it('should return initial state', () => {
    const state = reducer(undefined, { type: '@@INIT' });

    expect(state.countries).toEqual(COUNTRIES);
  });
});
