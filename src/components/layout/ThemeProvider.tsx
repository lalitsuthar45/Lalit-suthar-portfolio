'use client';

import type { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * Wraps next-themes. `attribute="class"` matches the `.dark` variant declared
 * in globals.css; `disableTransitionOnChange` stops every element from
 * cross-fading when the theme flips.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      storageKey="lalit-portfolio-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
