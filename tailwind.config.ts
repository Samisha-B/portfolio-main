import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { plum: '#3A072A', blush: '#F5E3E0', blossom: '#E8B4BC', peony: '#D282A6' },
      fontFamily: { display: ['var(--font-display)', 'serif'], body: ['var(--font-body)', 'sans-serif'] },
    },
  },
  plugins: [],
};
export default config;
