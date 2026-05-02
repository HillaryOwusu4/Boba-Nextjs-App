'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  title: string;
  price: string;
  image: string;
  quantity: number;
  color?: string;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  addToCart: (newItem: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
  setIsCartOpen: (open: boolean) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const DUMMY_ITEMS: CartItem[] = [
  {
    id: 1,
    title: 'Classic Brew',
    price: '$8.00',
    image: '/one_boba.png',
    quantity: 1,
    color: '#F4F1EA'
  },
  {
    id: 2,
    title: 'Daddy Signature',
    price: '$7.50',
    image: '/multible_boab.png',
    quantity: 1,
    color: '#1A1A1A'
  },
  {
    id: 3,
    title: 'Vintage Burst',
    price: '$8.50',
    image: '/one_boba.png',
    quantity: 1,
    color: '#E64833'
  },
  {
    id: 4,
    title: 'Vintage Burst',
    price: '$8.50',
    image: '/one_boba.png',
    quantity: 1,
    color: '#E64833'
  }
];

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      addToCart: (newItem) => {
        const { items } = get();
        const existing = items.find((i) => i.id === newItem.id);

        if (existing) {
          set({
            items: items.map((i) =>
              i.id === newItem.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
            ),
            isCartOpen: true
          });
        } else {
          set({ items: [...items, newItem], isCartOpen: true });
        }
      },

      removeFromCart: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      updateQuantity: (id, delta) => {
        set({
          items: get().items.map((i) => {
            if (i.id === id) {
              return { ...i, quantity: Math.max(1, i.quantity + delta) };
            }
            return i;
          }),
        });
      },

      clearCart: () => set({ items: [] }),

      setIsCartOpen: (open) => set({ isCartOpen: open }),

      getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce((sum, i) => {
          const priceNum = parseFloat(i.price.replace('$', ''));
          return sum + priceNum * i.quantity;
        }, 0),
    }),
    {
      name: 'daddy-boba-cart-v3',
    }
  )
);
