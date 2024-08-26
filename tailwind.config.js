/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkBrown: '#CD5C08',
        semiBrown: '#FFF5C9',
        lightBrown: '#FFF5D9',
        light: '#FFF5E9',
      },
    },
  },
  plugins: [require('daisyui')],
};
