import FileUpload from '@/components/upload/FileUpload';
import Button from '@/components/common/Button';
import TextField from '@/components/common/TextField';
export const MainContent = () => {
  return (
    <main className="py-8 max-w-3xl w-full md:mx-auto">
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl px-8 py-12 shadow-lg text-center"
        data-testid="upload-page"
      >
        <div className="mb-8" data-testid="upload-icon">
          <div className="inline-flex items-center justify-center w-40 h-40 bg-[#feedd8]  dark:bg-[#a9c4e6] rounded-2xl mx-auto">
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
              className="text-[#ca7f47] dark:text-[#1f2937]"
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

        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <TextField />
          <FileUpload />
          <Button text="Sign the PDF" />
        </div>
      </div>
    </main>
  );
};
