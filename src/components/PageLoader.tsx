'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import gsap from 'gsap';

export default function PageLoader() {
  const isClient = useSyncExternalStore(() => () => {}, () => true, () => false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let current = 0;

    const tick = () => {
      const inc = Math.random() * 12 + 4;
      current = Math.min(current + inc, 100);
      setProgress(Math.round(current));

      if (current < 100) {
        setTimeout(tick, 70 + Math.random() * 90);
      } else {
        setTimeout(() => {
          gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.65,
            ease: 'power3.inOut',
            onComplete: () => setDone(true),
          });
        }, 350);
      }
    };

    setTimeout(tick, 150);
  }, []);

  if (!isClient || done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: 'var(--color-lemon)' }}
    >
      {/* brand label */}
      <p
        className="mb-10 text-xs font-black uppercase tracking-[0.5em] opacity-60"
        style={{ color: 'var(--color-charcoal)' }}
      >
        Loading
      </p>

      {/* bar wrapper */}
      <div className="relative w-72 sm:w-96">
        {/* floating percentage badge */}
        <div
          className="absolute -top-9 flex flex-col items-center transition-[left] duration-75"
          style={{
            left: `clamp(0px, calc(${progress}% - 21px), calc(100% - 42px))`,
          }}
        >
          <div
            className="text-white text-xs font-bold px-3 py-1 rounded-md min-w-[42px] text-center leading-none"
            style={{ backgroundColor: 'var(--color-charcoal)' }}
          >
            {progress}%
          </div>
          {/* caret */}
          <div
            className="w-0 h-0"
            style={{
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid var(--color-charcoal)',
            }}
          />
        </div>

        {/* track */}
        <div
          className="h-5 w-full rounded-full overflow-hidden"
          style={{
            backgroundColor: 'rgba(26,26,26,0.15)',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.25)',
          }}
        >
          {/* fill */}
          <div
            className="relative h-full rounded-full transition-[width] duration-75"
            style={{
              width: `${progress}%`,
              background:
                'linear-gradient(90deg, var(--color-charcoal-700) 0%, var(--color-charcoal) 100%)',
              boxShadow:
                '0 0 14px rgba(26,26,26,0.45), 0 0 4px rgba(26,26,26,0.3)',
            }}
          >
            {/* segment texture overlay — mimics the pixel grid on the ref */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, transparent 0px, transparent 9px, rgba(255,255,255,0.08) 9px, rgba(255,255,255,0.08) 10px)',
              }}
            />
            {/* leading-edge glow */}
            <div
              className="absolute right-0 top-0 h-full w-6 rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.22))',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
