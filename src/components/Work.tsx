'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Words, reduced } from './Reveal';

// IMPORTANT: every entry below is a CONCEPT, not a client project.
// Replace with real work (add `href`, `status: 'Client work'`) only when it exists.
const projects = [
  { name: 'Bloom Studio', industry: 'Beauty & wellness', services: 'Brand identity, website', desc: 'A calm, editorial site concept for a skincare and wellness studio.', tone: 'bg-plum text-blossom' },
  { name: 'Fresh Nest', industry: 'Home & cleaning services', services: 'Website, lead capture', desc: 'A booking-focused site concept for a home cleaning service.', tone: 'bg-blossom text-plum' },
  { name: 'Haven Estates', industry: 'Real estate', services: 'Website, AI enquiry assistant', desc: 'A listings-led concept with an automated enquiry assistant.', tone: 'bg-charcoal text-blush' },
  { name: 'Maison Atelier', industry: 'E-commerce', services: 'Storefront, brand kit', desc: 'A boutique storefront concept with a story-first product page.', tone: 'bg-peony text-plum' },
  { name: 'Her Name Here', industry: 'Personal brand', services: 'Portfolio website, identity', desc: 'A bold personal-brand portfolio concept for a creator or consultant.', tone: 'bg-mist text-plum' },
  { name: 'Launchpad', industry: 'Startup', services: 'Landing page, automation', desc: 'A conversion-focused startup landing concept with workflow automation.', tone: 'bg-aubergine text-peony' },
];

const N = projects.length;
const STEP = 360 / N;
const pad = (n: number) => String(n).padStart(2, '0');

export default function Work() {
  const sec = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const rotRef = useRef(0);
  const applyRef = useRef<(deg: number) => void>(() => {});
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = sec.current;
    const st = stage.current;
    const rg = ring.current;
    if (!el || !st || !rg) return;
    const cards = Array.from(rg.querySelectorAll<HTMLElement>('[data-c]'));
    let R = 0;
    let last = -1;

    const apply = (deg: number) => {
      rotRef.current = deg;
      rg.style.transform = `translateZ(${-R}px) rotateY(${-deg}deg)`;
      cards.forEach((c, i) => {
        const diff = Math.abs((((i * STEP - deg + 180) % 360) + 360) % 360 - 180);
        c.style.opacity = String(Math.max(0.12, 1 - (diff / 120) * 0.8));
        c.style.filter = diff > 8 ? `blur(${Math.min(4, diff / 30).toFixed(1)}px)` : 'none';
      });
      const idx = ((Math.round(deg / STEP) % N) + N) % N;
      if (idx !== last) {
        last = idx;
        setActive(idx);
      }
    };
    applyRef.current = apply;

    const layout = () => {
      const mob = window.innerWidth < 768;
      const w = Math.min(st.clientHeight * 0.8 * 0.8, window.innerWidth * (mob ? 0.62 : 0.3));
      const h = w / 0.8;
      R = (w / 2 / Math.tan(Math.PI / N)) * 1.28;
      cards.forEach((c, i) => {
        c.style.width = `${w}px`;
        c.style.height = `${h}px`;
        c.style.marginLeft = `${-w / 2}px`;
        c.style.marginTop = `${-h / 2}px`;
        c.style.transform = `rotateY(${i * STEP}deg) translateZ(${R}px)`;
      });
      apply(rotRef.current);
    };
    layout();
    window.addEventListener('resize', layout);

    if (reduced()) {
      setManual(true);
      return () => window.removeEventListener('resize', layout);
    }
    const trig = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: '+=400%',
      pin: true,
      scrub: true,
      snap: { snapTo: 1 / (N - 1), duration: { min: 0.25, max: 0.7 }, ease: 'power2.inOut' },
      onUpdate: (s) => apply(s.progress * (N - 1) * STEP),
    });
    return () => {
      trig.kill();
      window.removeEventListener('resize', layout);
    };
  }, []);

  const step = (dir: number) => applyRef.current((Math.round(rotRef.current / STEP) + dir) * STEP);
  const p = projects[active];

  return (
    <section id='work' ref={sec} data-theme='light' className='relative flex h-screen flex-col overflow-hidden bg-blush px-6 pb-8 pt-24 text-plum md:px-16 md:pb-10 md:pt-28'>
      <div className='flex items-end justify-between gap-6'>
        <div>
          <p className='eyebrow !text-plum/60'>(03) Selected work</p>
          <Words as='h2' text='Less talk. *More show.*' className='mt-3 font-display text-[10vw] font-light leading-[0.95] tracking-tightest md:text-[4.4vw]' />
        </div>
        <p aria-hidden className='font-serif text-3xl italic text-peony md:text-5xl'>{pad(active + 1)} / {pad(N)}</p>
      </div>

      <div ref={stage} className='relative min-h-0 flex-1' style={{ perspective: '1600px' }}>
        <div ref={ring} className='absolute inset-0' style={{ transformStyle: 'preserve-3d' }}>
          {projects.map((pr, i) => (
            <div key={pr.name} data-c aria-hidden className={`absolute left-1/2 top-1/2 overflow-hidden ${pr.tone}`} style={{ backfaceVisibility: 'hidden' }}>
              <div className='absolute inset-3 border border-current opacity-25 md:inset-4' />
              <div className='relative flex h-full flex-col justify-between p-5 md:p-7'>
                <div className='flex justify-between text-[10px] uppercase tracking-[0.22em] opacity-80'>
                  <span>Concept</span>
                  <span>{pad(i + 1)}</span>
                </div>
                <p className='font-serif text-3xl italic leading-[0.9] md:text-5xl'>{pr.name}</p>
              </div>
            </div>
          ))}
        </div>
        <p className='absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.25em] text-plum/50'>
          {manual ? '' : 'Scroll to rotate'}
        </p>
      </div>

      <div className='mt-4 grid items-end gap-4 md:grid-cols-12 md:gap-10' aria-live='polite'>
        <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className='md:col-span-6'>
          <h3 className='font-display text-2xl font-light tracking-tightest md:text-4xl'>{p.name}</h3>
          <p className='mt-2 max-w-md text-sm text-plum/75'>{p.desc}</p>
        </motion.div>
        <dl className='hidden text-[10px] uppercase tracking-[0.2em] md:col-span-4 md:col-start-8 md:block'>
          <div className='flex justify-between border-t border-plum/15 py-2'><dt className='text-plum/55'>Industry</dt><dd>{p.industry}</dd></div>
          <div className='flex justify-between gap-6 border-t border-plum/15 py-2'><dt className='text-plum/55'>Services</dt><dd className='text-right'>{p.services}</dd></div>
        </dl>
        <div className='flex items-center gap-6 md:col-span-2 md:justify-end'>
          {manual && (
            <>
              <button onClick={() => step(-1)} className='link-u text-[11px] uppercase tracking-[0.22em]'>Prev</button>
              <button onClick={() => step(1)} className='link-u text-[11px] uppercase tracking-[0.22em]'>Next</button>
            </>
          )}
          {!manual && <a href='#contact' className='link-u text-[11px] uppercase tracking-[0.22em]'>Start a project</a>}
        </div>
      </div>
      <p className='mt-3 text-[10px] text-plum/55'>These are concept projects, not client work. Real case studies will be added as they ship.</p>
    </section>
  );
}
