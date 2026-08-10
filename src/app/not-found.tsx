import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import { GridBackground } from '@/components/effects/GridBackground';
import { AuroraBackground } from '@/components/effects/AuroraBackground';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-24">
      <AuroraBackground />
      <GridBackground animated />

      <div className="relative flex max-w-lg flex-col items-center text-center">
        <p className="text-[clamp(5rem,22vw,11rem)] leading-none font-bold tracking-tighter text-gradient">
          404
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          This page took a wrong turn
        </h1>

        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          The link may be broken, or the page may have moved. Everything worth seeing lives on the
          home page — head back and pick up where you left off.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-brand-600 via-brand-500 to-accent-500 px-6 text-[15px] font-medium text-white shadow-[0_10px_40px_-12px_rgba(59,130,246,0.75)]"
          >
            <Home className="h-4 w-4" aria-hidden />
            Back to Home
          </Link>

          <Link
            href="/#projects"
            className="inline-flex h-12 items-center gap-2 rounded-xl glass px-6 text-[15px] font-medium transition-colors hover:border-brand-500/50 hover:text-brand-400"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
