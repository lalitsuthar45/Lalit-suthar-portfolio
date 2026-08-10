/**
 * Route-level loading UI. The animated Preloader in the root layout covers the
 * first paint; this is the lightweight fallback for streamed segments.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[100svh] flex-col items-center justify-center gap-5"
    >
      <div className="relative h-14 w-14">
        <span className="absolute inset-0 rounded-full border-2 border-[color:var(--border)]" />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-brand-500 border-r-accent-400" />
      </div>
      <p className="text-sm tracking-[0.28em] text-muted uppercase">Loading</p>
      <span className="sr-only">Loading content, please wait.</span>
    </div>
  );
}
