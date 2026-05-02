import { Navbar }     from "@/components/navbar";
import HeroSection   from "@/components/HeroSection";
import AboutSection  from "@/components/AboutSection";
import ProductSection from "@/components/ProductSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative">
     
      <HeroSection />
      <AboutSection />
      <ProductSection />
      <CtaSection />

      {/* Seamless Integration Layer */}
      <div 
        className="absolute flex flex-col top-[515vh] left-0 w-full z-40 pointer-events-none transform -translate-y-[45%] overflow-visible"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 100%)'
        }}
      >
        <img 
          src="/YU.png" 
          alt="Seamless Section Edge" 
          className="w-full z-40 opacity-100 drop-shadow-md"
        />
      </div>
    </div>
  );
}
