export default function Logo({ isDarkBackground, isOpen }: { isDarkBackground: boolean, isOpen: boolean }) {
  const color = isDarkBackground || isOpen ? '#ffffff' : '#1A1A1A';
  return (
    <a href="/" className={`relative z-[70] flex flex-col items-center justify-center transition-colors duration-300`} style={{ color }}>
      <span className="text-2xl md:text-3xl font-bold tracking-tight lowercase" style={{ fontFamily: 'var(--font-sans)', lineHeight: 1 }}>
        noovo
      </span>
      <span className="text-[0.45rem] md:text-[0.55rem] font-medium tracking-[0.3em] uppercase mt-[2px] opacity-80">
        Live Anywhere
      </span>
    </a>
  );
}
