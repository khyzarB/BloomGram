/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#fffbf5',
        primary: '#2d1b0e',
        muted: '#8b6b52',
        rose: '#e8637a',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
