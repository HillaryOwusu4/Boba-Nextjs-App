'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { DRINKS } from '@/data/drinks';
import Figure, { lerpNum } from './Figure';
import MobileCard from './MobileCard';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { fontVars } from '@/theme/fonts';

function CollectionContent() {
  const sansFont = fontVars.sans;
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const filteredDrinks = categoryParam 
    ? DRINKS.filter(d => d.category === categoryParam)
    : DRINKS;

  const wrapRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [flat, setFlat] = useState(1);
  const addToCart = useCartStore((s) => s.addToCart);
  const ctaBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onScroll() {
      const el = wrapRef.current;
      if (!el) return;
      const rect  = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;

      const lead = 0.18, tail = 0.18;
      const usable   = 1 - lead - tail;
      const adjusted = Math.min(Math.max((p - lead) / usable, 0), 1);
      setProgress(adjusted * (filteredDrinks.length - 1));

      let f = 0;
      if (p < lead)        f = 1 - p / lead;
      else if (p > 1 - tail) f = (p - (1 - tail)) / tail;
      setFlat(Math.min(Math.max(f, 0), 1));
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [filteredDrinks.length]);

  // GSAP animation for the CTA button bounce
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (ctaBtnRef.current) {
        gsap.to(ctaBtnRef.current, {
          y: -6,
          duration: 1.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        });
      }
    });
    return () => ctx.revert();
  }, [flat]);

  const nearest        = Math.round(progress);
  const distFromCenter = Math.abs(progress - nearest);
  const titleOpacity   = Math.max(0, 1 - distFromCenter / 0.35) * (1 - flat);
  const titleY         = distFromCenter * 18;
  const displayActive  = filteredDrinks.length > 0 ? Math.min(Math.max(nearest, 0), filteredDrinks.length - 1) : 0;

  // Snappy cross-fade between intro and drink head
  const introOpacity    = Math.max(0, (flat - 0.85) / 0.15);
  const drinkHeadOpacity = Math.min(1, Math.max(0, (0.92 - flat) / 0.08));

  const activeDrink = filteredDrinks.length > 0 ? (filteredDrinks[displayActive] || filteredDrinks[0]) : null;

  if (!activeDrink) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <h2 className="text-2xl font-bold mb-4">No drinks found in this collection.</h2>
        <Link href="/product-list" className="text-blue-500 underline">Back to all products</Link>
      </div>
    );
  }

  return (
    <>
      <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>

        {/* ── Mobile / Tablet card grid (hidden on lg+) ── */}
        <div className="lg:hidden pt-24 pb-16 px-[clamp(1.5rem,5vw,4rem)] bg-white min-h-screen">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2" style={{ fontFamily: sansFont }}>
              {categoryParam ? `The ${categoryParam} Collection` : 'Available in multiple bottle sizes'}
            </p>
            <h1 className="font-black text-4xl sm:text-5xl uppercase tracking-tight text-[#111111] leading-[1.05]" style={{ fontFamily: sansFont }}>
              {categoryParam || 'Collections'}
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {filteredDrinks.map((drink) => (
              <MobileCard key={drink.id} drink={drink} />
            ))}
          </div>
        </div>

        {/* ── Desktop scroll animation (hidden below lg) ── */}
        <section
          ref={wrapRef}
          className="hidden lg:block relative bg-white"
          style={{ height: `${filteredDrinks.length * 100 + 100}vh` }}
        >
          {/* Sticky viewport stage */}
          <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col bg-white">
            {/* White dripping background overlay */}
            <img
              src="/wee.png"
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none z-0"
            />
            {/* ── Head ── */}
            <div 
              className="h-[30%] relative px-[clamp(1.5rem,5vw,4rem)] z-20 pointer-events-none"
              style={{ paddingTop: `${Math.round(lerpNum(100, 140, flat))}px` }}
            >

              {/* Collection intro — fades out when scroll starts */}
              <div
                className="-mt-5 transition-all duration-500 ease-out"
                style={{
                  opacity: introOpacity,
                  transform: `translateY(${(1 - introOpacity) * -16}px)`,
                  pointerEvents: introOpacity > 0.5 ? 'auto' : 'none',
                }}
              >
                <p className="text-[11px] font-bold tracking-[0.28em] uppercase text-gray-400 mb-4" style={{ fontFamily: sansFont }}>
                  {categoryParam ? `The ${categoryParam} Collection` : 'Available in multiple bottle sizes'}
                </p>
                <h1 
                  className="font-black tracking-tight leading-[0.9] uppercase text-[#111111] whitespace-nowrap"
                  style={{ fontSize: 'clamp(40px, 6.5vw, 100px)', fontFamily: sansFont }}
                >
                  {categoryParam || 'Collections'}
                </h1>
                <p className="mt-6 max-w-[45vw] text-[17px] leading-relaxed text-gray-500 font-medium" style={{ fontFamily: sansFont }}>
                  {categoryParam 
                    ? `Discover our exclusive selection of ${categoryParam} drinks, each crafted with premium ingredients and our signature artistic touch.`
                    : 'Nine drinks, drawn from a winter of slow afternoons — brown sugar, matcha, taro and stone fruit; each one a small ritual built around boba, foam, and the steady architecture of a paper cup.'
                  }{' '}
                  <em>Scroll to enter the collection.</em>
                </p>
              </div>

              {/* Drink head — crossfades in as conveyor engages */}
              <div
                className="absolute top-20 left-[clamp(1.5rem,5vw,4rem)] right-[clamp(1.5rem,5vw,4rem)]"
                style={{
                  opacity: drinkHeadOpacity,
                  pointerEvents: drinkHeadOpacity > 0.5 ? 'auto' : 'none',
                }}
              >
                <p className="text-[11px] font-bold tracking-[0.28em] mt-5 uppercase text-gray-400 mb-4" style={{ fontFamily: sansFont }}>
                  {categoryParam ? `The ${categoryParam} Collection` : 'Available in multiple bottle sizes'}
                </p>
                <h1
                  className="font-black w-[250px] tracking-tight leading-[0.95] uppercase text-[#111111] will-change-transform"
                  style={{
                    fontSize: 'clamp(44px, 6vw, 84px)',
                    fontFamily: sansFont,
                    opacity: titleOpacity,
                    transform: `translateY(${titleY}px)`,
                  }}
                >
                  {activeDrink.title}
                </h1>

                <p
                  className="mt-4 text-[16px] leading-relaxed text-gray-500 font-medium max-w-[38vw] will-change-transform"
                  style={{
                    fontFamily: sansFont,
                    opacity: titleOpacity,
                    transform: `translateY(${titleY * 0.4}px)`,
                  }}
                >
                  {activeDrink.description}
                </p>

                <div
                  className="absolute top-5 right-0 flex flex-col items-end will-change-transform"
                  style={{
                    opacity: titleOpacity,
                    transform: `translateY(${titleY * 0.6}px)`,
                  }}
                >
                  <span
                    className="font-black tracking-tight leading-[0.9] uppercase mb-[30px]"
                    style={{
                      fontSize: 'clamp(60px, 8vw, 100px)',
                      fontFamily: sansFont,
                      color: activeDrink.buttonColor,
                    }}
                  >
                    {activeDrink.price}
                  </span>

                  <div className="flex items-center gap-[18px] pointer-events-auto">
                  <button
                    ref={ctaBtnRef}
                    onClick={() => addToCart({
                      id: activeDrink.id,
                      title: activeDrink.title,
                      price: activeDrink.price,
                      image: activeDrink.image,
                      quantity: 1,
                    })}
                    className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-white font-sans text-sm font-extrabold tracking-[0.12em] uppercase border-none cursor-pointer transition-all duration-300"
                    style={{
                      background: activeDrink.buttonColor,
                      boxShadow: `0 15px 30px ${activeDrink.buttonColor}55`,
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, { scale: 1.06, boxShadow: `0 20px 40px ${activeDrink.buttonColor}77`, duration: 0.3 });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, { scale: 1, boxShadow: `0 15px 30px ${activeDrink.buttonColor}55`, duration: 0.3 });
                    }}
                  >
                    Add to Bag
                    <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <Link
                    href={`/drinks/${activeDrink.id}`}
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        sessionStorage.setItem('lastCollectionUrl', window.location.href);
                      }
                    }}
                    className="inline-flex items-center px-8 py-4 rounded-full bg-transparent font-sans text-sm font-extrabold tracking-[0.12em] uppercase cursor-pointer no-underline transition-all duration-300"
                    style={{
                      border: `2px solid ${activeDrink.buttonColor}`,
                      color: activeDrink.buttonColor,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = activeDrink.buttonColor;
                      (e.currentTarget as HTMLElement).style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.color = activeDrink.buttonColor;
                    }}
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── Figures stage ── */}
            <div className="h-[70%] relative w-full min-h-0 pointer-events-none z-10">
              {filteredDrinks.map((drink, i) => (
                <div key={drink.id} className="pointer-events-auto">
                  <Figure
                    drink={drink}
                    idx={i}
                    offset={i - progress}
                    total={filteredDrinks.length}
                    flat={flat}
                  />
                </div>
              ))}
            </div>

            {/* ── Footer meta ── */}
            <div className="absolute bottom-7 left-[clamp(1.5rem,5vw,4rem)] right-[clamp(1.5rem,5vw,4rem)] flex justify-between text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 pointer-events-none z-10">
              <span>
                Drink{' '}
                <strong className="text-[#111111] font-black">
                  {String(displayActive + 1).padStart(2, '0')}
                </strong>
                {' '}/ {String(filteredDrinks.length).padStart(2, '0')}
              </span>
              <span>↓ Scroll</span>
            </div>
          </div>
        </section>
      </ReactLenis>
    </>
  );
}

export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <CollectionContent />
    </Suspense>
  );
}
