/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'hts-bright-teal': '#09AAAA',
        'hts-deep-teal': '#047777',
        'hts-dark-pine': '#055457',
        'hts-midnight': '#063138',
        'hts-pure-white': '#FFFFFF',
        'hts-midnight-navy': '#070E18',
        'hts-ocean-blue': '#0F587E',
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
