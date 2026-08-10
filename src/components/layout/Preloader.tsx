'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SITE } from '@/constants/site';
import { useLockBodyScroll, usePrefersReducedMotion } from '@/hooks';

/**
 * First-paint loading screen: initials draw in, a progress bar fills to 100%,
 * then the whole overlay wipes upward.
 *
 * It only shows once per browser session (sessionStorage), so navigating back
 * to the site does not replay it.
 */
export function Preloader() {
  const prefersReduced = usePrefersReducedMotion();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useLockBodyScroll(loading);

  useEffect(() => {
    // Skip entirely for repeat visits in this session, and under reduced-motion.
    const alreadySeen = sessionStorage.getItem('preloader-shown') === 'true';
    if (alreadySeen || prefersReduced) {
      setLoading(false);
      return;
    }

    // Ease towards 100% so the bar decelerates rather than moving linearly.
    const interval = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 - prev) * 0.18 + 1.5;
        return next >= 99.5 ? 100 : next;
      });
    }, 55);

    return () => window.clearInterval(interval);
  }, [prefersReduced]);

  useEffect(() => {
    if (progress < 100) return;

    const timer = window.setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('preloader-shown', 'true');
    }, 350);

    return () => window.clearTimeout(timer);
  }, [progress]);

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          exit={{ y: '-100%', transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-999 flex flex-col items-center justify-center gap-8 bg-[color:var(--bg)]"
        >
          <div className="absolute inset-0 -z-10 opacity-60">
            <div className="absolute top-1/3 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-600/25 blur-[100px]" />
          </div>

          {/* Initials, drawn as an SVG stroke. */}
          <svg
            width="96"
            height="96"
            viewBox="0 0 100 100"
            fill="none"
            className="drop-shadow-[0_0_24px_rgba(59,130,246,0.5)]"
            aria-hidden
          >
            <defs>
              <linearGradient id="preloader-stroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="55%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <motion.path
  d="M24 20 V80 H54"
  stroke="url(#preloader-stroke)"
  strokeWidth="6"
  strokeLinecap="round"
  strokeLinejoin="round"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
/>
            <motion.path
              d="M62 74 Q78 82 84 70 Q88 58 74 52 Q60 46 64 34 Q70 22 86 30"
              stroke="url(#preloader-stroke)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>

          <div className="flex flex-col items-center gap-3">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm font-medium tracking-[0.32em] text-muted uppercase"
            >
              {SITE.name}
            </motion.p>

            <div className="h-[3px] w-48 overflow-hidden rounded-full bg-[color:var(--border)]">
              <motion.div
                className="h-full rounded-full bg-linear-to-r from-brand-500 via-accent-400 to-violet-accent"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="font-mono text-xs text-subtle tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
