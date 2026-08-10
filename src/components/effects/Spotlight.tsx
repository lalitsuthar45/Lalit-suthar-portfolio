'use client';

import { useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { useIsTouchDevice, usePrefersReducedMotion } from '@/hooks';

/**
 * Soft radial glow that trails the cursor across the whole page.
 * Position lives in motion values, so tracking never re-renders React.
 */
export function Spotlight() {
  const isTouch = useIsTouchDevice();
  const prefersReduced = usePrefersReducedMotion();
  const disabled = isTouch || prefersReduced;

  const rawX = useMotionValue(-500);
  const rawY = useMotionValue(-500);
  const x = useSpring(rawX, { stiffness: 60, damping: 22, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 60, damping: 22, mass: 0.6 });

  const background = useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, rgba(59,130,246,0.10), transparent 70%)`;

  useEffect(() => {
    if (disabled) return;

    const onMove = (event: PointerEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [disabled, rawX, rawY]);

  if (disabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ background }}
      className="pointer-events-none fixed inset-0 z-0 hidden lg:block"
    />
  );
}
