import { Geist_Mono, Manrope } from "next/font/google";

export const appSansFont = Manrope({
  variable: "--font-theme-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const appMonoFont = Geist_Mono({
  variable: "--font-theme-mono",
  subsets: ["latin"],
  display: "swap",
});

export const fontThemeClassName = `${appSansFont.variable} ${appMonoFont.variable}`;

export const fontVars = {
  sans: "var(--font-sans)",
  display: "var(--font-display)",
  heading: "var(--font-heading)",
  mono: "var(--font-mono)",
} as const;
