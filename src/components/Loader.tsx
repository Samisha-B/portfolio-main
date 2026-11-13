'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { brand } from '@/brand.config';

const MAX_MS = 3500;
const PACE_MS = 1200;

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
      }, reduce ? 0 : 220);
    };

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const real = 15 + (fonts ? 30 : 0) + (document.readyState !== 'loading' ? 25 : 0) + (loaded ? 30 : 0);
      const target = now - t0 >= MAX_MS ? 100 : real;
      shown = reduce ? target : Math.min(target, shown + (dt * 100) / PACE_MS);
      const v = Math.max(1, Math.min(100, Math.floor(shown)));
      if (bar.current) bar.current.style.transform = `scaleX(${shown / 100})`;
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
      initial={false}
      animate={{ y: exit ? '-100%' : '0%' }}
      transition={{ duration: rm ? 0.01 : 1.1, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (exit) setGone(true);
      }}
    >
      <span className='sr-only'>Loading</span>
      <motion.div aria-hidden animate={{ opacity: exit ? 0 : 1 }} transition={{ duration: 0.5 }} className='flex flex-1 flex-col justify-between'>
        <div className='flex items-start justify-between gap-6'>
          <span className='text-[11px] uppercase tracking-[0.3em]'>{brand.name}</span>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className='max-w-[14rem] text-right text-sm text-blush/70'
          >
            A different perspective on digital.
          </motion.span>
        </div>
        <div>
          <div className='font-display text-[34vw] font-light leading-[0.8] tracking-tightest tabular-nums md:text-[22vw]'>
            {String(n).padStart(2, '0')}
            <span className='ml-[0.04em] align-top text-[0.18em] text-blossom'>%</span>
          </div>
          <div className='mt-6 h-px w-full bg-blush/15'>
            <div ref={bar} className='h-px origin-left bg-blossom' style={{ transform: 'scaleX(0)' }} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
