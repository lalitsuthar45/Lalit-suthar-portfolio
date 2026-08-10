'use client';

import type { ElementType, ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportOnce } from '@/animations/variants';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Motion variants to apply. Defaults to a fade + rise. */
  variants?: Variants;
  delay?: number;
  as?: ElementType;
  /** Re-run the animation every time the element re-enters the viewport. */
  repeat?: boolean;
}

/**
 * Scroll-triggered reveal wrapper. One component behind every fade-in,
 * slide-in and blur-in on the page.
 */
export function Reveal({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
  as = 'div',
  repeat = false,
}: RevealProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={repeat ? { amount: 0.2 } : viewportOnce}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  as?: ElementType;
}

/** Parent wrapper that reveals `Reveal` / `motion` children in sequence. */
export function Stagger({
  children,
  className,
  stagger = 0.09,
  delayChildren = 0,
  as = 'div',
}: StaggerProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(stagger, delayChildren)}
    >
      {children}
    </MotionTag>
  );
}
