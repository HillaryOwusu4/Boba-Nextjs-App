'use client';

export default function TeamSection() {
  const team = [
    {
      id: 1,
      name: "Marcus Chen",
      role: "Head Brewer & Founder",
      bio: "Former barista turned flavor scientist. Marcus spent 3 years in Taiwan studying traditional brewing before founding Daddy Boba.",
      image: "/media__1778327682779.jpg" // Reusing available asset
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      role: "Director of Sourcing",
      bio: "Sarah travels the globe verifying the ethical standards of our farms. She's the reason our matcha tastes consistently divine.",
      image: "/boba_lifestyle_portrait_1778329759998.png" // Reusing available asset
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="w-full px-[clamp(1.5rem,5vw,4rem)]">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 lg:mb-24">
          <div className="flex flex-col items-start text-left max-w-xl">
             <span className="px-5 py-2 bg-white border border-gray-100 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#FFAC00] shadow-sm mb-6 inline-block">
              Faces Behind the Brand
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#111111] leading-[1.05] uppercase">
              Meet The <br /> Brewers
            </h2>
          </div>
          <p className="text-gray-500 font-medium leading-relaxed max-w-sm mt-8 md:mt-0 md:text-right">
            People love buying from passionate people, not just faceless corporations. Meet the core team driving our mission forward.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 w-full max-w-5xl mx-auto">
          {team.map((member) => (
            <div key={member.id} className="flex flex-col sm:flex-row gap-8 items-center sm:items-start group">
               <div className="relative w-48 h-48 sm:w-56 sm:h-56 shrink-0 overflow-hidden rounded-full shadow-lg border-[6px] border-white z-10 transition-transform duration-500 group-hover:scale-105">
                 <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10" />
               </div>
               <div className="flex flex-col text-center sm:text-left pt-2">
                 <h3 className="text-2xl font-black text-[#111111] uppercase tracking-tight mb-1">{member.name}</h3>
                 <span className="text-[#FFAC00] font-bold text-xs uppercase tracking-widest mb-4 inline-block">{member.role}</span>
                 <p className="text-sm text-gray-500 font-medium leading-relaxed">{member.bio}</p>
               </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
