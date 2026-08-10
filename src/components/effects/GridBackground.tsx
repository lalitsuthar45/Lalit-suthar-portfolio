import { cn } from '@/lib/utils';

interface GridBackgroundProps {
  className?: string;
  /** Grid cell size in pixels. */
  size?: number;
  /** Slowly drift the grid. */
  animated?: boolean;
  /** Fade the grid out towards the edges. */
  fade?: boolean;
}

/** Blueprint grid backdrop. Pure CSS — no JS, no layout cost. */
export function GridBackground({
  className,
  size = 60,
  animated = false,
  fade = true,
}: GridBackgroundProps) {
  const mask = fade
    ? 'radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)'
    : undefined;

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 -z-10',
        animated && 'animate-grid-drift',
        className,
      )}
      style={{
        backgroundImage:
          'linear-gradient(to right, var(--grid-line) 1px, transparent 1px),' +
          'linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
        backgroundSize: `${size}px ${size}px`,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}
