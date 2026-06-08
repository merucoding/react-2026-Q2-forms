import {
  selectSubmissionListState,
  selectSubmissionList,
} from './formSelector';
import type { RootState } from '../store';
import { describe, expect, it } from 'vitest';

describe('submission selectors', () => {
  const mockState = {
    submissionList: {
      submissionList: [{ id: '1' }, { id: '2' }],
    },
  } as unknown as RootState;

  it('should select submissionList state', () => {
    expect(selectSubmissionListState(mockState)).toEqual({
      submissionList: [{ id: '1' }, { id: '2' }],
    });
  });

  it('should select only submissionList array', () => {
    expect(selectSubmissionList(mockState)).toEqual([{ id: '1' }, { id: '2' }]);
  });
});
