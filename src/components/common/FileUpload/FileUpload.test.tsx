import { render, screen } from '@testing-library/react';
import FileUpload from './index';
import { RecoilRoot } from 'recoil';

describe('FileUpload', () => {
  test('renders correctly', () => {
    render(
      <RecoilRoot>
        <FileUpload />
      </RecoilRoot>
    );
    const input = screen.getByLabelText(/Choose File/i);
    expect(input).toBeInTheDocument();
  });
  test('accepts correct file types', () => {
    render(
      <RecoilRoot>
        <FileUpload />
      </RecoilRoot>
    );
    const input = screen.getByLabelText(/Choose File/i);
    expect(input).toHaveAttribute('accept', 'application/pdf');
  });
  test('has the choose file button', () => {
    render(
      <RecoilRoot>
        <FileUpload />
      </RecoilRoot>
    );
    const button = screen.getByTestId('choose-file-btn');
    expect(button).toBeInTheDocument();
  });
});
