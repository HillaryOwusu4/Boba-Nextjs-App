'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './navbar/atoms/Button';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const cupCenterRef = useRef<HTMLDivElement>(null);
  const cupLeftRef = useRef<HTMLDivElement>(null);
  const cupRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Text stagger reveal on scroll
      if (textContentRef.current) {
        gsap.fromTo(
          textContentRef.current.children,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.2,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textContentRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Parallax on the overlapping Boba Cups
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      if (cupLeftRef.current && cupCenterRef.current && cupRightRef.current) {
        tl.to(cupLeftRef.current, { y: -60, rotation: -20, ease: 'none' }, 0)
          .to(cupCenterRef.current, { y: -100, ease: 'none' }, 0)
          .to(cupRightRef.current, { y: -80, rotation: 20, ease: 'none' }, 0);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="bg-[#F4F1EA] z-30 text-[#1A1A1A] py-24 md:py-48 relative"
    >
      {/* Seamless Integration Wave Background spanning the bottom */}
      <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[150px] md:h-[320px]">
          {/* Daddy Boba Yellow/Gold sweeping bottom shape */}
          <path fill="#FFAC00" d="M0,224 L60,202.7 C120,181,240,139,360,117.3 C480,96,600,96,720,128 C840,160,960,224,1080,240 C1200,256,1320,224,1380,208 L1440,192 L1440,320 L1380,320 C1320,320,1200,320,1080,320 C960,320,840,320,720,320 C600,320,480,320,360,320 C240,320,120,320,60,320 L0,320 Z" />
        </svg>
      </div>

      {/* Grid Layout strictly mirroring the Reference Image */}
      <div className="w-full max-w-[1400px] mx-auto px-[clamp(1.5rem,4vw,3rem)] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
        
        {/* Left Side: Editorial Typography Block */}
        <div ref={textContentRef} className="flex flex-col items-start max-w-xl">
          <span className="font-serif italic text-2xl md:text-[2rem] text-gray-700 mb-4 tracking-wide lowercase">
            something about us
          </span>
          <h2 className="text-[5rem] sm:text-[6rem] md:text-[7rem] lg:text-[8rem] font-[900] tracking-tighter leading-[0.9] mb-8 uppercase text-[#1A1A1A]" style={{ fontFamily: 'Impact, sans-serif' }}>
            OUR COMPANY
          </h2>
          <p className="text-[#1A1A1A] font-[500] text-base md:text-lg leading-relaxed mb-10 text-justify opacity-80 pr-0 lg:pr-8">
            Daddy Boba, founded to revolutionize the street beverage experience, is a premier producer of intensely refreshing and customized boba creations. Committed to delivering high-quality products that meet modern consumer desires, the company aims to expand internationally and become a legendary fixture in the mobile beverage sector.
          </p>
          <Button variant="primary" className="text-base md:text-lg px-12 py-5 font-bold tracking-widest uppercase bg-[#E64833] hover:bg-[#C23B2A] text-white shadow-xl rounded-none transition-transform hover:scale-105 border-0">
            ABOUT
          </Button>
        </div>

        {/* Right Side: Multiple Overlapping Boba Elements (Mirroring the 3 Cans) */}
        <div className="relative w-full h-[450px] md:h-[650px] lg:h-[750px] flex items-center justify-center mt-12 lg:mt-0">
          
          {/* Back Left Boba Cup */}
          <div 
            ref={cupLeftRef} 
            className="absolute left-[5%] lg:left-[10%] top-[15%] w-[160px] h-[340px] md:w-[200px] md:h-[480px] lg:w-[240px] lg:h-[520px] rounded-[100px] overflow-hidden shadow-2xl -rotate-12 border-8 border-white/60 bg-[#FFF9F0] z-10"
          >
            <img 
              src="/Foodiesfeed_-_Free_Food_Photos-removebg-preview.png" 
              alt="Milk Tea Background" 
              className="w-full h-full object-cover opacity-90"
            />
          </div>
          
          <div 
            ref={cupRightRef} 
            className="absolute right-[5%] lg:right-[15%] top-[5%] w-[180px] h-[380px] md:w-[260px] md:h-[560px] lg:w-[280px] lg:h-[620px] rounded-[110px] overflow-hidden shadow-2xl rotate-12 border-8 border-[#333333] bg-[#1A1A1A] z-[100]"
          >
            <img 
              src="/one_boba.png" 
              alt="Brown Sugar Boba" 
              className="w-full h-full object-cover opacity-90"
            />
          </div>

          {/* Center Main Boba Cup */}
          <div 
            ref={cupCenterRef} 
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[200px] h-[400px] md:w-[260px] md:h-[560px] lg:w-[300px] lg:h-[640px] rounded-[140px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)] z-30 border-[12px] border-white/90 bg-[#FFAC00]"
          >
            <img 
              src="/multible_boab.png" 
              alt="Matcha Fruit Boba" 
              className="w-full h-full object-cover"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
