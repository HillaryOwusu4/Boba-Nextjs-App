'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cupRef     = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);

      // Typography Stagger Reveal
      gsap.fromTo(
        [q('.cta-subtitle'), q('.cta-line-1'), q('.cta-line-2'), q('.cta-paragraph'), q('.cta-btn')],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Parallax for giant floating background cup
      if (cupRef.current) {
        gsap.fromTo(
          cupRef.current,
          { y: '30%', rotation: 5, scale: 0.9 },
          {
            y: '-30%',
            rotation: -25,
            scale: 1.1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    // Refresh ScrollTrigger to ensure layout accuracy
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[85vh] bg-[var(--color-charcoal)] py-40 md:py-56 flex items-center justify-center overflow-hidden z-10">

      {/* Top Transition SVG */}
      <div className="absolute top-[0px] left-0 w-full z-10 pointer-events-none transform rotate-180">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#FFAC00" fillOpacity="1" d="M0,160L48,165.3C96,171,192,181,288,170.7C384,160,480,128,576,133.3C672,139,768,181,864,186.7C960,192,1056,160,1152,144C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Floating Background Texture Image */}
      <img
        ref={cupRef}
        src="/multible_boab.png"
        alt="floating boba"
        className="absolute right-[-15%] md:right-[-5%] top-1/2 -translate-y-1/2 w-[400px] md:w-[700px] opacity-[0.12] pointer-events-none drop-shadow-2xl z-0 blur-[2px]"
      />

      {/* Typography */}
      <div className="relative z-20 w-full max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center">

        <span className="cta-subtitle font-serif italic text-2xl md:text-[2.2rem] text-[var(--color-neutral-400)] mb-6 lowercase tracking-wider">
          the perfect sip awaits
        </span>

        <h2
          className="text-[4rem] sm:text-[6rem] md:text-[9rem] lg:text-[11rem] font-[900] tracking-tighter leading-[0.85] mb-12 uppercase drop-shadow-xl"
          style={{ fontFamily: 'Impact, sans-serif' }}
        >
          <span className="cta-line-1 inline-block text-[var(--color-snow)]">GET YOUR</span>
          <br />
          <span className="cta-line-2 inline-block text-[var(--color-lemon)]">CRAVING</span>
        </h2>

        <p className="cta-paragraph text-[var(--color-neutral-300)] max-w-2xl mx-auto text-lg md:text-2xl font-medium mb-16 leading-relaxed">
          Experience the boldest flavors in the city. Handcrafted daily with premium ingredients and unmatched speed. Find a Daddy Boba near you or order online.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto px-4">
          <button className="cta-btn w-full sm:w-auto bg-[var(--color-lemon)] text-[var(--color-charcoal)] px-12 py-5 md:py-6 rounded-full text-xl md:text-2xl font-bold shadow-[var(--shadow-lemon)] hover:bg-[var(--color-lemon-600)] transition-all duration-300 hover:-translate-y-2 active:translate-y-0">
            Order Now
          </button>
          <button className="cta-btn w-full sm:w-auto bg-transparent border-2 border-[var(--color-snow)] text-[var(--color-snow)] px-12 py-5 md:py-6 rounded-full text-xl md:text-2xl font-bold hover:bg-[var(--color-snow)] hover:text-[var(--color-charcoal)] transition-all duration-300 hover:-translate-y-2 active:translate-y-0">
            Find Locations
          </button>
        </div>

      </div>

    </section>
  );
}
