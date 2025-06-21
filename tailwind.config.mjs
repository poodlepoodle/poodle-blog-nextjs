const config = {
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

export default config;
