import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { brand } from '@/brand.config';
import SmoothScroll from '@/components/SmoothScroll';
import Loader from '@/components/Loader';
import Cursor from '@/components/Cursor';

const display = Fraunces({ subsets: ['latin'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: { default: `${brand.name} | ${brand.tagline}`, template: `%s | ${brand.name}` },
  description: brand.description,
  openGraph: { title: `${brand.name} | ${brand.tagline}`, description: brand.description, type: 'website', siteName: brand.name },
  twitter: { card: 'summary_large_image', title: brand.name, description: brand.description },
};

export const viewport: Viewport = { themeColor: '#3A072A' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${display.variable} ${body.variable}`}>
      <body>
        <Loader />
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
