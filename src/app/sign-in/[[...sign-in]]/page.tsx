import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center overflow-hidden"
       >
        <div className="absolute inset-0">
          <Image
            src="/boba_lifestyle_portrait_1778329759998.png"
            alt="Boba lifestyle"
            fill
            className="object-cover  opacity-80"
          />
        </div>
        <div className="relative z-10 text-center px-12">
          <h1
            className="text-6xl font-black uppercase tracking-tight mb-4 text-white drop-shadow-lg"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Welcome Back
          </h1>
          <p className="text-lg font-medium drop-shadow" style={{ color: 'var(--color-lemon)' }}>
            Sign in to your account and enjoy the finest boba experience.
          </p>
        </div>
        {/* decorative pill */}
        <div
          className="absolute bottom-12 left-12 w-24 h-24 rounded-full opacity-40"
          style={{ backgroundColor: 'var(--color-charcoal)' }}
        />
        <div
          className="absolute top-16 right-16 w-14 h-14 rounded-full opacity-20"
          style={{ backgroundColor: 'var(--color-charcoal)' }}
        />
      </div>

      {/* Right panel — Clerk SignIn */}
      <div
        className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16"
        style={{ backgroundColor: 'var(--color-charcoal)' }}
      >
        <SignIn forceRedirectUrl="/admin/analytics" />
      </div>
    </div>
  );
}
