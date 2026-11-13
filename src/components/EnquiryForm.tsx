'use client';
import { FormEvent, useState } from 'react';
import { Words } from './Reveal';

const options = ['Branding & creative direction', 'Website design & development', 'AI & business automation', 'Not sure yet'];
const field = 'w-full border-b border-plum/30 bg-transparent py-4 text-lg text-plum outline-none transition-colors duration-500 placeholder:text-plum/40 focus:border-plum';
const label = 'eyebrow !text-plum/60';

export default function EnquiryForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || 'Something went wrong.');
      setState('success');
      form.reset();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setState('error');
    }
  }

  return (
    <section id='contact' data-theme='light' className='bg-blush px-6 py-32 text-plum md:px-16 md:py-48'>
      <div className='grid gap-16 md:grid-cols-12'>
        <div className='md:sticky md:top-32 md:col-span-5 md:self-start'>
          <p className='eyebrow !text-plum/60'>(08) Contact</p>
          <Words as='h2' text='Tell us about your *project.*' className='mt-8 font-display text-[12vw] font-light leading-[0.98] tracking-tightest md:text-[5.6vw]' />
        </div>
        <div className='md:col-span-6 md:col-start-7'>
          {state === 'success' ? (
            <p role='status' className='font-serif text-4xl italic'>Thank you. We have your enquiry and will be in touch soon.</p>
          ) : (
            <form onSubmit={onSubmit} className='grid gap-x-10 gap-y-8 md:grid-cols-2'>
              <label className='block'><span className={label}>Name</span><input name='name' required className={field} autoComplete='name' /></label>
              <label className='block'><span className={label}>Business name</span><input name='business' className={field} autoComplete='organization' /></label>
              <label className='block'><span className={label}>Email</span><input name='email' type='email' required className={field} autoComplete='email' /></label>
              <label className='block'>
                <span className={label}>Service</span>
                <select name='service' className={field} defaultValue={options[3]}>{options.map((o) => <option key={o}>{o}</option>)}</select>
              </label>
              <label className='block md:col-span-2'><span className={label}>Project description</span><textarea name='message' required rows={4} className={field} /></label>
              <label className='block md:col-span-2'><span className={label}>Estimated budget (optional)</span><input name='budget' className={field} /></label>
              <input name='website' tabIndex={-1} autoComplete='off' className='hidden' aria-hidden />
              <div className='md:col-span-2'>
                <button disabled={state === 'sending'} className='btn btn-light'>
                  {state === 'sending' ? 'Sending...' : 'Send enquiry'} <span aria-hidden className='arr'>→</span>
                </button>
                {state === 'error' && <p role='alert' className='mt-4 text-sm font-medium'>{msg}</p>}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
