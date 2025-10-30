import { render, screen } from '@testing-library/react';
import Header from './index';

describe('Header Component', () => {
  test('renders Header with title', () => {
    render(<Header title="Test Title" />);
    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toBeInTheDocument();
  });
  test('renders App Logo', () => {
    render(<Header title="Test Title" />);
    const logoElement = screen.getByTestId('app-logo');
    expect(logoElement).toBeInTheDocument();
  });
  test('renders ThemeToggle component', () => {
    render(<Header title="Test Title" />);
    const themeToggleElement = screen.getByRole('button', { name: /toggle theme/i });
    expect(themeToggleElement).toBeInTheDocument();
  });
});
