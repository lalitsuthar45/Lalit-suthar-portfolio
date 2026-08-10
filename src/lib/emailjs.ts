import emailjs from '@emailjs/browser';
import { SITE } from '@/constants/site';
import type { ContactFormValues } from '@/types';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

/** True when all three EmailJS env vars are present. */
export const isEmailJsConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

export class EmailNotConfiguredError extends Error {
  constructor() {
    super('EmailJS is not configured. Copy .env.example to .env.local and fill in the values.');
    this.name = 'EmailNotConfiguredError';
  }
}

/**
 * Send the contact form through EmailJS — no backend required.
 * Template variables expected: from_name, from_email, subject, message, to_name,
 * to_email. Bind the template's "To Email" field to {{to_email}} so every message
 * is delivered to SITE.email.
 */
export async function sendContactEmail(values: ContactFormValues) {
  if (!isEmailJsConfigured) throw new EmailNotConfiguredError();

  return emailjs.send(
    SERVICE_ID!,
    TEMPLATE_ID!,
    {
      from_name: values.name,
      from_email: values.email,
      reply_to: values.email,
      subject: values.subject,
      message: values.message,
      to_name: SITE.name,
      to_email: SITE.email,
    },
    { publicKey: PUBLIC_KEY! },
  );
}

/**
 * Build a mailto: URL addressed to SITE.email, prefilled with the visitor's
 * subject and message. Used when EmailJS has no credentials, so clicking
 * "Send Message" still composes the mail in their own client.
 */
export function buildContactMailto(values: ContactFormValues) {
  const body = `${values.message}\n\n—\n${values.name} <${values.email}>`;
  const params = new URLSearchParams({ subject: values.subject, body });
  // URLSearchParams encodes spaces as "+", which mail clients render literally.
  return `mailto:${SITE.email}?${params.toString().replace(/\+/g, '%20')}`;
}
