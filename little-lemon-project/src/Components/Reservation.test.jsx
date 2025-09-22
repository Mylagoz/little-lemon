import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';
import Reservation from './Reservation.jsx';

function setup(initialForm = {}) {
  // Default empty form for testing
  const form = {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    time: '',
    specialOccasion: '',
    comments: '',
    seatPreference: '',
    ...initialForm
  };
  
  // Mock functions
  const handleChange = vi.fn();
  const handleSubmit = vi.fn();
  
  const utils = render(
    <BrowserRouter>
      <Reservation
        className="Reservation"
        onChange={handleChange}
        form={form}
        availableTimes={["17:00","18:00"]}
        onSubmit={handleSubmit}
      />
    </BrowserRouter>
  );
  
  return {
    ...utils,
    handleChange,
    handleSubmit,
    form
  };
}

test('shows error summary when submitting empty form', async () => {
  const { handleSubmit: _handleSubmit } = setup();
  
  // Get the submit button
  const submit = screen.getByRole('button', { name: /continue/i });
  
  // Click submit
  fireEvent.click(submit);
  
  // Wait for validation to complete
  await waitFor(() => {
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent(/please fix/i);
  });
});

test('accepts valid name input and removes error on blur', async () => {
  setup();
  
  // Get the name input
  const name = screen.getByLabelText(/^name\*$/i);
  
  // Trigger blur to show validation error
  fireEvent.blur(name);
  
  // Wait for validation error to appear
  await waitFor(() => {
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  });
  
  // Enter valid input
  fireEvent.change(name, { target: { value: 'Al' } });
  fireEvent.blur(name);
  
  // Wait for validation error to disappear
  await waitFor(() => {
    expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
  });
});

test('validates email format', async () => {
  setup();
  
  const email = screen.getByLabelText(/email\*/i);
  
  // Enter invalid email
  fireEvent.change(email, { target: { value: 'invalid-email' } });
  fireEvent.blur(email);
  
  // Wait for validation error
  await waitFor(() => {
    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
  });
  
  // Enter valid email
  fireEvent.change(email, { target: { value: 'valid@example.com' } });
  fireEvent.blur(email);
  
  // Wait for error to disappear
  await waitFor(() => {
    expect(screen.queryByText(/invalid email format/i)).not.toBeInTheDocument();
  });
});

test('validates date is not in the past', async () => {
  setup();
  
  const date = screen.getByLabelText(/choose date\*/i);
  const pastDate = '2020-01-01';
  
  // Enter past date
  fireEvent.change(date, { target: { value: pastDate } });
  fireEvent.blur(date);
  
  // Check for validation error
  await waitFor(() => {
    expect(screen.getByText(/date cannot be in the past/i)).toBeInTheDocument();
  });
});
