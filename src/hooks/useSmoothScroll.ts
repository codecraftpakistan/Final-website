import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export const useSmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Defer Lenis initialization to prevent forced reflow during initial render
    const timeoutId = setTimeout(() => {
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      });

      function raf(time: number) {
        lenisRef.current?.raf(time);
        rafIdRef.current = requestAnimationFrame(raf);
      }

      rafIdRef.current = requestAnimationFrame(raf);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      lenisRef.current?.destroy();
    };
  }, []);
};