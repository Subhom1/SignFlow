/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0070AD',
        accent: '#17ABDA',
      },
    },
  },
  plugins: [],
};

