import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { brand } from '@/brand.config';
import SmoothScroll from '@/components/SmoothScroll';
import Loader from '@/components/Loader';

const display = Inter_Tight({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['italic', 'normal'], variable: '--font-serif' });

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: { default: `${brand.name} | ${brand.tagline}`, template: `%s | ${brand.name}` },
  description: brand.description,
  openGraph: { title: `${brand.name} | ${brand.tagline}`, description: brand.description, type: 'website', siteName: brand.name },
  twitter: { card: 'summary_large_image', title: brand.name, description: brand.description },
};

export const viewport: Viewport = { themeColor: '#2A1233' };

const boot = `try{var d=document.documentElement;if(sessionStorage.getItem('sf-loaded')){d.classList.add('seen','is-ready')}else{d.classList.add('is-loading')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning className={`${display.variable} ${body.variable} ${serif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <noscript><style>{`[data-loader]{display:none}`}</style></noscript>
      </head>
      <body>
        <Loader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
