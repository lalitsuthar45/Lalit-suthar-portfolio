'use client';

import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { FOOTER_LINKS, SITE, SOCIALS } from '@/constants/site';
import { Reveal } from '@/components/ui/Reveal';
import { fadeInUp } from '@/animations/variants';
import { currentYear } from '@/utils/format';
import { scrollToSection } from '@/lib/utils';

const SOCIAL_ITEMS = [
  { href: SOCIALS.github, label: 'GitHub', Icon: Github },
  { href: SOCIALS.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: SOCIALS.email, label: 'Email', Icon: Mail },
  { href: SOCIALS.instagram, label: 'Instagram', Icon: Instagram },
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[color:var(--border)]">
      {/* Gradient wash rising from the bottom edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-linear-to-t from-brand-600/12 to-transparent"
      />

      <div className="container-page py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Identity */}
          <Reveal className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-linear-to-br from-brand-500 to-accent-500 text-sm font-bold text-white">
                LS
              </span>
              <div>
                <p className="text-base font-semibold">{SITE.name}</p>
                <p className="text-[13px] text-muted">{SITE.headline}</p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">{SITE.shortBio}</p>

            <address className="mt-5 flex flex-col gap-2 text-sm text-muted not-italic">
              <span className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-brand-400" aria-hidden />
                {SITE.location}
              </span>
              <a
                href={SOCIALS.email}
                className="flex w-fit items-center gap-2 transition-colors hover:text-brand-400"
              >
                <Mail className="h-3.5 w-3.5 text-brand-400" aria-hidden />
                {SITE.email}
              </a>
            </address>
          </Reveal>

          {/* Quick links */}
          <Reveal delay={0.08} className="lg:col-span-3">
            <h2 className="text-sm font-semibold tracking-wider uppercase">Quick Links</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 lg:grid-cols-1">
              {FOOTER_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(link.id);
                    }}
                    className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-brand-400"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Social + resume */}
          <Reveal delay={0.16} className="lg:col-span-4">
            <h2 className="text-sm font-semibold tracking-wider uppercase">Let&apos;s Connect</h2>
            <p className="mt-4 text-sm text-muted">{SITE.availability}.</p>

            <ul className="mt-5 flex flex-wrap gap-2.5">
              {SOCIAL_ITEMS.map(({ href, label, Icon }, index) => (
                <motion.li
                  key={label}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * index }}
                >
                  <motion.a
                    href={href}
                    aria-label={label}
                    {...(href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    whileHover={{ y: -4, scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="grid h-11 w-11 place-items-center rounded-xl glass text-muted transition-colors hover:border-brand-500/50 hover:text-brand-400"
                  >
                    <Icon className="h-4.5 w-4.5" aria-hidden />
                  </motion.a>
                </motion.li>
              ))}
            </ul>

            <a
              href={SITE.resumePath}
              download
              className="mt-6 inline-flex items-center gap-2 rounded-xl glass px-4 py-2.5 text-sm font-medium transition-colors hover:border-brand-500/50 hover:text-brand-400"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download Resume
            </a>
          </Reveal>
        </div>

        {/* Legal line */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[color:var(--border)] pt-7 text-[13px] text-subtle sm:flex-row">
          <p>
            &copy; {currentYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
