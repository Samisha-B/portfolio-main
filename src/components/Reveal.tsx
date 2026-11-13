'use client';
import { useEffect, useMemo, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Runs cb once the intro loader has finished (immediately if it already has).
export function whenReady(cb: () => void) {
  const root = document.documentElement;
  if (root.classList.contains('is-ready')) {
    cb();
    return () => {};
  }
  window.addEventListener('loader:done', cb, { once: true });
  return () => window.removeEventListener('loader:done', cb);
}

// *word* markup renders that word in the italic serif accent.
function tokenize(text: string) {
  let it = false;
  return text.split(' ').map((raw) => {
    let w = raw;
    if (w.startsWith('*')) {
      it = true;
      w = w.slice(1);
    }
    const end = w.endsWith('*');
    if (end) w = w.slice(0, -1);
    const t = { w, it };
    if (end) it = false;
    return t;
  });
}

const accent = 'font-serif font-normal italic tracking-normal';

export function Words({
  text,
  className = '',
  as = 'div',
  delay = 0,
  onScroll = true,
}: {
  text: string;
  className?: string;
  as?: React.ElementType;
  delay?: number;
  onScroll?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as;
  const tokens = useMemo(() => tokenize(text), [text]);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el || reduced()) return;
    const ws = el.querySelectorAll('[data-w]');
    const tweens: gsap.core.Tween[] = [];
    let st: ScrollTrigger | undefined;
    let off = () => {};
    gsap.set(ws, { yPercent: 110 });
    const run = () => {
      tweens.push(gsap.to(ws, { yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: 0.05, delay }));
    };
    if (onScroll) st = ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: run });
    else off = whenReady(run);
    return () => {
      off();
      st?.kill();
      tweens.forEach((t) => t.kill());
      gsap.set(ws, { clearProps: 'transform' });
    };
  }, [delay, onScroll]);
  return (
    <Tag ref={ref} className={className} aria-label={text.replace(/\*/g, '')}>
      {tokens.map((t, i) => (
        <span key={i} aria-hidden className='-my-[0.1em] inline-block overflow-hidden py-[0.1em] pr-[0.25em] align-bottom'>
          <span data-w className={`inline-block ${t.it ? accent : ''}`}>{t.w}</span>
        </span>
      ))}
    </Tag>
  );
}

// Words brighten progressively as the paragraph scrolls through the viewport.
export function ScrubText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const tokens = useMemo(() => tokenize(text), [text]);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el || reduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-s]', { opacity: 0.16 }, {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 45%', scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <p ref={ref} className={className} aria-label={text.replace(/\*/g, '')}>
      {tokens.map((t, i) => (
        <span key={i} data-s aria-hidden className={`mr-[0.25em] inline-block ${t.it ? accent : ''}`}>{t.w}</span>
      ))}
    </p>
  );
}

export function Fade({ children, className = '', y = 28, delay = 0 }: { children: ReactNode; className?: string; y?: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el || reduced()) return;
    const ctx = gsap.context(() => {
      gsap.from(el, { opacity: 0, y, duration: 1.2, delay, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    }, el);
    return () => ctx.revert();
  }, [y, delay]);
  return <div ref={ref} className={className}>{children}</div>;
}

// Image / block reveal: soft clip opens while the content settles from a slight zoom.
export function ClipReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el || reduced()) return;
    const inner = el.querySelector('[data-inner]');
    const st = { trigger: el, start: 'top 86%', once: true };
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { clipPath: 'inset(7% 7% 7% 7%)', opacity: 0 }, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.6, ease: 'power3.inOut', scrollTrigger: st });
      gsap.fromTo(inner, { scale: 1.18 }, { scale: 1, duration: 2.2, ease: 'power3.out', scrollTrigger: st });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div data-inner className='h-full w-full'>{children}</div>
    </div>
  );
}

// Gentle scroll parallax, desktop only and skipped for reduced motion.
export function Parallax({ children, className = '', amount = 6 }: { children: ReactNode; className?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(el, { yPercent: amount }, { yPercent: -amount, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    return () => mm.revert();
  }, [amount]);
  return <div ref={ref} className={className}>{children}</div>;
}
