import { lazy, Suspense } from 'react';
import FileUpload from '@/components/common/FileUpload';
import Button from '@/components/common/Button';
import TextField from '@/components/common/TextField';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userNameState, pdfFileState, isUploadReadyState } from '@/recoil/atoms';
import { useSignPdf } from '@/hooks/useSignPdf';
import FallBackLoader from '@/components/common/FallBackLoader';

// Lazy load heavy animation components
const MotionDiv = lazy(() => import('framer-motion').then((mod) => ({ default: mod.motion.div })));
const AnimatePresence = lazy(() =>
  import('framer-motion').then((mod) => ({ default: mod.AnimatePresence }))
);
const ProgressIndicator = lazy(() => import('@/components/common/ProgressIndicator'));

export const MainContent = () => {
  const [name, setName] = useRecoilState(userNameState);
  const [, setPdf] = useRecoilState(pdfFileState);
  const isReady = useRecoilValue(isUploadReadyState);

  const { isLoading, error, signedPdfUrl, progress, handleSign, reset } = useSignPdf();

  // If we have a signed PDF, show success
  if (signedPdfUrl) {
    return (
      <Suspense fallback={<div className="py-8 max-w-3xl w-full md:mx-auto">Loading...</div>}>
        <MotionDiv
          className="py-8 max-w-3xl w-full md:mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl px-8 py-12 shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-primary dark:text-primaryDarkAccent mb-4">
              Signed Document
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Your document has been signed successfully.
            </p>
            <div className="btn-container flex gap-4 justify-center">
              <Button
                text="View Signed PDF"
                variant="primary"
                href={signedPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
              />
              <Button text="Upload New" variant="secondary" onClick={reset} />
            </div>
          </div>
        </MotionDiv>
      </Suspense>
    );
  }

  return (
    <main className="py-8 max-w-3xl w-full md:mx-auto">
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl px-8 py-12 shadow-lg text-center"
        data-testid="upload-page"
      >
        <Suspense fallback={<div>Loading...</div>}>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <Suspense fallback={<FallBackLoader minHeight={false} />}>
                <MotionDiv
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProgressIndicator progress={progress} />
                </MotionDiv>
              </Suspense>
            ) : (
              <MotionDiv
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8" data-testid="upload-icon">
                  <div className="inline-flex items-center justify-center w-40 h-40 bg-primaryAccent dark:bg-primaryDarkAccent rounded-2xl mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="80"
                      height="80"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary dark:text-primaryDark"
                      aria-hidden="true"
                    >
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                      <path d="M10 9H8" />
                      <path d="M16 13H8" />
                      <path d="M16 17H8" />
                    </svg>
                  </div>
                </div>
                <h1
                  className="text-xl md:text-2xl lg:text-3xl font-semibold text-slate-900 dark:text-slate-100 mb-2"
                  data-testid="upload-title"
                >
                  Upload your document
                </h1>
                <p
                  className="text-sm md:text-base text-slate-500 dark:text-slate-400 mb-10"
                  data-testid="upload-subtitle"
                >
                  Drag and drop or choose a file to upload
                </p>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                  </div>
                )}

                <div className="flex flex-col gap-4 max-w-md mx-auto">
                  <TextField value={name} onChange={setName} />
                  <FileUpload onFileSelected={setPdf} />
                  <Button text="Upload and Sign the PDF" disabled={!isReady} onClick={handleSign} />
                </div>
              </MotionDiv>
            )}
          </AnimatePresence>
        </Suspense>
      </div>
    </main>
  );
};
