import { render, screen } from '@testing-library/react';
import MainContent from './index';
import { RecoilRoot } from 'recoil';

describe('MainContent Component', () => {
  test('render the main upload page icon, title, subtitle', async () => {
    render(
      <RecoilRoot>
        <MainContent />
      </RecoilRoot>
    );

    const iconElement = await screen.findByTestId('upload-icon');
    const titleElement = await screen.findByTestId('upload-title');
    const subtitleElement = await screen.findByTestId('upload-subtitle');

    expect(iconElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
  });

  test('render TextField, FileUpload and Button components', async () => {
    render(
      <RecoilRoot>
        <MainContent />
      </RecoilRoot>
    );

    const textFieldElement = await screen.findByTestId('name-input');
    const fileUploadElement = await screen.findByTestId('file-input');
    const buttonElement = await screen.findByTestId('sign-btn');

    expect(textFieldElement).toBeInTheDocument();
    expect(fileUploadElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });
});
