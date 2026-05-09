'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface AdminDropdownProps {
  value: string | number;
  onChange: (value: any) => void;
  options: { label: string; value: string | number }[];
  label?: string;
  className?: string;
  placeholder?: string;
  variant?: 'outline' | 'ghost' | 'mini';
  direction?: 'up' | 'down';
}

export default function AdminDropdown({ 
  value, 
  onChange, 
  options, 
  label,
  className = '',
  placeholder = 'Select...',
  variant = 'outline',
  direction = 'down'
}: AdminDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  const variantStyles = {
    outline: 'bg-[#FAFAFA] border border-transparent hover:border-gray-100',
    ghost: 'bg-transparent border border-gray-100 hover:bg-[#FAFAFA]',
    mini: 'bg-[#FAFAFA] border-transparent px-4 py-2 min-w-[80px]',
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#111111] transition-all ${variantStyles[variant]}`}
      >
        {label && <span className="text-gray-400 font-bold">{label}:</span>}
        <span className="flex-1 text-left line-clamp-1">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-3 h-3 text-[#FFAC00] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute left-0 w-full min-w-[200px] bg-white rounded-3xl shadow-2xl border border-gray-100 py-4 z-[100] animate-in fade-in duration-200 ${
          direction === 'up' ? 'bottom-full mb-2 slide-in-from-bottom-2' : 'top-full mt-2 slide-in-from-top-2'
        }`}>
          <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${
                  value === option.value ? 'text-[#FFAC00] bg-[#FAFAFA]' : 'text-gray-500 hover:bg-[#FAFAFA] hover:text-[#111111]'
                }`}
              >
                {option.label}
                {value === option.value && <Check className="w-3 h-3" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
