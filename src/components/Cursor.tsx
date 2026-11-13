'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '1';
    const x = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3' });
    const move = (e: MouseEvent) => {
      x(e.clientX);
      y(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement).closest('a,button,[data-cursor]');
      gsap.to(el, { scale: hit ? 3 : 1, duration: 0.3 });
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className='pointer-events-none fixed left-0 top-0 z-[90] -ml-2 -mt-2 h-4 w-4 rounded-full bg-peony opacity-0 mix-blend-difference'
    />
  );
}
