'use client';

export default function ContactHeroSection() {
  return (
    <section className="w-full px-[clamp(1.5rem,5vw,4rem)]">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl sm:text-7xl font-black text-[#111111] uppercase tracking-tight leading-[1] mb-6">
          Contact Us
        </h1>
        <p className="text-lg text-gray-500 font-medium leading-relaxed px-4 md:px-0">
          We'd love to hear from you. Have a question about our drinks, need a large catering order, or just want to chat? Drop us a line below.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full max-w-6xl mx-auto">
        
        {/* Contact Form (Left) */}
        <div className="flex-1 bg-white rounded-[3rem] p-10 sm:p-14 border border-gray-100 shadow-sm flex flex-col items-start gap-6">
          <div className="flex flex-col sm:flex-row gap-6 w-full">
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full bg-[#FAFAFA] text-[#111111] font-bold px-6 py-4 rounded-full outline-none border border-transparent focus:border-[#FFAC00] focus:ring-4 focus:ring-[#FFAC00]/10 transition-all placeholder:text-gray-400"
            />
            <input 
              type="text" 
              placeholder="Phone" 
              className="w-full bg-[#FAFAFA] text-[#111111] font-bold px-6 py-4 rounded-full outline-none border border-transparent focus:border-[#FFAC00] focus:ring-4 focus:ring-[#FFAC00]/10 transition-all placeholder:text-gray-400"
            />
          </div>
          
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full bg-[#FAFAFA] text-[#111111] font-bold px-6 py-4 rounded-full outline-none border border-transparent focus:border-[#FFAC00] focus:ring-4 focus:ring-[#FFAC00]/10 transition-all placeholder:text-gray-400"
          />
          
          <textarea 
            placeholder="Message" 
            rows={5}
            className="w-full bg-[#FAFAFA] text-[#111111] font-bold px-6 py-4 rounded-3xl outline-none border border-transparent focus:border-[#FFAC00] focus:ring-4 focus:ring-[#FFAC00]/10 transition-all placeholder:text-gray-400 resize-none"
          />

          <button className="bg-[#111111] text-white px-9 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#FFAC00] hover:text-[#111111] transition-all duration-300 shadow-md hover:shadow-[0_10px_30px_rgba(255,172,0,0.3)] hover:-translate-y-1">
            Submit Message
          </button>
        </div>

        {/* Newsletter Cross-Sell (Right) */}
        <div className="w-full lg:w-[400px] xl:w-[450px] bg-[#111111] rounded-[3rem] p-10 sm:p-14 text-white flex flex-col justify-center items-start shadow-xl relative overflow-hidden group">
          {/* Subtle decoration */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#FFAC00] rounded-full mix-blend-screen filter blur-[80px] opacity-30 group-hover:opacity-60 transition-opacity duration-700" />
          
          <h3 className="text-3xl font-black uppercase tracking-tight mb-4 relative z-10">Our Newsletters</h3>
          <p className="text-gray-400 font-medium leading-relaxed mb-8 text-sm relative z-10">
            Join the inner circle. Get early access to new seasonal flavors, special events, and secret off-menu items. No spam, just pure liquid gold.
          </p>

          <input 
            type="email" 
            placeholder="Email" 
            className="w-full bg-white/10 text-white font-bold px-6 py-4 rounded-full outline-none border border-transparent focus:border-[#FFAC00] placeholder:text-gray-400 transition-all relative z-10 mb-4"
          />
          <button className="w-full bg-[#FFAC00] text-[#111111] px-9 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 relative z-10 shadow-[0_10px_30px_rgba(255,172,0,0.15)]">
            Subscribe Now
          </button>
        </div>

      </div>
    </section>
  );
}
