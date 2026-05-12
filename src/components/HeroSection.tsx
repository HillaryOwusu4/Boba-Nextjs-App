'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Button from './navbar/atoms/Button';

const TOTAL_FRAMES = 121;
const frameSrc = (i: number) =>
  `/frames/frame_${String(i).padStart(4, '0')}.jpg`;

/** Helper component to split text into .char spans for GSAP character staggering */
const SplitText = ({ text }: { text: string }) => {
  return (
    <>
      {text.split('').map((char, i) => (
        char === ' ' 
          ? <span key={i} className="char inline-block whitespace-pre"> </span> 
          : <span key={i} className="char inline-block origin-bottom">{char}</span>
      ))}
    </>
  );
};

export default function HeroSection() {
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const loaderRef       = useRef<HTMLDivElement>(null);
  const welcomeBackRef  = useRef<HTMLHeadingElement>(null);
  const loaderBarRef    = useRef<HTMLDivElement>(null);
  const loaderCountRef  = useRef<HTMLSpanElement>(null);
  const progressBarRef  = useRef<HTMLDivElement>(null);
  const currentFrameRef = useRef(0);
  const counterObj      = useRef({ value: 0 });
  const textSetsRef     = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    /* ── Auto-fit "Daddy Boba" to exact viewport width ── */
    function fitWelcome() {
      const el = welcomeBackRef.current;
      if (!el) return;
      el.style.fontSize = '16px';
      const ratio = window.innerWidth / el.scrollWidth;
      const size  = `${16 * ratio}px`;
      el.style.fontSize = size;
      document.querySelectorAll<HTMLElement>('.welcome-clone').forEach(c => {
        c.style.fontSize = size;
      });
    }
    fitWelcome();
    window.addEventListener('resize', fitWelcome);

    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d')!;
    let   dpr    = window.devicePixelRatio || 1;

    /* ── Canvas sizing ──────────────────────────── */
    function resizeCanvas() {
      dpr = window.devicePixelRatio || 1;
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = window.innerWidth  + 'px';
      canvas.style.height = window.innerHeight + 'px';
      const img = frames[currentFrameRef.current];
      if (img?.complete && img.naturalWidth) drawFrame(currentFrameRef.current);
    }

    /* ── Cover-fit draw ─────────────────────────── */
    function drawFrame(index: number) {
      const img = frames[index];
      if (!img?.complete || !img.naturalWidth) return;
      const cw = canvas.width, ch = canvas.height;
      const iw = img.naturalWidth * dpr, ih = img.naturalHeight * dpr;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale, dh = ih * scale;
      const dx = (cw - dw) / 2, dy = (ch - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    function setFrame(index: number) {
      if (index === currentFrameRef.current) return;
      currentFrameRef.current = index;
      drawFrame(index);
    }

    /* ── Preload frames ─────────────────────────── */
    const frames: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;

    function preload(): Promise<void> {
      return new Promise((resolve) => {
        for (let i = 0; i < TOTAL_FRAMES; i++) {
          const img = new Image();
          frames[i] = img;
          img.src   = frameSrc(i + 1);

          img.onload = img.onerror = () => {
            loaded++;
            const target = Math.round((loaded / TOTAL_FRAMES) * 100);

            gsap.to(counterObj.current, {
              value: target,
              duration: 0.4,
              ease: 'power2.out',
              overwrite: true,
              onUpdate: () => {
                const v = Math.round(counterObj.current.value);
                if (loaderCountRef.current)
                  loaderCountRef.current.textContent = String(v);
                if (loaderBarRef.current)
                  loaderBarRef.current.style.width = v + '%';
              },
            });

            if (loaded === TOTAL_FRAMES) {
              gsap.to(counterObj.current, {
                value: 100,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: true,
                onUpdate: () => {
                  const v = Math.round(counterObj.current.value);
                  if (loaderCountRef.current)
                    loaderCountRef.current.textContent = String(v);
                  if (loaderBarRef.current)
                    loaderBarRef.current.style.width = v + '%';
                },
                onComplete: resolve,
              });
            }
          };
        }
      });
    }

    /* ── Boot ───────────────────────────────────── */
    async function boot() {
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      await preload();

      drawFrame(0);

      requestAnimationFrame(() => {
        canvas.style.transition = 'opacity 0.55s ease';
        canvas.style.opacity    = '1';
      });

      const loader = loaderRef.current;
      if (loader) {
        gsap.to(loader, {
          opacity: 0, duration: 0.5, ease: 'power2.inOut',
          onComplete: () => { 
            loader.style.display = 'none'; 
            // Entrance animation for first text set
            if (texts[0]) {
              gsap.fromTo(texts[0], 
                { autoAlpha: 0, y: 40 }, 
                { autoAlpha: 1, y: 0, duration: 1.2, ease: "power3.out" }
              );
              // Also animate characters slightly staggered for premium feel
              const q0 = gsap.utils.selector(texts[0]);
              gsap.from(q0('.char'), {
                opacity: 0,
                y: 20,
                stagger: 0.01,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.2
              });
            }
          },
        });
      }

      /* ── Lenis smooth scroll ───────────────────── */
      const lenis = new Lenis({ lerp: 0.18 });
      (window as any).lenis = lenis; // Expose globally for control
      lenis.on('scroll', () => ScrollTrigger.update());
      gsap.ticker.add((time) => { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);

      /* ── Frame scrub ─────────────────────────── */
      ScrollTrigger.create({
        trigger: '#scroll-section',
        start:   'top top',
        end:     'bottom bottom',
        scrub:   true,
        onUpdate(self) {
          const idx = Math.min(
            Math.round(self.progress * (TOTAL_FRAMES - 1)),
            TOTAL_FRAMES - 1,
          );
          setFrame(idx);
        },
      });

      /* ── Top progress bar ────────────────────── */
      ScrollTrigger.create({
        trigger: 'body', start: 'top top', end: 'bottom bottom',
        onUpdate(self) {
          if (progressBarRef.current)
            progressBarRef.current.style.width = self.progress * 100 + '%';
        },
      });

      /* ── Crossfade Text Sets ─────────────────── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#scroll-section',
          start:   'top top',
          end:     'bottom bottom',
          scrub:   true,
        }
      });
      
      const texts = textSetsRef.current;
      // Hide sets initially
      if (texts[0]) gsap.set(texts[0], { autoAlpha: 1 }); // Controlled by entrance above
      if (texts[1]) gsap.set(texts[1], { autoAlpha: 0, y: 100 });
      if (texts[2]) gsap.set(texts[2], { autoAlpha: 0, y: 100 });

      // Transitions along the 500vh scroll
      if (texts[0] && texts[1] && texts[2]) {
        const q0 = gsap.utils.selector(texts[0]);
        const q1 = gsap.utils.selector(texts[1]);
        const q2 = gsap.utils.selector(texts[2]);

        // Sequence 1: Fades out
        tl.to(texts[0], { autoAlpha: 0, y: -40, duration: 1, ease: "power1.inOut" }, 1.0)
          
        // Sequence 2: Glides straight up from bottom
          .to(texts[1], { autoAlpha: 1, y: 0, duration: 1.5, ease: "power3.out" }, 1.8)
          
        // Sequence 2: Fade out
          .to(texts[1], { autoAlpha: 0, y: -40, duration: 1, ease: "power1.inOut" }, 5.0)
          
        // Sequence 3: Glides straight up from bottom
          .to(texts[2], { autoAlpha: 1, y: 0, duration: 1.5, ease: "power3.out" }, 5.8);
      }

      (canvas as any)._lenis = lenis;
    }

    boot();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', fitWelcome);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      const l = (canvas as any)._lenis as Lenis | undefined;
      if (l) { gsap.ticker.remove(() => {}); l.destroy(); }
    };
  }, []);

  /* ── Shared "Daddy Boba" logo text style ────── */
  const welcomeStyle = {
    position:      'absolute' as const,
    top:           '20%',
    left:          '50%',
    transform:     'translate(-50%, -50%)',
    fontFamily:    'var(--font-display)',
    fontWeight:    700,
    color:         'rgba(255, 255, 255, 0.93)',
    letterSpacing: '-0.04em',
    lineHeight:    0.85,
    whiteSpace:    'nowrap'  as const,
    textAlign:     'center'  as const,
    userSelect:    'none'    as const,
    pointerEvents: 'none'    as const,
  };

  return (
    <>
      {/* ════════════════════════════════════════════
          LOADER — lemon-yellow void + sandwich hero
          ════════════════════════════════════════════ */}
      <div
        ref={loaderRef}
        className="fixed inset-0 overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 50%, #FFE84D 0%, #F2D64B 45%, #E6BF00 100%)',
          zIndex:           'var(--z-loader)',
          overflow:         'hidden',
          scrollbarWidth:   'none',
          msOverflowStyle:  'none',
        } as React.CSSProperties}
      >
        {/* Soft centre radial glow */}
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background:
              'radial-gradient(ellipse 52% 52% at 50% 50%, rgba(255,255,255,0.26) 0%, transparent 65%)',
          }}
        />

        {/* ── Layer 1 (back) — Daddy Boba middle strip ──
            Clips to the inner ~34 vw so only the letters
            the counter "sandwiches" remain on this layer  */}
        <h1
          ref={welcomeBackRef}
          style={{
            ...welcomeStyle,
            zIndex:    1,
            clipPath:  'inset(0 33vw 0 33vw)',   /* show centre 34 vw  */
          }}
        >
          cafedeboba
        </h1>

        {/* ── Layer 2 (middle) — Loading counter ────── */}
        <div
          style={{
            position:       'absolute',
            top:            '50%',
            left:           '50%',
            transform:      'translate(-50%, -50%)',
            zIndex:         20,
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            gap:            '3.5vh',
          }}
        >
          {/* Giant counter — same white logo aesthetic as the title */}
          {/* <span
            ref={loaderCountRef}
            style={{
              fontFamily:         'var(--font-display)',
              fontWeight:         700,
              fontSize:           'clamp(5rem, 22vw, 18rem)',
              color:              'rgba(255, 255, 255, 0.97)',
              lineHeight:         1,
              letterSpacing:      '-0.04em',
              fontVariantNumeric: 'tabular-nums',
              filter:             'drop-shadow(0 6px 24px rgba(255,255,255,0.25))',
            }}
          >
            0
          </span> */}

          {/* Progress track — white fill on semi-transparent dark track */}
          <div
            style={{
              width:        '40vw',
              height:       '3px',
              background:   'rgba(0, 0, 0, 0.18)',
              borderRadius: 'var(--radius-pill)',
              overflow:     'hidden',
            }}
          >
            <div
              ref={loaderBarRef}
              style={{
                height:       '100%',
                width:        '0%',
                background:   'rgba(255, 255, 255, 0.95)',
                borderRadius: 'var(--radius-pill)',
              }}
            />
          </div>
        </div>

        {/* ── Layer 3 (front) — CafeDeboba left wing ─────
            Shows the left 33 vw — these letters sit
            visually IN FRONT of the counter           */}
        <div
          style={{
            position:      'absolute',
            inset:         0,
            zIndex:        30,
            pointerEvents: 'none',
            clipPath:      'inset(0 67vw 0 0)',    /* keep left  33 vw  */
          }}
        >
          <h1 className="welcome-clone" style={welcomeStyle}>cafedeboba</h1>
        </div>

        {/* ── Layer 3 (front) — cafedeboba right wing ────
            Shows the right 33 vw — same front layer   */}
        <div
          style={{
            position:      'absolute',
            inset:         0,
            zIndex:        30,
            pointerEvents: 'none',
            clipPath:      'inset(0 0 0 67vw)',    /* keep right 33 vw  */
          }}
        >
          <h1 className="welcome-clone" style={welcomeStyle}>cafedeboba</h1>
        </div>
      </div>

      {/* ── Lemon-yellow scroll progress bar ──────── */}
      <div
        ref={progressBarRef}
        className="fixed bottom-0 left-0 h-[3px] pointer-events-none"
        style={{
          width:      '0%',
          zIndex:     'var(--z-fixed)',
          background: 'var(--color-lemon)',
          boxShadow:  '0 0 8px 0 rgba(242,214,75,0.6)',
        }}
      />

      {/* ── Hero scroll section (scroll dots removed) ─ */}
      <section
        id="scroll-section"
        style={{ height: '500vh', background: 'var(--color-snow)' }}
      >
        <div className="sticky  top-0 w-full h-screen overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0"
            style={{ opacity: 0, background: 'var(--color-snow)' }}
          />
            <div className="absolute inset-x-0 top-0 w-full pointer-events-none z-50 transform -translate-y-[45%]">
   
      </div>
          {/* ── Noovolife-Style Hero Text Overlay (Crossfade Sets) ── */}
          <div className="absolute inset-0 z-10 flex flex-col justify-center pointer-events-none w-full">
            <div className="w-full max-w-[1400px] mx-auto px-[clamp(1.5rem,4vw,3rem)] flex flex-col items-start pt-16 md:pt-24 relative h-full">
              
              {/* Set 1: Show from Left (Normal Huge Size) */}
              <div ref={el => { textSetsRef.current[0] = el; }} className="absolute inset-x-[clamp(1.5rem,4vw,3rem)] top-[35%] flex flex-col items-start">
                <h1 className="text-xl sm:text-6xl md:text-[5.5rem] lg:text-7xl font-[400] text-white tracking-tight leading-[1.05] mb-6 max-w-4xl text-left drop-shadow-lg" style={{ fontFamily: 'var(--font-sans)' }}>
                  <SplitText text="Daddy Boba Open House" /><br/>
                  <SplitText text="May 2–3" />
                </h1>
                <p className="text-white font-[400] text-lg sm:text-xl md:text-[1.25rem] max-w-2xl text-left leading-relaxed drop-shadow-md">
                  <SplitText text="Join us in Las Vegas to tour our facilities, meet the team, and experience what everyday life with Boba can look like." />
                </p>
                <div className="pointer-events-auto mt-8">
                  <Button variant="primary" className="text-sm md:text-[0.9375rem] px-8 py-4 tracking-wide shadow-xl bg-[#FFAC00] hover:bg-[#ffb71f] text-black">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Reserve your free ticket
                  </Button>
                </div>
              </div>

              {/* Set 2: Show from Right, Smaller Text, Aligned Right */}
              <div ref={el => { textSetsRef.current[1] = el; }} className="absolute inset-x-[clamp(1.5rem,4vw,3rem)] top-[40%] flex flex-col items-end invisible">
                <div className="flex flex-col items-start w-full max-w-[42rem]">
                  <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-[4rem] font-[400] text-white tracking-tight leading-[1.1] mb-5 text-left drop-shadow-lg" style={{ fontFamily: 'var(--font-sans)' }}>
                    <SplitText text="Tailored Boba Experiences" /><br/>
                    <SplitText text="Nationwide" />
                  </h1>
                  <p className="text-white font-[400] text-base md:text-lg lg:text-xl text-justify leading-relaxed drop-shadow-md w-full">
                    <SplitText text="We bring the craft directly to your events. Our mobile boba units are fully equipped and ready for the most incredible taste trips." />
                  </p>
                  <div className="pointer-events-auto mt-6">
                    <Button variant="primary" className="text-sm md:text-base px-6 py-3 tracking-wide shadow-xl bg-[#FFAC00] hover:bg-[#ffb71f] text-black">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                      Download Brochure
                    </Button>
                  </div>
                </div>
              </div>

              {/* Set 3: Show from Left, Normal Huge Size, Aligned Left */}
              <div ref={el => { textSetsRef.current[2] = el; }} className="absolute inset-x-[clamp(1.5rem,4vw,3rem)] top-[35%] flex flex-col items-start invisible">
                <h1 className="text-xl sm:text-6xl md:text-[5.5rem] lg:text-7xl font-[400] text-white tracking-tight leading-[1.05] mb-6 max-w-4xl text-left drop-shadow-lg" style={{ fontFamily: 'var(--font-sans)' }}>
                  <SplitText text="Start Building Your" /><br/>
                  <SplitText text="Dream Order" />
                </h1>
                <p className="text-white font-[400] text-lg sm:text-xl md:text-[1.25rem] max-w-2xl text-left leading-relaxed drop-shadow-md">
                  <SplitText text="Choose from infinite flavor selections, toppings, sugar levels, and exclusive cups completely bespoke to you." />
                </p>
                <div className="pointer-events-auto mt-8">
                  <Button variant="primary" className="text-sm md:text-[0.9375rem] px-8 py-4 tracking-wide shadow-xl bg-[#FFAC00] hover:bg-[#ffb71f] text-black">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                    Configure Order
                  </Button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
