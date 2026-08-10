'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScrolled } from '@/hooks';

/** Floating scroll-to-top button, revealed once the user is well down the page. */
export function BackToTop() {
  const show = useScrolled(600);

  function scrollToTop() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  }

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className="group fixed right-5 bottom-5 z-70 grid h-12 w-12 place-items-center rounded-full glass-strong text-brand-400 shadow-lg sm:right-8 sm:bottom-8"
        >
          <span className="absolute inset-0 rounded-full bg-linear-to-r from-brand-500 to-accent-400 opacity-0 blur-md transition-opacity group-hover:opacity-60" />
          <ArrowUp className="relative h-5 w-5" aria-hidden />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
