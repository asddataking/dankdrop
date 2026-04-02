"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Lock, Sparkles, Truck } from "lucide-react";
import { useWaitlist } from "./waitlist-provider";

const easePremium = [0.16, 1, 0.3, 1] as const;

const highlights = [
  {
    icon: Lock,
    title: "Member pricing",
    body: "Locked-in savings each drop.",
  },
  {
    icon: Sparkles,
    title: "Limited runs",
    body: "Small batches. No restocks.",
  },
  {
    icon: Truck,
    title: "Shipped direct",
    body: "Tracked, discreet, on time.",
  },
] as const;

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const { openWaitlist } = useWaitlist();

  return (
    <header className="relative flex min-h-[calc(100dvh-3.5rem)] flex-col justify-center px-5 pb-16 pt-6 sm:px-8 sm:pb-24 sm:pt-8 lg:min-h-[100dvh] lg:pb-28 lg:pt-4">
      {/* Local hero glow + vignette (squeeze focus) */}
      <div
        className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_18%,rgba(139,92,246,0.28),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_120%,rgba(0,0,0,0.5),transparent_45%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center lg:max-w-5xl">
        {/* Eyebrow + urgency */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easePremium }}
          className="mb-8 flex flex-col items-center gap-4"
        >
          <span className="inline-flex items-center rounded-full border border-violet-500/35 bg-violet-950/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-200/90 backdrop-blur-sm">
            Pre-launch · Founding access
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-400/80">
            Limited list · $1 to lock in
          </p>
        </motion.div>

        {/* Framed squeeze card */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05, ease: easePremium }}
          className="relative mx-auto rounded-[28px] border border-violet-500/20 bg-gradient-to-b from-violet-950/30 via-[#0a0a0c]/85 to-[#050505]/90 p-6 shadow-[0_0_0_1px_rgba(139,92,246,0.12),0_40px_100px_-40px_rgba(0,0,0,0.9),0_0_80px_-30px_rgba(124,58,237,0.25)] backdrop-blur-sm sm:p-10 md:p-12 md:px-14"
        >
          <div
            className="pointer-events-none absolute inset-px rounded-[26px] bg-gradient-to-b from-white/[0.04] to-transparent opacity-60"
            aria-hidden
          />

          <div className="relative">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: easePremium }}
              className="mb-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              DankDrops
            </motion.p>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.14, ease: easePremium }}
              className="mb-10 text-base text-zinc-400 sm:text-lg"
            >
              Limited Drops. No Mid.
            </motion.p>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18, ease: easePremium }}
              className="mb-5 bg-gradient-to-b from-white via-violet-200 to-fuchsia-500 bg-clip-text text-5xl font-semibold leading-[0.95] tracking-tight text-transparent sm:text-6xl md:text-7xl lg:text-8xl"
            >
              GET IN FOR $1
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: easePremium }}
              className="mx-auto mb-6 max-w-xl text-lg font-medium leading-snug text-zinc-200 sm:text-xl"
            >
              Monthly Drops for People Who Actually Smoke
            </motion.p>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: easePremium }}
              className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-zinc-500 sm:text-base"
            >
              Limited releases, premium access, and member pricing on every
              drop. Join the list—first boxes ship to founding members only.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36, ease: easePremium }}
              className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <motion.button
                type="button"
                onClick={openWaitlist}
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.22, ease: easePremium }}
                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-violet-400 via-fuchsia-500 to-purple-700 px-10 py-4 text-sm font-semibold text-white shadow-[0_12px_40px_-8px_rgba(139,92,246,0.55)] transition-shadow hover:shadow-[0_20px_50px_-6px_rgba(168,85,247,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0c]"
              >
                Join Early Access
              </motion.button>
              <motion.a
                href="#access"
                whileHover={reduceMotion ? undefined : { scale: 1.01 }}
                whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                transition={{ duration: 0.22, ease: easePremium }}
                className="inline-flex items-center justify-center rounded-full border border-violet-400/35 bg-violet-950/25 px-8 py-4 text-sm font-semibold text-violet-100 transition-colors hover:border-violet-400/55 hover:bg-violet-950/45 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0c]"
              >
                See plans & pricing
              </motion.a>
            </motion.div>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={reduceMotion ? undefined : { opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.44, ease: easePremium }}
              className="mt-6 text-xs text-zinc-600"
            >
              No spam. Unsubscribe anytime. 18+ where required.
            </motion.p>
          </div>
        </motion.div>

        {/* Trust / value row */}
        <motion.ul
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.42, ease: easePremium }}
          className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3 sm:gap-4"
        >
          {highlights.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="flex flex-col items-center rounded-2xl border border-violet-500/15 bg-violet-950/10 px-4 py-5 text-center sm:py-6"
            >
              <Icon
                className="mb-3 h-5 w-5 text-violet-400/80"
                strokeWidth={1.5}
                aria-hidden
              />
              <span className="text-sm font-semibold text-zinc-200">
                {title}
              </span>
              <span className="mt-1 text-xs leading-relaxed text-zinc-500">
                {body}
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </header>
  );
}
