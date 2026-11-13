'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { brand } from '@/brand.config';
import { Magnetic } from './Interactions';

const links = [
  ['Home', '#top'],
  ['Services', '#services'],
  ['Work', '#work'],
  ['About', '#about'],
  ['Contact', '#contact'],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-plum/80 py-3 backdrop-blur-md' : 'py-6'} ${open ? 'text-plum' : 'text-blush'}`}
      >
        <nav aria-label='Main' className='flex items-center justify-between px-6 md:px-16'>
          <a href='#top' className='font-display text-xl tracking-wide'>{brand.name}</a>
          <ul className='hidden gap-10 md:flex'>
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} className='group relative text-sm uppercase tracking-widest'>
                  {label}
                  <span className='absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-peony transition-transform duration-500 group-hover:scale-x-100' />
                </a>
              </li>
            ))}
          </ul>
          <div className='flex items-center gap-4'>
            <div className='hidden md:block'>
              <Magnetic>
                <a href='#contact' className='rounded-full bg-peony px-6 py-3 text-xs font-medium uppercase tracking-widest text-plum'>
                  Start a project
                </a>
              </Magnetic>
            </div>
            <button
              className='text-xs uppercase tracking-widest md:hidden'
              aria-expanded={open}
              aria-controls='mobile-menu'
              onClick={() => setOpen(!open)}
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id='mobile-menu'
            initial={{ clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className='fixed inset-0 z-40 flex flex-col justify-center gap-3 bg-blush px-6 text-plum'
          >
            {links.map(([label, href], i) => (
              <motion.a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 + i * 0.07 }}
                className='font-display text-6xl uppercase'
              >
                {label}
              </motion.a>
            ))}
            <a href='#contact' onClick={() => setOpen(false)} className='mt-6 w-fit rounded-full bg-plum px-8 py-4 text-xs uppercase tracking-widest text-blush'>
              Start a project
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
