import { brand } from '@/brand.config';

export default function Footer() {
  const nav = [['Home', '#top'], ['Services', '#services'], ['Work', '#work'], ['About', '#about'], ['Contact', '#contact']];
  const services = ['Branding & creative direction', 'Website design & development', 'AI & business automation'];
  return (
    <footer className='bg-plum px-6 pb-10 pt-24 text-blush md:px-16'>
      <p className='font-display text-[12vw] uppercase leading-none'>{brand.name}</p>
      <p className='mt-4 max-w-md text-blush/70'>{brand.positioning}</p>
      <div className='mt-16 grid gap-10 border-t border-blush/20 pt-10 text-sm md:grid-cols-4'>
        <ul className='space-y-2'>{nav.map(([l, h]) => <li key={h}><a href={h} className='transition-colors hover:text-peony'>{l}</a></li>)}</ul>
        <ul className='space-y-2 text-blush/70'>{services.map((s) => <li key={s}>{s}</li>)}</ul>
        <ul className='space-y-2'>
          <li><a href='#work' className='transition-colors hover:text-peony'>Portfolio</a></li>
          {brand.email && <li><a href={`mailto:${brand.email}`} className='transition-colors hover:text-peony'>{brand.email}</a></li>}
        </ul>
        <ul className='space-y-2'>
          {brand.instagram && <li><a href={brand.instagram} target='_blank' rel='noopener noreferrer' className='transition-colors hover:text-peony'>Instagram</a></li>}
          {brand.linkedin && <li><a href={brand.linkedin} target='_blank' rel='noopener noreferrer' className='transition-colors hover:text-peony'>LinkedIn</a></li>}
        </ul>
      </div>
      <p className='mt-16 text-xs text-blush/50'>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
    </footer>
  );
}
