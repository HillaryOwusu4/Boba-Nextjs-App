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
    image: '/bobadrink.png',
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
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 flex flex-col items-center new-arrivals-header">
          <h2 className="text-3xl md:text-4xl font-display text-[var(--color-charcoal)] uppercase tracking-wide">
            New Arrivals
          </h2>
          <div className="w-16 h-px bg-gray-300 my-4"></div>
          <p className="text-[var(--color-neutral-500)] italic font-serif">
            Discover our latest signature flavors
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 arrivals-grid">
          {arrivals.map((item) => (
            <div key={item.id} className="flex flex-col group cursor-pointer arrival-card">
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] bg-[var(--color-snow-soft)] flex items-center justify-center overflow-hidden mb-6">
                {item.isSale && (
                  <div className="absolute top-4 left-4 bg-white px-2 py-1 text-xs font-bold tracking-widest uppercase z-10 shadow-sm text-[var(--color-charcoal)]">
                    SALE
                  </div>
                )}
                
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-3/4 h-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Text Info */}
              <div className="text-center flex flex-col items-center">
                <h3 className="text-sm font-semibold text-[var(--color-charcoal)] uppercase tracking-widest mb-2">
                  {item.title}
                </h3>
                
                <div className="flex items-center justify-center gap-3 mb-3">
                  {item.oldPrice && (
                    <span className="text-xs text-[var(--color-neutral-400)] line-through">
                      {item.oldPrice}
                    </span>
                  )}
                  <span className="text-sm font-bold text-[var(--color-charcoal)]">
                    {item.price}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex gap-1 text-[var(--color-lemon)] text-sm">
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
