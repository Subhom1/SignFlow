import { render, screen } from '@testing-library/react';
import Button from './index';

describe('Button', () => {
  test('renders correctly', () => {
    render(<Button text="button" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
  test('displays the correct text', () => {
    const buttonText = 'Click Me';
    render(<Button text={buttonText} />);
    const button = screen.getByRole('button', { name: buttonText });
    expect(button).toHaveTextContent(buttonText);
  });
});
