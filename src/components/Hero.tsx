'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Btn } from './Interactions';
import { Words, reduced, whenReady } from './Reveal';

const ticker = ['Branding', 'Websites', 'AI Automation', 'E-commerce', 'Chatbots', 'Creative Direction'];
const offer = ['Branding & creative direction', 'Website design & development', 'AI & business automation'];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el || reduced()) return;
    const fades = el.querySelectorAll('[data-hero-fade]');
    const rings = el.querySelector('[data-rings]');
    gsap.set(fades, { opacity: 0, y: 24 });
    gsap.set(rings, { opacity: 0 });
    const tweens: gsap.core.Tween[] = [];
    const off = whenReady(() => {
      tweens.push(gsap.to(fades, { opacity: 1, y: 0, duration: 1.3, ease: 'power3.out', stagger: 0.12, delay: 0.7 }));
      tweens.push(gsap.to(rings, { opacity: 1, duration: 2.6, ease: 'power2.out' }));
    });

    const ctx = gsap.context(() => {
      gsap.to('[data-parallax]', { yPercent: -10, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to(rings, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } });
    }, el);

    let move: ((e: MouseEvent) => void) | undefined;
    if (window.matchMedia('(pointer: fine)').matches && rings) {
      const qx = gsap.quickTo(rings, 'x', { duration: 1.8, ease: 'power3.out' });
      const qy = gsap.quickTo(rings, 'y', { duration: 1.8, ease: 'power3.out' });
      move = (e: MouseEvent) => {
        qx((e.clientX / window.innerWidth - 0.5) * -36);
        qy((e.clientY / window.innerHeight - 0.5) * -36);
      };
      window.addEventListener('mousemove', move);
    }
    return () => {
      off();
      tweens.forEach((t) => t.kill());
      if (move) window.removeEventListener('mousemove', move);
      ctx.revert();
    };
  }, []);

  return (
    <section id='top' data-theme='dark' ref={root} className='grain atmos relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-plum px-6 pb-8 pt-32 md:px-16 md:pb-10'>
      <div aria-hidden data-rings className='pointer-events-none absolute -right-[18vw] bottom-[-22vw] h-[78vw] w-[78vw] md:-right-[8vw] md:bottom-[-16vw] md:h-[56vw] md:w-[56vw]'>
        <div className='absolute inset-0 rounded-full' style={{ background: 'radial-gradient(closest-side, rgba(191,178,211,0.28), rgba(169,138,160,0.08) 55%, transparent 76%)' }} />
        {[100, 76, 52, 28].map((s) => (
          <div key={s} className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blush/10' style={{ width: `${s}%`, height: `${s}%` }} />
        ))}
      </div>

      <p data-hero-fade className='eyebrow relative'>Creative digital studio</p>

      <div data-parallax className='relative'>
        <Words as='h1' onScroll={false} delay={0.15} text='We make businesses *impossible* to ignore.' className='max-w-[17ch] font-display text-[13vw] font-light leading-[0.95] tracking-tightest md:text-[8.4vw]' />
        <div className='mt-14 grid gap-12 md:mt-20 md:grid-cols-12'>
          <div className='md:col-span-4'>
            <p data-hero-fade className='text-base text-blush/75 md:text-lg'>
              Creative websites. Distinctive brands. Intelligent automation. Everything your business needs to make its mark in the digital world.
            </p>
            <div data-hero-fade className='mt-10 flex flex-wrap items-center gap-x-8 gap-y-5'>
              <Btn href='#contact' tone='dark'>Let&apos;s build something</Btn>
              <a href='#work' className='link-u text-[11px] uppercase tracking-[0.22em]'>Explore our work</a>
            </div>
          </div>
          <ol data-hero-fade className='text-sm md:col-span-3 md:col-start-9'>
            {offer.map((o, i) => (
              <li key={o} className='border-t border-blush/15 py-3'>
                <a href='#services' className='group flex items-baseline gap-4 transition-colors duration-500 hover:text-blossom'>
                  <span className='font-serif text-base italic text-blossom'>0{i + 1}</span>
                  {o}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div data-hero-fade className='relative mt-16 flex items-end justify-between gap-6 border-t border-blush/15 pt-5 text-[11px] uppercase tracking-[0.22em] text-blush/55'>
        <span className='hidden md:block'>{ticker.join('  ·  ')}</span>
        <span className='flex items-center gap-3'>
          Scroll
          <span aria-hidden className='block h-10 w-px overflow-hidden bg-blush/20'>
            <span className='scrollhint block h-full w-full bg-blossom' />
          </span>
        </span>
      </div>
    </section>
  );
}
