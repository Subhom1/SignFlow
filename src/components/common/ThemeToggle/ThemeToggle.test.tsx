import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from './index';

describe('ThemeToggle Component', () => {
  test('renders ThemeToggle button', () => {
    render(<ThemeToggle />);
    const buttonElement = screen.getByRole('button', { name: /toggle theme/i });
    expect(buttonElement).toBeInTheDocument();
  });
  test('toggles theme on click', async () => {
    render(<ThemeToggle />);
    const buttonElement = screen.getByRole('button', { name: /toggle theme/i });
    expect(buttonElement).toBeInTheDocument();
    // Initial theme should be light
    expect(buttonElement).toHaveAttribute('aria-pressed', 'false');
    // Click to toggle to dark theme
    await fireEvent.click(buttonElement);
    expect(buttonElement).toHaveAttribute('aria-pressed', 'true');
    // Click to toggle back to light theme
    await fireEvent.click(buttonElement);
    expect(buttonElement).toHaveAttribute('aria-pressed', 'false');
  });
});
