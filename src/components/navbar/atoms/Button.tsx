export default function Button({ 
  variant = 'primary', 
  children,
  icon,
  className = ''
}: { 
  variant?: 'primary' | 'secondary', 
  children: React.ReactNode,
  icon?: string,
  className?: string
}) {
  if (variant === 'primary') {
    return (
      <button className={`relative z-[70] flex items-center justify-center px-6 md:px-8 py-3 md:py-3.5 bg-[#FFAC00] hover:bg-[#e69b00] text-black font-semibold text-sm md:text-base rounded-full transition-colors duration-200 ${className}`}>
        {children}
      </button>
    );
  }

  // Secondary outline button
  return (
    <button className={`relative z-[70] hidden md:flex items-center justify-center  pl-1.5 pr-6 py-1.5 border border-gray-300 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-black font-medium text-sm md:text-base rounded-full transition-all duration-200 ${className}`}>
      {icon && (
        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden flex items-center justify-center">
          <img src={icon} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      {children}
    </button>
  );
}
