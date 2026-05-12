import React, { useEffect, useRef } from 'react'
import Image from 'next/image';
import gsap from 'gsap';
import { ITEMS } from '@/data/drinks';


const ProductHero = () => {
  
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeItem = ITEMS[activeIndex];
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Auto-loop fallback for static frames
  useEffect(() => {
    if (!activeItem.videoUrl) {
      const timer = setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % ITEMS.length);
      }, 6000); // Give static images 6 seconds before looping
      return () => clearTimeout(timer);
    }
  }, [activeIndex, activeItem.videoUrl]);

  // Hero Text Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Reset before animating
      tl.set([titleRef.current, subtitleRef.current, descRef.current, btnRef.current], { 
        opacity: 0, 
        y: 20 
      });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6")
      .to(descRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6")
      .to(btnRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6");
    });

    return () => ctx.revert();
  }, [activeIndex]);
  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center">
        
        {/* Main Background (Static or Video) */}
        {activeItem.videoUrl ? (
          <video
            key={activeItem.videoUrl}
            src={activeItem.videoUrl}
            autoPlay
            muted
            playsInline
            preload="metadata"
            poster={activeItem.image}
            onEnded={() => setActiveIndex((prev) => (prev + 1) % ITEMS.length)}
            className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000"
          />
        ) : (
          <div 
            className="absolute inset-0 z-0 transition-opacity duration-1000"
            style={{
              backgroundImage: `url("${activeItem.image}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}

        {/* Dark Overlay/Texture */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        
        {/* Reference Image Layout - Center Content */}
        <div className="relative z-20 px-6 max-w-4xl flex flex-col items-center">
          <h1 className="text-white text-6xl md:text-8xl font-bold leading-[0.9] tracking-tight mb-8" style={{ fontFamily: 'var(--font-sans)' }}>
            <span ref={titleRef} className="block">{activeItem.title}</span>
            <span ref={subtitleRef} className="block mt-2" style={{ color: '#888' }}>{activeItem.subtitle}</span>
          </h1>
          <p ref={descRef} className="text-white/70 text-lg md:text-xl max-w-md mb-10 leading-relaxed line-clamp-2" style={{ fontFamily: 'var(--font-sans)' }}>
            {activeItem.description}
          </p>
          <button ref={btnRef} className="bg-white text-black px-10 py-4 font-bold tracking-widest text-xs uppercase hover:bg-gray-200 transition-colors block lg:hidden 2xl:block">
            EXPLORE
          </button>
        </div>

        {/* Bottom Carousel Section */}
        <div className="absolute bottom-12 lg:bottom-4 2xl:bottom-12 left-0 w-full z-30 px-6 md:px-12 lg:px-20">
          
          {/* Carousel Header Labels */}
          <div className="flex justify-between items-end mb-4 text-white font-bold tracking-[0.2em] text-[10px] uppercase">
            <span className="opacity-60">NOW TRENDING</span>
            <span className="opacity-60">{String(activeIndex + 1).padStart(2, '0')} / {String(ITEMS.length).padStart(2, '0')}</span>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 justify-center overflow-x-auto scrollbar-hide">
            {ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`relative shrink-0 w-40 md:w-64 aspect-video rounded-sm overflow-hidden transition-all duration-300 ${
                  activeIndex === idx 
                    ? 'border-[1.5px] border-white scale-100 opacity-100' 
                    : 'opacity-40 hover:opacity-80 scale-95'
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 16rem, 10rem"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
  )
}

export default ProductHero
