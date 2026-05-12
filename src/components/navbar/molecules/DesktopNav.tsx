import NavLink from '../atoms/NavLink';
import { MAIN_LINKS } from '../data/mainLinks';

export default function DesktopNav({ isDarkBackground, isOpen }: { isDarkBackground: boolean, isOpen: boolean }) {
  return (
    <nav className="hidden lg:flex items-center gap-6 xl:gap-8 ml-8">
      {MAIN_LINKS.map(link => (
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
