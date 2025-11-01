import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
test('renders SignFlow text', async () => {
  render(
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
  await screen.findByText(/SignFlow/i);
  const textElement = screen.getByText(/SignFlow/i);
  expect(textElement).toBeInTheDocument();
});
