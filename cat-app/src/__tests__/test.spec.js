import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// test('renders correct title', () => {
//   render(<App />);
//   const titleElement = screen.getByText(/cat pictures/i);
//   expect(titleElement).toBeInTheDocument();
// });

test('renders usable "See All" button', () => {
  render(<App />);
  const button = screen.getByText(/see all/i);
  const imageGrid = document.querySelector('#image-grid');

  console.log(imageGrid.hasChildNodes());
  expect(button).toBeInTheDocument();
  userEvent.click(button);
  console.log(imageGrid.hasChildNodes());

//   console.log(imageGrid.innerHTML === null);
});