'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tilt } from './Interactions';
import { Words } from './Reveal';

// IMPORTANT: every entry below is a CONCEPT, not a client project.
// Replace with real work (add `href`, `status: 'Client work'`) only when it exists.
const projects = [
  { name: 'Concept: Bloom Studio', industry: 'Beauty & wellness', services: 'Brand identity, website', desc: 'A calm, editorial site concept for a skincare and wellness studio.', bg: 'from-blossom to-plum' },
  { name: 'Concept: Fresh Nest', industry: 'Home & cleaning services', services: 'Website, lead capture', desc: 'A booking-focused site concept for a home cleaning service.', bg: 'from-blush to-peony' },
  { name: 'Concept: Haven Estates', industry: 'Real estate', services: 'Website, AI enquiry assistant', desc: 'A listings-led concept with an automated enquiry assistant.', bg: 'from-peony to-plum' },
  { name: 'Concept: Maison Atelier', industry: 'E-commerce', services: 'Storefront, brand kit', desc: 'A boutique storefront concept with a story-first product page.', bg: 'from-blossom to-peony' },
  { name: 'Concept: Her Name Here', industry: 'Personal brand', services: 'Portfolio website, identity', desc: 'A bold personal-brand portfolio concept for a creator or consultant.', bg: 'from-plum to-peony' },
  { name: 'Concept: Launchpad', industry: 'Startup', services: 'Landing page, automation', desc: 'A conversion-focused startup landing concept with workflow automation.', bg: 'from-blush to-blossom' },
];

export default function Work() {
  const sec = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const el = track.current!;
      const dist = () => el.scrollWidth - window.innerWidth;
      gsap.to(el, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: sec.current, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true } });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id='work' ref={sec} className='overflow-hidden bg-blush py-24 text-plum md:flex md:h-screen md:flex-col md:justify-center md:py-0'>
      <div className='px-6 md:px-16'>
        <p className='eyebrow !text-plum/70'>Selected work</p>
        <Words as='h2' text='LESS TALK. MORE SHOW.' className='mt-4 font-display text-5xl uppercase leading-[0.95] md:text-8xl' />
        <p className='mt-4 text-sm text-plum/70'>These are concept projects, not client work. Real case studies will be added as they ship.</p>
      </div>
      <div ref={track} className='mt-10 flex snap-x gap-8 overflow-x-auto px-6 pb-6 md:w-max md:overflow-visible md:px-16'>
        {projects.map((p) => (
          <Tilt key={p.name} className='group w-[80vw] shrink-0 snap-center md:w-[34vw]'>
            <div className='overflow-hidden rounded-2xl border border-plum/20 bg-white/40'>
              <div className='flex items-center gap-1.5 border-b border-plum/10 px-4 py-3'>
                <span className='h-2.5 w-2.5 rounded-full bg-plum/30' />
                <span className='h-2.5 w-2.5 rounded-full bg-plum/30' />
                <span className='h-2.5 w-2.5 rounded-full bg-plum/30' />
                <span className='ml-3 rounded-full bg-plum/10 px-3 py-0.5 text-[10px] uppercase tracking-widest'>Concept</span>
              </div>
              <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${p.bg}`}>
                <div className='absolute inset-0 flex items-end p-6 font-display text-4xl uppercase leading-none text-blush transition-transform duration-700 group-hover:scale-110 md:text-5xl'>{p.industry}</div>
              </div>
            </div>
            <h3 className='mt-4 font-display text-2xl uppercase'>{p.name}</h3>
            <p className='text-xs uppercase tracking-widest text-plum/70'>{p.industry} · {p.services}</p>
            <p className='mt-2 max-w-sm text-sm'>{p.desc}</p>
          </Tilt>
        ))}
      </div>
    </section>
  );
}
