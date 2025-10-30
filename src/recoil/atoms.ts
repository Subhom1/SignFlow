import { atom, selector } from 'recoil';

export const userNameState = atom<string>({
  key: 'userNameState',
  default: '',
});

export const pdfFileState = atom<File | null>({
  key: 'pdfFileState',
  default: null,
});

export const pdfFileNameState = selector<string>({
  key: 'pdfFileNameState',
  get: ({ get }) => get(pdfFileState)?.name ?? '',
});

export const isUploadReadyState = selector<boolean>({
  key: 'isUploadReadyState',
  get: ({ get }) => {
    const name = get(userNameState).trim();
    const file = get(pdfFileState);
    return name.length > 0 && !!file;
  },
});
