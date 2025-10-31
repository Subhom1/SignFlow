import { useRecoilValue } from 'recoil';
import { pdfFileNameState } from '@/recoil/atoms';
import { useState } from 'react';

type Props = {
  onFileSelected?: (file: File) => void;
};

export const FileUpload = ({ onFileSelected }: Props) => {
  const fileName = useRecoilValue(pdfFileNameState);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (file && file.type === 'application/pdf') {
      onFileSelected?.(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="file-input"
        className="cursor-pointer"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          id="file-input"
          accept="application/pdf"
          className="hidden"
          data-testid="file-input"
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleFile(file);
            }
            // Reset to allow selecting the same file again
            e.currentTarget.value = '';
          }}
        />
        <div
          className={`flex items-center justify-center gap-2 px-6 py-4 
        bg-slate-100 border-2 border-dashed rounded-xl
         text-slate-600 text-sm font-medium 
         transition-all duration-200
         ${
           isDragging
             ? 'border-blue-400 bg-blue-50 scale-105'
             : 'border-slate-300 hover:bg-slate-200 hover:border-slate-400'
         }`}
          data-testid="choose-file-btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${isDragging ? 'text-blue-600' : 'text-slate-600'}`}
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
          </svg>
          <span>{isDragging ? 'Drop PDF here' : 'Choose File or Drag & Drop'}</span>
        </div>
      </label>

      {fileName && (
        <div
          className="px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-sm text-green-700 dark:text-green-300 flex items-center gap-2"
          data-testid="selected-file-name"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="truncate">{fileName}</span>
        </div>
      )}
    </div>
  );
};
