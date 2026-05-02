import { useEffect, useRef } from 'react';
import { DRINKS } from '@/data/drinks';
import gsap from 'gsap';

export function lerpNum(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface FigureProps {
  drink: (typeof DRINKS)[number];
  idx: number;
  offset: number;
  total: number;
  flat: number;
}

export default function Figure({ drink, idx, offset, total, flat }: FigureProps) {
  const abs = Math.abs(offset);
  const drinkRef = useRef<HTMLDivElement>(null);
  const prevActive = useRef(false);

  // V-shape conveyor position
  const compress = 0.7;
  let xC = 0;
  if (abs > 0) {
    let acc = 0;
    for (let k = 1; k <= Math.ceil(abs); k++) {
      const portion = Math.min(1, abs - (k - 1));
      acc += 28 * Math.pow(compress, k - 1) * portion;
    }
    xC = (offset < 0 ? -1 : 1) * acc;
  }
  const tEdge = Math.min(abs, 4) / 4;
  const scaleT = Math.min(abs, 2) / 2;
  const scaleC = 1.3 - (1.3 - 0.38) * (scaleT * scaleT);
  const opacityC = 1 - (1 - 0.14) * tEdge;
  const yC       = abs * abs * 14;
  const blurC    = abs < 0.35 ? 0 : Math.min(8, (abs - 0.35) * 3.2);
  const satC     = abs > 0.25 ? Math.max(0.1, 1 - abs * 0.55) : 1;

  // Flat row position
  const itemWidth = 18; 
  const totalWidth = (total - 1) * itemWidth;
  const xF      = idx * itemWidth - totalWidth / 2;
  const scaleF  = 0.78;
  const opacityF = 0.9;
  const satF    = 0.9;

  const x       = lerpNum(xC,      xF,       flat);
  const y       = lerpNum(yC,      -120,     flat);
  const scale   = lerpNum(scaleC,  scaleF,   flat);
  const opacity = lerpNum(opacityC, opacityF, flat);
  const blur    = lerpNum(blurC,   0,        flat);
  const sat     = lerpNum(satC,    satF,     flat);

  const z = 100 - Math.round(abs * 10);
  const isActive = abs < 0.5 && flat < 0.5;

  const filterParts: string[] = [];
  if (blur > 0.05) filterParts.push(`blur(${blur.toFixed(2)}px)`);
  if (sat < 0.99)  filterParts.push(`saturate(${sat.toFixed(2)})`);

  // GSAP Animation replacing the drinkPop CSS animation
  useEffect(() => {
    if (isActive && !prevActive.current && drinkRef.current) {
      gsap.fromTo(drinkRef.current, 
        { scale: 0.95, y: 12 },
        { scale: 1, y: 0, duration: 0.65, ease: "back.out(1.7)", overwrite: "auto" }
      );
    }
    prevActive.current = isActive;
  }, [isActive]);

  return (
    <div
      className="absolute bottom-6 left-1/2 flex items-end justify-center origin-bottom will-change-transform
        w-[14rem] h-[20rem] -ml-[7rem] 
        lg:w-[16rem] lg:h-[24rem] lg:-ml-[8rem]"
      style={{
        transform: `translateX(${x}vw) translateY(${y}px) scale(${scale})`,
        opacity,
        filter: filterParts.join(' ') || 'none',
        zIndex: z,
      }}
      aria-label={drink.title}
    >
      <div
        ref={drinkRef}
        className="w-full h-full flex flex-col items-center justify-end origin-[50%_80%]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={drink.image}
          alt={drink.title}
          className="w-[82%] flex-1 object-contain object-bottom block min-h-0"
          style={{
            filter: isActive
              ? 'drop-shadow(0 24px 48px rgba(0,0,0,0.28))'
              : undefined,
          }}
        />

        <div 
          className="flex flex-col items-center justify-center -mt-12 mb-2 pointer-events-none"
          style={{ 
            opacity: flat, 
            transform: `translateY(${(1 - flat) * 20}px)` 
          }}
        >
          <span 
            className="text-[10px] font-medium tracking-widest uppercase mb-1.5"
            style={{ color: drink.buttonColor }}
          >
            {drink.category}
          </span>
          <span className="text-sm font-bold text-neutral-800 bg-red-599 text-center leading-snug max-w-[80%]">
            {drink.title}
          </span>
        </div>
      </div>
    </div>
  );
}
