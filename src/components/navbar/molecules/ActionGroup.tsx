import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import Button from '../atoms/Button';

export default function ActionGroup({ isDarkBackground, isOpen }: { isDarkBackground: boolean, isOpen: boolean }) {
  const { getTotalItems, setIsCartOpen } = useCartStore();
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
        {totalItems > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-[var(--color-lemon)] text-[var(--color-charcoal)] text-[10px] font-black rounded-full flex items-center justify-center shadow-lg border border-black/10">
            {totalItems}
          </span>
        )}
      </button>

      <Button 
        variant="secondary" 
        className={secondaryBorderOutline}
        icon="https://images.unsplash.com/photo-1541604193435-2253a3a7028e?w=200&h=200&fit=crop&q=80"
      >
        Login
      </Button>
    </div>
  );
}
