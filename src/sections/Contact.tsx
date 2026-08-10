'use client';

import { useCallback, useState, type ChangeEvent, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { AuroraBackground } from '@/components/effects/AuroraBackground';
import { SITE, SOCIALS } from '@/constants/site';
import { buildContactMailto, isEmailJsConfigured, sendContactEmail } from '@/lib/emailjs';
import { FIELD_LIMITS, hasErrors, validateContactForm } from '@/utils/validation';
import { fadeInLeft, fadeInRight } from '@/animations/variants';
import { cn } from '@/lib/utils';
import type { ContactFormErrors, ContactFormValues, SubmitStatus } from '@/types';

const EMPTY_FORM: ContactFormValues = { name: '', email: '', subject: '', message: '' };

const CONTACT_CHANNELS = [
  { label: 'Email', value: SITE.email, href: SOCIALS.email as string | null, Icon: Mail },
  { label: 'Phone', value: SITE.phone, href: SOCIALS.phone as string | null, Icon: Phone },
  { label: 'LinkedIn', value: '/in/:Lalit_suthar', href: SOCIALS.linkedin as string | null, Icon: Linkedin },
  { label: 'GitHub', value: 'Lalitsuthar', href: SOCIALS.github as string | null, Icon: Github },
  { label: 'Location', value: SITE.location, href: null, Icon: MapPin },
];

/**
 * Hand a mailto: URL to the OS mail client. Uses a synthetic anchor click
 * rather than assigning location.href, which some browsers treat as a blocked
 * top-level navigation when no mail handler is registered.
 */
function openMailClient(href: string) {
  const link = document.createElement('a');
  link.href = href;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function Contact() {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [feedback, setFeedback] = useState('');

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setValues((prev) => {
        const next = { ...prev, [name]: value };
        // Re-validate on change only after the field has been blurred once,
        // so the form does not shout at people mid-typing.
        if (touched[name]) setErrors(validateContactForm(next));
        return next;
      });
    },
    [touched],
  );

  const handleBlur = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = event.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      setErrors(validateContactForm(values));
    },
    [values],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const validationErrors = validateContactForm(values);
      setErrors(validationErrors);
      setTouched({ name: true, email: true, subject: true, message: true });

      if (hasErrors(validationErrors)) {
        setStatus('error');
        setFeedback('Please fix the highlighted fields and try again.');
        return;
      }

      // No EmailJS credentials — open the visitor's mail client straight away,
      // addressed to SITE.email and prefilled with their subject and message.
      if (!isEmailJsConfigured) {
        openMailClient(buildContactMailto(values));
        setStatus('success');
        setFeedback('Opening your email app with the message ready to send.');
        return;
      }

      setStatus('submitting');
      setFeedback('');

      try {
        await sendContactEmail(values);
        setStatus('success');
        setFeedback("Thanks for reaching out — I'll get back to you shortly.");
        setValues(EMPTY_FORM);
        setTouched({});
      } catch (error) {
        // Real send failure — fall back to composing it locally instead.
        openMailClient(buildContactMailto(values));
        setStatus('error');
        setFeedback(
          `Something went wrong sending your message, so it has been opened in your email app instead.`,
        );
        console.error('Contact form submission failed:', error);
      }
    },
    [values],
  );

  const isSubmitting = status === 'submitting';

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative section-padding">
      <AuroraBackground className="opacity-60" />

      <div className="container-page">
        <SectionHeading
          eyebrow="Contact"
          title={<span id="contact-heading">Let&apos;s build something</span>}
          highlight="together"
          description="Hiring, collaborating, or just want to talk about distributed systems — the inbox is open."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* ------------------------------- Details ------------------------------ */}
          <Reveal variants={fadeInLeft} className="lg:col-span-5">
            <GlassCard
              hover={false}
              className="h-full p-6 sm:p-7"
              gradient="from-brand-500 to-accent-400"
            >
              <h3 className="text-lg font-semibold">Contact details</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Based in {SITE.locationShort} and comfortable working across time zones. I reply to
                most messages within a day.
              </p>

              <ul className="mt-6 flex flex-col gap-3">
                {CONTACT_CHANNELS.map(({ label, value, href, Icon }) => {
                  const content = (
                    <>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500/12 text-brand-400 transition-colors group-hover:bg-brand-500/20">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] tracking-wider text-subtle uppercase">
                          {label}
                        </span>
                        <span className="block truncate text-sm font-medium">{value}</span>
                      </span>
                    </>
                  );

                  return (
                    <li key={label}>
                      {href ? (
                        <motion.a
                          href={href}
                          {...(href.startsWith('http')
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                          whileHover={{ x: 4 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          className="group flex items-center gap-3 rounded-xl p-2 transition-colors"
                        >
                          {content}
                        </motion.a>
                      ) : (
                        <div className="group flex items-center gap-3 p-2">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/8 p-3.5">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <p className="text-[13px] text-muted">{SITE.availability}</p>
              </div>
            </GlassCard>
          </Reveal>

          {/* -------------------------------- Form -------------------------------- */}
          <Reveal variants={fadeInRight} className="lg:col-span-7">
            <GlassCard
              hover={false}
              className="h-full p-6 sm:p-7"
              gradient="from-violet-500 to-fuchsia-400"
            >
              <h3 className="text-lg font-semibold">Send a message</h3>
              <p className="mt-2 text-sm text-muted">
                Fill this in and it lands straight in my inbox.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    id="name"
                    label="Name"
                    placeholder="Jane Doe"
                    value={values.name}
                    error={touched.name ? errors.name : undefined}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="name"
                    maxLength={FIELD_LIMITS.name.max}
                    disabled={isSubmitting}
                  />
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="jane@company.com"
                    value={values.email}
                    error={touched.email ? errors.email : undefined}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="email"
                    disabled={isSubmitting}
                  />
                </div>

                <Field
                  id="subject"
                  label="Subject"
                  placeholder="Backend engineer role at …"
                  value={values.subject}
                  error={touched.subject ? errors.subject : undefined}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={FIELD_LIMITS.subject.max}
                  disabled={isSubmitting}
                />

                <Field
                  id="message"
                  label="Message"
                  placeholder="Tell me a little about what you're building…"
                  value={values.message}
                  error={touched.message ? errors.message : undefined}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={FIELD_LIMITS.message.max}
                  disabled={isSubmitting}
                  multiline
                  hint={`${values.message.length}/${FIELD_LIMITS.message.max}`}
                />

                <div className="flex flex-wrap items-center gap-3">
                  <Button type="submit" size="lg" glow disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>

                {/* Status region — announced to screen readers on change. */}
                <div aria-live="polite" role="status" className="min-h-6">
                  <AnimatePresence mode="wait">
                    {feedback ? (
                      <motion.p
                        key={feedback}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={cn(
                          'flex items-start gap-2 rounded-xl border p-3 text-[13px]',
                          status === 'success'
                            ? 'border-emerald-500/30 bg-emerald-500/8 text-emerald-400'
                            : 'border-rose-500/30 bg-rose-500/8 text-rose-400',
                        )}
                      >
                        {status === 'success' ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                        ) : (
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                        )}
                        {feedback}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </div>
              </form>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Form field                                  */
/* -------------------------------------------------------------------------- */

interface FieldProps {
  id: keyof ContactFormValues;
  label: string;
  value: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
  disabled?: boolean;
  multiline?: boolean;
  hint?: string;
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  onBlur,
  type = 'text',
  placeholder,
  autoComplete,
  maxLength,
  disabled,
  multiline,
  hint,
}: FieldProps) {
  const errorId = `${id}-error`;

  const inputClasses = cn(
    'w-full rounded-xl border bg-[color:var(--glass)] px-3.5 py-2.5 text-sm',
    'placeholder:text-subtle transition-colors duration-200',
    'focus:ring-2 focus:ring-brand-500/40 focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-60',
    error
      ? 'border-rose-500/60 focus:border-rose-500'
      : 'border-[color:var(--border)] focus:border-brand-500/60',
  );

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-[13px] font-medium">
          {label}
          <span className="ml-0.5 text-rose-400" aria-hidden>
            *
          </span>
        </label>
        {hint ? (
          <span className="font-mono text-[11px] text-subtle tabular-nums">{hint}</span>
        ) : null}
      </div>

      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          required
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(inputClasses, 'min-h-32 resize-y')}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          maxLength={maxLength}
          disabled={disabled}
          required
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={inputClasses}
        />
      )}

      <AnimatePresence>
        {error ? (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1.5 text-[12px] text-rose-400"
          >
            <AlertCircle className="h-3 w-3 shrink-0" aria-hidden />
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
