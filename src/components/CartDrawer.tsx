'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useCartStore } from '@/store/useCartStore';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const [mounted, setMounted] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const totalPrice = getTotalPrice();

  console.log('CartDrawer items:', items);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const lenis = (window as any).lenis;
    const isLenisActionable = (action: 'start' | 'stop') => 
      lenis && typeof lenis[action] === 'function';

    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      if (isLenisActionable('stop')) lenis.stop();
      
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, display: 'block', ease: 'power2.out' });
      gsap.to(drawerRef.current, { x: 0, duration: 0.6, ease: 'power3.out' });
    } else {
      document.body.style.overflow = 'auto';
      if (isLenisActionable('start')) lenis.start();
      
      gsap.to(drawerRef.current, { x: '100%', duration: 0.5, ease: 'power3.in' });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, display: 'none', ease: 'power2.in' });
    }
  }, [isCartOpen]);

  if (!mounted) return null;

  return (
    <>
      <div ref={overlayRef} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/20 backdrop-blur-[4px] z-[150] hidden opacity-0 transition-opacity" />

      <div ref={drawerRef} className="fixed top-0 right-0 h-full w-full sm:w-[450px] z-[200] transform translate-x-full overflow-hidden">
        <div className="h-full w-full bg-white/80 backdrop-blur-[24px] border-l border-white/40 shadow-2xl flex flex-col">
          <div className="px-8 py-5 flex items-center justify-between border-b border-black/5 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-lemon)]/20 flex items-center justify-center border border-[var(--color-lemon)]/30">
                <ShoppingBag className="text-[var(--color-charcoal)] w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-charcoal)] tracking-tight uppercase" style={{ fontFamily: 'Impact, sans-serif' }}>Your Cart</h2>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-full hover:bg-black/5 text-neutral-400 hover:text-[var(--color-charcoal)] transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div 
            className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-hide"
            data-lenis-prevent
          >
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-10">
                <div className="w-20 h-20 rounded-full bg-black/5 flex items-center justify-center mb-6">
                  <ShoppingBag className="text-neutral-300 w-10 h-10" />
                </div>
                <p className="text-neutral-500 font-medium text-lg">Your tray is empty.</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="group relative bg-white/40 rounded-[30px] p-4 border border-white/60 shadow-sm flex items-center gap-5 transition-transform hover:scale-[1.02]">
                  <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 rounded-[20px] opacity-10" style={{ backgroundColor: item.color || '#F2D64B' }} />
                    <img src={item.image} alt={item.title} className="relative z-10 w-full h-full object-contain drop-shadow-md" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[var(--color-charcoal)] font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-[var(--color-charcoal)] opacity-60 font-bold mb-3">{item.price}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-white/60 rounded-full p-1 border border-black/5 shadow-inner">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--color-charcoal)] hover:bg-white transition-colors"><Minus className="w-3 h-3" /></button>
                        <span className="w-8 text-center text-[var(--color-charcoal)] font-bold text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--color-charcoal)] hover:bg-white transition-colors"><Plus className="w-3 h-3" /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-neutral-400 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 bg-white/40 backdrop-blur-md border-t border-black/5 flex-shrink-0">
              <div className="flex justify-between items-center mb-4">
                <span className="text-neutral-500 font-medium uppercase tracking-widest text-xs">Subtotal</span>
                <span className="text-3xl font-black text-[var(--color-charcoal)]">${totalPrice.toFixed(2)}</span>
              </div>
              <button className="w-full py-4 rounded-[22px] bg-[var(--color-charcoal)] text-white font-bold text-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest flex items-center justify-center gap-3">
                Checkout Now
              </button>
              <p className="text-center text-neutral-400 text-[10px] mt-4 uppercase tracking-widest font-bold opacity-60">taxes and shipping calculated at checkout</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
