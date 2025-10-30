import ThemeToggle from '@/components/common/ThemeToggle';
export const Header = ({ title }: { title: string }) => {
  return (
    <header className="flex items-center justify-start rounded-xl bg-white dark:bg-gray-800 shadow-md px-5 py-4 ">
      <div className="flex flex-1" data-testid="app-logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="filter dark:invert h-8 w-auto text-black mr-2"
          aria-hidden="true"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M10 9H8" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
        </svg>
        <div className="font-semibold text-gray-900 dark:text-gray-100 text-xl">{title}</div>
      </div>
      <ThemeToggle />
    </header>
  );
};
