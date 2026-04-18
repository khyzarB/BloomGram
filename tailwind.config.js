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
        sage: '#4a7c6f',
        warm: '#fdf3e3',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
