'use client';

export default function TheCraftSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="w-full px-[clamp(1.5rem,5vw,4rem)]">
        
        <div className="w-full bg-[#FAFAFA] rounded-[3.5rem] p-8 sm:p-12 md:p-16 lg:p-24 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative overflow-hidden">
          
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }} />

          {/* Overlapping Image Container */}
          <div className="w-full lg:w-1/2 relative h-[450px] sm:h-[600px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden group shadow-sm z-10">
            <img 
              src="/boba_premium_ingredients_1778329742425.png" 
              alt="Premium Raw Ingredients" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Pill overlay */}
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full font-bold text-[0.7rem] uppercase tracking-widest text-[#111111] shadow-lg flex items-center gap-2">
               Organic 100%
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start z-10 text-left">
            <span className="px-5 py-2 bg-white border border-gray-100 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#FFAC00] shadow-sm mb-8 inline-block">
              The Craft
            </span>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111111] leading-[1.05] mb-8 uppercase">
              No Shortcuts. <br /> Ever.
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-[#111111] uppercase tracking-wide mb-3 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-[#FFAC00]"></span> Single-Origin Leaves
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed pl-11">
                  We don't use powdered aromatics. Our base teas are steeped from hand-picked, single-origin leaves imported directly from high-altitude farms to ensure a robust, authentic flavor profile.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#111111] uppercase tracking-wide mb-3 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-[#FFAC00]"></span> Daily Cooked Pearls
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed pl-11">
                  Texture is everything. Our signature tapioca pearls are cooked fresh every four hours in-house. That mesmerizing chew? It's the result of precise temperature control and unrelenting quality standards.
                </p>
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}
