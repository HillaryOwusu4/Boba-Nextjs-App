'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { DRINKS } from '@/data/drinks';
import { useCartStore } from '@/store/useCartStore';

function getDrinkById(id: number) {
  return DRINKS.find(d => d.id === id) ?? null;
}

const NUTRITION_LABELS = [
  { key: 'kcal' as const, label: 'kcal', unit: '' },
  { key: 'fat' as const,  label: 'fats',    unit: 'g' },
  { key: 'carbs' as const, label: 'carbohydrates',  unit: 'g' },
  { key: 'protein' as const, label: 'protein', unit: 'g' },
];

const Sphere = ({ size, top, left, right, bottom, color }: any) => (
  <div 
    className="absolute rounded-full z-10"
    style={{
      width: size, height: size, top, left, right, bottom,
      background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${color} 40%, #000000 120%)`,
      boxShadow: '0 15px 35px rgba(0,0,0,0.15)'
    }}
  />
);

export default function DrinkDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const addToCart = useCartStore(s => s.addToCart);
  const [added, setAdded] = useState(false);

  const drink = getDrinkById(id);
  if (!drink) notFound();
  const d = drink!;

  function handleOrder() {
    addToCart({ id: d.id, title: d.title, price: d.price, image: d.image, quantity: 1, color: d.topColor });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const tableColor = `color-mix(in srgb, ${d.topColor} 50%, #222222)`;

  const [backUrl, setBackUrl] = useState('/collections');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('lastCollectionUrl');
      if (saved) setBackUrl(saved);
    }
  }, []);

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-[#FAFAFA] overflow-hidden font-sans">
      
      {/* ── Left panel — Giant Circle ── */}
      <div className="relative w-full md:w-[46%] flex items-center justify-center min-h-[55vh] md:min-h-screen z-0">
        
        {/* Giant background circle */}
        <div 
          className="absolute rounded-full"
          style={{
            width: 'clamp(600px, 60vw, 1000px)', 
            height: 'clamp(600px, 60vw, 1000px)', 
            background: d.topColor,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: -1
          }}
        />

        {/* 3D Spheres */}
        <Sphere size="7rem" top="12%" left="18%" color={d.topColor} />
        <Sphere size="5rem" top="38%" right="8%" color={d.topColor} />
        <Sphere size="10rem" bottom="12%" left="10%" color={d.topColor} />

        {/* Carousel arrows mockup */}
        <button className="absolute left-[5%] md:left-[8%] z-20 w-12 h-12 rounded-full text-white flex items-center justify-center transition-transform hover:scale-110 shadow-lg" style={{ backgroundColor: 'var(--color-charcoal-700)', opacity: 0.85 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button className="absolute right-[5%] md:right-[2%] z-20 w-12 h-12 rounded-full text-white flex items-center justify-center transition-transform hover:scale-110 shadow-lg" style={{ backgroundColor: 'var(--color-charcoal-700)', opacity: 0.85 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        {/* Drink bottle */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={d.image} 
          alt={d.title} 
          className="relative z-10 w-[85%] md:w-full max-w-[900px] object-contain -rotate-[8deg]" 
          style={{ filter: 'drop-shadow(25px 35px 40px rgba(0,0,0,0.35))' }}
        />
      </div>

      <div className="relative z-10 w-full md:w-[54%] flex flex-col justify-center items-center px-8 md:px-12 lg:px-16 xl:px-20 py-16">

        <div className="w-full max-w-[800px] xl:max-w-[950px] flex flex-col">
         
          
          {/* Category */}
          <Link
            href="/collections"
            className="font-bold uppercase tracking-widest text-sm md:text-base mb-4 hover:opacity-70 transition-opacity"
            style={{ color: d.buttonColor, fontFamily: 'var(--font-sans)' }}
          >
            {d.category}
          </Link>

          {/* Title */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl leading-[1.05] mb-6 tracking-tight"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              color: 'var(--color-charcoal-800)',
            }}
          >
            {d.title}
          </h1>

          {/* Description */}
          <p
            className="mb-14 max-w-[650px] text-base md:text-lg leading-relaxed"
            style={{ color: 'var(--color-charcoal-400)', fontFamily: 'var(--font-sans)' }}
          >
            {d.description}
          </p>

          {/* Columns: Contents & Nutritional values */}
          <div className="flex flex-col xl:flex-row gap-12 xl:gap-16 mb-16">
            
            {/* Contents */}
            {d.ingredients.length > 0 && (
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: 'var(--color-charcoal-700)', fontFamily: 'var(--font-sans)' }}>
                  Contents:
                </h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  {d.ingredients.map(ing => (
                    <div key={ing.name} className="flex items-center gap-3">
                      <div className="flex shrink-0 items-center justify-center w-12 h-12 rounded-full bg-white border border-[rgba(0,0,0,0.04)] shadow-md text-xl">
                        {ing.icon}
                      </div>
                      <span className="font-bold text-base md:text-lg" style={{ color: 'var(--color-charcoal-600)', fontFamily: 'var(--font-sans)' }}>
                        {ing.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nutritional values */}
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: 'var(--color-charcoal-700)', fontFamily: 'var(--font-sans)' }}>
                Nutritional values:
              </h3>
              <div className="flex flex-col rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-gray-100/50">
                {NUTRITION_LABELS.map((n) => (
                  <div key={n.key} className="flex">
                    <div 
                      className="w-[90px] py-3 px-5 text-left font-bold text-white text-base flex items-center shadow-inner" 
                      style={{ backgroundColor: tableColor }}
                    >
                      {d.nutrition[n.key]} <span className="font-medium ml-1 text-xs opacity-80">{n.unit}</span>
                    </div>
                    <div 
                      className="w-[180px] py-3 px-6 bg-[#EEEEEE] text-base font-medium text-[var(--color-charcoal-500)] flex items-center"
                    >
                      {n.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order & Back button group */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <button
              onClick={handleOrder}
              className="inline-flex items-center justify-center rounded-full font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-lg w-full sm:w-auto text-base md:text-lg px-8 py-3 md:px-10 md:py-4"
              style={{
                backgroundColor: d.buttonColor,
                fontFamily: 'var(--font-sans)',
              }}
            >
              {added ? 'Added ✓' : 'Order now'}
            </button>

            <Link
              href={backUrl}
              className="inline-flex items-center justify-center rounded-full font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-lg group no-underline w-full sm:w-auto text-base md:text-lg px-8 py-3 md:px-10 md:py-4"
              style={{
                backgroundColor: d.buttonColor,
                fontFamily: 'var(--font-sans)',
              }}
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
