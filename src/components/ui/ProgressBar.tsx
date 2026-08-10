'use client';

import { motion } from 'framer-motion';
import { viewportOnce } from '@/animations/variants';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  label: string;
  /** Percentage, 0–100. */
  value: number;
  gradient?: string;
  delay?: number;
  showValue?: boolean;
  className?: string;
}

/** Animated skill meter that fills when it scrolls into view. */
export function ProgressBar({
  label,
  value,
  gradient = 'from-brand-500 to-accent-400',
  delay = 0,
  showValue = true,
  className,
}: ProgressBarProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-[13px] font-medium">{label}</span>
        {showValue ? (
          <span className="font-mono text-[11px] text-subtle tabular-nums">{value}%</span>
        ) : null}
      </div>

      <div
        role="progressbar"
        aria-label={`${label} proficiency`}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--border)]"
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={viewportOnce}
          transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
          className={cn('relative h-full rounded-full bg-linear-to-r', gradient)}
        >
          {/* Travelling highlight along the filled portion. */}
          <span className="absolute inset-0 animate-shimmer rounded-full bg-linear-to-r from-transparent via-white/40 to-transparent bg-[length:200%_100%]" />
        </motion.div>
      </div>
    </div>
  );
}
