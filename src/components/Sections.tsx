'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brand } from '@/brand.config';
import { Magnetic } from './Interactions';
import { ClipReveal, Fade, Words, reduced } from './Reveal';

export function Intro() {
  return (
    <section className='relative overflow-hidden bg-blush px-6 py-32 text-plum md:px-16 md:py-48'>
      <div aria-hidden className='pointer-events-none absolute -right-24 top-10 h-72 w-72 animate-spin rounded-full border border-plum/30 [animation-duration:30s]' />
      <div aria-hidden className='pointer-events-none absolute -left-10 bottom-10 h-40 w-40 rounded-full bg-blossom' />
      <p className='eyebrow !text-plum/70'>Who we are</p>
      <Words as='h2' text='GOOD BUSINESSES DESERVE BETTER DIGITAL EXPERIENCES.' className='mt-8 max-w-6xl font-display text-5xl uppercase leading-[0.95] md:text-8xl' />
      <div className='mt-16 grid gap-10 md:grid-cols-12'>
        <Fade className='space-y-6 text-lg md:col-span-5 md:col-start-8 md:text-xl'>
          <p>We believe every business deserves a digital presence that reflects the quality of what it does.</p>
          <p>From the first impression to the final interaction, we bring together design, technology and intelligent systems to create experiences that work as beautifully as they look.</p>
        </Fade>
      </div>
    </section>
  );
}

const services = [
  {
    n: '01',
    t: 'Branding & Creative Direction',
    d: 'We create distinctive brand identities that make businesses recognisable and memorable.',
    items: ['Logo design', 'Visual identity systems', 'Brand guidelines', 'Typography and colour systems', 'Social media identity', 'Creative direction'],
  },
  {
    n: '02',
    t: 'Website Design & Development',
    d: 'We design and develop beautiful, responsive websites that turn visitors into customers.',
    items: ['Business websites', 'Landing pages', 'Portfolio websites', 'E-commerce websites', 'Custom development', 'Website redesigns', 'Conversion-focused experiences'],
  },
  {
    n: '03',
    t: 'AI & Business Automation',
    d: 'We help businesses eliminate repetitive work and build smarter workflows using AI and automation.',
    items: ['AI-powered chatbots', 'Lead capture and management', 'Automated customer communication', 'Workflow automation', 'AI integrations', 'Business process automation'],
  },
];

