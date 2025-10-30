import { render, screen } from '@testing-library/react';
import MainContent from './index';
import { RecoilRoot } from 'recoil';

describe('MainContent Component', () => {
  test('render the main upload page icon, title, subtitle', () => {
    render(
      <RecoilRoot>
        <MainContent />
      </RecoilRoot>
    );
    const iconElement = screen.getByTestId('upload-icon');
    const titleElement = screen.getByTestId('upload-title');
    const subtitleElement = screen.getByTestId('upload-subtitle');
    expect(iconElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
  });
  test('render TextField, FileUpload and Button components', () => {
    render(
      <RecoilRoot>
        <MainContent />
      </RecoilRoot>
    );
    const textFieldElement = screen.getByTestId('name-input');
    const fileUploadElement = screen.getByTestId('file-input');
    const buttonElement = screen.getByTestId('sign-btn');
    expect(textFieldElement).toBeInTheDocument();
    expect(fileUploadElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });
});
