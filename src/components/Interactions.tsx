'use client';
import { useRef, ReactNode } from 'react';
import gsap from 'gsap';

export function Btn({ href, tone = 'dark', children, className = '' }: { href: string; tone?: 'dark' | 'light'; children: ReactNode; className?: string }) {
  return (
    <a href={href} className={`btn btn-${tone} ${className}`}>
      {children}
      <span aria-hidden className='arr'>→</span>
    </a>
  );
}

export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * strength, y: (e.clientY - r.top - r.height / 2) * strength, duration: 0.5, ease: 'power3.out' });
  };
  const leave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: 'power3.out' });
  return (
    <span ref={ref} onMouseMove={move} onMouseLeave={leave} className='inline-block'>
      {children}
    </span>
  );
}

export function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, { rotateY: px * 10, rotateX: -py * 10, transformPerspective: 900, duration: 0.5, ease: 'power2.out' });
  };
  const leave = () => gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'power3.out' });
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={className}>
      {children}
    </div>
  );
}
