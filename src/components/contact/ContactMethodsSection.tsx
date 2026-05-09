'use client';

export default function ContactMethodsSection() {
  const methods = [
    {
      id: 1,
      icon: (
         <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#FFAC00]">
           <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
         </svg>
      ),
      title: "(+876) 765 665",
      desc: "Give us a call. We're available Mon-Sat, 9am to 8pm to assist you."
    },
    {
      id: 2,
      icon: (
         <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#FFAC00]">
           <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
         </svg>
      ),
      title: "hello@daddyboba.com",
      desc: "For general inquiries, catering quotes, and collaborations."
    },
    {
      id: 3,
      icon: (
         <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#FFAC00]">
           <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
         </svg>
      ),
      title: "Downtown Brew Hub",
      desc: "124 Boba Blvd, Suite 200, Downtown District. Walk-ins welcome."
    }
  ];

  return (
    <section className="w-full px-[clamp(1.5rem,5vw,4rem)] py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
        {methods.map((method) => (
          <div key={method.id} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col lg:flex-row items-start lg:items-center gap-6 group hover:-translate-y-2 transition-transform duration-500 hover:shadow-md cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-[#FAFAFA] border border-gray-100 flex items-center justify-center shrink-0 group-hover:bg-[#111111] transition-colors duration-300">
               {method.icon}
            </div>
            <div className="flex flex-col text-left">
              <h3 className="text-xl font-black text-[#111111] tracking-tight mb-1">{method.title}</h3>
              <p className="text-sm font-medium text-gray-500 leading-relaxed max-w-[200px]">
                {method.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
