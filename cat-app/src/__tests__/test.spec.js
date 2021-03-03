import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders correct title', () => {
  render(<App />);
  const titleElement = screen.getByText(/cat pictures/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders "See All" button', () => {
  render(<App />);
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
});