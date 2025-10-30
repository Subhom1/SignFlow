import { render, screen, waitFor } from '@testing-library/react';
import ProgressIndicator from './index';

describe('ProgressIndicator', () => {
  test('renders ProgressIndicator with correct progress', async () => {
    render(<ProgressIndicator progress={50} />);

    const progressBar = screen.getByTestId('progress-bar');

    // Wait for the animation to complete
    await waitFor(() => {
      expect(progressBar).toHaveStyle('width: 50%');
    });

    const signingTitle = screen.getByTestId('signing-title');
    expect(signingTitle).toHaveTextContent('Signing your document...');

    const loadingSpinner = screen.getByTestId('loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();
  });
});
