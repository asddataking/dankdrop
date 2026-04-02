"use client";

import { motion, useReducedMotion } from "framer-motion";
import { pricingTiers } from "@/lib/landing-data";
import { PricingCard } from "./pricing-card";

export function PricingSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="access"
      className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-8 sm:px-8 md:pb-32 md:pt-12"
      aria-labelledby="pricing-heading"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 max-w-2xl md:mb-16"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400/90">
          Choose Your Access
        </p>
        <h2
          id="pricing-heading"
          className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-[2.5rem] md:leading-tight"
        >
          Join for $1 today and unlock better pricing on every drop.
        </h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {pricingTiers.map((tier, i) => (
          <PricingCard key={tier.tier} {...tier} index={i} />
        ))}
      </div>
    </section>
  );
}
