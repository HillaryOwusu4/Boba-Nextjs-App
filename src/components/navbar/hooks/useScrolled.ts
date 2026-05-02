'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true once the page has scrolled past `threshold` pixels.
 * Uses a passive scroll listener so it doesn't block the GSAP / Lenis loop.
 */
export function useScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);

  return scrolled;
}
