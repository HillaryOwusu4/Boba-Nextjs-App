import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import ProductCard from '@/components/ProductCard';
import { DRINKS } from '@/data/drinks';

export default function MobileCard({ drink }: { drink: (typeof DRINKS)[number] }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const [qty, setQty] = useState(1);
  return (
    <ProductCard
      product={drink}
      qty={qty}
      onQtyChange={(d) => setQty((q) => Math.max(1, q + d))}
      onAddToCart={() => addToCart({ id: drink.id, title: drink.title, price: drink.price, image: drink.image, quantity: qty })}
      className="relative w-full"
    />
  );
}
