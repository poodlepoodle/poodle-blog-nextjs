/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
    fontFamily: {
      prtd: ['Pretendard'],
      roboto: ['Roboto', 'ui-monospace', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
