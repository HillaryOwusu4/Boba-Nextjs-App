'use client';

import { forwardRef } from 'react';
import Link from 'next/link';

export interface ProductCardData {
  id: number;
  title: string;
  category: string;
  price: string;
  description: string;
  image: string;
  topColor: string;
  buttonColor: string;
}

interface ProductCardProps {
  product: ProductCardData;
  qty: number;
  onQtyChange: (delta: number) => void;
  onAddToCart: () => void;
  className?: string;
  onMouseEnter?: () => void;
}

const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  ({ product, qty, onQtyChange, onAddToCart, className = '', onMouseEnter }, ref) => {
    return (
      <div
        ref={ref}
        onMouseEnter={onMouseEnter}
        className={`bg-white rounded-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden ${className}`}
      >
        <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 pt-6 z-30">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition-transform hover:scale-110"
            style={{ backgroundColor: product.buttonColor }}
          >
            <svg className="w-5 h-5 ml-[-2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="text-gray-500 hover:text-gray-800 transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>

        <div className="relative w-full h-[260px] flex justify-center items-end z-[50]">
          <div
            className="absolute top-0 left-[-10%] w-[120%] h-full rounded-b-[50%] z-0"
            style={{ backgroundColor: product.topColor }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.title}
            className="absolute z-20 w-auto max-w-[85%] object-contain drop-shadow-[0_40px_30px_rgba(0,0,0,0.4)] bottom-[-40px] transition-transform duration-500 hover:scale-[1.10]"
          />
        </div>

        <div className="px-7 pb-6 flex flex-col h-[50%] z-20 relative pt-12">
          <div className="flex justify-between items-end mb-1">
            <h3 className="text-[22px] font-[800] text-[#1A1A1A] tracking-tight">{product.title}</h3>
            <span className="font-[900] text-[20px] tracking-tight" style={{ color: product.buttonColor }}>
              {product.price}
            </span>
          </div>
          <p className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-wider">{product.category}</p>
          <div className="flex gap-3 mb-6">
            <Link
              href={`/drinks/${product.id}`}
              className="text-white text-[11px] font-bold px-5 py-[10px] rounded-full shadow-md"
              style={{ backgroundColor: product.buttonColor }}
            >
              Details
            </Link>
            <button className="bg-white border-[1.5px] border-gray-200 text-[#1A1A1A] text-[11px] font-bold px-5 py-[10px] rounded-full">
              Reviews
            </button>
          </div>
          <p className="text-[13px] text-gray-500 font-[500] leading-relaxed mb-10">{product.description}</p>
          <div className="flex justify-between h-[20%] items-end mt-auto">
            <div className="flex items-center gap-4 bg-[#F8F8F8] rounded-full pr-1">
              <button
                onClick={() => onQtyChange(-1)}
                className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xl"
                style={{ backgroundColor: product.buttonColor }}
              >
                -
              </button>
              <span className="font-[800] text-lg text-[#1A1A1A]">{qty}</span>
              <button
                onClick={() => onQtyChange(1)}
                className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xl"
                style={{ backgroundColor: product.buttonColor }}
              >
                +
              </button>
            </div>
            <button
              onClick={onAddToCart}
              className="text-white text-sm font-bold px-8 py-4 rounded-full shadow-lg"
              style={{ backgroundColor: product.buttonColor }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
);

ProductCard.displayName = 'ProductCard';
export default ProductCard;
