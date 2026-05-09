import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const collections = [
  {
    id: 1,
    title: 'THE NEWBIES',
    subTitle: 'Fresh Arrivals',
    category: 'New Arrivals',
    imageCover: '/collection_new_arrivals_1778331362416.png',
  },
  {
    id: 2,
    title: 'MATCHA SERIES',
    subTitle: 'Premium Grade',
    category: 'Matcha',
    imageCover: '/collection_matcha_1778331218598.png',
  },
  {
    id: 3,
    title: 'MILK SERIES',
    subTitle: 'Creamy Classics',
    category: 'Milk Series',
    imageCover: '/boba_pouring_action_1778329663757.png',
  },
  {
    id: 4,
    title: 'SIGNATURE RECIPES',
    subTitle: 'Unique Blends',
    category: 'Signature',
    imageCover: '/boba_premium_ingredients_1778329742425.png',
  },
];

export default function CollectionsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the Section Header
      gsap.from(".section-header > *", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true
        }
      });

      // Animate EACH card individually as it hits the viewport
      const cards = gsap.utils.toArray<HTMLElement>(".collection-card");
      cards.forEach((card) => {
        const titleLines = card.querySelectorAll(".card-title-line");
        const otherElements = card.querySelectorAll(".card-image, .card-subtitle");

        gsap.from(card, {
          scale: 0.95,
          opacity: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true
          }
        });

        gsap.from(titleLines, {
          y: "110%",
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true
          }
        });

        gsap.from(otherElements, {
          y: 40,
          opacity: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="shop-collections" ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="w-full px-[clamp(1.5rem,5vw,4rem)]">
        <div className="text-center mb-16 flex flex-col items-center section-header">
          <span className="px-5 py-2 bg-white border border-gray-100 rounded-full text-xs font-bold uppercase tracking-widest text-[#FFAC00] shadow-sm mb-6 inline-block">
             Drink Series
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-[#111111] uppercase">
            Collections
          </h2>
          <div className="w-16 h-px bg-gray-300 my-6"></div>
          <p className="text-gray-500 font-medium text-lg">
            Explore our curated drink series and find your perfect boba match
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 collections-grid">
          {collections.map((item) => (
            <Link 
              href={`/collections?category=${item.category}`} 
              key={item.id} 
              className="collection-card relative group block aspect-[0.85/1] rounded-[3.2rem] overflow-hidden transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-black/10"
            >
              {/* Full Bleed Image Centered */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={item.imageCover} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.10]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-500" />
              </div>

              {/* Top-Left Label Area - Kept exact shape styling! */}
              <div className="absolute top-0 left-0 bg-white pt-7 pl-7 pb-4 pr-10 rounded-br-[2.4rem] z-20">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {item.category}
                </div>
                <h3 className="text-[1.35rem] font-bold text-black leading-[1.1] tracking-tight">
                  {item.title.split(' ').map((word, i) => (
                    <span key={i} className="block overflow-hidden">
                      <span className="block card-title-line">
                        {word}
                      </span>
                    </span>
                  ))}
                </h3>
                
                {/* Concave Corner Connections (Top-Right of Tab) */}
                <div 
                  className="absolute top-0 left-full w-10 h-10 bg-white pointer-events-none" 
                  style={{ clipPath: 'path("M 0 40 Q 0 0 40 0 L 0 0 Z")' }} 
                />
                {/* Concave Corner Connections (Bottom-Left of Tab) */}
                <div 
                  className="absolute top-full left-0 w-10 h-10 bg-white pointer-events-none" 
                  style={{ clipPath: 'path("M 40 0 Q 0 0 0 40 L 0 0 Z")' }} 
                />
              </div>

              {/* Top-Right Dots Button */}
              <div className="absolute top-7 right-8 z-20">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-black transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
                </div>
              </div>

              {/* Bottom-Left Subtitle Area - Rebalanced colors for image-centric setup */}
              <div className="absolute bottom-0 left-0 bg-white pt-3 pl-8 pb-7 pr-8 rounded-tr-[2.2rem] z-20 card-subtitle">
                <p className="text-[0.95rem] font-bold text-[#FFAC00] tracking-tight">
                  {item.subTitle}
                </p>
                {/* Concave Corner Connections (Bottom-Right of Tab) */}
                <div 
                  className="absolute bottom-0 left-full w-9 h-9 bg-white pointer-events-none" 
                  style={{ clipPath: 'path("M 0 0 Q 0 36 36 36 L 0 36 Z")' }} 
                />
                {/* Concave Corner Connections (Top-Left of Tab) */}
                <div 
                  className="absolute bottom-full left-0 w-9 h-9 bg-white pointer-events-none" 
                  style={{ clipPath: 'path("M 36 36 Q 0 36 0 0 L 0 36 Z")' }} 
                />
              </div>

              {/* Bottom-Right Arrow Circle */}
              <div className="absolute bottom-7 right-8 z-20">
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-black shadow-lg shadow-black/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-[#FFAC00] group-hover:text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
