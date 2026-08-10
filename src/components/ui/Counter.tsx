'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks';
import { formatNumber } from '@/utils/format';

interface CounterProps {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * Counts up once the element scrolls into view.
 * Writes straight to the DOM node so the tween never re-renders React.
 */
export function Counter({
  to,
  from = 0,
  duration = 1.8,
  prefix = '',
  suffix = '',
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReduced = usePrefersReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView || done) return;

    if (prefersReduced) {
      setDone(true);
      return;
    }

    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        if (ref.current) ref.current.textContent = formatNumber(Math.round(value));
      },
      onComplete: () => setDone(true),
    });

    return () => controls.stop();
  }, [inView, done, from, to, duration, prefersReduced]);

  return (
    <span className={className}>
      {prefix}
      <span ref={ref} suppressHydrationWarning>
        {formatNumber(done ? to : from)}
      </span>
      {suffix}
    </span>
  );
}
