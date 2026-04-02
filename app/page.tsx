import { AnimatedBoxSection } from "@/components/landing/animated-box";
import { HeroSection } from "@/components/landing/hero-section";
import { LandingShell } from "@/components/landing/landing-shell";
import { LandingSidebar } from "@/components/landing/landing-sidebar";
import { PricingSection } from "@/components/landing/pricing-section";

/**
 * Single-scroll landing: global background, hero, founders box, pricing.
 */
export default function Home() {
  return (
    <LandingShell>
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      {/* Cinematic base + hero glow + vertical falloff */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[#050505]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_85%_55%_at_50%_-5%,rgba(124,58,237,0.2),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-white/[0.03] via-transparent to-[#050505]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-black/60"
        aria-hidden
      />

      <div className="grain-overlay" aria-hidden />

      <LandingSidebar />

      <div className="pt-14 lg:pt-0 lg:pl-[220px]">
        <main id="top">
          <HeroSection />
          <AnimatedBoxSection />
          <PricingSection />
        </main>
      </div>
    </div>
    </LandingShell>
  );
}
