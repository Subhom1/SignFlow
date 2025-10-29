import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders SignFlow text', () => {
  render(<App />);
  const textElement = screen.getByText(/SignFlow/i);
  expect(textElement).toBeInTheDocument();
});
