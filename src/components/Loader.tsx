'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { brand } from '@/brand.config';

export default function Loader() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const i = setInterval(() => setN((v) => Math.min(100, v + 4)), 40);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (n >= 100) {
      const t = setTimeout(() => setDone(true), 250);
      return () => clearTimeout(t);
    }
  }, [n]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className='fixed inset-0 z-[100] flex flex-col items-center justify-center bg-plum text-blush'
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          role='status'
          aria-label='Loading'
        >
          <div className='font-display text-[11vw] uppercase leading-none'>{brand.name}</div>
          <div className='mt-8 h-px w-48 bg-blush/20'>
            <div className='h-px bg-peony' style={{ width: `${n}%` }} />
          </div>
          <div className='mt-4 text-xs tracking-[0.3em] text-peony'>{n}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
