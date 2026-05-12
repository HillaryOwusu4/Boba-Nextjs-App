'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.fade-up-about', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
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
    <section ref={sectionRef} className="w-full bg-white py-16 md:py-24">
      <div className="w-full px-[clamp(1.5rem,5vw,4rem)]">
        
        {/* Center Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 fade-up-about">
          <span className="px-5 py-2 bg-[#FAFAFA] border border-gray-100 rounded-full text-xs font-bold uppercase tracking-widest text-[#FFAC00] mb-6 inline-block shadow-sm">
            Professional Guidance
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#111111] mb-6" style={{ fontFamily: 'var(--font-sans)' }}>
            A Legacy in Every Cup
          </h2>
          <p className="text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Founded to revolutionize the street beverage experience, CafeDeboba is a premier producer of intensely refreshing and customized creations, committed to delivering high-quality products that meet modern consumer desires.
          </p>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {/* Left Column - Store */}
          <div className="relative h-[300px] md:h-[450px] rounded-[2rem] overflow-hidden group shadow-sm fade-up-about">
            <img src="/boba_store_lifestyle_1778329727033.png" alt="Store Interior" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <h3 className="text-white font-bold text-xl mb-1 drop-shadow-md" style={{ fontFamily: 'var(--font-sans)' }}>Elegant Café</h3>
              <p className="text-white/90 text-sm font-medium drop-shadow">A modern space designed for your comfort and aesthetic pleasure.</p>
            </div>
          </div>

          {/* Center Column - Text Content */}
          <div className="bg-[#FAFAFA] border border-gray-100 rounded-[2rem] p-8 md:p-10 flex flex-col justify-center items-center text-center shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.03)] transition-shadow fade-up-about">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-6">
              <span className="text-2xl">🌍</span>
            </div>
            <h3 className="text-[#111111] font-bold text-xl mb-4" style={{ fontFamily: 'var(--font-sans)' }}>Global Vision</h3>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8">
              The company aims to expand internationally and become a legendary fixture in the mobile beverage sector, uniting flavors globally.
            </p>
            <button className="bg-[#111111] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#FFAC00] hover:text-[#111111] transition-colors w-full shadow-md">
              Read Our Story
            </button>
          </div>

          {/* Right Column - Portait */}
          <div className="relative h-[300px] md:h-[450px] rounded-[2rem] overflow-hidden group shadow-sm fade-up-about">
            <img src="/boba_lifestyle_portrait_1778329759998.png" alt="Lifestyle Portrait" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <h3 className="text-white font-bold text-xl mb-1 drop-shadow-md" style={{ fontFamily: 'var(--font-sans)' }}>Happy Customers</h3>
              <p className="text-white/90 text-sm font-medium drop-shadow">Smiles served daily with every customized premium cup.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
