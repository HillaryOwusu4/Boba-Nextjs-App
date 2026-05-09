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
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="w-full px-[clamp(1.5rem,5vw,4rem)]">
        
        {/* Massive rounded card wrapper */}
        <div className="w-full bg-[#FAFAFA] rounded-[3.5rem] p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col md:flex-row items-center gap-12 lg:gap-20 relative overflow-hidden">
          
          {/* Text Content Left */}
          <div ref={contentRef} className="w-full md:w-1/2 flex flex-col items-start text-left z-20">
            <span className="px-5 py-2 bg-white border border-gray-100 rounded-full text-xs font-bold uppercase tracking-widest text-[#FFAC00] mb-8 inline-block shadow-sm">
              Level Up
            </span>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111111] leading-[1.05] mb-6 uppercase">
              Shop Premium <br /> Boba Essentials
            </h2>
            
            <p className="text-lg text-gray-500 font-medium mb-10 max-w-md leading-relaxed">
              Elevate your daily ritual with our curated selection of tumblers, glass straws, and artisanal syrups. Made to last and designed to impress.
            </p>
            
            <button className="bg-[#111111] text-white px-9 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#FFAC00] hover:text-[#111111] transition-all duration-300 shadow-md hover:shadow-[0_10px_30px_rgba(255,172,0,0.3)] hover:-translate-y-1">
              SHOP NOW
            </button>
          </div>

          {/* Image Container Right (Overlapping) */}
          <div ref={imageRef} className="w-full md:w-1/2 relative h-[400px] md:h-[500px] rounded-[2.5rem] overflow-visible group">
            
            {/* Base Image Background */}
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-sm">
              <img 
                src="/boba_store_lifestyle_1778329727033.png" 
                alt="Premium Cafe Lifestyle" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-500" />
            </div>

            {/* Floating Top Right Badge */}
            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full font-bold text-[0.7rem] uppercase tracking-widest text-[#111111] shadow-lg z-10 flex items-center gap-2">
               <span className="w-2.5 h-2.5 rounded-full bg-[#FFAC00] animate-pulse"></span> Available Now
            </div>

            {/* Floating Merch Image Overlaid Bottom Left */}
            <img 
              src="/multible_boab.png" 
              alt="Boba Cups" 
              className="absolute -bottom-12 -left-8 sm:-left-16 w-64 sm:w-80 h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] z-20 group-hover:-translate-y-4 group-hover:-rotate-3 transition-transform duration-700"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
