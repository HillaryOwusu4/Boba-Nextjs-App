'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function WhyBobaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Clean staggered entrance for the layout
      gsap.from('.fade-up', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#FAFAFA] py-16 md:py-24">
      <div className="w-full px-[clamp(1.5rem,5vw,4rem)]">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 fade-up">
          <div className="max-w-xl">
            <div className="flex gap-2 mb-6">
              <span className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest text-[#FFAC00] shadow-sm">
                Our Story
              </span>
              <span className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest text-[#111111] shadow-sm">
                Quality
              </span>
              <span className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest text-[#111111] shadow-sm hidden sm:inline-block">
                Process
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-black tracking-tight text-[#111111] leading-tight">
              A Premier Boba <br /> Destination
            </h2>
          </div>
          
          <div className="max-w-sm mt-6 md:mt-0 text-gray-500 text-base font-medium leading-relaxed">
            <p>
              Crafted by master tea artisans, our process challenges conventions while welcoming casual sippers and serious connoisseurs alike.
            </p>
          </div>
        </div>

        {/* Masonry Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {/* Main Large Image (Left Col) */}
          <div className="md:col-span-8 relative h-[400px] md:h-[500px] lg:h-[600px] rounded-[2rem] overflow-hidden group shadow-sm fade-up">
            <img 
              src="/boba_pouring_action_1778329663757.png" 
              alt="Pouring Premium Boba" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Inner Content Card overlaying the image, exactly like the reference */}
            <div className="absolute inset-x-4 bottom-4 md:inset-x-8 md:bottom-8 bg-[#111111]/90 backdrop-blur-md rounded-3xl p-6 md:p-8 text-white max-w-sm md:max-w-md shadow-2xl">
              <h3 className="text-xl md:text-2xl font-bold mb-3">Unwind, Sip, and Perfect Your Day</h3>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                A premium experience awaits you with our lush, world-class flavors. Your next legendary pour starts here.
              </p>
              <div className="flex gap-3">
                <button className="bg-[#FFAC00] text-[#111111] px-5 py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
                  Discover
                </button>
                <button className="bg-white/10 text-white px-5 py-2.5 rounded-full text-xs md:text-sm border border-white/20 hover:bg-white/20 transition-colors">
                  Join Us
                </button>
              </div>
            </div>
          </div>

          {/* Right Column with 2 stacked images/cards */}
          <div className="md:col-span-4 flex flex-col gap-4 md:gap-5">
            <div className="relative h-[250px] lg:h-[288px] rounded-[2rem] overflow-hidden shadow-sm group fade-up">
               <img 
                 src="/boba_premium_ingredients_1778329742425.png" 
                 alt="Premium Ingredients" 
                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
               />
               <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold shadow-md text-[#111111] uppercase tracking-wider">
                 Fresh Ingredients
               </div>
            </div>

            {/* Content card matching the layout block */}
            <div className="bg-white border border-gray-100 rounded-[2rem] p-6 lg:p-8 flex-grow shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)] transition-shadow fade-up flex flex-col justify-center text-[#111111]">
              <p className="text-sm md:text-base font-medium text-gray-500 leading-relaxed mb-6">
                <strong className="text-[#111111] block mb-2 text-lg">Established Quality.</strong>
                Our tea bases span across 15+ curated flavors, mature leaves, and breathtaking aroma profiles.
              </p>
              <div>
                <button className="bg-[#111111] text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#FFAC00] hover:text-[#111111] transition-colors w-full text-center shadow">
                  Learn the Process
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
