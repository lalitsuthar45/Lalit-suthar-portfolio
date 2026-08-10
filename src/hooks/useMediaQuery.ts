'use client';

import { useEffect, useState } from 'react';

/**
 * Subscribe to a CSS media query.
 * Starts as `false` on the server so SSR and the first client paint agree.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Coarse pointer (touch) — used to disable cursor and tilt effects. */
export const useIsTouchDevice = () => useMediaQuery('(pointer: coarse)');

export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');

/** Honours the OS reduce-motion setting; every animated component checks this. */
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
