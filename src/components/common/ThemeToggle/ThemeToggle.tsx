import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // check sessionStorage
    const stored = sessionStorage.getItem('theme');
    if (stored) return stored as 'light' | 'dark';

    // otherwise use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    sessionStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      type="button"
      aria-pressed={theme === 'dark'}
      aria-label="Toggle theme"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
    >
      <div
        className={`${theme === 'dark' ? 'w-[103px]' : 'w-[85px]'} h-7 rounded-full transition-colors duration-200
                   bg-gray-300 dark:bg-gray-500 p-[3px] flex items-center`}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow transform transition-transform duration-200
                      ${theme === 'dark' ? 'translate-x-[75px]' : 'translate-x-0'}`}
        />
        <span
          className={`text-sm font-medium text-gray-800 dark:text-gray-200 select-none text-center ${theme === 'dark' ? 'mr-1' : 'ml-1'}`}
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </span>
      </div>
    </button>
  );
};

export default ThemeToggle;
