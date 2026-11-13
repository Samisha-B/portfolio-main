'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { brand } from '@/brand.config';

const links = [
  ['Services', '#services'],
  ['Work', '#work'],
  ['About', '#about'],
  ['Contact', '#contact'],
];
const menu = [['Home', '#top'], ...links];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > last + 4 && y > 240) setHidden(true);
      else if (y < last - 4) setHidden(false);
      last = y;
      const stack = document.elementsFromPoint(window.innerWidth / 2, 40);
      for (const e of stack) {
        const t = e.closest('[data-theme]') as HTMLElement | null;
        if (t) {
          setTheme(t.dataset.theme === 'light' ? 'light' : 'dark');
          setActive(e.closest('section[id]')?.id ?? '');
          break;
        }
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', esc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', esc);
    };
  }, [open]);

  const dark = theme === 'dark' || open;
  const bg = scrolled && !open ? (theme === 'dark' ? 'bg-plum/90 py-4 backdrop-blur-sm' : 'bg-blush/90 py-4 backdrop-blur-sm') : 'py-7';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,padding,color] duration-700 ease-[cubic-bezier(.76,0,.24,1)] ${hidden && !open ? '-translate-y-full' : 'translate-y-0'} ${bg} ${dark ? 'text-blush' : 'text-plum'}`}
      >
        <nav aria-label='Main' className='flex items-center justify-between px-6 md:px-16'>
          <a href='#top' className='text-sm font-medium uppercase tracking-[0.32em]'>{brand.name}</a>
          <ul className='hidden gap-12 md:flex'>
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} className='group relative text-[11px] uppercase tracking-[0.25em]' aria-current={active === href.slice(1) ? 'true' : undefined}>
                  {label}
                  <span className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-current transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)] ${active === href.slice(1) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </a>
              </li>
            ))}
          </ul>
          <div className='flex items-center gap-4'>
            <a href='#contact' className={`btn !px-5 !py-3 ${dark ? 'btn-dark' : 'btn-light'} hidden md:inline-flex`}>
              Start a project <span aria-hidden className='arr'>→</span>
            </a>
            <button className='text-[11px] uppercase tracking-[0.25em] md:hidden' aria-expanded={open} aria-controls='mobile-menu' onClick={() => setOpen(!open)}>
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id='mobile-menu'
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className='fixed inset-0 z-40 flex flex-col justify-center bg-aubergine px-6 text-blush'
          >
            <ul>
              {menu.map(([label, href], i) => (
                <motion.li key={href} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.07, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className='border-b border-blush/10'>
                  <a href={href} onClick={() => setOpen(false)} className='flex items-baseline gap-4 py-4 font-display text-5xl font-light tracking-tightest'>
                    <span className='font-serif text-lg italic text-blossom'>0{i + 1}</span>
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href='#contact' onClick={() => setOpen(false)} className='btn btn-dark mt-10 w-fit'>Start a project <span aria-hidden className='arr'>→</span></a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
