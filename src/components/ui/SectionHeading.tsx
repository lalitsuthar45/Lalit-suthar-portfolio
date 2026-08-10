'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { fadeInUp, viewportOnce } from '@/animations/variants';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  /** Portion of the title rendered in the brand gradient. */
  highlight?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium tracking-[0.18em] text-brand-600 dark:text-brand-400 uppercase">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
          </span>
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
          {title}
          {highlight ? <span className="text-gradient"> {highlight}</span> : null}
        </h2>
      </Reveal>

      {/* Gradient underline that draws itself in. */}
      <motion.span
        aria-hidden
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'h-px w-24 bg-linear-to-r from-brand-500 via-accent-400 to-transparent',
          align === 'center' ? 'origin-center' : 'origin-left',
        )}
      />

      {description ? (
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.12 }}
          className="max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base"
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
