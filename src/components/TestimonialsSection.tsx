'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const testimonials = [
  {
    stars: 5,
    quote: '"The brown sugar boba is unlike anything I\'ve had before — creamy, rich, and absolutely addictive. My new daily ritual."',
    name: 'Sarah K.',
    handle: '@sarahsips',
  },
  {
    stars: 5,
    quote: '"Found my go-to order on day one. The matcha latte with oat milk is pure perfection in a cup. Freshness is unmatched."',
    name: 'James T.',
    handle: '@jamestheafternoon',
  },
  {
    stars: 5,
    quote: '"Every visit feels like a treat. I\'ve tried every boba shop in the city — nothing else comes close to Daddy Boba."',
    name: 'Maya R.',
    handle: '@mayabobalover',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.15,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 50, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.15,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#FAFAFA] text-[#111111] py-24 md:py-32 relative"
    >
      <div className="w-full px-[clamp(1.5rem,5vw,4rem)]">

        <div ref={headingRef} className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16">
          <div className="max-w-xl">
             <span className="px-5 py-2 bg-white border border-gray-100 rounded-full text-xs font-bold uppercase tracking-widest text-[#FFAC00] shadow-sm mb-6 inline-block">
               Testimonials
             </span>
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#111111] leading-[1.1]">
               Straight From <br/> The Cup
             </h2>
          </div>
          <p className="max-w-sm text-gray-500 font-medium md:mb-2 mt-6 md:mt-0 leading-relaxed">
             Discover what makes Daddy Boba the finest choice in town, straight from our beloved community of tea enthusiasts.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-[2rem] p-8 lg:p-10 border border-gray-100 shadow-[0_5px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow flex flex-col gap-6"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={`${t.name}-star-${i}`} className="text-[#FFAC00] text-xl">★</span>
                ))}
              </div>
              <p className="font-medium text-base md:text-lg text-gray-600 leading-relaxed flex-1">
                {t.quote}
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                <div className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-bold text-sm text-[#111111]">{t.name}</p>
                  <p className="text-xs text-gray-400 font-medium">{t.handle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
