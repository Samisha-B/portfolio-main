'use client';
import { FormEvent, useState } from 'react';
import { Words } from './Reveal';

const options = ['Branding & creative direction', 'Website design & development', 'AI & business automation', 'Not sure yet'];
const field = 'w-full border-b border-plum/30 bg-transparent py-4 text-lg text-plum outline-none transition-colors placeholder:text-plum/40 focus:border-plum';

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
    <section id='contact' className='bg-blush px-6 py-32 text-plum md:px-16'>
      <p className='eyebrow !text-plum/70'>Contact</p>
      <Words as='h2' text='TELL US ABOUT YOUR PROJECT.' className='mt-8 max-w-4xl font-display text-5xl uppercase leading-[0.95] md:text-8xl' />
      {state === 'success' ? (
        <p role='status' className='mt-16 font-display text-3xl'>Thank you. We have your enquiry and will be in touch soon.</p>
      ) : (
        <form onSubmit={onSubmit} className='mt-16 grid max-w-4xl gap-x-10 gap-y-6 md:grid-cols-2'>
          <label className='block'><span className='text-xs uppercase tracking-widest'>Name</span><input name='name' required className={field} autoComplete='name' /></label>
          <label className='block'><span className='text-xs uppercase tracking-widest'>Business name</span><input name='business' className={field} autoComplete='organization' /></label>
          <label className='block'><span className='text-xs uppercase tracking-widest'>Email</span><input name='email' type='email' required className={field} autoComplete='email' /></label>
          <label className='block'>
            <span className='text-xs uppercase tracking-widest'>Service</span>
            <select name='service' className={field} defaultValue={options[3]}>{options.map((o) => <option key={o}>{o}</option>)}</select>
          </label>
          <label className='block md:col-span-2'><span className='text-xs uppercase tracking-widest'>Project description</span><textarea name='message' required rows={4} className={field} /></label>
          <label className='block md:col-span-2'><span className='text-xs uppercase tracking-widest'>Estimated budget (optional)</span><input name='budget' className={field} /></label>
          <input name='website' tabIndex={-1} autoComplete='off' className='hidden' aria-hidden />
          <div className='md:col-span-2'>
            <button disabled={state === 'sending'} className='rounded-full bg-plum px-10 py-5 text-xs uppercase tracking-widest text-blush transition-opacity disabled:opacity-60'>
              {state === 'sending' ? 'Sending...' : 'Send enquiry'}
            </button>
            {state === 'error' && <p role='alert' className='mt-4 text-sm font-medium'>{msg}</p>}
          </div>
        </form>
      )}
    </section>
  );
}
