import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Basic UI smoke test: Renders title and board squares
test('renders Tic Tac Toe board and reset', () => {
  render(<App />);
  expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
  expect(screen.getByRole('grid')).toBeInTheDocument();
  expect(screen.getByText(/Reset/i)).toBeVisible();
});

// Simulates a complete game with winner
test('players can play and win', () => {
  render(<App />);
  const squares = screen.getAllByRole('button', {name: /Cell/i});
  fireEvent.click(squares[0]); // X
  fireEvent.click(squares[3]); // O
  fireEvent.click(squares[1]); // X
  fireEvent.click(squares[4]); // O
  fireEvent.click(squares[2]); // X wins!
  expect(screen.getByText(/Player X wins/i)).toBeInTheDocument();
  // Winning squares should be visually highlighted
  expect(squares[0].className).toMatch(/ttt-win/);
});
