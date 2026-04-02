"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const easePremium = [0.16, 1, 0.3, 1] as const;

/**
 * Matte black box with “DankDrop” on the front face.
 * Top lid opens as you scroll, revealing a bold purple interior glow.
 */
export function AnimatedBoxSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "end 0.32"],
  });

  const lidTarget = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [56, 56] : [0, 64],
  );

  const lidRotate = useSpring(lidTarget, {
    stiffness: reduceMotion ? 400 : 88,
    damping: reduceMotion ? 48 : 26,
    mass: 0.32,
  });

  const cavityStrength = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    reduceMotion ? [0.8, 0.8, 0.8] : [0.08, 0.5, 1],
  );

  return (
    <section
      ref={sectionRef}
      id="founders"
      className="relative mx-auto min-h-[120vh] w-full max-w-4xl px-5 pb-12 pt-12 text-center sm:px-8 sm:pb-16 sm:pt-16 md:min-h-[135vh]"
      aria-labelledby="founders-heading"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.65, ease: easePremium }}
        className="relative z-10 mx-auto max-w-lg"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-violet-400">
          The drop
        </p>
        <h2
          id="founders-heading"
          className="mb-12 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
        >
          Drop #001 — Founders
        </h2>

        <div
          className="relative mx-auto flex justify-center pb-4"
          style={{ perspective: 840 }}
        >
          <div
            className="pointer-events-none absolute -bottom-5 left-1/2 h-9 w-[min(300px,90vw)] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.35),transparent_70%)] blur-md"
            aria-hidden
          />

          <div
            className="relative [transform-style:preserve-3d]"
            style={{
              transform: "rotateX(12deg) rotateY(-22deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="relative h-[228px] w-[min(88vw,268px)] sm:h-[248px] sm:w-[288px]">
              <div className="absolute inset-0 rounded-md border border-zinc-800 bg-black shadow-[0_32px_70px_-18px_rgba(0,0,0,0.92),0_0_0_1px_rgba(255,255,255,0.05)]">
                <motion.div
                  className="pointer-events-none absolute left-[11px] right-[11px] top-[11px] z-0 h-[38%] rounded-t-sm bg-gradient-to-b from-violet-500 via-purple-700/80 to-black"
                  style={{ opacity: cavityStrength }}
                  aria-hidden
                />

                <motion.div
                  className="absolute inset-x-0 top-0 z-20 flex h-[40%] items-end justify-center rounded-t-md border-b border-zinc-800 bg-black pb-2 shadow-[inset_0_-8px_16px_rgba(0,0,0,0.7)]"
                  style={{
                    rotateX: lidRotate,
                    transformOrigin: "50% 100%",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-zinc-600">
                    Limited
                  </span>
                </motion.div>

                <div className="absolute inset-x-0 bottom-0 top-[36%] z-10 flex items-center justify-center px-4">
                  <span className="text-center text-[1.65rem] font-bold tracking-tight text-white sm:text-3xl">
                    DankDrop
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-14 text-lg text-zinc-400 sm:text-xl">Only 25 Boxes</p>
        <p className="mx-auto mt-4 max-w-md text-sm text-zinc-500 sm:text-base">
          First release. Limited quantity. No restocks.
        </p>
        <p className="mt-2 text-xs text-zinc-600">
          Keep scrolling—the lid opens as you move down the page.
        </p>
      </motion.div>
    </section>
  );
}
