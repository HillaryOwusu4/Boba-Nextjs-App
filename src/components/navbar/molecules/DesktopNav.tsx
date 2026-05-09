import NavLink from '../atoms/NavLink';

const DESKTOP_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/product-list' },
  { label: 'Collections', href: '/collections' },
  { label: 'Scroll Story', href: '/scroll-story' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function DesktopNav({ isDarkBackground, isOpen }: { isDarkBackground: boolean, isOpen: boolean }) {
  return (
    <nav className="hidden lg:flex items-center gap-6 xl:gap-8 ml-8">
      {DESKTOP_LINKS.map(link => (
        <NavLink 
          key={link.label} 
          href={link.href}
          isDarkBackground={isDarkBackground}
          isOpen={isOpen}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
