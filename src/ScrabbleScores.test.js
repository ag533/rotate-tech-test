import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScrabbleScores from './ScrabbleScores';

const scores = [
  { word: 'cabbage', score: 14 },
  { word: 'apple', score: 9 },
];

test('renders ScrabbleScores with pagination', () => {
  render(<ScrabbleScores scores={scores} />);

  expect(screen.getByText('cabbage')).toBeInTheDocument();
  expect(screen.getByText('14')).toBeInTheDocument();
  expect(screen.getByText('apple')).toBeInTheDocument();
  expect(screen.getByText('9')).toBeInTheDocument();
});
