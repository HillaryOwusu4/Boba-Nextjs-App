'use client';

import { useState } from 'react';

export default function FullscreenMenu({ isOpen }: { isOpen: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  // Mobile Links - large typography with distinct dummy images for each route
  const MAIN_LINKS = [
    { label: 'HOME', href: '/', image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1000&q=80' },
    { label: 'PRODUCTS', href: '/product-list', image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=1000&q=80' },
    { label: 'COLLECTIONS', href: '/collections', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1000&q=80' },
    { label: 'SCROLL STORY', href: '/scroll-story', image: '/multible_boab.png' },
    { label: 'ABOUT', href: '/about', image: '/boba_store_lifestyle_1778329727033.png' },
    { label: 'CONTACT', href: '/contact', image: 'https://images.unsplash.com/photo-1515876305430-f06edab8282a?w=1000&q=80' },
  ];

  return (
    <div 
      className={`fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col justify-center transition-all duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-[1400px] w-full mx-auto px-[clamp(1.25rem,4vw,3rem)] flex flex-col md:flex-row h-full pt-24 pb-24 md:pt-32">
        
        {/* Left Side: Links */}
        <nav className="flex flex-col justify-center gap-4 md:gap-6 lg:gap-8 flex-1">
          {MAIN_LINKS.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => setHoveredIndex(idx)}
              className={`text-5xl md:text-7xl lg:text-6xl font-black text-white hover:text-[#FFAC00] hover:translate-x-6 transition-all duration-500 ease-out transform origin-left w-fit ${
                isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
              }`}
              style={{ 
                transitionDelay: isOpen ? `${idx * 60 + 100}ms` : '0ms' 
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Side: Featured Dynamic Image */}
        <div className={`hidden md:flex flex-1 items-center justify-end transition-all duration-1000 delay-300 transform ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
          <div className="relative w-full max-w-[500px] bg-red-400 h-[100%] overflow-hidden rounded-[2rem] group shadow-2xl">
            {MAIN_LINKS.map((link, idx) => (
              <img 
                key={link.label}
                src={link.image}
                alt={link.label}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${hoveredIndex === idx ? 'opacity-100 z-10 scale-105' : 'opacity-0 z-0 scale-100'}`}
              />
            ))}
            {/* Overlay for premium feel */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-8 left-10 z-30 transform transition-transform duration-500 group-hover:-translate-y-2">
              <span className="text-[#FFAC00] font-bold tracking-[0.2em] text-xs mb-3 block opacity-90">EXPLORE THE</span>
              <h3 className="text-white text-4xl font-black tracking-wide">{MAIN_LINKS[hoveredIndex].label} SERIES</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Secondary Links inside menu */}
      <div className={`absolute bottom-8 w-full max-w-[1400px] left-1/2 -translate-x-1/2 px-[clamp(1.25rem,4vw,3rem)] flex flex-col sm:flex-row justify-between items-center gap-6 transition-all duration-700 delay-700 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="flex gap-6 md:gap-12 text-xs md:text-sm font-semibold tracking-widest">
          <a href="#faq" className="text-gray-500 hover:text-white transition-colors">FAQ</a>
          <a href="/about" className="text-gray-500 hover:text-white transition-colors">ABOUT US</a>
          <a href="/contact" className="text-gray-500 hover:text-white transition-colors">CONTACT</a>
        </div>
        <div className="flex gap-6 text-xs md:text-sm font-semibold tracking-widest">
          <span className="text-gray-500 hover:text-white cursor-pointer transition-colors">INSTAGRAM</span>
          <span className="text-gray-500 hover:text-white cursor-pointer transition-colors">FACEBOOK</span>
        </div>
      </div>
    </div>
  );
}
