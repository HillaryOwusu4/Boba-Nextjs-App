'use client';

import { ShoppingBag } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { useCartStore } from '@/store/useCartStore';
import Button from '../atoms/Button';

const subscribeToHydration = () => () => {};
const getClientHydrationSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

export default function ActionGroup({ isDarkBackground, isOpen }: { isDarkBackground: boolean, isOpen: boolean }) {
  const { getTotalItems, setIsCartOpen } = useCartStore();
  const hasHydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot
  );
  const totalItems = getTotalItems();
  const secondaryBorderOutline = isDarkBackground || isOpen ? 'border-white/20 text-white hover:bg-white/10' : 'border-[#1A1A1A]/20 text-[#1A1A1A] hover:bg-black/5';

  return (
    <div className="flex items-center gap-2 md:gap-4">
      <button 
        onClick={() => setIsCartOpen(true)}
        className={`relative p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
          isDarkBackground || isOpen ? 'text-white hover:bg-white/10' : 'text-[#1A1A1A] hover:bg-black/5'
        }`}
      >
        <ShoppingBag className="w-6 h-6" />
        {hasHydrated && totalItems > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-[var(--color-lemon)] text-[var(--color-charcoal)] text-[10px] font-black rounded-full flex items-center justify-center shadow-lg border border-black/10">
            {totalItems}
          </span>
        )}
      </button>

      <a href="/sign-in">
        <Button
          variant="secondary"
          className={secondaryBorderOutline}
          icon="/boba_lifestyle_portrait_1778329759998.png"
        >
          Login
        </Button>
      </a>
    </div>
  );
}
