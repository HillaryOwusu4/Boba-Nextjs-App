'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { DRINKS } from '@/data/drinks';

// Use the first 3 drinks — GSAP stack animation is designed for exactly 3 cards
const products = DRINKS.slice(0, 3);

export default function ProductSection() {
  const { addToCart } = useCartStore();
  const [quantities, setQuantities] = useState<Record<number, number>>(
    () => Object.fromEntries(products.map((p) => [p.id, 1]))
  );
  const [activeCardId, setActiveCardId] = useState(products[0].id);
  
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const cupRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleQtyChange = (id: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const onAddClick = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: quantities[product.id] || 1,
      color: product.topColor
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax entrance for the typography
    if (textContainerRef.current) {
      gsap.fromTo(
        textContainerRef.current.children,
        { y: 60, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }

    // Concentric Ring Expanding Animation
    if (ringsRef.current) {
      gsap.fromTo(
        ringsRef.current.children,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          },
        }
      );
    }

    // The Bottom cup POP-UP Parallax
    if (cupRef.current) {
      gsap.fromTo(cupRef.current,
        { y: '50%' },
        {
          y: '10%',
          ease: 'power1.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: 1,
          }
        }
      );
    }

    // Card Stack animation
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const container = cardsContainerRef.current;

    if (cards.length === 3 && container) {
      const isDesktop = window.innerWidth >= 768;
      const cardW = isDesktop ? 380 : 340;
      const gap = 32;
      const containerW = container.offsetWidth;
      const centerX = containerW / 2 - cardW / 2;

      if (isDesktop) {
        const totalW = cardW * 3 + gap * 2;
        const startX = Math.max(0, (containerW - totalW) / 2);
        const finalX = [startX, startX + cardW + gap, startX + (cardW + gap) * 2];

        gsap.set(cards[0], { x: centerX, rotation: -8, zIndex: 1 });
        gsap.set(cards[1], { x: centerX, rotation: 0,  zIndex: 3 });
        gsap.set(cards[2], { x: centerX, rotation: 8,  zIndex: 2 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1.5,
          },
        });

        tl.to(cards[0], { x: finalX[0], rotation: 0, duration: 2, ease: 'power2.out' }, 0)
          .to(cards[1], { x: finalX[1], rotation: 0, duration: 2, ease: 'power2.out' }, 0)
          .to(cards[2], { x: finalX[2], rotation: 0, duration: 2, ease: 'power2.out' }, 0)
          .to({}, { duration: 1.5 })
          .to(cards[0], { x: centerX, rotation: -8, duration: 2, ease: 'power2.in' })
          .to(cards[1], { x: centerX, rotation:  0, duration: 2, ease: 'power2.in' }, '<')
          .to(cards[2], { x: centerX, rotation:  8, duration: 2, ease: 'power2.in' }, '<');
      } else {
        gsap.set(cards[0], { x: centerX, rotation: -5, zIndex: 1 });
        gsap.set(cards[1], { x: centerX, rotation:  0, zIndex: 3 });
        gsap.set(cards[2], { x: centerX, rotation:  5, zIndex: 2 });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === sectionRef.current || t.vars.trigger === cardsContainerRef.current) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-[90vh] bg-[#FFAC00] overflow-hidden flex flex-col justify-center pb-32"
    >
      <div ref={ringsRef} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full h-[150vh] flex items-center justify-center pointer-events-none z-[1]">
        <div className="absolute w-[800px] h-[800px] rounded-full border border-white/20"></div>
        <div className="absolute w-[1200px] h-[1200px] rounded-full border border-white/15"></div>
        <div className="absolute w-[1600px] h-[1600px] rounded-full border border-white/10"></div>
        <div className="absolute w-[2000px] h-[2000px] rounded-full border border-white/5"></div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-[clamp(1.5rem,4vw,3rem)] grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center relative z-10 pt-24">
        <div ref={textContainerRef} className="flex flex-col items-start w-full">
          <span className="font-serif italic text-3xl md:text-[2.5rem] text-white tracking-wide lowercase mb-4 drop-shadow-sm">Meet the flavor</span>
          <h2 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-[900] tracking-tighter leading-[0.9] mb-8 uppercase text-[#F4F1EA] drop-shadow-[0_4px_10px_rgba(0,0,0,0.1)]" style={{ fontFamily: 'Impact, sans-serif' }}>OUR PRODUCTS</h2>
        </div>
        <div className="hidden md:flex flex-col items-end justify-center h-full pr-12">
          <p className="text-[3rem] lg:text-[5rem] font-bold text-black/20 font-sans tracking-widest flex items-baseline">
            <span className="text-white text-[5rem] lg:text-[8rem] leading-none drop-shadow-md">{activeCardId}</span>/3
          </p>
        </div>
      </div>

      <div ref={cardsContainerRef} className="w-full max-w-[1300px] mx-auto relative z-20" style={{ height: '650px', marginTop: '8rem' }}>
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            ref={el => { cardRefs.current[index] = el; }}
            product={product}
            qty={quantities[product.id] || 1}
            onQtyChange={(delta) => handleQtyChange(product.id, delta)}
            onAddToCart={() => onAddClick(product)}
            onMouseEnter={() => setActiveCardId(product.id)}
            className="absolute top-0 left-0 w-[340px] md:w-[380px]"
          />
        ))}
      </div>
      <div className="w-full flex justify-center mt-24 relative z-20">
        <Link href={`/product-list`} className="group flex items-center gap-3 bg-[#1A1A1A] text-[#F4F1EA] px-10 py-5 rounded-full text-lg font-bold transition-all hover:scale-105 active:scale-95">View more products</Link>
      </div>
    </section>
  );
}
