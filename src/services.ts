import axios from 'axios';
import type { SignPdfResponse } from '@types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const signPdf = async (file: File, name: string): Promise<SignPdfResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', name);

  const response = await axios.post<SignPdfResponse>(`${API_BASE_URL}/sign`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
