'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reduced } from './Reveal';

// Each card sits at a fixed x/y and a starting depth (z). Scrolling pushes every card
// toward the camera: they grow, sharpen, then sweep past the viewer.
// To use real photos, add `src: '/images/your-photo.jpg'` (files go in /public/images).
type Card = { x: number; y: number; w: number; z: number; ry: number; ratio: string; label: string; tone: string; src?: string };

const cards: Card[] = [
  { x: -26, y: -14, w: 18, z: -3000, ry: 14, ratio: '3/4', label: 'Bloom Studio', tone: 'bg-blossom text-plum' },
  { x: 30, y: 12, w: 20, z: -2600, ry: -14, ratio: '4/5', label: 'Fresh Nest', tone: 'bg-peony text-plum' },
  { x: -34, y: 18, w: 19, z: -2200, ry: 14, ratio: '4/3', label: 'Haven Estates', tone: 'bg-charcoal text-blush' },
  { x: 26, y: -20, w: 17, z: -1800, ry: -14, ratio: '3/4', label: 'Maison Atelier', tone: 'bg-mist text-plum' },
  { x: -28, y: -6, w: 20, z: -1400, ry: 14, ratio: '4/5', label: 'Her Name Here', tone: 'bg-plum text-blossom' },
  { x: 34, y: 6, w: 18, z: -1000, ry: -14, ratio: '4/3', label: 'Launchpad', tone: 'bg-blossom text-plum' },
  { x: -36, y: 14, w: 17, z: -600, ry: 14, ratio: '3/4', label: 'Concept 07', tone: 'bg-peony text-plum' },
  { x: 30, y: -16, w: 19, z: -200, ry: -14, ratio: '4/5', label: 'Concept 08', tone: 'bg-mist text-plum' },
];

const TRAVEL = 3800;

export default function DepthGallery() {
  const sec = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = sec.current;
    if (!el) return;
    const els = gsap.utils.toArray<HTMLElement>('[data-card]', el);
    const head = el.querySelector<HTMLElement>('[data-head]');
    const end = el.querySelector<HTMLElement>('[data-end]');
    const mob = window.innerWidth < 768;
    els.forEach((c, i) => {
      c.style.width = `${cards[i].w * (mob ? 1.9 : 1)}vw`;
    });
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const lin = (v: number, a: number, b: number) => clamp((v - a) / (b - a));

    const render = (p: number) => {
      els.forEach((c, i) => {
        const k = cards[i];
        const z = k.z + p * TRAVEL;
        const op = lin(z, -2600, -1800) * (1 - lin(z, 250, 650));
        const blur = Math.min(7, Math.max(0, (-z - 250) / 260)) + (z > 0 ? lin(z, 0, 650) * 6 : 0);
        c.style.transform = `translate(-50%, -50%) translate3d(${k.x}vw, ${k.y}vh, ${z}px) rotateY(${k.ry}deg)`;
        c.style.opacity = String(op);
        c.style.filter = blur > 0.4 ? `blur(${blur.toFixed(1)}px)` : 'none';
        c.style.visibility = op <= 0.01 ? 'hidden' : 'visible';
      });
      if (head) head.style.opacity = String(clamp(1 - p * 3.5));
      if (end) end.style.opacity = String(clamp((p - 0.8) * 5));
    };

    render(0);
    if (reduced()) {
      render(0.45);
      if (head) head.style.opacity = '1';
      return;
    }
    const st = ScrollTrigger.create({ trigger: el, start: 'top top', end: '+=260%', pin: true, scrub: true, onUpdate: (s) => render(s.progress) });
    return () => st.kill();
  }, []);

  return (
    <section ref={sec} data-theme='dark' aria-label='A look inside our work' className='relative h-screen overflow-hidden bg-aubergine text-blush'>
      <div aria-hidden className='absolute inset-0' style={{ perspective: '1000px' }}>
        {cards.map((k) => (
          <div key={k.label} data-card className={`absolute left-1/2 top-1/2 overflow-hidden will-change-transform ${k.tone}`} style={{ aspectRatio: k.ratio }}>
            {k.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={k.src} alt='' loading='lazy' className='h-full w-full object-cover' />
            ) : (
              <div className='flex h-full w-full flex-col justify-between p-3 md:p-5'>
                <span className='text-[9px] uppercase tracking-[0.22em] opacity-70 md:text-[10px]'>Concept</span>
                <span className='font-serif text-xl italic leading-none md:text-3xl'>{k.label}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div data-head className='pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center'>
        <p className='eyebrow'>Selected work</p>
        <h2 className='mt-6 max-w-[12ch] font-display text-[13vw] font-light leading-[0.95] tracking-tightest md:text-[7vw]'>
          Step <span className='font-serif font-normal italic tracking-normal'>inside</span> the work.
        </h2>
        <p className='mt-8 text-[11px] uppercase tracking-[0.25em] text-blush/60'>Keep scrolling</p>
      </div>

      <div data-end className='pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0'>
        <p className='font-serif text-[12vw] italic leading-none text-blossom md:text-[7vw]'>Welcome in.</p>
      </div>
    </section>
  );
}
