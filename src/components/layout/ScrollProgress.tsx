'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Gradient bar across the top of the viewport showing read progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-80 h-[3px] origin-left bg-linear-to-r from-brand-500 via-accent-400 to-violet-accent"
    />
  );
}
