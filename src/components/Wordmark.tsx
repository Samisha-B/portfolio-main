'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reduced } from './Reveal';

// Oversized stacked wordmark: first word in light uppercase sans, second in lavender italic serif.
export default function Wordmark({ top, bottom }: { top: string; bottom: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el || reduced()) return;
    const ls = el.querySelectorAll('[data-l]');
    let tw: gsap.core.Tween | undefined;
    gsap.set(ls, { yPercent: 105 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        tw = gsap.to(ls, { yPercent: 0, duration: 1.7, ease: 'power4.out', stagger: 0.07 });
      },
    });
    return () => {
      st.kill();
      tw?.kill();
      gsap.set(ls, { clearProps: 'transform' });
    };
  }, []);

  const row = (text: string, cls: string) => (
    <div aria-hidden className={`overflow-hidden py-[0.05em] ${cls}`}>
      {text.split('').map((c, i) => (
        <span key={i} data-l className='inline-block whitespace-pre'>{c}</span>
      ))}
    </div>
  );

  return (
    <div ref={ref} role='img' aria-label={`${top} ${bottom}`.trim()} className='select-none'>
      {row(top.toUpperCase(), 'font-display text-[27vw] font-light leading-[0.8] tracking-tightest text-blush')}
      {bottom && row(bottom, '-mt-[2vw] text-right font-serif text-[29vw] italic leading-[0.8] text-blossom')}
    </div>
  );
}
