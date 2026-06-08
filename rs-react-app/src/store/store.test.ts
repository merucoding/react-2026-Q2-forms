import { describe, it, expect } from 'vitest';
import { store } from './store';

describe('redux store', () => {
  it('should be created', () => {
    expect(store).toBeDefined();
  });

  it('should have submissionList state', () => {
    const state = store.getState();

    expect(state.submissionList).toBeDefined();
  });

  it('should have countries state', () => {
    const state = store.getState();

    expect(state.countries).toBeDefined();
  });
});
