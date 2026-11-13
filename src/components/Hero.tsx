'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brand } from '@/brand.config';
import { Magnetic } from './Interactions';
import { Words, reduced } from './Reveal';

const ticker = ['Branding', 'Websites', 'AI Automation', 'E-commerce', 'Chatbots', 'Creative Direction'];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el || reduced()) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-hero-letter]', { yPercent: 120, rotate: 6, duration: 1.2, ease: 'power4.out', stagger: 0.05, delay: 1.5 });
      gsap.from('[data-hero-fade]', { opacity: 0, y: 30, duration: 1, stagger: 0.12, delay: 2.3, ease: 'power3.out' });
      gsap.to('[data-float]', { y: '+=24', rotation: '+=8', duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: { each: 0.4, from: 'random' } });
      gsap.to('[data-parallax]', { yPercent: -25, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } });
    }, el);

    const move = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      el.querySelectorAll<HTMLElement>('[data-depth]').forEach((s) => {
        const d = parseFloat(s.dataset.depth || '1');
        gsap.to(s, { x: nx * d * 60, y: ny * d * 60, duration: 1.2, ease: 'power3.out' });
      });
    };
    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousemove', move);
      ctx.revert();
    };
  }, []);

  return (
    <section id='top' ref={root} className='grain relative flex min-h-screen flex-col justify-between overflow-hidden bg-plum px-6 pb-0 pt-32 md:px-16'>
      <div aria-hidden className='pointer-events-none absolute inset-0'>
        <div data-depth='1.6' className='absolute right-[8%] top-[18%]'>
          <div data-float className='h-40 w-40 rounded-full bg-peony md:h-64 md:w-64' />
        </div>
        <div data-depth='0.8' className='absolute right-[28%] top-[52%]'>
          <div data-float className='h-24 w-24 rounded-full border border-blush md:h-40 md:w-40' />
        </div>
        <div data-depth='2.2' className='absolute left-[55%] top-[12%]'>
          <div data-float className='h-16 w-32 rounded-full bg-blossom/80 md:h-20 md:w-48' />
        </div>
        <div data-depth='1.2' className='absolute bottom-[22%] right-[6%]'>
          <div data-float className='h-28 w-28 rotate-12 rounded-[2rem] border border-peony md:h-44 md:w-44' />
        </div>
      </div>

      <div data-parallax className='relative'>
        <p aria-hidden className='font-display text-[15vw] uppercase leading-[0.85] text-blush'>
          {brand.name.split(' ').map((w, wi) => (
            <span key={wi} className='mr-[0.25em] inline-block whitespace-nowrap'>
              {w.split('').map((c, i) => (
                <span key={i} className='inline-block overflow-hidden align-bottom'>
                  <span data-hero-letter className='inline-block'>{c}</span>
                </span>
              ))}
            </span>
          ))}
        </p>
        <Words as='h1' onScroll={false} delay={1.9} text='WE MAKE BUSINESSES IMPOSSIBLE TO IGNORE.' className='mt-10 max-w-4xl font-display text-3xl uppercase leading-tight text-blossom md:text-6xl' />
        <p data-hero-fade className='mt-8 max-w-xl text-base text-blush/80 md:text-lg'>
          Creative websites. Distinctive brands. Intelligent automation. Everything your business needs to make its mark in the digital world.
        </p>
        <div data-hero-fade className='mt-10 flex flex-wrap items-center gap-4'>
          <Magnetic>
            <a href='#contact' className='inline-block rounded-full bg-peony px-8 py-4 text-xs font-medium uppercase tracking-widest text-plum'>Let&apos;s build something</a>
          </Magnetic>
          <Magnetic>
            <a href='#work' className='inline-block rounded-full border border-blush/60 px-8 py-4 text-xs uppercase tracking-widest text-blush'>Explore our work</a>
          </Magnetic>
        </div>
      </div>

      <div aria-hidden className='relative mt-16 overflow-hidden border-t border-blush/20 py-5'>
        <div className='marquee flex w-max gap-12 whitespace-nowrap font-display text-2xl uppercase text-blush/70'>
          {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
            <span key={i}>{t} <span className='text-peony'>✺</span></span>
          ))}
        </div>
      </div>
    </section>
  );
}
