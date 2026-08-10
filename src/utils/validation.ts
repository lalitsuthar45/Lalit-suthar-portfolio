import type { ContactFormErrors, ContactFormValues } from '@/types';

/** Pragmatic email shape check — the real validation is the delivery attempt. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const FIELD_LIMITS = {
  name: { min: 2, max: 80 },
  subject: { min: 3, max: 120 },
  message: { min: 10, max: 2000 },
} as const;

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const name = values.name.trim();
  if (!name) errors.name = 'Please tell me your name.';
  else if (name.length < FIELD_LIMITS.name.min) errors.name = 'That looks a little short.';
  else if (name.length > FIELD_LIMITS.name.max)
    errors.name = 'Please keep this under 80 characters.';

  const email = values.email.trim();
  if (!email) errors.email = 'An email address is required so I can reply.';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'That does not look like a valid email.';

  const subject = values.subject.trim();
  if (!subject) errors.subject = 'Please add a subject.';
  else if (subject.length < FIELD_LIMITS.subject.min) errors.subject = 'That looks a little short.';
  else if (subject.length > FIELD_LIMITS.subject.max)
    errors.subject = 'Please keep this under 120 characters.';

  const message = values.message.trim();
  if (!message) errors.message = 'Please write a message.';
  else if (message.length < FIELD_LIMITS.message.min)
    errors.message = 'Tell me a bit more — at least 10 characters.';
  else if (message.length > FIELD_LIMITS.message.max)
    errors.message = 'Please keep this under 2000 characters.';

  return errors;
}

export function hasErrors(errors: ContactFormErrors) {
  return Object.keys(errors).length > 0;
}
