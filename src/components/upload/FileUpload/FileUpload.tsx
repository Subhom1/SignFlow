export const FileUpload = () => {
  return (
    <label htmlFor="file-input" className="cursor-pointer">
      <input
        id="file-input"
        accept="application/pdf"
        className="hidden"
        data-testid="file-input"
        type="file"
      />
      <div
        className="flex items-center justify-center gap-2 px-6 py-4 
        bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl
         text-slate-600 text-sm font-medium 
         hover:bg-slate-200 
         hover:border-slate-400 
         transition"
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
          className="text-slate-600"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
        <span>Choose File</span>
      </div>
    </label>
  );
};
