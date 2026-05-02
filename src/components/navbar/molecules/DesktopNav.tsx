import NavLink from '../atoms/NavLink';

const DESKTOP_LINKS = [
  { label: 'Lite', href: '#lite' },
  { label: 'Plus', href: '#plus' },
  { label: 'Next', href: '#next' },
  { label: 'Inventory', href: '/product-list' },
  { label: 'Rent', href: '#rent' },
  { label: 'Reviews', href: '#reviews' },
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