export function Services() {
  const [open, setOpen] = useState(0);
  return (
    <section id='services' className='bg-plum px-6 py-32 text-blush md:px-16'>
      <p className='eyebrow'>What we do</p>
      <div className='mt-12 border-t border-blush/20'>
        {services.map((s, i) => (
          <div key={s.n} className='border-b border-blush/20' onMouseEnter={() => setOpen(i)}>
            <button className='flex w-full items-baseline gap-6 py-8 text-left md:gap-12' aria-expanded={open === i} onClick={() => setOpen(i)} data-cursor>
              <span className='font-display text-5xl text-peony md:text-8xl'>{s.n}</span>
              <h3 className={`font-display text-3xl uppercase leading-none transition-transform duration-700 md:text-7xl ${open === i ? 'translate-x-4 text-blossom' : ''}`}>{s.t}</h3>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }} className='overflow-hidden'>
                  <div className='pb-10 md:pl-48'>
                    <p className='max-w-xl text-lg text-blush/80'>{s.d}</p>
                    <ul className='mt-6 flex flex-wrap gap-2'>
                      {s.items.map((it) => (
                        <li key={it} className='rounded-full border border-peony/60 px-4 py-2 text-xs uppercase tracking-widest'>{it}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

const reasons = [
  'Design that makes an impression.',
  'Technology that solves actual problems.',
  'Websites built around business objectives.',
  'Creative thinking backed by technical execution.',
  'Personal attention rather than cookie-cutter solutions.',
  'Systems designed to grow alongside businesses.',
];

export function Why() {
  return (
    <section className='bg-plum px-6 py-32 text-blush md:px-16'>
      <p className='eyebrow'>Why {brand.name}?</p>
      <Words as='h2' text='NOT JUST ANOTHER AGENCY.' className='mt-8 font-display text-5xl uppercase leading-[0.95] md:text-9xl' />
      <ul className='mt-20 space-y-2'>
        {reasons.map((r, i) => (
          <Fade key={r} delay={i * 0.04}>
            <li data-cursor className={`group flex items-baseline gap-6 border-t border-blush/20 py-6 transition-all duration-500 hover:pl-6 hover:text-blossom ${i % 2 ? 'md:ml-24' : ''}`}>
              <span className='text-xs tracking-widest text-peony'>0{i + 1}</span>
              <span className='font-display text-2xl md:text-5xl'>{r}</span>
            </li>
          </Fade>
        ))}
      </ul>
    </section>
  );
}

const steps = [
  ['01', 'Discover', 'We understand your business, audience, objectives and vision.'],
  ['02', 'Design', 'We develop the creative direction, visual identity and experience.'],
  ['03', 'Build', 'We bring everything to life through development, integrations and automation.'],
  ['04', 'Launch & Grow', 'We launch, refine and help your business continue evolving.'],
];

export function Process() {
  const line = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reduced()) {
      gsap.set(line.current, { scaleY: 1 });
      return;
    }
    const t = gsap.fromTo(line.current, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: wrap.current, start: 'top 70%', end: 'bottom 70%', scrub: true } });
    return () => {
      t.scrollTrigger?.kill();
      t.kill();
    };
  }, []);
  return (
    <section id='process' className='bg-blush px-6 py-32 text-plum md:px-16'>
      <p className='eyebrow !text-plum/70'>Our process</p>
      <Words as='h2' text='FROM IDEA TO SOMETHING REAL.' className='mt-8 max-w-5xl font-display text-5xl uppercase leading-[0.95] md:text-8xl' />
      <div ref={wrap} className='relative mt-20 pl-10 md:pl-24'>
        <div className='absolute bottom-0 left-2 top-0 w-px bg-plum/15' />
        <div ref={line} className='absolute bottom-0 left-2 top-0 w-px origin-top bg-peony' style={{ width: 2 }} />
        <ol className='space-y-20'>
          {steps.map(([n, t, d]) => (
            <li key={n}>
              <Fade>
                <span className='font-display text-6xl text-peony md:text-8xl'>{n}</span>
                <h3 className='mt-2 font-display text-3xl uppercase md:text-5xl'>{t}</h3>
                <p className='mt-3 max-w-lg text-lg text-plum/80'>{d}</p>
              </Fade>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id='about' className='bg-plum px-6 py-32 text-blush md:px-16'>
      <p className='eyebrow'>About us</p>
      <Words as='h2' text='CREATIVE MINDS. TECHNICAL THINKING.' className='mt-8 max-w-5xl font-display text-5xl uppercase leading-[0.95] md:text-8xl' />
      <div className='mt-16 grid gap-10 md:grid-cols-12'>
        <Fade className='space-y-6 text-lg md:col-span-5'>
          <p>{brand.name} is a creative digital studio that brings design, development and automation together under one roof.</p>
          <p className='text-blush/60'>Founder introductions and our studio philosophy are coming soon.</p>
        </Fade>
        <ClipReveal className='md:col-span-3 md:col-start-7'>
          <div className='flex aspect-[3/4] items-end bg-peony p-4 text-xs uppercase tracking-widest text-plum'>Photo coming soon</div>
        </ClipReveal>
        <ClipReveal className='md:col-span-3 md:mt-24'>
          <div className='flex aspect-[3/4] items-end bg-blossom p-4 text-xs uppercase tracking-widest text-plum'>Photo coming soon</div>
        </ClipReveal>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className='bg-blossom px-6 py-32 text-plum md:px-16'>
      <p className='eyebrow !text-plum/70'>Testimonials</p>
      <Words as='h2' text='KIND WORDS. REAL PEOPLE.' className='mt-8 font-display text-5xl uppercase leading-[0.95] md:text-8xl' />
      <div className='mt-16 max-w-2xl space-y-4'>
        <Fade><div className='w-fit rounded-3xl rounded-bl-md bg-blush px-6 py-4'>Placeholder: a genuine client message will appear here.</div></Fade>
        <Fade delay={0.1}><div className='ml-auto w-fit rounded-3xl rounded-br-md bg-plum px-6 py-4 text-blush'>Placeholder: we only publish testimonials from real clients.</div></Fade>
        <p className='pt-4 text-xs uppercase tracking-widest text-plum/70'>Placeholder content. Remove once real testimonials are available.</p>
      </div>
    </section>
  );
}

export function FinalCta() {
  const hello = brand.email ? `mailto:${brand.email}` : '#contact';
  return (
    <section className='grain relative overflow-hidden bg-plum px-6 py-40 text-center text-blush md:px-16 md:py-56'>
      <div aria-hidden className='pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-peony/20 blur-3xl' />
      <div className='relative'>
        <Words as='h2' text='YOUR NEXT BIG IDEA STARTS HERE.' className='mx-auto max-w-6xl font-display text-5xl uppercase leading-[0.95] md:text-9xl' />
        <Fade><p className='mx-auto mt-10 max-w-md text-lg text-blush/80'>Have something in mind? Let&apos;s turn it into something people remember.</p></Fade>
        <div className='mt-12 flex flex-wrap items-center justify-center gap-4'>
          <Magnetic strength={0.5}><a href='#contact' className='inline-block rounded-full bg-peony px-10 py-5 text-xs font-medium uppercase tracking-widest text-plum'>Start a project</a></Magnetic>
          <Magnetic strength={0.5}><a href={hello} className='inline-block rounded-full border border-blush/60 px-10 py-5 text-xs uppercase tracking-widest'>Say hello</a></Magnetic>
        </div>
      </div>
    </section>
  );
}
