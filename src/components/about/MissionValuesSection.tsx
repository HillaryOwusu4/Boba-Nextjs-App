'use client';

export default function MissionValuesSection() {
  return (
    <section className="py-24 bg-[#FAFAFA] overflow-hidden">
      <div className="w-full px-[clamp(1.5rem,5vw,4rem)]">
        
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <span className="px-5 py-2 bg-white border border-gray-100 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#FFAC00] shadow-sm mb-8 inline-block">
            Our Mission
          </span>
          
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-[#111111] leading-[1.05] mb-12 uppercase">
            Elevating the <br /> Standard of Tea.
          </h2>

          <p className="text-lg md:text-2xl text-gray-500 font-medium leading-relaxed mb-20 max-w-3xl">
            We exist to prove that boba isn't just a trend—it's an art form. By prioritizing sustainable packaging, ethically sourced ingredients, and meticulous brewing methods, we promise a cup that never compromises.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {/* Value 1 */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 flex flex-col items-center group hover:-translate-y-2 transition-transform duration-500">
              <div className="w-16 h-16 rounded-full bg-[#FAFAFA] flex items-center justify-center mb-6 group-hover:bg-[#FFAC00] transition-colors duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#111111]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[#111111] mb-4">Ethical Sourcing</h3>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">Direct trade with farmers ensures top quality leaves and fair wages across our entire supply chain.</p>
            </div>

            {/* Value 2 */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 flex flex-col items-center group hover:-translate-y-2 transition-transform duration-500">
              <div className="w-16 h-16 rounded-full bg-[#FAFAFA] flex items-center justify-center mb-6 group-hover:bg-[#FFAC00] transition-colors duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#111111]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[#111111] mb-4">Eco-Conscious</h3>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">100% biodegradable cups, agave straws, and a zero-waste policy in our brewing facilities.</p>
            </div>

            {/* Value 3 */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 flex flex-col items-center group hover:-translate-y-2 transition-transform duration-500">
              <div className="w-16 h-16 rounded-full bg-[#FAFAFA] flex items-center justify-center mb-6 group-hover:bg-[#FFAC00] transition-colors duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#111111]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[#111111] mb-4">Community Focused</h3>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">Our cafes act as community hubs. Every month, 5% of our profits are re-invested into local arts programs.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
