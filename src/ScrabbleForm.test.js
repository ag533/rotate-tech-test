import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScrabbleForm from './ScrabbleForm';

test('renders ScrabbleForm and submits a valid word', async () => {
    const addScore = jest.fn();
    const fetchMock = jest.spyOn(window, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ score: 14 }),
      })
    );
  
    render(<ScrabbleForm addScore={addScore} />);
  
    const input = screen.getByPlaceholderText('Enter a word');
    const button = screen.getByText('Calculate');
  
    await act(async () => {
      fireEvent.change(input, { target: { value: 'cabbage' } });
      fireEvent.click(button);
    });
  
    await waitFor(() => {
      expect(addScore).toHaveBeenCalledWith({ word: 'cabbage', score: 14 });
    });
  
    fetchMock.mockRestore();
  });

test('shows error for empty input', () => {
  render(<ScrabbleForm addScore={() => {}} />);

  const button = screen.getByText('Calculate');
  fireEvent.click(button);

  expect(screen.getByText('Input cannot be empty')).toBeInTheDocument();
});

test('shows error for non-alphabetic input', () => {
  render(<ScrabbleForm addScore={() => {}} />);

  const input = screen.getByPlaceholderText('Enter a word');
  const button = screen.getByText('Calculate');

  fireEvent.change(input, { target: { value: 'cabbage123' } });
  fireEvent.click(button);

  expect(screen.getByText('Input must contain only alphabetic characters')).toBeInTheDocument();
});