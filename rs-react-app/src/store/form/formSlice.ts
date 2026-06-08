import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserSubmission } from '../../types/form';

type InitialState = {
  submissionList: UserSubmission[];
};

const initialState: InitialState = {
  submissionList: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<UserSubmission>) => {
      state.submissionList.push(action.payload);
    },
    deleteSubmission: (state, action: PayloadAction<string>) => {
      state.submissionList = state.submissionList.filter(
        (form) => form.id !== action.payload
      );
    },
    clearSubmissionList: (state) => {
      state.submissionList = [];
    },
  },
});

const { actions, reducer } = formSlice;

export default reducer;

export const { addSubmission, deleteSubmission, clearSubmissionList } = actions;
