import Navbar from '@/components/navbar/organisms/Navbar';
import TrustBar from '@/components/TrustBar';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';

import ContactHeroSection from '@/components/contact/ContactHeroSection';
import ContactMethodsSection from '@/components/contact/ContactMethodsSection';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Navbar />

      <div className="pt-32 pb-16 relative flex-1">
        {/* Contact Form & Newsletter block matching the reference image */}
        <ContactHeroSection />
        
        {/* Trust logos placed seamlessly per reference */}
        <div className="py-8 bg-transparent">
           <TrustBar />
        </div>

        {/* 3 Value Cards: Phone, Email, Location */}
        <ContactMethodsSection />

        {/* Map Placeholder requested by user */}
        <section className="w-full px-[clamp(1.5rem,5vw,4rem)] mt-12 mb-24">
           <div className="w-full h-[400px] bg-gray-200 rounded-[2.5rem] flex items-center justify-center border border-gray-100 shadow-inner">
             <span className="text-gray-400 font-bold tracking-widest uppercase text-sm">
                Map Placeholder
             </span>
           </div>
        </section>
      </div>

      <CtaSection />
      <Footer />
    </main>
  );
}
