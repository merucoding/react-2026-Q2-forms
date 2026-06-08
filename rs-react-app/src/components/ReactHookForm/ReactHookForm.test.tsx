import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../../store/form/formSlice';
import ReactHookForm from './ReactHookForm';
import { describe, expect, it, vi } from 'vitest';
import * as redux from '../../store/hooks/redux';

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
        <ReactHookForm onSuccess={() => {}} />
      </Provider>
    ),
  };
};

describe('ReactHookForm', () => {
  it('renders all form fields', () => {
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

  it('shows validation error when name is invalid', async () => {
    const user = userEvent.setup();

    renderWithStore();

    const nameInput = screen.getByLabelText('Name:');

    await user.type(nameInput, 'a');

    expect(
      screen.getByText('First letter must be uppercase.')
    ).toBeInTheDocument();
  });

  it('submits form successfully', async () => {
    const user = userEvent.setup();

    const dispatchMock = vi.fn();
    vi.spyOn(redux, 'useAppDispatch').mockReturnValue(dispatchMock);

    renderWithStore();

    await user.type(screen.getByLabelText(/name/i), 'Meru');
    await user.type(screen.getByLabelText(/e-mail/i), 'meru@gmail.com');

    await user.selectOptions(screen.getByLabelText(/gender/i), 'female');
    await user.type(screen.getByLabelText(/age/i), '28');

    await user.click(screen.getByLabelText(/accept terms/i));

    const file = new File(['img'], 'avatar.png', { type: 'image/png' });
    await user.upload(screen.getByLabelText(/add your avatar/i), file);

    const countryInput = screen.getByLabelText(/select country/i);

    await user.type(countryInput, 'USA');

    await user.type(screen.getByLabelText(/^password:/i), 'Test123!');
    await user.type(screen.getByLabelText(/^confirm password:/i), 'Test123!');

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
