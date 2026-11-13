import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { brand } from '@/brand.config';

export async function POST(req: Request) {
  let b: Record<string, string>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
  if (b.website) return NextResponse.json({ ok: true }); // honeypot

  const { name, business, email, service, message, budget } = b;
  if (!name || !message || !email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Please fill in name, a valid email and a short description.' }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!key || !to) {
    return NextResponse.json({ error: 'Email delivery is not configured yet.' }, { status: 500 });
  }

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: `${brand.name} <${process.env.RESEND_FROM || 'onboarding@resend.dev'}>`,
    to,
    replyTo: email,
    subject: `New enquiry from ${name}${business ? ` (${business})` : ''}`,
    text: [
      `Name: ${name}`,
      `Business: ${business || '-'}`,
      `Email: ${email}`,
      `Service: ${service || '-'}`,
      `Budget: ${budget || '-'}`,
      '',
      message,
    ].join('\n'),
  });

  if (error) return NextResponse.json({ error: 'Could not send your message. Please try again.' }, { status: 502 });
  return NextResponse.json({ ok: true });
}
