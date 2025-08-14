import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import App from './App.jsx';

test('renders Header component', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const header = screen.getByRole('banner');
  expect(within(header).getByRole('img', { name: /little lemon logo/i })).toBeInTheDocument();
});

test('navigates to the reservation page', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const reservationLink = screen.getAllByRole('link', { name: /reservation/i })[0];
  userEvent.click(reservationLink);


  const reservationHeading = await screen.findByText(/reserve a table/i);
  expect(reservationHeading).toBeInTheDocument();
});