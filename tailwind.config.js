/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        googleSans: ['Google Sans', 'sans-serif'],
        googleSansMd: ['Google Sans Medium', 'sans-serif'],
        googleSansBold: ['Google Sans Bold', 'sans-serif'],
      },
      colors: {
        primary: '#1f1f1f',
        secondary: '#292a2d',
      },
    },
  },
  plugins: [],
};
