'use client';
import { Btn } from './Interactions';
import { ClipReveal, Fade, Words } from './Reveal';

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

export default function Work() {
  return (
    <section id='work' data-theme='light' className='bg-blush px-6 py-32 text-plum md:px-16 md:py-48'>
      <div className='flex items-end justify-between gap-6'>
        <div>
          <p className='eyebrow !text-plum/60'>(03) Selected work</p>
          <Words as='h2' text='Less talk. *More show.*' className='mt-8 font-display text-[13vw] font-light leading-[0.95] tracking-tightest md:text-[8vw]' />
        </div>
        <p aria-hidden className='hidden font-serif text-5xl italic text-peony md:block'>({String(projects.length).padStart(2, '0')})</p>
      </div>
      <p className='mt-6 max-w-md text-sm text-plum/65'>These are concept projects, not client work. Real case studies will be added as they ship.</p>

      <div className='mt-24 md:mt-40'>
        {projects.map((p, i) => {
          const odd = i % 2 === 1;
          return (
            <article key={p.name} className={`group grid items-end gap-6 md:grid-cols-12 md:gap-10 ${i === 0 ? '' : odd ? 'mt-24 md:mt-56' : 'mt-24 md:mt-44'}`}>
              <ClipReveal className={`${odd ? 'md:col-span-6 md:col-start-6 md:row-start-1' : 'md:col-span-7'}`}>
                <div className={`relative flex aspect-[5/4] flex-col justify-between p-6 transition-transform duration-[1600ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.035] md:p-10 ${p.tone}`}>
                  <div aria-hidden className='absolute inset-4 border border-current opacity-25 md:inset-6' />
                  <div className='relative flex justify-between text-[11px] uppercase tracking-[0.22em] opacity-80'>
                    <span>Concept</span>
                    <span>0{i + 1}</span>
                  </div>
                  <p className='relative font-serif text-[13vw] italic leading-[0.9] md:text-[5.6vw]'>{p.name}</p>
                </div>
              </ClipReveal>
              <Fade className={`${odd ? 'md:col-span-4 md:col-start-1 md:row-start-1' : 'md:col-span-4 md:col-start-9'}`}>
                <p className='font-serif text-xl italic text-peony'>0{i + 1}</p>
                <h3 className='mt-2 font-display text-3xl font-light tracking-tightest md:text-4xl'>
                  <span className='link-u group-hover:[background-size:100%_1px]'>{p.name}</span>
                </h3>
                <p className='mt-4 max-w-sm text-base text-plum/75'>{p.desc}</p>
                <dl className='mt-8 text-[11px] uppercase tracking-[0.2em]'>
                  <div className='flex justify-between border-t border-plum/15 py-3'><dt className='text-plum/55'>Industry</dt><dd>{p.industry}</dd></div>
                  <div className='flex justify-between gap-6 border-t border-plum/15 py-3'><dt className='text-plum/55'>Services</dt><dd className='text-right'>{p.services}</dd></div>
                </dl>
              </Fade>
            </article>
          );
        })}
      </div>

      <div className='mt-32 flex justify-center md:mt-48'>
        <Btn href='#contact' tone='light'>Start a project</Btn>
      </div>
    </section>
  );
}
