import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const selectSubmissionListState = (state: RootState) =>
  state.submissionList;

export const selectSubmissionList = createSelector(
  selectSubmissionListState,
  ({ submissionList }) => submissionList
);
