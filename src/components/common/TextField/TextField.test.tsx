import { render, screen } from '@testing-library/react';
import TextField from './index';

describe('TextField', () => {
  test('renders correctly', () => {
    render(<TextField />);
    const input = screen.getByPlaceholderText('Enter your name');
    expect(input).toBeInTheDocument();
  });
});
