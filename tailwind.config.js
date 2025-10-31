/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ca7f47',
        primaryAccent: '#feedd9',
        primaryDark: '#1f2937',
        primaryDarkAccent: '#a9c4e6',
        btnLight: '#cc844d',
        btnDark: '#3a4e6a',
      },
    },
  },
  plugins: [],
};
