import { cn } from '@/lib/utils';

/**
 * Slow-moving gradient blobs behind the hero and contact sections.
 * Three blurred, animated radial fills — cheap, and entirely CSS-driven.
 */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 -z-20 overflow-hidden', className)}
    >
      <div className="absolute -top-40 -left-32 h-[38rem] w-[38rem] animate-aurora rounded-full bg-brand-600/25 blur-[120px]" />
      <div
        className="absolute top-1/4 -right-40 h-[34rem] w-[34rem] animate-aurora rounded-full bg-violet-accent/20 blur-[120px]"
        style={{ animationDelay: '-7s' }}
      />
      <div
        className="absolute bottom-[-14rem] left-1/3 h-[32rem] w-[32rem] animate-aurora rounded-full bg-accent-500/20 blur-[120px]"
        style={{ animationDelay: '-14s' }}
      />
    </div>
  );
}
