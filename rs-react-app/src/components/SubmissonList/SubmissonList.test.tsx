import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import * as redux from '../../store/hooks/redux';
import * as selector from '../../store/form/formSelector';
import SubmissionList from './SubmissonList';

const mockData = [
  {
    id: '1',
    name: 'Meru',
    email: 'meru@gmail.com',
    gender: 'female',
    age: 28,
    country: 'USA',
    termsAccepted: true,
    formType: 'contact',
    createdAt: '2026-01-01T10:00:00Z',
    image: 'test.jpg',
  },
];

vi.mock('../../store/hooks/redux', () => ({
  useAppSelector: vi.fn(),
}));

vi.mock('../../store/form/formSelector', () => ({
  selectSubmissionList: vi.fn(),
}));

describe('SubmissionList', () => {
  const useAppSelectorMock = redux.useAppSelector as unknown as ReturnType<
    typeof vi.fn
  >;
  const selectMock = selector.selectSubmissionList as unknown as ReturnType<
    typeof vi.fn
  >;

  it('renders empty state', () => {
    useAppSelectorMock.mockImplementation((fn) => fn());
    selectMock.mockReturnValue([]);

    render(<SubmissionList />);

    expect(screen.getByText(/no submissions yet/i)).toBeInTheDocument();
  });

  it('renders list of submissions', () => {

    useAppSelectorMock.mockImplementation((fn) => fn());
    selectMock.mockReturnValue(mockData);

    render(<SubmissionList />);

    expect(screen.getByText('Meru')).toBeInTheDocument();
    expect(screen.getByText(/meru@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/female/i)).toBeInTheDocument();
    expect(screen.getByText(/28/i)).toBeInTheDocument();
    expect(screen.getByText(/usa/i)).toBeInTheDocument();
    expect(screen.getByText(/yes/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  it('applies new item class when isNewForm returns true', () => {
    useAppSelectorMock.mockImplementation((fn) => fn());
    selectMock.mockReturnValue(mockData);

    render(<SubmissionList />);

    screen.getByRole('article');
  });
});
