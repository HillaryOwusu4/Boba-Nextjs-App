import Navbar from '@/components/navbar/organisms/Navbar';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';

import AboutHeroSection from '@/components/about/AboutHeroSection';
import TheCraftSection from '@/components/about/TheCraftSection';
import MissionValuesSection from '@/components/about/MissionValuesSection';
import TeamSection from '@/components/about/TeamSection';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 md:pt-32">
        <AboutHeroSection />
        <TheCraftSection />
        <MissionValuesSection />
        <TeamSection />
      </div>
      <CtaSection />
      <Footer />
    </main>
  );
}
