'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const stats = [
  { value: '10K+', suffix: '', label: 'Happy Sippers', highlight: false },
  { value: '4.8', suffix: '★', label: 'Average Rating', highlight: true },
  { value: '25+', suffix: '', label: 'Unique Flavors', highlight: false },
  { value: 'Daily', suffix: '', label: 'Made Fresh', highlight: false },
];

export default function TrustBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      if (headerRef.current) {
        tl.fromTo(
          headerRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
          }
        );
      }

      if (cardsRef.current) {
        tl.fromTo(
          cardsRef.current.children,
          { y: 30, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 1,
            ease: 'power3.out',
          },
          "-=0.4"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full pt-20 pb-16 md:pt-32 md:pb-24 bg-[#FAFAFA]"
    >
      <div className="relative w-full max-w-[1240px] mx-auto px-[clamp(1.5rem,4vw,3rem)]">
        
        {/* Header section matching clean UI */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-12 md:mb-16 flex flex-col items-center">
          <span className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest text-[#FFAC00] mb-4 md:mb-6 shadow-sm">
            Milestones
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#111111] mb-2 md:mb-4">
            Trusted by the Best
          </h2>
          <p className="text-base text-gray-500 font-medium">Over 2 million cups poured with love and care.</p>
        </div>

        {/* Stats Row - Clean masonry style UI */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 relative z-10"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`group flex flex-col items-center justify-center text-center p-8 md:p-10 transition-all duration-700 ease-out rounded-[2rem] transform-gpu ${
                stat.highlight 
                  ? 'bg-[#FFAC00] text-[#0A0A0A] shadow-[0_15px_30px_rgba(255,172,0,0.2)] lg:-translate-y-2 hover:lg:-translate-y-4 z-20' 
                  : 'bg-white text-[#111111] border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-[0_10px_20px_rgba(0,0,0,0.04)] z-10 hover:-translate-y-1'
              }`}
            >
              <div className="mb-1 md:mb-2 flex items-baseline gap-1">
                <span className={`block text-4xl md:text-[3.5rem] font-black leading-none tracking-tight transition-transform duration-500 group-hover:scale-105 ${
                  stat.highlight ? 'text-[#0A0A0A]' : 'text-[#111111]'
                }`}>
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span className={`text-xl md:text-2xl font-bold ${
                    stat.highlight ? 'text-[#0A0A0A]/80' : 'text-[#111111]/80'
                  }`}>
                    {stat.suffix}
                  </span>
                )}
              </div>
              <span className={`text-xs md:text-sm tracking-[0.1em] uppercase font-bold mt-2 md:mt-3 ${
                stat.highlight ? 'text-[#0A0A0A]/80' : 'text-gray-400'
              }`}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
