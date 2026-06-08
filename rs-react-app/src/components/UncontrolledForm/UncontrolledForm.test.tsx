import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../../store/form/formSlice';
import UncontrolledForm from './UncontrolledForm';

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
        <UncontrolledForm onSuccess={() => {}}/>
      </Provider>
    ),
  };
};

describe('UncontrolledForm', () => {
  it('renders uncontrolled form', () => {
    renderWithStore();

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/add your avatar/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/select country/i)).toBeInTheDocument();
    screen.getByLabelText(/^password:/i);
    screen.getByLabelText(/^confirm password:/i);
  });

  it('shows age validation error after submit', async () => {
    const user = userEvent.setup();

    renderWithStore();

    const ageInput = screen.getByLabelText('Age:');

    await user.type(ageInput, '-1');

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText('Age cannot be negative.')).toBeInTheDocument();
  });
});
