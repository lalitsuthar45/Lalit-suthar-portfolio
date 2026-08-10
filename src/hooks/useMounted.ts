'use client';

import { useEffect, useState } from 'react';

/** `true` only after hydration — guards browser-only rendering. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
