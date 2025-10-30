import { useState, useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userNameState, pdfFileState } from '@/recoil/atoms';
import { signPdf } from '../services.ts';

interface UseSignPdfReturn {
  isLoading: boolean;
  error: string | null;
  signedPdfUrl: string | null;
  progress: number;
  handleSign: () => Promise<void>;
  reset: () => void;
}

export const useSignPdf = (): UseSignPdfReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signedPdfUrl, setSignedPdfUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const name = useRecoilValue(userNameState);
  const pdfFile = useRecoilValue(pdfFileState);

  // Add reset functions for Recoil state
  const resetName = useResetRecoilState(userNameState);
  const resetPdfFile = useResetRecoilState(pdfFileState);

  // Simulate progress while loading
  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return prev;
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleSign = async () => {
    if (!pdfFile || !name.trim()) {
      setError('Please provide both a PDF file and your name');
      return;
    }

    setIsLoading(true);
    setError(null);
    setProgress(0);

    try {
      const response = await signPdf(pdfFile, name.trim());

      // Complete the progress
      setProgress(100);

      // Build full URL for the signed PDF
      const baseUrl = import.meta.env.VITE_API_URL;

      // Small delay to show 100% completion
      setTimeout(() => {
        setSignedPdfUrl(`${baseUrl}${response.url}`);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to sign PDF. Please try again.';
      setError(errorMessage);
      console.error('PDF signing error:', err);
      setIsLoading(false);
      setProgress(0);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setError(null);
    setSignedPdfUrl(null);
    setProgress(0);
    resetName();
    resetPdfFile();
  };

  return {
    isLoading,
    error,
    signedPdfUrl,
    progress,
    handleSign,
    reset,
  };
};
