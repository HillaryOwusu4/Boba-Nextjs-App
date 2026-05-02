import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BobaEssentialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image Slide In
      gsap.from(imageRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true
        }
      });

      // Content Slide In
      gsap.from(contentRef.current, {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[var(--color-snow-soft)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          
          {/* Image Container */}
          <div ref={imageRef} className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg flex items-center justify-center p-4">
              <img 
                src="/multible_boab.png" 
                alt="Premium Boba Accessories" 
                className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)] z-10 transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Text Content */}
          <div ref={contentRef} className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-xs md:text-sm font-semibold text-[var(--color-neutral-400)] tracking-widest uppercase mb-4">
              Elevate Your Experience
            </p>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-[var(--color-charcoal)] mb-8 leading-tight">
              SHOP PREMIUM BOBA ESSENTIALS
            </h2>
            
            <button className="btn-accent text-sm tracking-wider px-8 py-3">
              SHOP NOW
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
