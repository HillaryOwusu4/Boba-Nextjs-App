'use client';
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
       gsap.fromTo('.fade-up-news',
         { y: 30, autoAlpha: 0 },
         { y: 0, autoAlpha: 1, stagger: 0.15, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } }
       );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-20 md:py-32 border-t border-gray-100">
      <div className="w-full px-[clamp(1.5rem,5vw,4rem)] flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
        
        <div className="w-full md:w-1/2 flex flex-col fade-up-news">
          <span className="px-5 py-2 bg-[#FAFAFA] border border-gray-100 rounded-full text-xs font-bold uppercase tracking-widest text-[#FFAC00] mb-6 inline-block w-fit shadow-sm">
            Updates
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#111111] mb-6">
            Stay in the Loop
          </h2>
          <p className="text-gray-500 font-medium text-base md:text-lg">Subscribe for new flavor drops, secret menus, and exclusive offers straight to your inbox.</p>
        </div>

        <div className="w-full md:w-1/2 fade-up-news md:pt-4">
          {submitted ? (
            <div className="mt-4 p-8 bg-[#FAFAFA] rounded-[2rem] border border-gray-100 shadow-sm">
               <p className="font-bold text-[#111111] text-xl mb-2">Welcome to the crew!</p>
               <p className="text-gray-500 font-medium">Keep an eye on your inbox, great things are coming.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }} className="relative mt-2 lg:mt-8 group w-full">
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address" 
                className="w-full bg-transparent border-b-2 border-gray-200 py-6 pr-14 text-xl md:text-2xl text-[#111111] font-medium placeholder-gray-300 focus:outline-none focus:border-[#111111] transition-colors"
                required
              />
              <button 
                type="submit" 
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#111111] transition-colors mt-1"
                aria-label="Subscribe"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
