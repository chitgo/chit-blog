/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { smoky: '#171717', mainColor: '#F0EBE2' },
    },
  },
  plugins: [require('@tailwindcss/forms')],
  darkMode: 'class',
}
