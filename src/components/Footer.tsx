const brands = [
  'Oatly', 'Lipton', 'Brown Sugar Co.', 'Tea Forté', 'Twinings',
  'Nestlé', 'Harney & Sons', 'Tapioca King', 'Numi Organic', 'TWG Tea',
];

export default function Footer() {
  return (
    <footer className="bg-charcoal-800 text-white w-full">

      {/* ── Brand marquee strip ── */}
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee-scroll 28s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>

      <div className="w-full overflow-hidden bg-lemon py-7 border-b border-lemon-600">
        <div className="marquee-track flex gap-0 whitespace-nowrap">
          {[...brands, ...brands].map((brand, i) => (
            <span key={i} className="inline-flex items-center shrink-0">
              <span className="text-charcoal text-[22px] font-[900] uppercase tracking-[0.22em] px-12">
                {brand}
              </span>
              <span className="text-charcoal/40 text-[13px]">◆</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-[clamp(1.5rem,4vw,3rem)] pt-16 pb-10">

        {/* Main grid: left (brand + links) | right (banner) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── LEFT ── */}
          <div className="flex flex-col gap-10">

            {/* Brand */}
            <p className="text-[2.2rem] font-[900] tracking-tight leading-none text-chiffon">
              Daddy&nbsp;Boba
            </p>

            {/* Three-column link grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">

              {/* Explore */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-charcoal-300 mb-5">
                  Explore
                </p>
                <ul className="flex flex-row flex-wrap gap-x-5 gap-y-2 lg:flex-col lg:flex-nowrap lg:gap-[10px]">
                  {['Menu', 'Seasonal', 'Favorites', 'New Arrivals', 'Combos', 'Gift Cards'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-lemon text-[13px] font-medium hover:text-chiffon transition-colors duration-200">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-charcoal-300 mb-5">
                  Company
                </p>
                <ul className="flex flex-row flex-wrap gap-x-5 gap-y-2 lg:flex-col lg:flex-nowrap lg:gap-[10px]">
                  {['About Us', 'Our Story', 'Careers', 'Press', 'Privacy Policy'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-lemon text-[13px] font-medium hover:text-chiffon transition-colors duration-200">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Socials */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-charcoal-300 mb-5">
                  Socials
                </p>
                <ul className="flex flex-row flex-wrap gap-x-5 gap-y-2 lg:flex-col lg:flex-nowrap lg:gap-[10px]">
                  {['Instagram', 'TikTok', 'YouTube', 'Facebook', 'Twitter'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-lemon text-[13px] font-medium hover:text-chiffon transition-colors duration-200">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* ── RIGHT: branded banner ── */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-[#FFAC00]" style={{ minHeight: '320px' }}>

            {/* Grid overlay */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)',
                backgroundSize: '72px 72px',
              }}
            />

            {/* Decorative arrows (SVG) */}
            <svg
              className="absolute inset-0 w-full h-full z-10 pointer-events-none"
              viewBox="0 0 560 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Top-right corner arrow curving down */}
              <path
                d="M 420 -20 C 480 40, 560 80, 560 160"
                stroke="white"
                strokeWidth="22"
                strokeLinecap="round"
                fill="none"
                opacity="0.9"
              />
              <path
                d="M 540 145 L 560 160 L 545 178"
                stroke="white"
                strokeWidth="22"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.9"
              />

              {/* Bottom-center arrow curving up-left */}
              <path
                d="M 300 380 C 260 300, 160 280, 80 300"
                stroke="white"
                strokeWidth="22"
                strokeLinecap="round"
                fill="none"
                opacity="0.9"
              />
              <path
                d="M 96 284 L 80 300 L 98 314"
                stroke="white"
                strokeWidth="22"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.9"
              />

              {/* Bottom-right arrow curving up */}
              <path
                d="M 500 380 C 480 280, 440 220, 420 160"
                stroke="white"
                strokeWidth="22"
                strokeLinecap="round"
                fill="none"
                opacity="0.9"
              />
              <path
                d="M 403 175 L 420 160 L 437 175"
                stroke="white"
                strokeWidth="22"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.9"
              />
            </svg>

            {/* Tagline */}
            <div className="absolute top-8 left-8 z-20 flex flex-col gap-1">
              <span className="bg-charcoal text-chiffon font-[900] text-[1.8rem] leading-tight px-3 py-1 inline-block">
                Sip the
              </span>
              <span className="bg-charcoal text-chiffon font-[900] text-[1.8rem] leading-tight px-3 py-1 inline-block">
                Experience
              </span>
            </div>

            {/* Boba cup image */}
            <img
              src="/one_boba.png"
              alt="Daddy Boba cup"
              className="absolute bottom-0 right-10 h-[85%] object-contain drop-shadow-2xl z-20"
            />

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-10 pt-6 border-t border-charcoal-600 flex justify-end">
          <p className="text-[11px] text-charcoal-300 tracking-widest uppercase">
            © 2026, Daddy Boba, Inc.
          </p>
        </div>

      </div>
    </footer>
  );
}
