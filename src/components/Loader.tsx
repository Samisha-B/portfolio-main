'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { brand } from '@/brand.config';

const MAX_MS = 3500;
const PACE_MS = 1200;
const ticks = (c: string) => `repeating-linear-gradient(90deg, ${c} 0 1px, transparent 1px 14px)`;

function Roll({ d }: { d: number }) {
  return (
    <span className='relative inline-block h-[0.84em] w-[0.62em] overflow-hidden align-top'>
      <span className='block transition-transform duration-300 ease-out' style={{ transform: `translateY(${-d * 0.84}em)` }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => (
          <span key={k} className='block h-[0.84em] text-center leading-[0.84]'>{k}</span>
        ))}
      </span>
    </span>
  );
}

export default function Loader() {
  const [n, setN] = useState(1);
  const [exit, setExit] = useState(false);
  const [gone, setGone] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains('seen')) {
      setGone(true);
      return;
    }
    root.classList.add('is-loading');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let fonts = !document.fonts;
    if (document.fonts) document.fonts.ready.then(() => { fonts = true; }).catch(() => { fonts = true; });
    let loaded = document.readyState === 'complete';
    const onLoad = () => { loaded = true; };
    window.addEventListener('load', onLoad);

    const t0 = performance.now();
    let last = t0;
    let shown = 0;
    let lastInt = 1;
    let raf = 0;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      try { sessionStorage.setItem('sf-loaded', '1'); } catch (e) {}
      setTimeout(() => {
        setExit(true);
        setTimeout(() => {
          root.classList.remove('is-loading');
          root.classList.add('is-ready');
          window.dispatchEvent(new Event('loader:done'));
        }, reduce ? 0 : 450);
      }, reduce ? 0 : 280);
    };

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const real = 15 + (fonts ? 30 : 0) + (document.readyState !== 'loading' ? 25 : 0) + (loaded ? 30 : 0);
      const target = now - t0 >= MAX_MS ? 100 : real;
      shown = reduce ? target : Math.min(target, shown + (dt * 100) / PACE_MS);
      const v = Math.max(1, Math.min(100, Math.floor(shown)));
      if (bar.current) bar.current.style.clipPath = `inset(0 ${100 - Math.min(100, shown)}% 0 0)`;
      if (v !== lastInt) {
        lastInt = v;
        setN(v);
      }
      if (shown >= 100) {
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  if (gone) return null;

  return (
    <motion.div
      data-loader
      role='status'
      aria-busy={!exit}
      className='fixed inset-0 z-[100] flex flex-col bg-aubergine px-6 py-7 text-blush md:px-16 md:py-10'
      style={{ backgroundImage: 'radial-gradient(60% 50% at 92% 100%, rgba(191,178,211,0.16), transparent 70%)' }}
      initial={false}
      animate={{ y: exit ? '-100%' : '0%' }}
      transition={{ duration: rm ? 0.01 : 1.2, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (exit) setGone(true);
      }}
    >
      <span className='sr-only'>Loading</span>
      <div aria-hidden className='absolute left-0 right-0 top-full h-[9vw] rounded-b-[50%] bg-aubergine' />
      <motion.div aria-hidden animate={{ opacity: exit ? 0 : 1, scale: exit ? 0.97 : 1 }} transition={{ duration: 0.6 }} className='flex flex-1 flex-col justify-between'>
        <div className='flex items-start justify-between gap-6 text-[11px] uppercase tracking-[0.32em]'>
          <span>{brand.name}</span>
          <span className='text-blush/50'>Loading</span>
        </div>
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className='mb-6 max-w-md font-serif text-3xl italic leading-tight text-blush/85 md:mb-8 md:text-5xl'
          >
            A different perspective on digital.
          </motion.p>
          <div className='flex items-start font-display font-light tabular-nums text-[30vw] md:text-[20vw]' style={{ lineHeight: 0.84 }}>
            <span className='inline-block h-[0.84em] overflow-hidden text-center leading-[0.84] transition-[width] duration-300' style={{ width: n >= 100 ? '0.4em' : '0em' }}>1</span>
            <Roll d={Math.floor(n / 10) % 10} />
            <Roll d={n % 10} />
            <span className='ml-[0.05em] mt-[0.04em] text-[0.16em] leading-none text-blossom'>%</span>
          </div>
          <div className='relative mt-8 h-4 w-full'>
            <div className='absolute inset-0' style={{ backgroundImage: ticks('rgba(244,239,232,0.22)') }} />
            <div ref={bar} className='absolute inset-0' style={{ backgroundImage: ticks('#BFB2D3'), clipPath: 'inset(0 100% 0 0)' }} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
