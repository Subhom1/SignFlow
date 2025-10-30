import { render, screen } from '@testing-library/react';
import FileUpload from './index';

describe('FileUpload', () => {
  test('renders correctly', () => {
    render(<FileUpload />);
    const input = screen.getByLabelText(/Choose File/i);
    expect(input).toBeInTheDocument();
  });
  test('accepts correct file types', () => {
    render(<FileUpload />);
    const input = screen.getByLabelText(/Choose File/i);
    expect(input).toHaveAttribute('accept', 'application/pdf');
  });
  test('has the choose file button', () => {
    render(<FileUpload />);
    const button = screen.getByTestId('choose-file-btn');
    expect(button).toBeInTheDocument();
  });
});
