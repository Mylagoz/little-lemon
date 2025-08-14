import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import Reservation from './Reservation.jsx';

function setup(initialForm = {}) {
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
  const handleChange = (field, value) => { form[field] = value; };
  const handleSubmit = () => {};
  render(
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
  return { form };
}


test('shows error summary when submitting empty form', () => {
  setup();
  const submit = screen.getByRole('button', { name: /continue/i });
  fireEvent.click(submit);
  expect(screen.getByRole('alert')).toHaveTextContent(/please fix/i);
});

test('accepts valid name input and removes error on blur', () => {
  setup();
  const name = screen.getByPlaceholderText(/enter name/i);
  fireEvent.blur(name); 
  expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  fireEvent.change(name, { target: { value: 'Al' } });
  fireEvent.blur(name);
  expect(screen.queryByText(/name is required/i)).toBeNull();
});
