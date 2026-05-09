'use client';

import { useCartStore } from '@/store/useCartStore';
import CollectionsSection from '@/components/CollectionsSection';
import NewArrivalsSection from '@/components/NewArrivalsSection';
import BobaEssentialsSection from '@/components/BobaEssentialsSection';
import ProductIntroSection from '@/components/ProductIntroSection';
export default function ProductList() {
  

  return (
    <div className="flex flex-col bg-[#0a0a0a] min-h-screen">
      {/* ── Cinematic Scroll Story Section ── */}
      <ProductIntroSection />

      {/* New Added Sections */}
      <div className="relative z-20 bg-white">
        <CollectionsSection />
        <NewArrivalsSection />
        <BobaEssentialsSection />
      </div>
    </div>
  );
}