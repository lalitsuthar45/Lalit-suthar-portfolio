'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsTouchDevice, useMounted, usePrefersReducedMotion } from '@/hooks';

/** Elements that should trigger the expanded "interactive" cursor state. */
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, [data-cursor]';

/**
 * Two-part cursor: a small solid dot that tracks precisely, plus a larger ring
 * that lags behind on a spring. Native cursor is hidden only while this is
 * active — and it is skipped entirely on touch and under reduced-motion.
 */
export function CustomCursor() {
  const mounted = useMounted();
  const isTouch = useIsTouchDevice();
  const prefersReduced = usePrefersReducedMotion();
  const disabled = !mounted || isTouch || prefersReduced;

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 320, damping: 30, mass: 0.35 });
  const ringY = useSpring(dotY, { stiffness: 320, damping: 30, mass: 0.35 });

  useEffect(() => {
    if (disabled) return;

    const onMove = (event: PointerEvent) => {
      dotX.set(event.clientX);
      dotY.set(event.clientY);
      setVisible(true);

      const target = event.target as Element | null;
      setHovering(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);

    // Hide the OS cursor only while the custom one is mounted and enabled.
    document.documentElement.style.cursor = 'none';

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.style.cursor = '';
    };
  }, [disabled, dotX, dotY]);

  if (disabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-100 hidden lg:block">
      <motion.div
        style={{ x: dotX, y: dotY }}
        animate={{ opacity: visible ? 1 : 0, scale: pressed ? 0.6 : 1 }}
        transition={{ duration: 0.15 }}
        className="absolute -mt-[3px] -ml-[3px] h-1.5 w-1.5 rounded-full bg-brand-400"
      />
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.9 : 1,
          borderColor: hovering ? 'rgba(34,211,238,0.85)' : 'rgba(59,130,246,0.5)',
        }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -mt-4 -ml-4 h-8 w-8 rounded-full border backdrop-blur-[1px]"
      />
    </div>
  );
}
