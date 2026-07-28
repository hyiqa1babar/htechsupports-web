/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'hts-navy':    '#1e266d',
        'hts-blue':    '#1e3a8a',
        'hts-cyan':    '#06b6d4',
        'hts-purple':  '#7c3aed',
        'hts-dark':    '#121824',
        'hts-offwhite':'#f4f6fb',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
      },
      boxShadow: {
        card:  '0 4px 24px rgba(30,38,109,.12)',
        hover: '0 8px 36px rgba(30,38,109,.24)',
      },
    },
  },
  plugins: [],
};
