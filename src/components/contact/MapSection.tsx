'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MapPin, Navigation, Clock, Phone, ExternalLink } from 'lucide-react';

export default function MapSection() {
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pulse animation for the Boba Pin
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(".pin-pulse", {
      scale: 2.5,
      opacity: 0,
      duration: 2,
      ease: "power2.out"
    });

    // Enter animation for the info card
    gsap.from(cardRef.current, {
      y: 30,
      opacity: 0,
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 90%",
        once: true
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="w-full px-[clamp(1.5rem,5vw,4rem)] mt-12 mb-24 relative overflow-hidden">
      <div className="relative w-full h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border border-gray-200 group">
        
        {/* The Map Background (Standard Style - No Locks) */}
        <div className="relative w-full h-full">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103130.4072230193!2d-115.2263435!3d36.1249185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80beb782a4f57dd1%3A0x3accd0a9d5ec01e!2sLas%20Vegas%2C%20NV!5e0!3m2!1sen!2sus!4v1715300000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          ></iframe>
        </div>

        {/* Custom Location Pin (Static Visual) */}
        <div 
          ref={pinRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
        >
          {/* Pulsing ring */}
          <div className="pin-pulse absolute inset-0 bg-[#FFAC00] rounded-full scale-100 opacity-60"></div>
          
          {/* The Actual Pin (Boba Style) */}
          <div className="relative flex flex-col items-center">
            <div className="w-14 h-14 bg-[#FFAC00] rounded-full flex items-center justify-center shadow-2xl border-4 border-white transform transition-all duration-500">
              <MapPin className="text-black w-7 h-7" fill="currentColor" />
            </div>
            <div className="w-1.5 h-16 bg-[#FFAC00] rounded-full -mt-1 shadow-lg origin-top transition-colors"></div>
          </div>
        </div>

        {/* Glassmorphic Info Card (Static/Left) - PRIMARY INFO */}
        <div 
          ref={cardRef}
          className="absolute bottom-8 left-8 z-30 max-w-[320px] bg-white/80 backdrop-blur-xl border border-white/40 p-8 rounded-[2.5rem] shadow-2xl transition-transform duration-500 hover:scale-[1.02] hidden md:block"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#FFAC00] rounded-2xl flex items-center justify-center text-black shadow-md">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-[#111111] uppercase tracking-wider text-xs">Flagship Lab</h3>
              <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Las Vegas, NV</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-gray-600" />
              </div>
              <p className="text-sm font-semibold text-gray-800 leading-snug">
                725 S Las Vegas Blvd,<br/>Las Vegas, NV 89101
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-gray-600" />
              </div>
              <p className="text-sm font-semibold text-gray-800">
                Daily: 11AM — 11PM
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-gray-600" />
              </div>
              <p className="text-sm font-semibold text-gray-800">
                +1 (702) 555-BOBA
              </p>
            </div>
          </div>

          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=725+S+Las+Vegas+Blvd,Las+Vegas,NV+89101" 
            target="_blank"
            className="mt-8 w-full py-4 bg-[#111111] text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#FFAC00] hover:text-[#111111] transition-all duration-300 shadow-lg flex items-center justify-center"
          >
            Get Directions
          </a>
        </div>

        {/* Branding Watermark */}
        <div className="absolute top-8 right-8 z-20 pointer-events-none">
          <div className="bg-[#0a0a0a] text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] opacity-80 backdrop-blur-md border border-white/10">
            Daddy Boba HQ
          </div>
        </div>

      </div>
    </section>
  );
}
