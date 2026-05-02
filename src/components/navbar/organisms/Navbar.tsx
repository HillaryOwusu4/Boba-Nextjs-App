'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import HamburgerIcon from '../atoms/HamburgerIcon';
import Logo from '../atoms/Logo';
import DesktopNav from '../molecules/DesktopNav';
import ActionGroup from '../molecules/ActionGroup';
import FullscreenMenu from './FullscreenMenu';
import { useScrolled } from '../hooks/useScrolled';

export default function Navbar() {
  const scrolled = useScrolled();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Force the scroll look (white bg, dark text) on pages with a white background like /drinks and /collections
  const forceLightMode = pathname?.startsWith('/drinks') || pathname?.startsWith('/collections');
  const effectivelyScrolled = scrolled || forceLightMode;

  // We can decide dark mode based on scroll or page props. 
  // Let's assume transparent at top (might be dark or light depending on hero), 
  // but scrolled down becomes white. For this replica, we assume scrolled = white bg.
  const isDarkBackground = !effectivelyScrolled && !isOpen;

  // We need to disable body scroll when menu is open
  if (typeof window !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0"
        style={{
          zIndex: 'var(--z-fixed)', /* 50 */
          background: isOpen 
            ? 'transparent' // the fullscreen menu gives background
            : effectivelyScrolled
              ? 'rgba(255, 255, 255, 0.88)' // Glassy white scrolled
              : 'transparent',
          backdropFilter: effectivelyScrolled && !isOpen ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: effectivelyScrolled && !isOpen ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: effectivelyScrolled && !isOpen
            ? '1px solid rgba(0,0,0,0.05)'
            : '1px solid transparent',
          transition: 'background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease',
        }}
      >
        <div
          className="flex items-center justify-between w-full"
          style={{
            height: '80px', // slightly taller for nice padding like noovolife
            padding: '0 clamp(1.5rem, 5vw, 4rem)',
          }}
        >
          {/* Left section: Hamburger + Desktop Nav */}
          <div className="flex mr-6 items-center">
            <div className="md:hidden">
              <HamburgerIcon 
                isOpen={isOpen} 
                toggle={() => setIsOpen(!isOpen)} 
                isDarkBackground={isDarkBackground}
              />
            </div>
            <DesktopNav isDarkBackground={isDarkBackground} isOpen={isOpen} />
          </div>

          {/* Center section: Absolute Positioning for perfect center */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Logo isDarkBackground={isDarkBackground} isOpen={isOpen} />
          </div>

          {/* Right section: Actions */}
          <div className="flex items-center">
            <ActionGroup isDarkBackground={isDarkBackground} isOpen={isOpen} />
          </div>
        </div>
      </header>
      
      <FullscreenMenu isOpen={isOpen} />
    </>
  );
}
