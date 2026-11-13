import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { plum: '#2A1233', aubergine: '#1E0B27', blush: '#F4EFE8', blossom: '#BFB2D3', peony: '#A98AA0', charcoal: '#2D2830', mist: '#E8E2EC' },
      fontFamily: { display: ['var(--font-display)', 'sans-serif'], body: ['var(--font-body)', 'sans-serif'], serif: ['var(--font-serif)', 'serif'] },
      letterSpacing: { tightest: '-0.045em' },
    },
  },
  plugins: [],
};
export default config;
