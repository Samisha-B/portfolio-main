'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brand } from '@/brand.config';
import { Btn } from './Interactions';
import { ClipReveal, Fade, Parallax, ScrubText, Words, reduced } from './Reveal';

const h2 = 'font-display font-light leading-[0.98] tracking-tightest text-[12vw] md:text-[6.4vw]';

export function Intro() {
  return (
    <section data-theme='light' className='bg-blush px-6 py-32 text-plum md:px-16 md:py-52'>
      <div className='grid gap-10 md:grid-cols-12'>
        <p className='eyebrow !text-plum/60 md:col-span-2'>(01) Studio</p>
        <ScrubText text='Good businesses deserve *better digital* experiences.' className='font-display text-[11vw] font-light leading-[1] tracking-tightest md:col-span-10 md:text-[6.6vw]' />
      </div>
      <div className='mt-20 grid gap-10 md:mt-32 md:grid-cols-12'>
        <Fade className='space-y-6 text-base text-plum/75 md:col-span-4 md:col-start-8 md:text-lg'>
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
  const sec = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = sec.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const panels = gsap.utils.toArray<HTMLElement>('[data-panel]', el);
      const bar = el.querySelector('[data-bar]');
      gsap.set(panels.slice(1), { autoAlpha: 0, y: 50 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => setActive(Math.min(panels.length - 1, Math.round(self.progress * (panels.length - 1)))),
        },
      });
      panels.forEach((p, i) => {
        if (i === 0) return;
        tl.to(panels[i - 1], { autoAlpha: 0, y: -50, duration: 1 }, '+=0.6');
        tl.fromTo(p, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1 }, '<0.3');
      });
      tl.to({}, { duration: 0.6 });
      tl.fromTo(bar, { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: tl.duration() }, 0);
    });
    return () => mm.revert();
  }, []);

  return (
    <section id='services' ref={sec} data-theme='dark' className='relative bg-plum px-6 py-24 text-blush md:h-screen md:overflow-hidden md:px-0 md:py-0'>
      <div className='flex items-baseline justify-between md:absolute md:inset-x-16 md:top-28 md:z-10'>
        <p className='eyebrow'>(02) What we do</p>
        <p aria-hidden className='hidden text-xs tracking-[0.3em] text-blush/50 md:block'>{String(active + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}</p>
      </div>
      <div aria-hidden className='absolute bottom-24 right-8 top-24 hidden w-px bg-blush/10 md:block'>
        <div data-bar className='h-full w-px origin-top bg-blossom' />
      </div>
      <div className='mt-12 md:mt-0'>
        {services.map((s) => (
          <article key={s.n} data-panel className='border-t border-blush/15 py-14 md:absolute md:inset-0 md:flex md:items-center md:border-0 md:px-16 md:py-0'>
            <div className='grid w-full gap-10 md:grid-cols-12 md:items-end'>
              <div className='md:col-span-7'>
                <span className='font-serif text-3xl italic text-blossom md:text-4xl'>{s.n}</span>
                <h3 className='mt-4 font-display text-[11vw] font-light leading-[0.98] tracking-tightest md:text-[5.6vw]'>{s.t}</h3>
              </div>
              <div className='md:col-span-4 md:col-start-9'>
                <p className='text-lg text-blush/80'>{s.d}</p>
                <ul className='mt-8 text-sm text-blush/70'>
                  {s.items.map((it) => (
                    <li key={it} className='border-t border-blush/15 py-2.5'>{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
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
    <section data-theme='dark' className='bg-plum px-6 py-32 text-blush md:px-16 md:py-48'>
      <div className='grid gap-16 md:grid-cols-12'>
        <div className='md:sticky md:top-32 md:col-span-5 md:self-start'>
          <p className='eyebrow'>(04) Why {brand.name}?</p>
          <Words as='h2' text='Not just *another* agency.' className={`mt-8 ${h2}`} />
        </div>
        <ul className='group/list md:col-span-7'>
          {reasons.map((r, i) => (
            <li key={r} className='border-t border-blush/15 transition-opacity duration-500 group-hover/list:opacity-40 hover:!opacity-100'>
              <Fade delay={i * 0.04}>
                <div className='flex items-baseline gap-6 py-7 md:py-9'>
                  <span className='font-serif text-lg italic text-blossom'>0{i + 1}</span>
                  <span className='font-display text-2xl font-light leading-tight tracking-tightest md:text-4xl'>{r}</span>
                </div>
              </Fade>
            </li>
          ))}
        </ul>
      </div>
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
    <section id='process' data-theme='light' className='bg-mist px-6 py-32 text-plum md:px-16 md:py-48'>
      <div className='grid gap-16 md:grid-cols-12'>
        <div className='md:sticky md:top-32 md:col-span-5 md:self-start'>
          <p className='eyebrow !text-plum/60'>(05) Our process</p>
          <Words as='h2' text='From idea to something *real.*' className={`mt-8 ${h2}`} />
        </div>
        <div ref={wrap} className='relative pl-10 md:col-span-6 md:col-start-7 md:pl-16'>
          <div className='absolute bottom-0 left-2 top-0 w-px bg-plum/15' />
          <div ref={line} className='absolute bottom-0 left-2 top-0 w-px origin-top bg-plum' />
          <ol className='space-y-24'>
            {steps.map(([n, t, d]) => (
              <li key={n}>
                <Fade>
                  <span className='font-serif text-5xl italic text-peony md:text-6xl'>{n}</span>
                  <h3 className='mt-3 font-display text-4xl font-light tracking-tightest md:text-5xl'>{t}</h3>
                  <p className='mt-4 max-w-md text-lg text-plum/75'>{d}</p>
                </Fade>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id='about' data-theme='dark' className='bg-plum px-6 py-32 text-blush md:px-16 md:py-48'>
      <p className='eyebrow'>(06) About us</p>
      <Words as='h2' text='Creative minds. *Technical* thinking.' className='mt-8 max-w-[14ch] font-display text-[13vw] font-light leading-[0.95] tracking-tightest md:text-[8vw]' />
      <div className='mt-20 grid gap-12 md:grid-cols-12'>
        <Fade className='space-y-6 text-lg md:col-span-4'>
          <p>{brand.name} is a creative digital studio that brings design, development and automation together under one roof.</p>
          <p className='text-blush/60'>Founder introductions and our studio philosophy are coming soon.</p>
        </Fade>
        <Parallax className='md:col-span-3 md:col-start-6' amount={4}>
          <ClipReveal>
            <div className='flex aspect-[3/4] items-end bg-blossom/30 p-4 text-[11px] uppercase tracking-[0.22em] text-blush/80'>Photo coming soon</div>
          </ClipReveal>
        </Parallax>
        <Parallax className='md:col-span-3 md:mt-32' amount={9}>
          <ClipReveal>
            <div className='flex aspect-[3/4] items-end bg-peony/40 p-4 text-[11px] uppercase tracking-[0.22em] text-blush/80'>Photo coming soon</div>
          </ClipReveal>
        </Parallax>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section data-theme='light' className='bg-blush px-6 py-32 text-plum md:px-16 md:py-48'>
      <p className='eyebrow !text-plum/60'>(07) Testimonials</p>
      <Words as='h2' text='Kind words. *Real* people.' className={`mt-8 ${h2}`} />
      <div className='mt-20 grid gap-12 md:grid-cols-12'>
        <Fade className='border-t border-plum/20 pt-6 md:col-span-5'>
          <p className='font-serif text-3xl italic leading-snug md:text-4xl'>Placeholder: a genuine client message will appear here.</p>
        </Fade>
        <Fade delay={0.1} className='border-t border-plum/20 pt-6 md:col-span-5 md:col-start-8 md:mt-24'>
          <p className='font-serif text-3xl italic leading-snug md:text-4xl'>Placeholder: we only publish testimonials from real clients.</p>
        </Fade>
      </div>
      <p className='mt-16 text-[11px] uppercase tracking-[0.22em] text-plum/60'>Placeholder content. Remove once real testimonials are available.</p>
    </section>
  );
}

export function FinalCta() {
  const hello = brand.email ? `mailto:${brand.email}` : '#contact';
  return (
    <section data-theme='dark' className='grain atmos relative overflow-hidden bg-plum px-6 py-40 text-blush md:px-16 md:py-60'>
      <div className='relative'>
        <Words as='h2' text='Your next *big idea* starts here.' className='max-w-[14ch] font-display text-[14vw] font-light leading-[0.93] tracking-tightest md:text-[9vw]' />
        <div className='mt-16 flex flex-col justify-between gap-10 md:flex-row md:items-end'>
          <Fade><p className='max-w-sm text-lg text-blush/75'>Have something in mind? Let&apos;s turn it into something people remember.</p></Fade>
          <Fade delay={0.1} className='flex flex-wrap items-center gap-x-8 gap-y-5'>
            <Btn href='#contact' tone='dark'>Start a project</Btn>
            <a href={hello} className='link-u text-[11px] uppercase tracking-[0.22em]'>Say hello</a>
          </Fade>
        </div>
      </div>
    </section>
  );
}
