'use client';

import type { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  /** Tailwind gradient stops for the hover glow, e.g. `from-blue-500 to-cyan-400`. */
  gradient?: string;
  /** Lift the card on hover. */
  hover?: boolean;
  /** Draw the animated gradient hairline border. */
  bordered?: boolean;
}

/**
 * The frosted surface used by nearly every card on the site: glass fill,
 * gradient hairline, and a gradient bloom that fades in on hover.
 */
export function GlassCard({
  children,
  className,
  gradient = 'from-brand-500 to-accent-400',
  hover = true,
  bordered = true,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'group/card relative overflow-hidden rounded-2xl glass',
        bordered && 'gradient-border',
        hover &&
          'transition-shadow duration-500 hover:shadow-[0_24px_70px_-30px_rgba(59,130,246,0.6)]',
        className,
      )}
      {...(hover
        ? { whileHover: { y: -6 }, transition: { type: 'spring', stiffness: 300, damping: 26 } }
        : {})}
      {...props}
    >
      {/* Gradient bloom revealed on hover. Tagged so touch layouts can drop it. */}
      <span
        aria-hidden
        className={cn(
          'card-bloom pointer-events-none absolute -top-24 left-1/2 h-48 w-[130%] -translate-x-1/2 rounded-full bg-linear-to-r opacity-0 blur-3xl transition-opacity duration-500 group-hover/card:opacity-25',
          gradient,
        )}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
