'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 240;
const frameSrc = (index: number) => `/shatter-sequence/frame_${(index + 1).toString().padStart(3, '0')}.jpg`;

/** Helper component to split text into .char spans for GSAP character staggering */
const SplitText = ({ text }: { text: string }) => {
  return (
    <>
      {text.split('').map((char, i) => (
        char === ' ' 
          ? <span key={i} className="char inline-block whitespace-pre"> </span> 
          : <span key={i} className="char inline-block">{char}</span>
      ))}
    </>
  );
};

export default function ProductIntroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => {
        loaded++;
        if (loaded === FRAME_COUNT) {
          setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  useEffect(() => {
    if (images.length !== FRAME_COUNT || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;

    function resizeCanvas() {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      drawFrame(currentFrameRef.current);
    }

    function drawFrame(index: number) {
      const img = images[index];
      if (!img || !img.complete) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth * dpr;
      const ih = img.naturalHeight * dpr;

      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx?.clearRect(0, 0, cw, ch);
      ctx?.drawImage(img, dx, dy, dw, dh);
    }

    function setFrame(index: number) {
      if (index === currentFrameRef.current) return;
      currentFrameRef.current = index;
      drawFrame(index);
    }

    // Initial resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const ctxGSAP = gsap.context(() => {
      // 1. Frame Scrubbing
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = Math.min(self.progress / 0.96, 1); 
          const idx = Math.round(progress * (FRAME_COUNT - 1));
          setFrame(idx);
        }
      });

      // 2. Timeline for typography
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });

      // Section 1: PREMIUM (0 - 0.2)
      tl.fromTo(".story-text-premium", 
        { autoAlpha: 0, y: 40 }, 
        { autoAlpha: 1, y: 0, duration: 1 }, 0);
      tl.to(".story-text-premium", 
        { autoAlpha: 0, y: -30, duration: 1 }, 1.2);

      // Section 2: BREAK THE COLD (0.25 - 0.45)
      tl.fromTo(".story-text-break", 
        { autoAlpha: 0, scale: 0.8 }, 
        { autoAlpha: 1, scale: 1.1, duration: 1.5 }, 1.8);
      tl.to(".story-text-break", 
        { autoAlpha: 0, scale: 1.3, duration: 1 }, 3.5);

      // Section 3: LEFT TEXT (0.5 - 0.70)
      tl.fromTo(".story-left-content", 
        { x: -100, autoAlpha: 0 }, 
        { x: 0, autoAlpha: 1, duration: 1.5 }, 3.8);
      tl.to(".story-left-content", 
        { x: 40, autoAlpha: 0, duration: 1 }, 5.5);

      // Section 4: RIGHT TEXT (Black Sugar) (0.75 - 0.90)
      tl.fromTo(".story-desc-block", 
        { x: 100, autoAlpha: 0 }, 
        { x: 0, autoAlpha: 1, duration: 1.5 }, 5.8);
      tl.to(".story-desc-block", 
        { autoAlpha: 0, x: -40, duration: 1 }, 7.5);

      // Section 5: CTA (0.92 - 1.0)
      tl.fromTo(".story-cta-block", 
        { autoAlpha: 0, scale: 0.9 }, 
        { autoAlpha: 1, scale: 1, duration: 1 }, 8.2);

    }, containerRef);

    return () => {
      ctxGSAP.revert();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [images]);

  return (
    <section 
      ref={containerRef} 
      id="product-scroll-story"
      className="relative w-full"
      style={{ height: '600vh', background: '#0a0a0a' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas Stage */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 z-0 bg-[#0a0a0a]"
        />

        {/* Typography Overlays */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center opacity-0" 
             style={{ fontFamily: 'var(--font-sans)', opacity: images.length === FRAME_COUNT ? 1 : 0 }}
        >
          
          {/* Section 1: PREMIUM */}
          <div className="story-text-premium absolute opacity-0 invisible">
             <h2 className="text-[10vw] font-black text-white/10 uppercase tracking-tighter">PREMIUM</h2>
          </div>

          {/* Section 2: BREAK THE COLD */}
          <div className="story-text-break absolute text-center opacity-0 invisible">
             <h2 className="text-[11vw] font-black text-white uppercase leading-[0.85] tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
               <SplitText text="BREAK" /><br/>
               <SplitText text="THE COLD" />
             </h2>
          </div>

          {/* Section 3: LEFT SIDE (The Craft) */}
          <div className="story-left-content absolute left-[5vw] lg:left-[8vw] max-w-xl text-left opacity-0 invisible">
             <p className="text-white/60 text-xs font-black uppercase tracking-[0.4em] mb-4 drop-shadow-md">The Craft</p>
             <h3 className="text-4xl sm:text-6xl font-black text-white uppercase leading-tight mb-6 drop-shadow-2xl">Masterfully<br/>Brewed.</h3>
             <p className="text-base sm:text-lg text-gray-100 font-medium leading-relaxed drop-shadow-md">
               Hand-picked tea leaves meet the slow-burn richness of artisanal black sugar. Every cup is a testament to the patient art of boba.
             </p>
          </div>

          {/* Section 4: RIGHT SIDE (Black Sugar) */}
          <div className="story-desc-block absolute right-[5vw] lg:right-[8vw] max-w-xl text-left border-l-2 border-white/20 pl-8 opacity-0 invisible">
             <p className="text-white/60 text-xs font-black uppercase tracking-[0.4em] mb-4 drop-shadow-md">The Result</p>
             <h3 className="text-4xl sm:text-6xl font-black text-white uppercase leading-tight mb-6 drop-shadow-2xl">Pure<br/>Brilliance.</h3>
             <p className="text-base sm:text-lg text-gray-100 font-medium leading-relaxed drop-shadow-md">
               A dramatic cascade of flavor that hits like a shockwave. Our signature black sugar isn't just a sweetener—it's the soul of the drink.
             </p>
          </div>

          {/* Section 5: CTA */}
          <div className="story-cta-block absolute flex flex-col items-center pointer-events-auto opacity-0 invisible">
             <h2 className="text-[6vw] font-black text-white uppercase tracking-tighter mb-10 leading-none drop-shadow-2xl">Ready to shatter?</h2>
             <button 
                onClick={() => {
                  const el = document.getElementById('shop-collections');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-14 py-7 bg-white text-black text-sm font-extrabold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-transform active:scale-95 shadow-2xl"
             >
                <span className="relative z-10">Get Yours Now</span>
                <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-in-out" />
             </button>
          </div>

        </div>

        {/* Ambient Mist */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]/80 z-[5] pointer-events-none" />
      </div>

    </section>
  );
}
