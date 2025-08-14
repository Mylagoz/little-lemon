import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';
import RateUs from './RateUs.jsx';

function setup(onAddReview = vi.fn()) {
  render(
    <BrowserRouter>
      <RateUs onAddReview={onAddReview} />
    </BrowserRouter>
  );
  return { onAddReview };
}

test('prevents submit when invalid and enables when valid', () => {
  setup();
  const nameInput = screen.getByPlaceholderText(/enter your name/i);
  const reviewInput = screen.getByPlaceholderText(/share your experience/i);
  const submitBtn = screen.getByRole('button', { name: /submit/i });
  expect(submitBtn).toBeDisabled();
  fireEvent.change(nameInput, { target: { value: 'Al' } });
  fireEvent.change(reviewInput, { target: { value: 'Great place with tasty food!' } });

  expect(submitBtn).not.toBeDisabled();
});

test('calls onAddReview with new review object', () => {
  const { onAddReview } = setup();
  fireEvent.change(screen.getByPlaceholderText(/enter your name/i), { target: { value: 'Test User' } });
  fireEvent.change(screen.getByPlaceholderText(/share your experience/i), { target: { value: 'Wonderful dishes and ambiance.' } });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  expect(onAddReview).toHaveBeenCalledTimes(1);
  const arg = onAddReview.mock.calls[0][0];
  expect(arg).toMatchObject({ name: 'Test User', review: 'Wonderful dishes and ambiance.' });
  expect(arg.image).toMatch(/https:\/\/unavatar.io\/TestUser/);
});
