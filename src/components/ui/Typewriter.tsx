'use client';

import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

interface TypewriterProps {
  /** Phrases cycled through, typed then deleted in order. */
  words: readonly string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  /** Pause once a word is fully typed, in ms. */
  holdDelay?: number;
  className?: string;
  cursorClassName?: string;
}

/**
 * Type-and-delete headline animation.
 * Falls back to the first phrase, statically, under reduced-motion.
 */
export function Typewriter({
  words,
  typeSpeed = 65,
  deleteSpeed = 32,
  holdDelay = 1600,
  className,
  cursorClassName,
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced || words.length === 0) return;

    const current = words[wordIndex % words.length];

    // Word fully typed — hold, then start deleting.
    if (!isDeleting && text === current) {
      const timer = setTimeout(() => setIsDeleting(true), holdDelay);
      return () => clearTimeout(timer);
    }

    // Word fully deleted — advance to the next one.
    if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((index) => (index + 1) % words.length);
      return;
    }

    const timer = setTimeout(
      () => {
        setText((prev) =>
          isDeleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
        );
      },
      isDeleting ? deleteSpeed : typeSpeed,
    );

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, holdDelay, prefersReduced]);

  const display = prefersReduced ? words[0] : text;

  return (
    <span className={cn('inline-flex items-baseline', className)}>
      {/* Announce the full list once, rather than every keystroke. */}
      <span className="sr-only">{words.join(', ')}</span>
      <span aria-hidden className="text-gradient">
        {display}
      </span>
      <span
        aria-hidden
        className={cn(
          'ml-1 inline-block w-[2px] self-stretch animate-blink bg-linear-to-b from-brand-400 to-accent-400',
          cursorClassName,
        )}
      />
    </span>
  );
}
