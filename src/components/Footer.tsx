import { brand } from '@/brand.config';
import { Fade } from './Reveal';
import Wordmark from './Wordmark';

export default function Footer() {
  const nav = [['Home', '#top'], ['Services', '#services'], ['Work', '#work'], ['About', '#about'], ['Contact', '#contact']];
  const services = ['Branding & creative direction', 'Website design & development', 'AI & business automation'];
  const hello = brand.email ? `mailto:${brand.email}` : '#contact';
  const words = brand.name.split(' ');
  const top = words[0];
  const bottom = words.slice(1).join(' ').toLowerCase().replace(/^./, (c) => c.toUpperCase());
  return (
    <footer data-theme='dark' className='overflow-hidden bg-aubergine px-6 pt-28 text-blush md:px-16 md:pt-40'>
      <Fade>
        <p className='eyebrow'>Let&apos;s talk</p>
        <a href={hello} className='link-u mt-6 inline-block font-display text-[12vw] font-light leading-[1] tracking-tightest md:text-[7vw]'>
          {brand.email || 'Start a project'} <span aria-hidden className='font-serif italic'>↗</span>
        </a>
      </Fade>

      <div className='mt-24 grid gap-10 border-t border-blush/15 pt-10 text-sm md:grid-cols-4'>
        <ul className='space-y-2'>{nav.map(([l, h]) => <li key={h}><a href={h} className='transition-colors duration-500 hover:text-blossom'>{l}</a></li>)}</ul>
        <ul className='space-y-2 text-blush/65'>{services.map((s) => <li key={s}>{s}</li>)}</ul>
        <p className='max-w-xs text-blush/65'>{brand.positioning}</p>
        <ul className='space-y-2'>
          {brand.instagram && <li><a href={brand.instagram} target='_blank' rel='noopener noreferrer' className='transition-colors duration-500 hover:text-blossom'>Instagram</a></li>}
          {brand.linkedin && <li><a href={brand.linkedin} target='_blank' rel='noopener noreferrer' className='transition-colors duration-500 hover:text-blossom'>LinkedIn</a></li>}
          <li><a href='#top' className='transition-colors duration-500 hover:text-blossom'>Back to top ↑</a></li>
        </ul>
      </div>

      <p className='mt-20 text-xs text-blush/45'>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
      <div className='-mb-[3vw] mt-6'>
        <Wordmark top={top} bottom={bottom} />
      </div>
    </footer>
  );
}
