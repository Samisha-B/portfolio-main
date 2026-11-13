// Single source of truth for the temporary brand. Rename here later.
export const brand = {
  name: 'SANG FROID',
  tagline: 'Build. Brand. Automate.',
  positioning: 'A creative digital studio for brands that refuse to blend in.',
  description:
    'A creative digital studio for women-owned businesses, small businesses, startups and growing brands. Branding, websites and AI automation.',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? '',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
};
