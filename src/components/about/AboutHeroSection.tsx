'use client';

export default function AboutHeroSection() {
  return (
    <section className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="w-full px-[clamp(1.5rem,5vw,4rem)]">
        
        {/* Header content */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <span className="px-5 py-2 bg-white border border-gray-100 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#FFAC00] shadow-sm mb-6 inline-block">
            Origin Story
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-[#111111] uppercase tracking-tight leading-[1] mb-8">
            Built On <br className="hidden sm:block" /> Perfect Pours
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-2xl px-4 md:px-0">
            Daddy Boba didn't start in a boardroom. It started with a frustration over mediocre tea, chalky bubbles, and a realization that the boba experience needed to be dramatically elevated.
          </p>
        </div>

        {/* Hero Masonry Block */}
        <div className="w-full bg-[#FAFAFA] rounded-[3.5rem] p-4 sm:p-8 overflow-hidden h-[50vh] md:h-[70vh] relative shadow-inner group flex items-center justify-center">
           <img 
              src="/boba_store_lifestyle_1778329727033.png" 
              alt="First Store Concept" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
           />
           <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
           
           <div className="absolute bottom-8 left-8 sm:bottom-16 sm:left-16 bg-white/95 backdrop-blur-md px-8 py-6 rounded-[2rem] shadow-2xl max-w-md transform transition-transform duration-700 group-hover:-translate-y-2">
             <h3 className="text-2xl font-black text-[#111111] uppercase tracking-tight mb-3">Our First Batch</h3>
             <p className="text-gray-500 text-sm font-medium leading-relaxed">
               Two years, 400 experimental batches, and counting. We relentlessly tweaked the cooking process until the tapioca achieved the perfect, bouncy consistency that our customers now demand.
             </p>
           </div>
        </div>

      </div>
    </section>
  );
}
