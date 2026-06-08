import { describe, expect, it } from 'vitest';
import reducer, {
  addSubmission,
  deleteSubmission,
  clearSubmissionList,
} from './formSlice';
import type { UserSubmission } from '../../types/form';


describe('formSlice', () => {
  const initialState = {
    submissionList: [],
  };

  const mockSubmission: UserSubmission = {
    id: '1',
  } as UserSubmission;

  it('should return initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should handle addSubmission', () => {
    const state = reducer(initialState, addSubmission(mockSubmission));

    expect(state.submissionList).toHaveLength(1);
    expect(state.submissionList[0]).toEqual(mockSubmission);
  });

  it('should handle deleteSubmission', () => {
    const startState = {
      submissionList: [mockSubmission],
    };

    const state = reducer(startState, deleteSubmission('1'));

    expect(state.submissionList).toHaveLength(0);
  });

  it('should clear submission list', () => {
    const startState = {
      submissionList: [mockSubmission, mockSubmission],
    };

    const state = reducer(startState, clearSubmissionList());

    expect(state.submissionList).toEqual([]);
  });
});
