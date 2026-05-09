'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.fade-up-brand', {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-white py-24 md:py-32">
      <div className="w-full px-[clamp(1.5rem,5vw,4rem)] flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        
        {/* Left: Text */}
        <div className="w-full lg:w-5/12 flex flex-col items-start fade-up-brand">
          <span className="px-4 py-1.5 bg-[#FAFAFA] border border-gray-100 rounded-full text-xs font-bold uppercase tracking-widest text-[#FFAC00] mb-6 inline-block shadow-sm">
            Our Promise
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-black tracking-tight leading-[1.1] mb-6 text-[#111111]">
            Quality Course, <br /> Confident Sip.
          </h2>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8">
            Every cup starts with real ingredients, brewed with care, and finished with the attention your craving deserves. From our premium pearls to the custom sweetness, enjoy perfection in every sip.
          </p>
          <button className="group flex items-center gap-3 bg-white border border-[#E5E7EB] text-[#111111] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#F8F8F8] transition-colors shadow-sm">
            Discover Our Story
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </button>
        </div>

        {/* Right: Image */}
        <div className="w-full lg:w-7/12 relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-sm fade-up-brand">
          <img src="/boba_premium_ingredients_1778329742425.png" alt="Premium Ingredients" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

      </div>
    </section>
  );
}
