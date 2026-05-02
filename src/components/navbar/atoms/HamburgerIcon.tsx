import { Menu, X } from 'lucide-react';

export default function HamburgerIcon({ isOpen, toggle, isDarkBackground }: { isOpen: boolean, toggle: () => void, isDarkBackground: boolean }) {
  const color = isDarkBackground || isOpen ? '#ffffff' : '#1A1A1A';
  return (
    <button
      onClick={toggle}
      className="relative z-[70] flex items-center justify-center p-1 focus:outline-none transition-transform duration-200 hover:scale-105"
      aria-label="Toggle menu"
      style={{ color }}
    >
      {isOpen ? <X size={28} strokeWidth={2} /> : <Menu size={28} strokeWidth={2} />}
    </button>
  );
}
