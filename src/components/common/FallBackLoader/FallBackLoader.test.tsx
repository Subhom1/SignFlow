import { render, screen } from '@testing-library/react';
import FallBackLoader from './index';

describe('FallBackLoader', () => {
  test('renders correctly', () => {
    render(<FallBackLoader />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
  test('applies minHeight class when minHeight is true', () => {
    render(<FallBackLoader minHeight={true} />);
    expect(screen.getByTestId('fallback-loader')).toHaveClass('min-h-screen');
  });
  test('does not apply minHeight class when minHeight is false', () => {
    render(<FallBackLoader minHeight={false} />);
    expect(screen.getByTestId('fallback-loader')).not.toHaveClass('min-h-screen');
  });
});
