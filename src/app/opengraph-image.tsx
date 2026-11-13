import { ImageResponse } from 'next/og';
import { brand } from '@/brand.config';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, background: '#3A072A', color: '#F5E3E0' }}>
        <div style={{ fontSize: 128, letterSpacing: 4 }}>{brand.name}</div>
        <div style={{ fontSize: 40, marginTop: 24, color: '#D282A6' }}>{brand.tagline}</div>
      </div>
    ),
    size
  );
}
