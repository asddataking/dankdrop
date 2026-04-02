"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { landingNavLinks } from "@/lib/landing-nav";
import { useWaitlist } from "./waitlist-provider";

const SIDEBAR_W = "w-[220px]";
const ease = [0.16, 1, 0.3, 1] as const;

export function LandingSidebar() {
  const { openWaitlist } = useWaitlist();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const onNavClick = () => {
    close();
  };

  const navList = (
    <nav aria-label="Page sections" className="flex flex-col gap-1">
      {landingNavLinks.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={onNavClick}
          className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-violet-950/50 hover:text-violet-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );

  const cta = (
    <button
      type="button"
      onClick={() => {
        onNavClick();
        openWaitlist();
      }}
      className="mt-6 block w-full rounded-xl border border-violet-500/40 bg-gradient-to-b from-violet-600 to-purple-800 px-3 py-3 text-center text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(139,92,246,0.5)] transition-colors hover:from-violet-500 hover:to-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/55"
    >
      Join for $1
    </button>
  );

  const danknDevourCta = (
    <a
      href="https://www.dankndevour.com"
      target="_blank"
      rel="noopener noreferrer"
      onClick={onNavClick}
      className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2.5 text-sm font-semibold text-zinc-200 transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40"
    >
      DanknDevour
      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-zinc-500" aria-hidden />
      <span className="sr-only">Opens in a new tab</span>
    </a>
  );

  const brand = (
    <Link
      href="#top"
      onClick={onNavClick}
      className="group mb-8 block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] rounded-lg"
    >
      <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-violet-400/90 transition-colors group-hover:text-violet-300">
        DankDrops
      </span>
      <span className="mt-1 block text-[13px] font-medium leading-tight text-zinc-300">
        Limited drops.
        <br />
        No mid.
      </span>
    </Link>
  );

  return (
    <>
      {/* Mobile top bar */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between border-b border-violet-500/20 bg-[#050505]/90 px-4 backdrop-blur-md supports-[backdrop-filter]:bg-[#050505]/75 lg:hidden">
        <Link
          href="#top"
          className="rounded text-sm font-semibold tracking-tight text-violet-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
        >
          DankDrops
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white transition-colors hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X className="h-5 w-5" strokeWidth={1.75} /> : <Menu className="h-5 w-5" strokeWidth={1.75} />}
        </button>
      </header>

      {/* Desktop sidebar */}
      <aside
        className={`fixed left-0 top-0 z-30 hidden h-screen flex-col border-r border-violet-500/15 bg-[#080808]/95 px-5 py-8 backdrop-blur-sm lg:flex ${SIDEBAR_W}`}
        aria-label="Site navigation"
      >
        {brand}
        {navList}
        {cta}
        {danknDevourCta}
      </aside>

      {/* Mobile drawer + overlay */}
      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/70 lg:hidden"
              onClick={close}
            />
            <motion.div
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={reduceMotion ? false : { x: "-100%" }}
              animate={{ x: 0 }}
              exit={reduceMotion ? undefined : { x: "-100%" }}
              transition={{ duration: 0.32, ease }}
              className={`fixed bottom-0 left-0 top-0 z-50 flex flex-col border-r border-white/[0.08] bg-[#080808] px-5 pb-8 pt-6 shadow-2xl shadow-black/50 lg:hidden ${SIDEBAR_W}`}
            >
              <div className="mb-6 flex items-center justify-between">
                <p id={titleId} className="text-sm font-semibold text-white">
                  Menu
                </p>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={close}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35"
                >
                  <span className="sr-only">Close</span>
                  <X className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
              {brand}
              {navList}
              {cta}
              {danknDevourCta}
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
