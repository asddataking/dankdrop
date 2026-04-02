"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import type { PricingAccent } from "@/lib/landing-data";

export type PricingCardProps = {
  tier: string;
  badge?: string;
  pricePrimary: string;
  priceSecondary?: string;
  valueLine: string;
  savingsLine?: string;
  features: string[];
  ctaLabel: string;
  accent: PricingAccent;
  emphasized?: boolean;
  index?: number;
};

const accentStyles: Record<
  PricingAccent,
  {
    border: string;
    borderHover: string;
    glow: string;
    cta: string;
    ctaFocus: string;
    badge: string;
  }
> = {
  muted: {
    border: "border-white/[0.06]",
    borderHover: "hover:border-white/15",
    glow: "",
    cta:
      "border border-white/15 bg-white/[0.04] text-zinc-100 hover:bg-white/[0.08]",
    ctaFocus: "focus-visible:ring-white/30",
    badge: "bg-zinc-800/80 text-zinc-300 ring-1 ring-white/10",
  },
  member: {
    border: "border-violet-500/35",
    borderHover: "hover:border-fuchsia-400/50",
    glow: "bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(139,92,246,0.22),transparent_65%)]",
    cta:
      "bg-gradient-to-b from-violet-500 to-fuchsia-600 text-white shadow-[0_0_28px_-4px_rgba(139,92,246,0.55)] hover:from-violet-400 hover:to-fuchsia-500",
    ctaFocus: "focus-visible:ring-violet-400/65",
    badge: "bg-violet-950/85 text-violet-200 ring-1 ring-violet-500/40",
  },
  vip: {
    border: "border-white/20",
    borderHover: "hover:border-white/35",
    glow: "bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]",
    cta:
      "border border-white/25 bg-gradient-to-b from-zinc-100 to-zinc-300 text-[#050505] shadow-[0_0_32px_-6px_rgba(255,255,255,0.35)] hover:from-white hover:to-zinc-200",
    ctaFocus: "focus-visible:ring-white/50",
    badge: "bg-zinc-900/90 text-zinc-100 ring-1 ring-white/20",
  },
};

export function PricingCard({
  tier,
  badge,
  pricePrimary,
  priceSecondary,
  valueLine,
  savingsLine,
  features,
  ctaLabel,
  accent,
  emphasized,
  index = 0,
}: PricingCardProps) {
  const reduceMotion = useReducedMotion();
  const a = accentStyles[accent];

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -6, scale: accent === "vip" ? 1.02 : 1.01 }
      }
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-[#0d0d0f] p-8 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.85)] transition-[box-shadow] duration-300",
        a.border,
        a.borderHover,
        emphasized ? "ring-1 ring-white/[0.04]" : "",
        accent === "vip" ? "shadow-[0_32px_64px_-24px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)]" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={["pointer-events-none absolute inset-0 rounded-2xl", a.glow]
          .filter(Boolean)
          .join(" ")}
        aria-hidden
      />
      <div className="relative flex flex-1 flex-col">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-white">
              {tier}
            </h3>
            {badge ? (
              <span
                className={`mt-2 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${a.badge}`}
              >
                {badge}
              </span>
            ) : null}
          </div>
        </div>

        <div className="mb-1">
          <p className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {pricePrimary}
          </p>
          {priceSecondary ? (
            <p className="mt-1 text-sm text-zinc-500">{priceSecondary}</p>
          ) : null}
        </div>

        <p className="mb-6 text-sm font-medium text-zinc-300">{valueLine}</p>

        <ul className="mb-6 flex flex-1 flex-col gap-3 text-sm text-zinc-400">
          {features.map((item) => (
            <li key={item} className="flex gap-3">
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500 group-hover:text-zinc-400"
                strokeWidth={2}
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {savingsLine ? (
          <p className="mb-6 text-sm text-zinc-500">{savingsLine}</p>
        ) : null}

        <motion.button
          type="button"
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          className={`mt-auto w-full rounded-xl px-4 py-3.5 text-center text-sm font-semibold transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0f] ${a.cta} ${a.ctaFocus}`}
          aria-label={`${ctaLabel} — ${tier}`}
        >
          {ctaLabel}
        </motion.button>
      </div>
    </motion.article>
  );
}
