export default function NavLink({ 
  href, 
  children, 
  isDarkBackground,
  isOpen
}: { 
  href: string, 
  children: React.ReactNode,
  isDarkBackground: boolean,
  isOpen: boolean
}) {
  const color = isDarkBackground || isOpen ? '#ffffff' : '#1A1A1A';
  
  return (
    <a 
      href={href} 
      className="relative text-sm font-medium hover:opacity-70 transition-opacity duration-200"
      style={{ color }}
    >
      {children}
       <span
        className="absolute bottom-0 left-0 h-[1.5px] w-0 group-hover:w-full"
        style={{
          background: 'var(--color-lemon)',
          transition: 'width 0.25s var(--ease-smooth)',
        }}
      />
    </a>
  );
}
