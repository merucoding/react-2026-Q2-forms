import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../../store/form/formSlice';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('../SubmissonList/SubmissonList', () => ({
  default: () => <div data-testid="submission-list" />,
}));

const renderWithStore = () => {
  const store = configureStore({
    reducer: {
      form: formReducer,
      countries: () => ({
        countries: ['USA', 'Germany'],
      }),
    },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <App />
      </Provider>
    ),
  };
};

describe('App', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  it('opens React Hook Form modal', async () => {
    const user = userEvent.setup();

    renderWithStore();

    await user.click(screen.getByText('Open React Hook Form'));

    expect(screen.getByText(/^react hook form/i)).toBeInTheDocument();
  });

  it('opens Uncontrolled Form modal', async () => {
    const user = userEvent.setup();

    renderWithStore();

    await user.click(screen.getByText('Open Uncontrolled Form'));

    expect(screen.getByText(/^uncontrolled/i)).toBeInTheDocument();
  });

  it('closes modal', async () => {
    const user = userEvent.setup();

    renderWithStore();

    await user.click(screen.getByText('Open React Hook Form'));

    const closeButton = screen.getByTestId('close-modal');
    await user.click(closeButton);

    expect(screen.queryByText(/^react hook form/i)).not.toBeInTheDocument();
  });
});
