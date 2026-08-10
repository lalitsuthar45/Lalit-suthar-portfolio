import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'accent' | 'outline';
}

const VARIANTS = {
  default: 'glass text-muted',
  accent: 'border border-brand-500/30 bg-brand-500/10 text-brand-600 dark:text-brand-400',
  outline: 'border border-[color:var(--border-strong)] text-subtle',
} as const;

/** Small pill used for tech-stack chips and section eyebrows. */
export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap',
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
