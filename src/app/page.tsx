'use client'
import { Navbar }            from "@/components/navbar";
import ProductHero           from "@/components/ProductHero";
import TrustBar              from "@/components/TrustBar";
import WhyBobaSection        from "@/components/WhyBobaSection";
import ProductSection        from "@/components/ProductSection";
import BrandStatement        from "@/components/BrandStatement";
import AboutSection          from "@/components/AboutSection";
import TestimonialsSection   from "@/components/TestimonialsSection";
import CtaSection            from "@/components/CtaSection";
import NewsletterSection     from "@/components/NewsletterSection";
import Footer                from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative">
     
      <ProductHero />
      <TrustBar />
      <WhyBobaSection />
      <ProductSection />
      <BrandStatement />
      <AboutSection />
      <TestimonialsSection />
      <CtaSection />
      <NewsletterSection />
   
    </div>
  );
}
