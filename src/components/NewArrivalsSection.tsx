import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const arrivals = [
  {
    id: 1,
    title: 'CHERRY ON TOP',
    price: '$7.50',
    oldPrice: null,
    image: '/bobadrinks/1 (2).png',
    rating: 5,
    isSale: false,
  },
  {
    id: 2,
    title: 'BRAZILIAN BOMB LEMONADE',
    price: '$7.25',
    oldPrice: '$8.50',
    image: '/bobadrinks/1 (3).png',
    rating: 5,
    isSale: true,
  },
  {
    id: 3,
    title: 'MILK WITH BENEFITS',
    price: '$7.75',
    oldPrice: null,
    image: '/multible_boab.png',
    rating: 5,
    isSale: false,
  },
];

export default function NewArrivalsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".new-arrivals-header > *", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true
        }
      });

      // Cards Animation
      gsap.from(".arrival-card", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".arrivals-grid",
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
        <div className="text-center mb-16 flex flex-col items-center new-arrivals-header">
          <span className="px-5 py-2 bg-white border border-gray-100 rounded-full text-xs font-bold uppercase tracking-widest text-[#FFAC00] shadow-sm mb-6 inline-block">
             Latest Drops
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-[#111111] uppercase" style={{ fontFamily: 'var(--font-sans)' }}>
            New Arrivals
          </h2>
          <div className="w-16 h-px bg-gray-300 my-6"></div>
          <p className="text-gray-500 font-medium text-lg">
            Discover our latest signature flavors
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 arrivals-grid">
          {arrivals.map((item) => (
            <div key={item.id} className="flex flex-col group cursor-pointer arrival-card">
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] bg-[#FAFAFA] flex items-center justify-center overflow-hidden mb-6 rounded-[3rem] border border-gray-100 transition-all duration-700 ease-out group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] group-hover:-translate-y-2">
                {item.isSale && (
                  <div className="absolute top-6 left-6 bg-white px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase z-10 shadow-sm text-[#FFAC00] border border-gray-100">
                    SALE
                  </div>
                )}
                
                {/* Floating "Add" Icon overlay top right */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-[#111111] shadow-sm z-10 border border-gray-100 hover:bg-[#FFAC00] hover:text-[#111111]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                </div>

                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-3/4 h-auto object-contain drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.08] group-hover:-rotate-3"
                />
              </div>

              {/* Text Info */}
              <div className="text-center flex flex-col items-center">
                <h3 className="text-sm font-bold text-[#111111] uppercase tracking-widest mb-2 transition-colors duration-300 group-hover:text-[#FFAC00]" style={{ fontFamily: 'var(--font-sans)' }}>
                  {item.title}
                </h3>
                
                <div className="flex items-center justify-center gap-3 mb-3">
                  {item.oldPrice && (
                    <span className="text-xs text-gray-400 line-through font-medium">
                      {item.oldPrice}
                    </span>
                  )}
                  <span className="text-[1.05rem] font-bold text-[#111111]">
                    {item.price}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex gap-1 text-[#FFAC00] text-xs">
                  {[...Array(item.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
